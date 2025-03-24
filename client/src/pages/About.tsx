import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#f5f5f5] mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1588484628369-dd7a85bfdc38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Fashion designer at work" 
              className="w-full h-auto rounded-sm shadow-lg"
            />
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-2 relative after:content-[''] after:block after:w-[50px] after:h-[2px] after:my-2 after:bg-[#d4af37]">
              About the Designer
            </h2>
            <p className="font-['Montserrat'] text-[#8a8a8a] mb-6">
              With over a decade of experience in haute couture, I bring a unique perspective to every design, blending traditional craftsmanship with contemporary aesthetics.
            </p>
            
            <p className="font-['Montserrat'] text-[#8a8a8a] mb-6">
              Each garment is meticulously crafted in my atelier, ensuring the highest quality and attention to detail. I believe that clothing should not only be beautiful but also reflect the personality and style of the wearer.
            </p>
            
            <p className="font-['Montserrat'] text-[#8a8a8a] mb-6">
              My design philosophy centers on creating timeless pieces that empower women to feel confident and elegant, regardless of occasion or season.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/services">
                <Button className="bg-[#212121] hover:bg-[#212121]/90 text-white font-medium py-2 px-6 rounded-sm uppercase tracking-wider text-sm transition-all">
                  Our Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-[#212121] hover:bg-[#212121] hover:text-white text-[#212121] font-medium py-2 px-6 rounded-sm uppercase tracking-wider text-sm transition-all">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
