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
import { insertFreelancerSchema } from "@shared/schema";

const extendedFreelancerSchema = insertFreelancerSchema.extend({
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  portfolioUrl: z.string().url("Please provide a valid URL").optional().or(z.literal("")),
});

type FreelancerFormValues = z.infer<typeof extendedFreelancerSchema>;

const FreelancerSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FreelancerFormValues>({
    resolver: zodResolver(extendedFreelancerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialization: "",
      experience: "",
      location: "",
      portfolioUrl: "",
      bio: "",
      availability: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: FreelancerFormValues) => {
    setIsSubmitting(true);
    try {
      // Remove the agreeToTerms field before sending to server
      const { agreeToTerms, ...freelancerData } = data;
      await apiRequest("POST", "/api/freelancers", freelancerData);
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We will review your application and contact you soon.",
      });
      
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/freelancers'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your application. Please try again.",
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
            Freelance Tailor Application
          </h2>
          <p className="text-center text-[#8a8a8a] max-w-xl mx-auto mb-8 font-['Montserrat']">
            Join our network of talented freelance tailors and grow your business while working with premium clients.
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
                      <FormLabel className="text-[#8a8a8a] font-medium">Phone Number *</FormLabel>
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
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#8a8a8a] font-medium">Specialization *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent">
                          <SelectValue placeholder="Select your specialization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="eveningwear">Evening Wear</SelectItem>
                        <SelectItem value="bridalwear">Bridal Wear</SelectItem>
                        <SelectItem value="casualwear">Casual Wear</SelectItem>
                        <SelectItem value="alterations">Alterations</SelectItem>
                        <SelectItem value="embroidery">Embroidery & Embellishment</SelectItem>
                        <SelectItem value="patternmaking">Pattern Making</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#8a8a8a] font-medium">Years of Experience *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#8a8a8a] font-medium">Location *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="City, State/Province, Country" 
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
                name="portfolioUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#8a8a8a] font-medium">Portfolio URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://your-portfolio-website.com" 
                        {...field}
                        className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#8a8a8a]">
                      If you have an online portfolio or social media showcasing your work
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#8a8a8a] font-medium">Professional Bio *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of your background, skills, and professional experience"
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
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#8a8a8a] font-medium">Availability *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="px-4 py-2 border border-[#8a8a8a]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="weekends">Weekends only</SelectItem>
                        <SelectItem value="flexible">Flexible hours</SelectItem>
                        <SelectItem value="project-based">Project-based only</SelectItem>
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
                        I agree to the freelancer terms and conditions and privacy policy
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
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default FreelancerSignup;
