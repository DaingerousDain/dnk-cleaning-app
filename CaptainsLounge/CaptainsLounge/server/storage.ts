import { users, bookings, availability, type User, type InsertUser, type Booking, type InsertBooking, type Availability, type InsertAvailability } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeCustomerId(id: string, stripeCustomerId: string): Promise<User>;

  // Booking management
  getBooking(id: string): Promise<Booking | undefined>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  createBooking(booking: Omit<InsertBooking, "email" | "name" | "phone">, userId: string): Promise<Booking>;
  updateBookingPayment(id: string, paymentIntentId: string, paymentStatus: string): Promise<Booking>;
  cancelBooking(id: string): Promise<Booking>;

  // Availability management
  getAvailability(date: string, timeSlot: string): Promise<Availability | undefined>;
  checkAvailability(date: string, timeSlot: string): Promise<boolean>;
  updateAvailability(date: string, timeSlot: string, currentBookings: number): Promise<Availability>;
  createAvailability(availability: InsertAvailability): Promise<Availability>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserStripeCustomerId(id: string, stripeCustomerId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ stripeCustomerId })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }

  async createBooking(booking: Omit<InsertBooking, "email" | "name" | "phone">, userId: string): Promise<Booking> {
    const addOnServices = booking.addOnServices || [];
    const totalPrice = addOnServices.reduce((total: number, service: { name: string; price: number }) => total + service.price, 20);
    
    const [newBooking] = await db
      .insert(bookings)
      .values({
        userId,
        bookingDate: booking.bookingDate,
        timeSlot: booking.timeSlot,
        addOnServices: addOnServices as Array<{ name: string; price: number }>,
        specialRequests: booking.specialRequests,
        flightDetails: booking.flightDetails,
        basePrice: "20.00",
        totalPrice: totalPrice.toString(),
      })
      .returning();
    return newBooking;
  }

  async updateBookingPayment(id: string, paymentIntentId: string, paymentStatus: string): Promise<Booking> {
    const [booking] = await db
      .update(bookings)
      .set({ paymentIntentId, paymentStatus, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking;
  }

  async cancelBooking(id: string): Promise<Booking> {
    const [booking] = await db
      .update(bookings)
      .set({ status: "cancelled", updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking;
  }

  async getAvailability(date: string, timeSlot: string): Promise<Availability | undefined> {
    const [availabilityRecord] = await db
      .select()
      .from(availability)
      .where(and(eq(availability.date, date), eq(availability.timeSlot, timeSlot)));
    return availabilityRecord || undefined;
  }

  async checkAvailability(date: string, timeSlot: string): Promise<boolean> {
    const availabilityRecord = await this.getAvailability(date, timeSlot);
    if (!availabilityRecord) {
      // Create default availability
      await this.createAvailability({
        date,
        timeSlot,
        isAvailable: true,
        maxCapacity: 1,
        currentBookings: 0,
      });
      return true;
    }
    return availabilityRecord.isAvailable && availabilityRecord.currentBookings < availabilityRecord.maxCapacity;
  }

  async updateAvailability(date: string, timeSlot: string, currentBookings: number): Promise<Availability> {
    let availabilityRecord = await this.getAvailability(date, timeSlot);
    
    if (!availabilityRecord) {
      availabilityRecord = await this.createAvailability({
        date,
        timeSlot,
        isAvailable: true,
        maxCapacity: 1,
        currentBookings: 0,
      });
    }

    const [updated] = await db
      .update(availability)
      .set({ currentBookings })
      .where(and(eq(availability.date, date), eq(availability.timeSlot, timeSlot)))
      .returning();
    return updated;
  }

  async createAvailability(insertAvailability: InsertAvailability): Promise<Availability> {
    const [newAvailability] = await db
      .insert(availability)
      .values(insertAvailability)
      .returning();
    return newAvailability;
  }
}

export const storage = new DatabaseStorage();
