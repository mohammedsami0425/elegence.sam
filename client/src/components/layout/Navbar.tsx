import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/process", label: "Process" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className={`fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-3'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <div className="font-['Playfair_Display'] text-2xl font-bold tracking-wide text-[#212121]">
            Élégance
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <div className={`font-['Montserrat'] text-sm uppercase tracking-wider text-[#212121] hover:text-[#d4af37] transition-all cursor-pointer ${
                isActive(link.path) ? "text-[#d4af37]" : ""
              }`}>
                {link.label}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="md:hidden text-[#212121]"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white w-full">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link key={link.path} href={link.path}>
                <div 
                  className={`font-['Montserrat'] text-sm uppercase tracking-wider text-[#212121] hover:text-[#d4af37] py-2 ${
                    index !== navLinks.length - 1 ? "border-b border-gray-100" : ""
                  } transition-all ${isActive(link.path) ? "text-[#d4af37]" : ""} cursor-pointer`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
