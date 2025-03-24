import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description: "Initial meeting to discuss your vision, preferences, and requirements."
    },
    {
      number: "02",
      title: "Design & Fabric",
      description: "Conceptualization of design and selection of appropriate fabrics and materials."
    },
    {
      number: "03",
      title: "Measurements",
      description: "Detailed measurements are taken to ensure perfect fit and comfort."
    },
    {
      number: "04",
      title: "Creation",
      description: "Crafting your garment with precision, including fittings and final delivery."
    }
  ];

  return (
    <section id="process" className="py-20 bg-white mt-16">
      <div className="container mx-auto px-4">
        <h2 className="font-['Playfair_Display'] text-center text-3xl md:text-4xl font-bold mb-2 relative after:content-[''] after:block after:w-[60px] after:h-[2px] after:my-3 after:mx-auto after:bg-[#d4af37]">
          Our Process
        </h2>
        <p className="text-center text-[#8a8a8a] max-w-2xl mx-auto mb-16 font-['Montserrat']">
          Understanding our design and creation process helps ensure a seamless experience from concept to finished garment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-[#e8c4c4] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-['Playfair_Display'] text-[#212121] text-xl font-bold">{step.number}</span>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">{step.title}</h3>
              <p className="font-['Montserrat'] text-[#8a8a8a]">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-[#f5f5f5] p-8 rounded-sm">
          <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4 text-center">Remote Order Process</h3>
          <p className="text-center text-[#8a8a8a] max-w-2xl mx-auto mb-8 font-['Montserrat']">
            Unable to visit in person? Our remote process ensures the same quality and fit.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-['Playfair_Display'] text-xl font-semibold mb-3">Virtual Consultation</h4>
              <p className="font-['Montserrat'] text-[#8a8a8a] mb-2">Schedule a video call to discuss your needs and preferences.</p>
              <p className="font-['Montserrat'] text-[#8a8a8a] mb-2">Share inspiration images and ideas for your desired design.</p>
              <p className="font-['Montserrat'] text-[#8a8a8a]">Review fabric swatches sent to you prior to the consultation.</p>
            </div>
            
            <div>
              <h4 className="font-['Playfair_Display'] text-xl font-semibold mb-3">Self-Measurement Guide</h4>
              <p className="font-['Montserrat'] text-[#8a8a8a] mb-2">Receive our detailed measurement guide with video instructions.</p>
              <p className="font-['Montserrat'] text-[#8a8a8a] mb-2">Send in your measurements with verification photos.</p>
              <p className="font-['Montserrat'] text-[#8a8a8a]">Virtual fitting sessions to ensure perfect fit before final completion.</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/order">
              <Button className="bg-[#212121] hover:bg-[#212121]/90 text-white font-medium py-2 px-6 rounded-sm uppercase tracking-wider text-sm transition-all">
                Start Your Order
              </Button>
            </Link>
          </div>
        </div>

        {/* Fabrics Section */}
        <div className="mt-20">
          <h2 className="font-['Playfair_Display'] text-center text-3xl md:text-4xl font-bold mb-2 relative after:content-[''] after:block after:w-[60px] after:h-[2px] after:my-3 after:mx-auto after:bg-[#d4af37]">
            Our Fabrics
          </h2>
          <p className="text-center text-[#8a8a8a] max-w-2xl mx-auto mb-12 font-['Montserrat']">
            We source only the finest fabrics from around the world to ensure exceptional quality and comfort in every garment.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1618573957373-9c4708e4680f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                alt="Silk fabric" 
                className="w-full h-48 object-cover rounded-sm mb-4"
              />
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Premium Silks</h3>
              <p className="font-['Montserrat'] text-[#8a8a8a]">
                Luxurious silks sourced from Italy and France, perfect for elegant evening wear and special occasions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1594761046768-d0a7c7215887?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                alt="Cotton fabric" 
                className="w-full h-48 object-cover rounded-sm mb-4"
              />
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Natural Cottons & Linens</h3>
              <p className="font-['Montserrat'] text-[#8a8a8a]">
                Breathable, sustainable cottons and linens ideal for casual wear and summer dresses.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=709&q=80" 
                alt="Specialty fabric" 
                className="w-full h-48 object-cover rounded-sm mb-4"
              />
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Specialty Textiles</h3>
              <p className="font-['Montserrat'] text-[#8a8a8a]">
                Unique materials including hand-embroidered lace, beaded fabrics, and specialty weaves for statement pieces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
