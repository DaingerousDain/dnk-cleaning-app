import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navigation from "@/components/ui/navigation";
import BookingForm from "@/components/booking-form";
import Footer from "@/components/ui/footer";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Booking() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <section className="py-20 mt-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 playfair">
              Book Your 4-Hour Escape
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose your preferred time slot and let us create the perfect transit experience for you
            </p>
          </div>
          
          <BookingForm stripePromise={stripePromise} />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
