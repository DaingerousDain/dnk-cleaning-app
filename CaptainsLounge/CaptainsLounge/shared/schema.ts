import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone"),
  stripeCustomerId: text("stripe_customer_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  bookingDate: text("booking_date").notNull(), // YYYY-MM-DD format
  timeSlot: text("time_slot").notNull(), // "6am-10am", "10am-2pm", "2pm-6pm", "6pm-10pm"
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  addOnServices: jsonb("add_on_services").$type<Array<{
    name: string;
    price: number;
  }>>().default([]),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  paymentIntentId: text("payment_intent_id"),
  paymentStatus: text("payment_status").default("pending"), // pending, completed, failed, cancelled
  specialRequests: text("special_requests"),
  flightDetails: text("flight_details"),
  status: text("status").default("confirmed"), // confirmed, cancelled
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const availability = pgTable("availability", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(), // YYYY-MM-DD format
  timeSlot: text("time_slot").notNull(), // "6am-10am", "10am-2pm", "2pm-6pm", "6pm-10pm"
  isAvailable: boolean("is_available").default(true).notNull(),
  maxCapacity: integer("max_capacity").default(1).notNull(),
  currentBookings: integer("current_bookings").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  name: true,
  phone: true,
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  bookingDate: true,
  timeSlot: true,
  addOnServices: true,
  specialRequests: true,
  flightDetails: true,
}).extend({
  email: z.string().email(),
  name: z.string().min(1),
  phone: z.string().optional(),
});

export const insertAvailabilitySchema = createInsertSchema(availability).pick({
  date: true,
  timeSlot: true,
  isAvailable: true,
  maxCapacity: true,
  currentBookings: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertAvailability = z.infer<typeof insertAvailabilitySchema>;
export type Availability = typeof availability.$inferSelect;

// FAQ Item Schema for Ask The Captain bot
export const faqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  tags: z.array(z.string()),
  altPhrases: z.array(z.string()), // Alternative ways to ask the same question
});

export type FaqItem = z.infer<typeof faqItemSchema>;

