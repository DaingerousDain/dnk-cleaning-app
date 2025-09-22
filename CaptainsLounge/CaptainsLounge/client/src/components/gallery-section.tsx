import exteriorImage from "@assets/clexterior2_1758101311989.jpg";
import loungeImage from "@assets/clloungea3_1758101610818.jpg";
import mainLoungeImage from "@assets/cllounges1_1758101860592.jpg";
import tearoomImage from "@assets/cltearoom2_1758102135806.jpg";
import bedroomImage from "@assets/cldouble2_1758102282802.jpg";
import balconyImage from "@assets/clbalcony2_1758102400873.jpg";

export default function GallerySection() {
  const galleryImages = [
    {
      src: exteriorImage,
      alt: "Historic Dutch colonial building exterior at dusk - Captain's Lounge heritage property in Galle Fort"
    },
    {
      src: loungeImage,
      alt: "Elegant heritage lounge with golden furnishings and colonial architecture - Captain's Lounge interior"
    },
    {
      src: mainLoungeImage,
      alt: "Grand colonial main lounge with library, exposed brick walls and elegant white columns - Captain's Lounge heritage interior"
    },
    {
      src: tearoomImage,
      alt: "Elegant tearoom with colonial furniture, heritage antlers and tropical plants - Captain's Lounge dining area"
    },
    {
      src: bedroomImage,
      alt: "Heritage double bedroom with vintage Ceylon P&O poster and colonial furniture - Captain's Lounge accommodation"
    },
    {
      src: balconyImage,
      alt: "Heritage balcony overlooking Galle Fort streets with colonial architecture views - Captain's Lounge exterior terrace"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 playfair">
            Step Inside History
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience authentic Dutch colonial splendor in our meticulously restored 1780 heritage building, 
            featuring original hand-carved stonework, antique furnishings, and traditional brass fittings.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="gallery-item rounded-xl overflow-hidden shadow-lg hover:transform hover:scale-105 transition-all duration-300"
              data-testid={`img-gallery-${index}`}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover" 
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            data-testid="button-virtual-tour"
          >
            View Virtual Tour
          </button>
        </div>
      </div>
    </section>
  );
}
