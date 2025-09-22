import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <i className="fas fa-anchor text-3xl text-accent"></i>
              <div>
                <h3 className="text-2xl font-bold playfair">Captain's Lounge</h3>
                <p className="text-primary-foreground/80">Galle Fort Heritage Day Lounge</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Your perfect transit sanctuary in the heart of historic Galle Fort. 
              Experience luxury, heritage, and comfort during your journey through Sri Lanka.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-primary-foreground/10 p-3 rounded-lg hover:bg-primary-foreground/20 transition-colors"
                data-testid="link-facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="#" 
                className="bg-primary-foreground/10 p-3 rounded-lg hover:bg-primary-foreground/20 transition-colors"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                className="bg-primary-foreground/10 p-3 rounded-lg hover:bg-primary-foreground/20 transition-colors"
                data-testid="link-tripadvisor"
              >
                <i className="fab fa-tripadvisor"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="#gallery" className="hover:text-accent transition-colors">Gallery</a></li>
              <li>
                <Link href="/booking" className="hover:text-accent transition-colors">Book Now</Link>
              </li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Ayurvedic Spa</li>
              <li>Tea Ceremonies</li>
              <li>Entertainment</li>
              <li>Grooming Services</li>
              <li>Dining</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 mb-4 md:mb-0">
            © 2024 Captain's Lounge. All rights reserved. | Associated with Prince of Galle
          </p>
          <div className="flex space-x-6 text-sm text-primary-foreground/80">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
