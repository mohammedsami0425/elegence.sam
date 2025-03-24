import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Lightbox from "@/components/ui/lightbox";
import { Portfolio as PortfolioType } from "@shared/schema";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  const [category, setCategory] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const { data: portfolioItems, isLoading } = useQuery<PortfolioType[]>({
    queryKey: ['/api/portfolio'],
  });

  const categories = ["all", "formal", "casual", "bridal"];
  
  const filteredItems = portfolioItems?.filter(item => 
    category === "all" || item.category.toLowerCase() === category
  );

  const lightboxImages = portfolioItems?.map(item => ({
    src: item.imageUrl,
    alt: item.name
  })) || [];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-[#f5f5f5] mt-16">
      <div className="container mx-auto px-4">
        <h2 className="font-['Playfair_Display'] text-center text-3xl md:text-4xl font-bold mb-2 relative after:content-[''] after:block after:w-[60px] after:h-[2px] after:my-3 after:mx-auto after:bg-[#d4af37]">
          Portfolio
        </h2>
        <p className="text-center text-[#8a8a8a] max-w-2xl mx-auto mb-8 font-['Montserrat']">
          Browse through our collection of handcrafted pieces and find inspiration for your own custom design.
        </p>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex space-x-2 border border-[#8a8a8a]/30 p-1 rounded-sm">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-sm ${
                  category === cat 
                    ? "bg-[#212121] text-white" 
                    : "bg-transparent text-[#212121] hover:bg-[#8a8a8a]/10"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-80 w-full rounded-sm"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems && filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="portfolio-item group cursor-pointer" 
                  onClick={() => openLightbox(portfolioItems?.findIndex(p => p.id === item.id) || 0)}
                >
                  <div className="relative overflow-hidden rounded-sm">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-80 object-cover transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#212121]/0 group-hover:bg-[#212121]/50 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                      <span className="text-white font-['Playfair_Display'] text-lg">{item.name}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-[#8a8a8a] font-['Montserrat']">No items found in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          selectedIndex={selectedImageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
};

export default Portfolio;
