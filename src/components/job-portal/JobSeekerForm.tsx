










// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/integrations/supabase/client";
// import { User, Mail, Phone, GraduationCap, Briefcase, MapPin, Lock } from "lucide-react";

// interface JobSeekerFormData {
//   email: string;
//   phone: string;
//   highestQualification: string;
//   specialization: string;
//   yearsOfExperience: number;
//   previousExperience: string;
//   skills: string;
//   currentLocation: string;
//   preferredLocation: string;
//   availability: string;
// }

// export const JobSeekerForm = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();
//   const form = useForm<JobSeekerFormData>({
//     defaultValues: {
//       email: "",
//       phone: "",
//       highestQualification: "",
//       specialization: "",
//       yearsOfExperience: 0,
//       previousExperience: "",
//       skills: "",
//       currentLocation: "",
//       preferredLocation: "",
//       availability: "",
//     },
//   });


//   const qualifications = [
//     "High School",
//     "Associate Degree",
//     "Bachelor's Degree",
//     "Master's Degree",
//     "MD",
//     "MBBS",
//     "PhD",
//     "RN (Registered Nurse)",
//     "LPN (Licensed Practical Nurse)",
//     "PA (Physician Assistant)",
//     "NP (Nurse Practitioner)",
//     "PharmD",
//     "DPT (Doctor of Physical Therapy)",
//     "Other"
//   ];

//   const availabilityOptions = [
//     { value: "immediate", label: "Immediately" },
//     { value: "2weeks", label: "2 Weeks Notice" },
//     { value: "1month", label: "1 Month" },
//     { value: "3months", label: "3 Months" },
//     { value: "6months", label: "6 Months" },
//     { value: "other", label: "Other" }
//   ];




//   const onSubmit = async (data: JobSeekerFormData) => {
//   setIsSubmitting(true);
//   try {
//     const { data: { user } } = await supabase.auth.getUser();

//     if (!user) {
//       toast({
//         title: "Authentication Required",
//         description: "Please sign in to create your job seeker profile.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // 🟡 Step 1: Check if profile already exists
//     const { data: existingProfiles, error: fetchError } = await supabase
//       .from("job_seekers")
//       .select("id")
//       .eq("user_id", user.id)
//       .limit(1);

//     if (fetchError) throw fetchError;

//     if (existingProfiles.length > 0) {
//       toast({
//         title: "Profile Already Exists",
//         description: "You have already created a job seeker profile.",
//         variant: "default",
//       });
//       return;
//     }

//     const skillsArray = data.skills
//       ? data.skills.split(',').map(skill => skill.trim()).filter(Boolean)
//       : [];

//     // 🟢 Step 2: Insert new profile
//     const { error } = await supabase.from("job_seekers").insert([
//       {
//         user_id: user.id,
//         email: data.email,
//         phone: data.phone,
//         highest_qualification: data.highestQualification,
//         specialization: data.specialization,
//         years_of_experience: data.yearsOfExperience,
//         previous_experience: data.previousExperience,
//         skills: skillsArray,
//         current_location: data.currentLocation,
//         preferred_location: data.preferredLocation,
//         availability: data.availability,
//       },
//     ]);

//     if (error) throw error;

//     toast({
//       title: "Success!",
//       description: "Your job seeker profile has been created successfully.",
//     });

//     form.reset();
//   } catch (error: any) {
//     console.error("Error:", error.message || error);
//     toast({
//       title: "Error",
//       description: error.message || "Failed to create profile. Please try again.",
//       variant: "destructive",
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };



//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         {/* Contact Information */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="h-4 w-4" />
//               Contact Information
//             </CardTitle>
//             <CardDescription>
//               Your contact details for potential employers
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <FormField
//               control={form.control}
//               name="email"
//               rules={{
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Invalid email address"
//                 }
//               }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex items-center gap-2">
//                     <Mail className="h-4 w-4" />
//                     Email Address
//                   </FormLabel>
//                   <FormControl>
//                     <Input type="email" placeholder="your.email@example.com" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phone"
//               rules={{ required: "Phone number is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex items-center gap-2">
//                     <Phone className="h-4 w-4" />
//                     Phone Number
//                     <Lock className="h-3 w-3 text-gray-400" />
//                     <span className="text-xs text-gray-500">(Only visible to subscribed employers)</span>
//                   </FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter your phone number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         {/* Qualifications */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <GraduationCap className="h-4 w-4" />
//               Qualifications & Education
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <FormField
//               control={form.control}
//               name="highestQualification"
//               rules={{ required: "Highest qualification is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Highest Qualification</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select your highest qualification" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {qualifications.map((qualification) => (
//                         <SelectItem key={qualification} value={qualification}>
//                           {qualification}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="specialization"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Specialization</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Cardiology, Emergency Medicine, Pediatrics" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         {/* Experience */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Briefcase className="h-4 w-4" />
//               Professional Experience
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <FormField
//               control={form.control}
//               name="yearsOfExperience"
//               rules={{
//                 required: "Years of experience is required",
//                 min: { value: 0, message: "Experience cannot be negative" }
//               }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Years of Experience</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder="0"
//                       {...field}
//                       onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="previousExperience"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Previous Work Experience</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Describe your previous work experience, positions held, responsibilities..."
//                       className="min-h-[120px]"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//               />

