import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import GallerySection from "@/components/gallery-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/ui/footer";
import buildingExterior from "@assets/clexterior1_1758102506500.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      
      {/* Problem Solution Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 playfair">
              The Perfect Transit Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Most hotels require 10am checkout, but flights from Colombo often depart late evening or after midnight. 
              Why pay for another night or endure the heat shopping around?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img 
              src={buildingExterior} 
              alt="Captain's Lounge heritage building exterior - authentic Dutch colonial architecture in Galle Fort" 
              className="rounded-xl shadow-xl w-full h-auto" 
            />
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg flex-shrink-0">
                  <i className="fas fa-clock text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Flexible Time Slots</h3>
                  <p className="text-muted-foreground">Choose from 4-hour sessions: 6am-10am, 10am-2pm, 2pm-6pm, or 6pm-10pm</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-accent text-accent-foreground p-3 rounded-lg flex-shrink-0">
                  <i className="fas fa-spa text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Complete Wellness</h3>
                  <p className="text-muted-foreground">Spa treatments, showers, beauty services, and relaxation spaces</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-secondary text-secondary-foreground p-3 rounded-lg flex-shrink-0">
                  <i className="fas fa-utensils text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dining & Entertainment</h3>
                  <p className="text-muted-foreground">Fresh meals, tea ceremonies, and large screen entertainment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
