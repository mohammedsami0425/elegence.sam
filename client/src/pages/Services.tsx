import { Check } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      icon: "✏️",
      name: "Custom Design",
      description: "Bespoke dresses designed exclusively for you, from elegant evening gowns to casual daywear.",
      features: [
        "Personal consultation",
        "Custom fabric selection",
        "Multiple fittings"
      ],
      startingPrice: "$1,200"
    },
    {
      id: 2,
      icon: "✂️",
      name: "Bridal Collection",
      description: "Exquisite wedding gowns and bridal party dresses designed to make your special day unforgettable.",
      features: [
        "Extended consultations",
        "Premium fabric options",
        "Accessory coordination"
      ],
      startingPrice: "$2,800"
    },
    {
      id: 3,
      icon: "👕",
      name: "Alterations & Restyling",
      description: "Expert alterations and restyling services to breathe new life into existing garments.",
      features: [
        "Professional assessment",
        "Creative redesign options",
        "Quality finishing"
      ],
      startingPrice: "$350"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white mt-16">
      <div className="container mx-auto px-4">
        <h2 className="font-['Playfair_Display'] text-center text-3xl md:text-4xl font-bold mb-2 relative after:content-[''] after:block after:w-[60px] after:h-[2px] after:my-3 after:mx-auto after:bg-[#d4af37]">
          Our Services
        </h2>
        <p className="text-center text-[#8a8a8a] max-w-2xl mx-auto mb-12 font-['Montserrat']">
          From concept to creation, we offer comprehensive design services tailored to your unique style and preferences.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-[#f5f5f5] p-8 rounded-sm shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-[#e8c4c4] rounded-full flex items-center justify-center mb-6">
                <span className="text-[#212121] text-xl">{service.icon}</span>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">{service.name}</h3>
              <p className="font-['Montserrat'] text-[#8a8a8a] mb-4">{service.description}</p>
              <ul className="font-['Montserrat'] text-[#8a8a8a] space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-[#d4af37] mt-1 mr-2 h-4 w-4" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="font-['Playfair_Display'] text-lg font-semibold mt-6">Starting at {service.startingPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
