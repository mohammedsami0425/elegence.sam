import { Link } from "wouter";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#212121] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Élégance</h3>
            <p className="font-['Montserrat'] text-white/80 mb-4">
              Bespoke couture for the modern woman. Handcrafted with precision and care to reflect your unique style.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#d4af37] transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#d4af37] transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#d4af37] transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="font-['Montserrat'] space-y-2">
              <li>
                <Link href="/">
                  <div className="text-white/80 hover:text-[#d4af37] transition-all cursor-pointer">Home</div>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <div className="text-white/80 hover:text-[#d4af37] transition-all cursor-pointer">About</div>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <div className="text-white/80 hover:text-[#d4af37] transition-all cursor-pointer">Services</div>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <div className="text-white/80 hover:text-[#d4af37] transition-all cursor-pointer">Portfolio</div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className="text-white/80 hover:text-[#d4af37] transition-all cursor-pointer">Contact</div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Services</h3>
            <ul className="font-['Montserrat'] space-y-2">
              <li>
                <Link href="/services">
                  <div className="text-white/80 hover:text-[#d4af37] transition-all cursor-pointer">Custom Design</div>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <div className="text-white/80 hover:text-[#d4af37] transition-all cursor-pointer">Bridal Collection</div>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <div className="text-white/80 hover:text-[#d4af37] transition-all cursor-pointer">Alterations & Restyling</div>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <div className="text-white/80 hover:text-[#d4af37] transition-all cursor-pointer">Fabric Consultation</div>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <div className="text-white/80 hover:text-[#d4af37] transition-all cursor-pointer">Style Advisory</div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Newsletter</h3>
            <p className="font-['Montserrat'] text-white/80 mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent placeholder-white/50 text-white"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#212121] font-medium py-2 px-4 rounded-sm uppercase tracking-wider text-sm transition-all"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center font-['Montserrat'] text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Élégance Couture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
