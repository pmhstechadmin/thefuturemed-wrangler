
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, Phone, GraduationCap, Briefcase, MapPin, Lock } from "lucide-react";

interface JobSeekerFormData {
  email: string;
  phone: string;
  highestQualification: string;
  specialization: string;
  yearsOfExperience: number;
  previousExperience: string;
  skills: string;
  currentLocation: string;
  preferredLocation: string;
  availability: string;
}

export const JobSeekerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<JobSeekerFormData>();

  const qualifications = [
    "High School",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "MD/MBBS",
    "PhD",
    "RN (Registered Nurse)",
    "LPN (Licensed Practical Nurse)",
    "PA (Physician Assistant)",
    "NP (Nurse Practitioner)",
    "PharmD",
    "DPT (Doctor of Physical Therapy)",
    "Other"
  ];

  const availabilityOptions = [
    { value: "immediate", label: "Immediately" },
    { value: "2weeks", label: "2 Weeks Notice" },
    { value: "1month", label: "1 Month" },
    { value: "3months", label: "3 Months" },
    { value: "6months", label: "6 Months" },
    { value: "other", label: "Other" }
  ];

  const onSubmit = async (data: JobSeekerFormData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to create your job seeker profile.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('job_seekers' as any)
        .insert([
          {
            user_id: user.id,
            email: data.email,
            phone: data.phone,
            highest_qualification: data.highestQualification,
            specialization: data.specialization,
            years_of_experience: data.yearsOfExperience,
            previous_experience: data.previousExperience,
            skills: data.skills,
            current_location: data.currentLocation,
            preferred_location: data.preferredLocation,
            availability: data.availability,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your job seeker profile has been created successfully.",
      });

      form.reset();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Information
            </CardTitle>
            <CardDescription>
              Your contact details for potential employers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              rules={{ 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                    <Lock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">(Only visible to subscribed employers)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Qualifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Qualifications & Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="highestQualification"
              rules={{ required: "Highest qualification is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highest Qualification</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your highest qualification" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {qualifications.map((qualification) => (
                        <SelectItem key={qualification} value={qualification}>
                          {qualification}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cardiology, Emergency Medicine, Pediatrics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Professional Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="yearsOfExperience"
              rules={{ 
                required: "Years of experience is required",
                min: { value: 0, message: "Experience cannot be negative" }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="previousExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Work Experience</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your previous work experience, positions held, responsibilities..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills & Competencies</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List your relevant skills, certifications, and competencies..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Location & Availability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location & Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="currentLocation"
              rules={{ required: "Current location is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State/Province, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Work Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Where would you like to work?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availability"
              rules={{ required: "Availability is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability to Start</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="When can you start?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availabilityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating Profile..." : "Create Job Seeker Profile"}
        </Button>
      </form>
    </Form>
  );
};
