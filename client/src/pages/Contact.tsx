import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import { insertContactSchema } from "@shared/schema";

type ContactFormValues = z.infer<typeof insertContactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We will get back to you shortly.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#f5f5f5] mt-16">
      <div className="container mx-auto px-4">
        <h2 className="font-['Playfair_Display'] text-center text-3xl md:text-4xl font-bold mb-2 relative after:content-[''] after:block after:w-[60px] after:h-[2px] after:my-3 after:mx-auto after:bg-[#d4af37]">
          Contact Us
        </h2>
        <p className="text-center text-[#8a8a8a] max-w-2xl mx-auto mb-12 font-['Montserrat']">
          Have questions about our services or ready to start your custom project? Get in touch with us.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#8a8a8a] font-medium">Full Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
                          {...field} 
                          className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#8a8a8a] font-medium">Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your.email@example.com" 
                          {...field}
                          className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#8a8a8a] font-medium">Subject *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="What's your message about?" 
                          {...field}
                          className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#8a8a8a] font-medium">Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message here..."
                          {...field}
                          className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#212121] hover:bg-[#212121]/90 text-white font-medium py-3 px-8 rounded-sm uppercase tracking-wider text-sm transition-all"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="text-[#d4af37] mt-1 mr-3 w-5" />
                  <div>
                    <h4 className="font-['Playfair_Display'] font-semibold mb-1">Studio Address</h4>
                    <p className="font-['Montserrat'] text-[#8a8a8a]">123 Atelier Lane, Fashion District<br/>New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-[#d4af37] mt-1 mr-3 w-5" />
                  <div>
                    <h4 className="font-['Playfair_Display'] font-semibold mb-1">Email</h4>
                    <p className="font-['Montserrat'] text-[#8a8a8a]">info@elegancecouture.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-[#d4af37] mt-1 mr-3 w-5" />
                  <div>
                    <h4 className="font-['Playfair_Display'] font-semibold mb-1">Phone</h4>
                    <p className="font-['Montserrat'] text-[#8a8a8a]">+1 (212) 555-6789</p>
                  </div>
                </div>
              </div>
              
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4">Studio Hours</h3>
              <div className="space-y-2 mb-8">
                <p className="font-['Montserrat'] text-[#8a8a8a]">Monday - Friday: 10:00 AM - 6:00 PM</p>
                <p className="font-['Montserrat'] text-[#8a8a8a]">Saturday: 11:00 AM - 4:00 PM</p>
                <p className="font-['Montserrat'] text-[#8a8a8a]">Sunday: By appointment only</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#212121] hover:bg-[#d4af37] transition-all rounded-full flex items-center justify-center">
                  <Instagram className="text-white" size={18} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#212121] hover:bg-[#d4af37] transition-all rounded-full flex items-center justify-center">
                  <Facebook className="text-white" size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#212121] hover:bg-[#d4af37] transition-all rounded-full flex items-center justify-center">
                  <Linkedin className="text-white" size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
