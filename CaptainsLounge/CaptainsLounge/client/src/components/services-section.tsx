export default function ServicesSection() {
  const services = [
    {
      icon: "fas fa-spa",
      title: "Heritage Ayurvedic Spa",
      description: "Authentic Sri Lankan wellness treatments in our historic spa courtyard",
      features: [
        "Traditional 1-hour massages",
        "Herbal oil healing treatments", 
        "Meditation in colonial gardens"
      ],
      bgColor: "bg-primary",
      textColor: "text-primary-foreground"
    },
    {
      icon: "fas fa-leaf",
      title: "Ceylon Tea Experience",
      description: "Curated tea tastings featuring the world's finest Ceylon varieties",
      features: [
        "Expert-guided tastings",
        "Custom tea blending",
        "Artisan packaging service"
      ],
      bgColor: "bg-accent",
      textColor: "text-accent-foreground"
    },
    {
      icon: "fas fa-music",
      title: "Live Entertainment",
      description: "Jazz piano, cultural performances, and large screen entertainment",
      features: [
        "Live jazz performances",
        "Cultural heritage shows",
        "Sports & movie screening"
      ],
      bgColor: "bg-secondary",
      textColor: "text-secondary-foreground"
    },
    {
      icon: "fas fa-cut",
      title: "Heritage Grooming",
      description: "Traditional barbering and beauty treatments in colonial elegance",
      features: [
        "Classic men's grooming",
        "Traditional facial treatments",
        "Manicure & beauty services"
      ],
      bgColor: "bg-primary",
      textColor: "text-primary-foreground"
    },
    {
      icon: "fas fa-shower",
      title: "Colonial Luxury Facilities",
      description: "Restored heritage bathrooms with modern luxury amenities",
      features: [
        "Historic fixtures, modern comfort",
        "Premium organic amenities",
        "Plush Egyptian cotton towels"
      ],
      bgColor: "bg-accent",
      textColor: "text-accent-foreground"
    },
    {
      icon: "fas fa-utensils",
      title: "Authentic Ceylon Cuisine",
      description: "Traditional Sri Lankan specialties and colonial-era recipes",
      features: [
        "Heritage recipe collection",
        "Fresh local ingredients",
        "Dietary & cultural preferences"
      ],
      bgColor: "bg-secondary",
      textColor: "text-secondary-foreground"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 playfair">
            Your Heritage Transit Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Immerse yourself in 240+ years of colonial heritage while enjoying world-class amenities designed for the modern traveler
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card bg-card p-8 rounded-xl shadow-lg border border-border hover:transform hover:-translate-y-2 transition-all duration-300"
              data-testid={`card-service-${index}`}
            >
              <div className="text-center mb-6">
                <div className={`${service.bgColor} ${service.textColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${service.icon} text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-semibold mb-2 playfair">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <i className="fas fa-check text-primary"></i> 
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