//             <FormField
//               control={form.control}
//               name="skills"
//               rules={{ required: "Skills are required" }} // ✅ added rule
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Skills & Competencies</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="e.g., surgery, diagnostics, emergency care"
//                       className="min-h-[80px]"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         {/* Location & Availability */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <MapPin className="h-4 w-4" />
//               Location & Availability
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <FormField
//               control={form.control}
//               name="currentLocation"
//               rules={{ required: "Current location is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Current Location</FormLabel>
//                   <FormControl>
//                     <Input placeholder="City, State/Province, Country" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="preferredLocation"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Preferred Work Location</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Where would you like to work?" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="availability"
//               rules={{ required: "Availability is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Availability to Start</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="When can you start?" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {availabilityOptions.map((option) => (
//                         <SelectItem key={option.value} value={option.value}>
//                           {option.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         <Button type="submit" className="w-full" disabled={isSubmitting}>
//           {isSubmitting ? "Creating Profile..." : "Create Job Seeker Profile"}
//         </Button>
//       </form>
//     </Form>
//   );
// };















import { useEffect, useState } from "react";
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
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from "@/image/thefuturemed_logo (1).jpg";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import {
  ArrowLeft,
  Shield,
  UserPlus,
  Home,
  Menu,
  X,
  LogOut,
  FileEdit,
  Trash2,
  Eye,
  EyeOff,
  UserIcon,
} from "lucide-react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";



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
   phoneno_ccode: string;
}

