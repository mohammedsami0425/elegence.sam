import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  selectedIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, selectedIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        navigateToPrevious();
      } else if (e.key === "ArrowRight") {
        navigateToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose, currentIndex]);

  const navigateToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const navigateToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <Button 
          variant="ghost" 
          className="absolute top-4 right-4 text-white z-10 hover:bg-white/20 p-2 rounded-full" 
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        
        <div className="max-w-4xl max-h-[80vh] relative">
          <div className="overflow-hidden">
            <img 
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt} 
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
          
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 p-2 rounded-full" 
              onClick={navigateToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 p-2 rounded-full" 
              onClick={navigateToNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
        </div>
        
        <div className="text-white text-sm mt-4">
          <p className="font-['Montserrat']">{currentIndex + 1} / {images.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
