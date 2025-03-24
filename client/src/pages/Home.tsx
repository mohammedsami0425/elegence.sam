import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Portfolio } from "@shared/schema";

const Home = () => {
  const { data: featuredDresses, isLoading } = useQuery<Portfolio[]>({
    queryKey: ['/api/portfolio/featured'],
  });

  const HeroSection = () => (
    <section id="home" className="relative h-screen bg-[#212121] overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <img 
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" 
          alt="Fashion designer working" 
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#212121]/30 to-[#212121]/80"></div>
      
      <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Bespoke Couture<br/>Handcrafted Elegance
        </h1>
        <div className="w-20 h-1 bg-[#d4af37] mb-6"></div>
        <p className="font-['Montserrat'] text-lg md:text-xl text-[#f5f5f5] mb-8 max-w-2xl">
          Elevate your style with handcrafted custom dresses designed specifically for you
        </p>
        <Link href="/order">
          <Button 
            className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#212121] font-medium py-3 px-8 rounded-sm uppercase tracking-wider text-sm transition-all"
          >
            Order Custom Dress
          </Button>
        </Link>
      </div>
    </section>
  );

  const FeaturedCollection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-['Playfair_Display'] text-center text-3xl md:text-4xl font-bold mb-2 relative after:content-[''] after:block after:w-[60px] after:h-[2px] after:my-3 after:mx-auto after:bg-[#d4af37]">
          Latest Collection
        </h2>
        <p className="text-center text-[#8a8a8a] max-w-2xl mx-auto mb-12 font-['Montserrat']">
          Discover our newest handcrafted designs, each piece meticulously created with premium fabrics and impeccable attention to detail.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-96 w-full rounded-sm"></div>
                <div className="bg-white p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : featuredDresses && featuredDresses.length > 0 ? (
            featuredDresses.map((dress) => (
              <div key={dress.id} className="group relative overflow-hidden">
                <img 
                  src={dress.imageUrl} 
                  alt={dress.name} 
                  className="w-full h-96 object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#212121]/0 group-hover:bg-[#212121]/40 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-1">{dress.name}</h3>
                  <p className="text-[#d4af37] font-['Montserrat'] text-sm">{dress.category}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-10">
              <p className="text-[#8a8a8a] font-['Montserrat']">No featured dresses available at the moment.</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/portfolio">
            <Button 
              variant="outline"
              className="inline-block border-2 border-[#212121] hover:bg-[#212121] hover:text-white text-[#212121] font-medium py-2 px-6 rounded-sm uppercase tracking-wider text-sm transition-all"
            >
              View Full Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <HeroSection />
      <FeaturedCollection />
    </>
  );
};

export default Home;
