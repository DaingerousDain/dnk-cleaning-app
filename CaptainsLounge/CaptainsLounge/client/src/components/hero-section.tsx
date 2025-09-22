import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="hero-bg min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-accent mb-6 playfair">
          Captain's Lounge
        </h1>
        <h2 className="text-2xl md:text-3xl text-blue-400 mb-8 playfair">
          Your Heritage Haven Between Flights
        </h2>
        <p className="text-lg md:text-xl text-blue-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Step into history with our exclusive day lounge in a meticulously restored 1780 Dutch colonial building. 
          Avoid paying for another night's accommodation - experience luxury transit with authentic Ceylon heritage, 
          world-class spa treatments, and the charm of Galle Fort's UNESCO protected ramparts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/booking"
            className="bg-accent text-accent-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2"
            data-testid="button-book-now"
          >
            <i className="fas fa-calendar-check"></i>
            Reserve Your Heritage Experience - $20 USD
          </Link>
          <a 
            href="#services" 
            className="border border-primary-foreground text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors"
            data-testid="button-explore-services"
          >
            Explore Services
          </a>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
          <div>
            <h3 className="text-2xl font-bold mb-2" data-testid="text-hour-sessions">4</h3>
            <p className="text-sm">Hour Sessions</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2" data-testid="text-price-usd">$20</h3>
            <p className="text-sm">USD Per Slot</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2" data-testid="text-unesco">UNESCO</h3>
            <p className="text-sm">Heritage Site</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2" data-testid="text-year-1780">1780</h3>
            <p className="text-sm">Historic Building</p>
          </div>
        </div>
      </div>
    </section>
  );
}
