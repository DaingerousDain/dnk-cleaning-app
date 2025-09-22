import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3" data-testid="link-logo">
            <i className="fas fa-anchor text-2xl text-primary"></i>
            <div>
              <h1 className="text-xl font-bold text-accent playfair">Captain's Lounge</h1>
              <p className="text-xs text-accent">Galle Fort Heritage</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#services" 
              className="text-accent hover:text-accent/80 transition-colors"
              data-testid="link-services"
            >
              Services
            </a>
            <a 
              href="#gallery" 
              className="text-accent hover:text-accent/80 transition-colors"
              data-testid="link-gallery"
            >
              Gallery
            </a>
            <Link href="/booking" className="text-accent hover:text-accent/80 transition-colors" data-testid="link-booking">
              Book Now
            </Link>
            <a 
              href="#contact" 
              className="text-accent hover:text-accent/80 transition-colors"
              data-testid="link-contact"
            >
              Contact
            </a>
          </div>
          
          <button 
            className="md:hidden text-accent hover:text-accent/80"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-2">
              <a 
                href="#services" 
                className="block px-3 py-2 text-accent hover:text-accent/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#gallery" 
                className="block px-3 py-2 text-accent hover:text-accent/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </a>
              <Link 
                href="/booking" 
                className="block px-3 py-2 text-accent hover:text-accent/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
              <a 
                href="#contact" 
                className="block px-3 py-2 text-accent hover:text-accent/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