export const JobSeekerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const seekerToEdit = location.state?.seeker || null;
  const form = useForm<JobSeekerFormData>({
    defaultValues: {
      email: seekerToEdit?.email || "",
      phone: seekerToEdit?.phone || "",
      highestQualification: seekerToEdit?.highest_qualification || "",
      specialization: seekerToEdit?.specialization || "",
      yearsOfExperience: seekerToEdit?.years_of_experience || 0,
      previousExperience: seekerToEdit?.previous_experience || "",
      skills: (seekerToEdit?.skills || []).join(", "),
      currentLocation: seekerToEdit?.current_location || "",
      preferredLocation: seekerToEdit?.preferred_location || "",
      availability: seekerToEdit?.availability || "",
      phoneno_ccode: seekerToEdit?.phoneno_ccode || "", 
    },
  });


  useEffect(() => {
    if (seekerToEdit) {
      form.reset({
        email: seekerToEdit.email || "",
        phone: seekerToEdit.phone || "",
        highestQualification: seekerToEdit.highest_qualification || "",
        specialization: seekerToEdit.specialization || "",
        yearsOfExperience: seekerToEdit.years_of_experience || 0,
        previousExperience: seekerToEdit.previous_experience || "",
        skills: (seekerToEdit.skills || []).join(", "),
        currentLocation: seekerToEdit.current_location || "",
        preferredLocation: seekerToEdit.preferred_location || "",
        availability: seekerToEdit.availability || "",
       phoneno_ccode: seekerToEdit.phoneno_ccode || "",
      });
    }
  }, [seekerToEdit, form]);

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setMobileMenuOpen(false);
      toast({ title: "Signed Out", description: "You have been signed out." });
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) console.error("Session error:", error);
      setUser(session?.user || null);
    };
    checkUser();
  }, []);


  const qualifications = [
    "High School",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "MD",
    "MBBS",
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
          description: "Please sign in to continue.",
          variant: "destructive",
        });
        return;
      }

      const skillsArray = data.skills
        ? data.skills.split(',').map(skill => skill.trim()).filter(Boolean)
        : [];

      if (seekerToEdit) {
        // 🟢 Edit Mode: Update existing profile
        const { error } = await supabase
          .from("job_seekers")
          .update({
            email: data.email,
            phone: data.phone,
            highest_qualification: data.highestQualification,
            specialization: data.specialization,
            years_of_experience: data.yearsOfExperience,
            previous_experience: data.previousExperience,
            skills: skillsArray,
            current_location: data.currentLocation,
            preferred_location: data.preferredLocation,
            availability: data.availability,
            phoneno_ccode: data.phoneno_ccode,
          })
          .eq("id", seekerToEdit.id);

        if (error) throw error;

        toast({
          title: "Profile Updated",
          description: "Your profile was updated successfully.",
        });
      } else {
        // 🟡 Create Mode
        const { data: existingProfiles, error: fetchError } = await supabase
          .from("job_seekers")
          .select("id")
          .eq("user_id", user.id)
          .limit(1);

        if (fetchError) throw fetchError;

        if (existingProfiles.length > 0) {
          toast({
            title: "Profile Already Exists",
            description: "You already have a job seeker profile.",
            variant: "default",
          });
          return;
        }

        const { error } = await supabase.from("job_seekers").insert([{
          user_id: user.id,
          email: data.email,
          phone: data.phone,
          highest_qualification: data.highestQualification,
          specialization: data.specialization,
          years_of_experience: data.yearsOfExperience,
          previous_experience: data.previousExperience,
          skills: skillsArray,
          current_location: data.currentLocation,
          preferred_location: data.preferredLocation,
          availability: data.availability,
           phoneno_ccode: data.phoneno_ccode,
        }]);

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Profile created successfully.",
        });
      }

      navigate("/my-job-profile");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };




  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {seekerToEdit && (
         <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo and Back Button */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                variant="outline"
                onClick={handleBackNavigation}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                title="Go back"
              >
                <ArrowLeft className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Back</span>
              </Button>
              {/* <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  MedPortal
                </h1>
              </Link> */}
              <div className="flex items-center space-x-2">
                {/* <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
            </div>

            {/* Right Section - Navigation Items */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {user ? (
                <>
                  {/* Desktop View - Full User Info */}
                  <div className="hidden lg:flex items-center space-x-4">
                    <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                      Welcome, {user.email}
                    </span>
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                      onClick={() => navigate("/profile")}
                      title="Profile"
                    >
                      <UserIcon className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Profile</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                      onClick={handleSignOut}
                      title="Sign Out"
                    >
                      <span className="hidden md:inline">Sign Out</span>
                    </Button>
                  </div>

                  {/* Mobile/Tablet View - User Menu Dropdown */}
                  <div className="lg:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                        >
                          <UserIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
                        <DropdownMenuLabel className="text-white">
                          {user.email}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/20" />
                        <DropdownMenuItem
                          className="text-white hover:bg-white/10"
                          onClick={() => navigate("/profile")}
                        >
                          <UserIcon className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-white hover:bg-white/10"
                          onClick={handleSignOut}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button
                      variant="outline"
                      className="hidden md:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      Register
                    </Button>
                  </Link>

                  <Link to="/">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 md:px-4 md:py-2"
                      title="Sign In"
                    >
                      <UserIcon className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Sign In</span>
                    </Button>
                  </Link>
                </>
              )}

              {/* Home Button - Icon only on mobile/tablet */}
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 md:px-4 md:py-2"
                title="Go to home page"
              >
                <Home className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Home</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      )}
     

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
        <span className="text-xs text-gray-500">
          (Only visible to subscribed employers)
        </span>
      </FormLabel>
      <FormControl>
        <div className="w-full ">
          <PhoneInput
            country={"in"}
            containerClass="!w-full !max-w-full "
            inputClass="!w-full !pl-12 !pr-3 !py-2  !border !rounded-md !text-sm"
            buttonClass="!left-3"
            specialLabel=""
            value={field.value}
            onChange={(phone) => field.onChange(phone)}
            inputProps={{
              name: field.name,
              required: true,
             
          
            }}
             style={{ marginLeft: "8px" }}
          />
        </div>
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
                rules={{ required: "Skills are required" }} // ✅ added rule
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills & Competencies</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., surgery, diagnostics, emergency care"
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
            {isSubmitting
              ? seekerToEdit
                ? "Saving Changes..."
                : "Creating Profile..."
              : seekerToEdit
                ? "Save Changes"
                : "Create Job Seeker Profile"}
          </Button>

        </form>
      </Form>
    </div>
  );
};

