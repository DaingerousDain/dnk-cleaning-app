export default function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      text: "This 1780 colonial building is absolutely stunning! The heritage atmosphere combined with modern spa treatments created the perfect layover experience. Felt like stepping back in time while being pampered.",
      name: "Victoria Chen",
      role: "Heritage Tourism Enthusiast",
      initials: "V.C."
    },
    {
      rating: 5,
      text: "The authentic Ceylon tea ceremony was extraordinary - learned so much about Sri Lankan tea culture! The historic setting with live jazz piano made our 6-hour transit magical.",
      name: "James Colombo",
      role: "Cultural Travel Writer",
      initials: "J.C."
    },
    {
      rating: 5,
      text: "If God is in the details, this place truly is heaven! Every element from the hand-carved stonework to the antique furnishings tells a story. Best decision avoiding another hotel night.",
      name: "Amelia Hartwell",
      role: "Architecture Photographer",
      initials: "A.H."
    }
  ];

  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Historic Galle Fort architecture background" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 playfair">
            What Our Guests Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Authentic experiences from guests who chose heritage over ordinary transit
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card p-8 rounded-xl shadow-lg border border-border backdrop-blur-sm bg-background/90"
              data-testid={`card-testimonial-${index}`}
            >
              <div className="flex items-center mb-4">
                <div className="text-accent text-lg">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
              <p className="text-foreground mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold" data-testid={`text-testimonial-name-${index}`}>
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