// Curated FAQs for Captain's Lounge
export const captainsFaqs: FaqItem[] = [
  {
    id: "pricing-basic",
    question: "How much does it cost to book Captain's Lounge?",
    answer: "Captain's Lounge offers 4-hour exclusive time slots for $20 USD per person. This includes access to our heritage lounge, complimentary refreshments, and basic amenities. Additional services like spa treatments, tea ceremonies, and gourmet meals are available for an extra fee.",
    tags: ["pricing", "cost", "fees", "booking"],
    altPhrases: ["What are your rates?", "How much is a booking?", "What does it cost?", "Pricing information"]
  },
  {
    id: "time-slots",
    question: "What time slots are available?",
    answer: "We offer four daily 4-hour time slots: 6:00 AM - 10:00 AM (Early Heritage), 10:00 AM - 2:00 PM (Morning Heritage), 2:00 PM - 6:00 PM (Afternoon Heritage), and 6:00 PM - 10:00 PM (Evening Heritage). Each slot provides exclusive access to our colonial lounge facilities.",
    tags: ["schedule", "hours", "time", "availability"],
    altPhrases: ["When are you open?", "What are your hours?", "Available times", "Booking times"]
  },
  {
    id: "location",
    question: "Where is Captain's Lounge located?",
    answer: "Captain's Lounge is located within the historic Galle Fort UNESCO World Heritage Site in Sri Lanka. We operate from a beautifully restored 1780 Dutch colonial building in association with the prestigious Prince of Galle heritage hotel. The exact address is on Sudharmalaya Road, Galle Fort.",
    tags: ["location", "address", "galle", "heritage", "unesco"],
    altPhrases: ["Where are you?", "Your location", "Address", "How to find you"]
  },
  {
    id: "services-included",
    question: "What's included in the basic booking?",
    answer: "Your $20 USD booking includes 4-hour access to our heritage lounge, complimentary Ceylon tea and coffee, light refreshments, comfortable seating areas, free WiFi, charging stations, shower facilities, and lockers for your belongings. It's perfect for travelers with layovers between hotel checkout and flights.",
    tags: ["included", "amenities", "facilities", "basic"],
    altPhrases: ["What do I get?", "Included amenities", "Basic package", "What's provided"]
  },
  {
    id: "add-on-services",
    question: "What additional services do you offer?",
    answer: "We offer several premium add-ons: Traditional Sri Lankan spa treatments, authentic Ceylon tea tasting ceremonies, cultural entertainment, professional grooming services, and gourmet Sri Lankan meals. Each service is priced separately and can be added during booking or upon arrival.",
    tags: ["spa", "tea", "entertainment", "grooming", "meals", "extras"],
    altPhrases: ["Extra services", "Add-ons", "Premium services", "What else do you offer"]
  },
  {
    id: "booking-advance",
    question: "Do I need to book in advance?",
    answer: "Yes, advance booking is highly recommended as we maintain exclusive occupancy limits to preserve the heritage ambiance. You can book online through our website with secure Stripe payment processing. Same-day bookings may be available but are subject to capacity.",
    tags: ["booking", "advance", "reservation", "availability"],
    altPhrases: ["Book ahead?", "Reservation required?", "Walk-ins accepted?", "How far in advance"]
  },
  {
    id: "payment-methods",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) through our secure Stripe payment system. Payment is required at the time of booking to confirm your reservation. We also accept local Sri Lankan Rupees for additional services purchased on-site.",
    tags: ["payment", "credit card", "stripe", "rupees"],
    altPhrases: ["How to pay?", "Payment options", "Credit cards accepted?", "Pay with cash?"]
  },
  {
    id: "group-bookings",
    question: "Can I book for a group?",
    answer: "Absolutely! Captain's Lounge is perfect for small groups, families, or business travelers. Each person requires a separate $20 booking, and we can accommodate special arrangements for groups. Please contact us directly for groups larger than 6 people to ensure the best heritage experience.",
    tags: ["group", "family", "multiple", "people"],
    altPhrases: ["Group rates?", "Family booking", "Multiple people", "Book for others"]
  },
  {
    id: "children-policy",
    question: "Are children welcome?",
    answer: "Yes, children are welcome at Captain's Lounge! Children under 12 receive a 50% discount on the base booking fee. We provide family-friendly amenities and can arrange child-appropriate activities. Please mention children in your booking for proper preparation.",
    tags: ["children", "kids", "family", "discount"],
    altPhrases: ["Kids allowed?", "Family friendly?", "Child rates", "Bring children"]
  },
  {
    id: "cancellation-policy",
    question: "What's your cancellation policy?",
    answer: "Bookings can be cancelled up to 24 hours before your time slot for a full refund. Cancellations within 24 hours are subject to a 50% fee. No-shows forfeit the full booking amount. Weather-related cancellations are handled case-by-case with full refunds typically provided.",
    tags: ["cancellation", "refund", "policy", "cancel"],
    altPhrases: ["Cancel booking?", "Refund policy", "Change reservation", "Weather cancellation"]
  },
  {
    id: "luggage-storage",
    question: "Can I store my luggage?",
    answer: "Yes! Secure luggage storage and lockers are included with every booking. This makes Captain's Lounge ideal for travelers between hotel checkout and flight departure. Your belongings are safe while you enjoy our heritage facilities and explore Galle Fort.",
    tags: ["luggage", "storage", "lockers", "bags"],
    altPhrases: ["Store bags?", "Luggage facilities", "Keep bags safe", "Locker service"]
  },
  {
    id: "shower-facilities",
    question: "Do you have shower facilities?",
    answer: "Yes, clean and modern shower facilities are available as part of your booking. We provide fresh towels, basic toiletries, and a comfortable space to refresh yourself. This is especially popular with travelers on long layovers or after exploring Sri Lanka.",
    tags: ["shower", "bathroom", "refresh", "toiletries"],
    altPhrases: ["Bathroom facilities?", "Place to wash?", "Fresh up", "Shower available"]
  },
  {
    id: "wifi-internet",
    question: "Is WiFi available?",
    answer: "Yes, complimentary high-speed WiFi is included throughout Captain's Lounge. Perfect for staying connected, working, or sharing your heritage experience on social media. We also have charging stations for all your devices.",
    tags: ["wifi", "internet", "charging", "devices"],
    altPhrases: ["Internet access?", "WiFi password", "Charge phone", "Stay connected"]
  },
  {
    id: "food-drink",
    question: "Can I get food and drinks?",
    answer: "Complimentary Ceylon tea, coffee, and light refreshments are included. For heartier options, we offer authentic Sri Lankan gourmet meals as an add-on service. Traditional curry dishes, fresh tropical fruits, and colonial-inspired cuisine are available.",
    tags: ["food", "meals", "drinks", "tea", "curry"],
    altPhrases: ["Dining options?", "Restaurant", "Hungry", "Sri Lankan food"]
  },
  {
    id: "heritage-history",
    question: "Tell me about the heritage building",
    answer: "Captain's Lounge occupies a magnificently restored 1780 Dutch colonial building within Galle Fort, a UNESCO World Heritage Site. The structure showcases original Dutch architectural elements, colonial-era furnishings, and historic artifacts, offering an authentic glimpse into Sri Lanka's colonial maritime history.",
    tags: ["heritage", "history", "dutch", "colonial", "1780"],
    altPhrases: ["Building history", "Colonial architecture", "Heritage site", "Historical significance"]
  },
  {
    id: "transportation",
    question: "How do I get to Galle Fort?",
    answer: "Galle Fort is easily accessible by train, bus, or taxi from Colombo (2 hours). From Colombo Airport, it's about 2.5 hours by car. Local tuk-tuks operate within Galle town. We can provide detailed directions and transportation recommendations upon booking.",
    tags: ["transport", "directions", "galle", "travel"],
    altPhrases: ["How to get there?", "Transportation options", "Directions", "Travel to Galle"]
  },
  {
    id: "accessibility",
    question: "Is the lounge accessible for people with disabilities?",
    answer: "We strive to accommodate all guests within the constraints of our historic 1780 building. While some areas have heritage preservation limitations, we have accessible entrance options and can make special arrangements. Please contact us before booking to discuss specific accessibility needs.",
    tags: ["accessibility", "disability", "wheelchair", "special needs"],
    altPhrases: ["Wheelchair accessible?", "Disability friendly", "Special requirements", "Accessible entrance"]
  },
  {
    id: "contact-info",
    question: "How can I contact you directly?",
    answer: "You can reach us at info@princeofgalle.com for general inquiries and bookings, or daindm@yahoo.com for immediate assistance. We're available daily during our operating hours (6:00 AM - 10:00 PM) and respond to emails promptly.",
    tags: ["contact", "email", "phone", "reach"],
    altPhrases: ["Contact details", "Phone number", "Email address", "Get in touch"]
  },
  {
    id: "weather-indoor",
    question: "Is Captain's Lounge indoor or affected by weather?",
    answer: "Captain's Lounge is primarily indoor within our climate-controlled colonial building, ensuring comfort regardless of weather. We also have covered outdoor heritage areas for when you want to enjoy Sri Lanka's tropical ambiance while staying protected.",
    tags: ["weather", "indoor", "climate", "rain"],
    altPhrases: ["Weather proof?", "Indoor facility", "Air conditioning", "Rain protection"]
  },
  {
    id: "dress-code",
    question: "Is there a dress code?",
    answer: "We maintain a smart casual dress code to preserve the heritage ambiance. Beach wear, flip-flops, and overly casual attire are discouraged. Most travelers find comfortable, respectful clothing perfect for both our lounge and exploring Galle Fort's historic sites.",
    tags: ["dress code", "attire", "clothing", "smart casual"],
    altPhrases: ["What to wear?", "Clothing requirements", "Formal dress", "Casual attire"]
  }
];
