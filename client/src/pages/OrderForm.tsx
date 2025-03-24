import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertOrderSchema } from "@shared/schema";

const extendedOrderSchema = insertOrderSchema.extend({
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type OrderFormValues = z.infer<typeof extendedOrderSchema>;

const OrderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(extendedOrderSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      serviceType: "",
      budget: "",
      timeframe: "",
      measurements: {
        bust: "",
        waist: "",
        hips: "",
        height: "",
        shoulderToWaist: "",
        waistToHem: "",
      },
      specialRequirements: "",
      referralSource: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    try {
      // Remove the agreeToTerms field before sending to server
      const { agreeToTerms, ...orderData } = data;
      await apiRequest("POST", "/api/orders", orderData);
      
      toast({
        title: "Order Submitted!",
        description: "Thank you for your order. We will contact you soon to discuss details.",
      });
      
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-[#f5f5f5] mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-sm shadow-lg">
          <h2 className="font-['Playfair_Display'] text-center text-3xl md:text-4xl font-bold mb-2 relative after:content-[''] after:block after:w-[60px] after:h-[2px] after:my-3 after:mx-auto after:bg-[#d4af37]">
            Custom Order Form
          </h2>
          <p className="text-center text-[#8a8a8a] max-w-xl mx-auto mb-8 font-['Montserrat']">
            Fill out this form to start your bespoke design journey. Our team will contact you to discuss your requirements in detail.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#8a8a8a] font-medium">First Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your first name" 
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#8a8a8a] font-medium">Last Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your last name" 
                          {...field}
                          className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#8a8a8a] font-medium">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+1 (555) 123-4567" 
                          {...field}
                          className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#8a8a8a] font-medium">Type of Service *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="custom-dress">Custom Dress</SelectItem>
                        <SelectItem value="bridal">Bridal Wear</SelectItem>
                        <SelectItem value="alterations">Alterations & Restyling</SelectItem>
                        <SelectItem value="other">Other Services</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#8a8a8a] font-medium">Budget Range *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="$500-$1000">$500-$1000</SelectItem>
                          <SelectItem value="$1000-$2000">$1000-$2000</SelectItem>
                          <SelectItem value="$2000-$3500">$2000-$3500</SelectItem>
                          <SelectItem value="$3500+">$3500+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#8a8a8a] font-medium">Timeframe *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent">
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-2-months">1-2 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="6-12-months">6-12 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Measurements</h3>
                <p className="text-[#8a8a8a] font-['Montserrat'] text-sm mb-4">
                  Please provide your measurements in inches. If you're unsure how to measure correctly, 
                  visit our <a href="/process" className="text-[#d4af37] hover:underline">measurement guide</a>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="measurements.bust"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#8a8a8a] font-medium">Bust</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="inches" 
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
                    name="measurements.waist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#8a8a8a] font-medium">Waist</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="inches" 
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
                    name="measurements.hips"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#8a8a8a] font-medium">Hips</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="inches" 
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
                    name="measurements.height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#8a8a8a] font-medium">Height</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="inches" 
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
                    name="measurements.shoulderToWaist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#8a8a8a] font-medium">Shoulder to Waist</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="inches" 
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
                    name="measurements.waistToHem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#8a8a8a] font-medium">Waist to Hem</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="inches" 
                            {...field}
                            className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#8a8a8a] font-medium">Special Requirements or Design Ideas</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your vision, fabric preferences, or any special requirements"
                        {...field}
                        className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="referralSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#8a8a8a] font-medium">How did you hear about us?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="search-engine">Search Engine</SelectItem>
                        <SelectItem value="referral">Friend/Family Referral</SelectItem>
                        <SelectItem value="magazine">Magazine/Publication</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-[#d4af37] data-[state=checked]:border-[#d4af37]"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-[#8a8a8a]">
                        I agree to the terms and conditions and privacy policy
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#212121] font-medium py-3 px-8 rounded-sm uppercase tracking-wider text-sm transition-all"
                >
                  {isSubmitting ? "Submitting..." : "Submit Order Request"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
