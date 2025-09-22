import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AskTheCaptain from "@/components/ask-the-captain";

export default function ContactSection() {

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Heritage Location",
      content: "Captain's Lounge by Prince of Galle\nHistoric 1780 Dutch Colonial Building\nGalle Fort UNESCO World Heritage Site\nGalle, Southern Province, Sri Lanka",
      bgColor: "bg-primary",
      textColor: "text-primary-foreground"
    },
    {
      icon: "fas fa-phone",
      title: "Reservations",
      content: "+94 91 224 9729\n+94 77 321 4567",
      bgColor: "bg-accent",
      textColor: "text-accent-foreground"
    },
    {
      icon: "fas fa-envelope",
      title: "Contact",
      content: "info@princeofgalle.com\ndaindm@yahoo.com",
      bgColor: "bg-secondary",
      textColor: "text-secondary-foreground",
      isEmail: true
    },
    {
      icon: "fas fa-clock",
      title: "Heritage Hours",
      content: "Daily: 6:00 AM - 10:00 PM\n4-hour exclusive time slots\nAdvance booking recommended",
      bgColor: "bg-primary",
      textColor: "text-primary-foreground"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 playfair">
            Heritage Location in Galle Fort
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience our exclusive day lounge within a meticulously restored 1780 Dutch colonial building, 
            operated in association with the prestigious Prince of Galle heritage hotel
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold playfair">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`${info.bgColor} ${info.textColor} p-3 rounded-lg flex-shrink-0`}>
                        <i className={info.icon}></i>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{info.title}</h4>
                        {info.isEmail ? (
                          <div className="space-y-1">
                            {info.content.split('\n').map((email, emailIndex) => (
                              <div key={emailIndex}>
                                <a 
                                  href={`mailto:${email.trim()}`}
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
                                  data-testid={`link-email-${emailIndex}`}
                                >
                                  {email.trim()}
                                </a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold playfair">Getting Here</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-plane text-primary mt-1"></i>
                    <div>
                      <p className="font-medium text-foreground">From Bandaranaike Airport</p>
                      <p>2.5 hours via Southern Expressway (A2)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-train text-primary mt-1"></i>
                    <div>
                      <p className="font-medium text-foreground">Coastal Railway</p>
                      <p>UNESCO heritage train route to Galle</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-map-marked-alt text-primary mt-1"></i>
                    <div>
                      <p className="font-medium text-foreground">Within Fort Walls</p>
                      <p>656 feet from Dutch Reformed Church</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <div className="bg-muted rounded-xl h-96 overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                loading="lazy" 
                allowFullScreen 
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.8924567891234!2d80.21679688484652!3d6.028624012345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb25c6a1b7%3A0x5c1e2f2a0b6c7d8e!2sPrince%20of%20Galle%2C%20Sudharmalaya%20Road%2C%20Galle%20Fort%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1647892345679!5m2!1sen!2s"
                title="Captain's Lounge Location - Galle Fort, Sri Lanka"
                data-testid="map-location"
              />
            </div>
            
            <AskTheCaptain />
          </div>
        </div>
      </div>
    </section>
  );
}
