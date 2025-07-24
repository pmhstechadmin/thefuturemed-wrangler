// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Calendar } from '@/components/ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { CalendarIcon, Plus, Trash2, ArrowLeft } from 'lucide-react';
// import { format } from 'date-fns';
// import { cn } from '@/lib/utils';
// import { supabase } from '@/integrations/supabase/client';
// import { useToast } from '@/hooks/use-toast';
// import { useNavigate } from 'react-router-dom';

// interface Speaker {
//   name: string;
//   qualification: string;
//   department: string;
// }

// const HostSeminar = () => {
//   const [hostName, setHostName] = useState('');
//   const [topic, setTopic] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState<Date>();
//   const [time, setTime] = useState('');
//   const [speakers, setSpeakers] = useState<Speaker[]>([
//     { name: '', qualification: '', department: '' }
//   ]);
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const addSpeaker = () => {
//     setSpeakers([...speakers, { name: '', qualification: '', department: '' }]);
//   };

//   const removeSpeaker = (index: number) => {
//     if (speakers.length > 1) {
//       setSpeakers(speakers.filter((_, i) => i !== index));
//     }
//   };

//   const updateSpeaker = (index: number, field: keyof Speaker, value: string) => {
//     const updatedSpeakers = [...speakers];
//     updatedSpeakers[index][field] = value;
//     setSpeakers(updatedSpeakers);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!date || !time || !hostName || !topic) {
//       toast({
//         title: "Error",
//         description: "Please fill in all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Validate speakers
//     const validSpeakers = speakers.filter(speaker =>
//       speaker.name && speaker.qualification && speaker.department
//     );

//     if (validSpeakers.length === 0) {
//       toast({
//         title: "Error",
//         description: "Please add at least one speaker with complete details.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const { data: { session } } = await supabase.auth.getSession();

//       if (!session?.user) {
//         toast({
//           title: "Error",
//           description: "You must be logged in to host a seminar.",
//           variant: "destructive",
//         });
//         return;
//       }

//       // Insert seminar
//       const { data: seminarData, error: seminarError } = await supabase
//         .from('seminars')
//         .insert({
//           host_id: session.user.id,
//           host_name: hostName,
//           topic,
//           description,
//           date: format(date, 'yyyy-MM-dd'),
//           time
//         })
//         .select()
//         .single();

//       if (seminarError) throw seminarError;

//       // Insert speakers
//       const speakersToInsert = validSpeakers.map(speaker => ({
//         seminar_id: seminarData.id,
//         name: speaker.name,
//         qualification: speaker.qualification,
//         department: speaker.department
//       }));

//       const { error: speakersError } = await supabase
//         .from('speakers')
//         .insert(speakersToInsert);

//       if (speakersError) throw speakersError;

//       toast({
//         title: "Success",
//         description: "Seminar created successfully!",
//       });

//       // Reset form
//       setHostName('');
//       setTopic('');
//       setDescription('');
//       setDate(undefined);
//       setTime('');
//       setSpeakers([{ name: '', qualification: '', department: '' }]);

//       // Navigate back to e-seminar page
//       navigate('/e-seminar');

//     } catch (error) {
//       console.error('Error creating seminar:', error);
//       toast({
//         title: "Error",
//         description: "Failed to create seminar. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <Button
//             variant="outline"
//             onClick={() => navigate('/e-seminar')}
//             className="flex items-center gap-2"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to E-Seminar
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Host a Seminar</h1>
//             <p className="text-gray-600">Create and schedule your medical seminar</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Basic Information */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Seminar Details</CardTitle>
//               <CardDescription>
//                 Provide basic information about your seminar
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="hostName">Host Name *</Label>
//                   <Input
//                     id="hostName"
//                     value={hostName}
//                     onChange={(e) => setHostName(e.target.value)}
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="topic">Seminar Topic *</Label>
//                   <Input
//                     id="topic"
//                     value={topic}
//                     onChange={(e) => setTopic(e.target.value)}
//                     placeholder="Enter seminar topic"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Provide a brief description of the seminar"
//                   rows={3}
//                 />
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Date *</Label>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className={cn(
//                           "w-full justify-start text-left font-normal",
//                           !date && "text-muted-foreground"
//                         )}
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {date ? format(date, "PPP") : "Pick a date"}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0">
//                       <Calendar
//                         mode="single"
//                         selected={date}
//                         onSelect={setDate}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </div>
//                 <div>
//                   <Label htmlFor="time">Time *</Label>
//                   <Input
//                     id="time"
//                     type="time"
//                     value={time}
//                     onChange={(e) => setTime(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Speakers Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 Speaker Details
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={addSpeaker}
//                   className="flex items-center gap-2"
//                 >
//                   <Plus className="h-4 w-4" />
//                   Add Speaker
//                 </Button>
//               </CardTitle>
//               <CardDescription>
//                 Add information about the speakers for this seminar
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {speakers.map((speaker, index) => (
//                 <div key={index} className="border rounded-lg p-4 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h4 className="font-medium">Speaker {index + 1}</h4>
//                     {speakers.length > 1 && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => removeSpeaker(index)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>

//                   <div className="grid md:grid-cols-3 gap-4">
//                     <div>
//                       <Label htmlFor={`speaker-name-${index}`}>Name</Label>
//                       <Input
//                         id={`speaker-name-${index}`}
//                         value={speaker.name}
//                         onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
//                         placeholder="Speaker name"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor={`speaker-qualification-${index}`}>Qualification</Label>
//                       <Input
//                         id={`speaker-qualification-${index}`}
//                         value={speaker.qualification}
//                         onChange={(e) => updateSpeaker(index, 'qualification', e.target.value)}
//                         placeholder="e.g., MD, PhD"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor={`speaker-department-${index}`}>Department</Label>
//                       <Input
//                         id={`speaker-department-${index}`}
//                         value={speaker.department}
//                         onChange={(e) => updateSpeaker(index, 'department', e.target.value)}
//                         placeholder="e.g., Cardiology"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <Button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 px-8"
//               disabled={loading}
//             >
//               {loading ? "Creating Seminar..." : "Create Seminar"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default HostSeminar;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Plus,
  Trash2,
  ArrowLeft,
  Shield,
  Layout,
  Grid3X3,
  Home,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import type { User as AuthUser } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/image/thefuturemed_logo (1).jpg";

import Footer from "@/footer/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Speaker {
  name: string;
  qualification: string;
  department: string;
}

const HostSeminar = () => {
  const [hostName, setHostName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [speakers, setSpeakers] = useState<Speaker[]>([
    { name: "", qualification: "", department: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [timezones, setTimezones] = useState<string[]>([]);
  const supabaseAnonKey = import.meta.env.VITE_VIDEOSDK_TOKEN;
  useEffect(() => {
    checkUser();
  }, []);
  useEffect(() => {
    if (country) {
      fetchTimezonesForCountry(country);
    }
  }, [country]);

  const fetchTimezonesForCountry = async (countryName: string) => {
    try {
      // In a real app, you would fetch timezones from an API
      // This is a simplified implementation with common timezones
      const commonTimezones: Record<string, string[]> = {
        India: ["Asia/Kolkata"],
        "United States": [
          "America/New_York",
          "America/Chicago",
          "America/Denver",
          "America/Los_Angeles",
          "America/Phoenix",
          "America/Anchorage",
          "Pacific/Honolulu",
        ],
        "United Kingdom": ["Europe/London"],
        Canada: [
          "America/Toronto",
          "America/Vancouver",
          "America/Edmonton",
          "America/Winnipeg",
          "America/Halifax",
          "America/St_Johns",
        ],
        Australia: [
          "Australia/Sydney",
          "Australia/Melbourne",
          "Australia/Brisbane",
          "Australia/Adelaide",
          "Australia/Perth",
          "Australia/Darwin",
        ],
        Germany: ["Europe/Berlin"],
        France: ["Europe/Paris"],
        Japan: ["Asia/Tokyo"],
        China: ["Asia/Shanghai"],
        Brazil: [
          "America/Sao_Paulo",
          "America/Manaus",
          "America/Recife",
          "America/Belem",
          "America/Fortaleza",
        ],
      };

      // Default to common timezones if country exists
      if (commonTimezones[country]) {
        setTimezones(commonTimezones[country]);
      } else {
        // For other countries, use a generic list
        setTimezones([
          "Europe/London",
          "Europe/Paris",
          "Asia/Tokyo",
          "Australia/Sydney",
          "America/New_York",
          "America/Los_Angeles",
          "Asia/Kolkata",
          "Asia/Singapore",
        ]);
      }
    } catch (error) {
      console.error("Error fetching timezones:", error);
      setTimezones(["UTC"]);
    }
  };

  const formatTimezoneLabel = (tz: string) => {
    const offset =
      new Date()
        .toLocaleString("en-US", { timeZone: tz, timeZoneName: "short" })
        .split(" ")
        .pop() || "";
    return `${tz.replace(/_/g, " ")} (${offset})`;
  };

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const addSpeaker = () => {
    setSpeakers([...speakers, { name: "", qualification: "", department: "" }]);
  };

  const removeSpeaker = (index: number) => {
    if (speakers.length > 1) {
      setSpeakers(speakers.filter((_, i) => i !== index));
    }
  };

  const updateSpeaker = (
    index: number,
    field: keyof Speaker,
    value: string
  ) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index][field] = value;
    setSpeakers(updatedSpeakers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !hostName || !topic) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate speakers
    const validSpeakers = speakers.filter(
      (speaker) => speaker.name && speaker.qualification && speaker.department
    );

    if (validSpeakers.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one speaker with complete details.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        toast({
          title: "Error",
          description: "You must be logged in to host a seminar.",
          variant: "destructive",
        });
        return;
      }
      const formattedDate = format(date, "yyyy-MM-dd");
      console.log("Submitting seminar for date:", formattedDate);

      // Insert seminar
      const { data: seminarData, error: seminarError } = await supabase
        .from("seminars")
        .insert({
          host_id: session.user.id,
          host_name: hostName,
          topic,
          description,
          date: formattedDate,
          time,
          host_country: country,
        })
        .select()
        .single();

      if (seminarError) throw seminarError;

      // Insert speakers
      const speakersToInsert = validSpeakers.map((speaker) => ({
        seminar_id: seminarData.id,
        name: speaker.name,
        qualification: speaker.qualification,
        department: speaker.department,
      }));

      const { error: speakersError } = await supabase
        .from("speakers")
        .insert(speakersToInsert);

      if (speakersError) throw speakersError;
      // Send email notification
      // try {
      //   const { data: emailData, error: emailError } =
      //     await supabase.functions.invoke("send-email", {
      //       body: {
      //         // to_email: session.user.email,
      //         to_email: "prasanthjg4@gmail.com", // Your fixed email address
      //         cc_email: session.user.email,
      //         host_name: hostName,
      //         seminar_topic: topic,
      //         seminar_date: formattedDate,
      //         seminar_time: time,
      //         speakers: validSpeakers,
      //         seminar_description: description,
      //       },
      //     });

      //   if (emailError) throw emailError;

      //   console.log("Email sent successfully:", emailData);
      // } catch (emailError) {
      //   console.error("Error sending email:", emailError);
      //   // Don't fail the whole operation if email fails
      //   toast({
      //     title: "Warning",
      //     description: "Seminar created but email notification failed to send.",
      //     variant: "default",
      //   });
      // }

      //       try {
      //   const { data: emailData, error: emailError } = await supabase.functions.invoke("send-email", {
      //     body: {
      //       email: session.user.email, // or your fixed email address
      //       subject: `Seminar Invitation: ${topic}`,
      //       message: `
      //         You're invited to attend the following seminar:

      //         Topic: ${topic}
      //         Date: ${formattedDate}
      //         Time: ${time}
      //         Host: ${hostName}
      //         Speakers: ${validSpeakers.join(', ')}

      //         Description:
      //         ${description}
      //       `
      //     }
      //   });

      //   if (emailError) throw emailError;

      //   console.log("Email sent successfully:", emailData);
      // } catch (emailError) {
      //   console.error("Error sending email:", emailError);
      //   // Don't fail the whole operation if email fails
      //   toast({
      //     title: "Warning",
      //     description: "Seminar created but email notification failed to send.",
      //     variant: "default",
      //   });
      // }
      // try {
      //   console.log("Sending Email Notification...");
      //   const response = await fetch(
      //     "https://rxyfrjfgydldjdqelixe.supabase.co/functions/v1/send-email",
      //     {
      //       method: "POST",
      //       headers: {
      //         Authorization: `Bearer ${supabaseAnonKey}`, // Replace with your actual anon key
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         email: session.user.email,
      //         subject: `Seminar Invitation: ${topic}`,
      //         message: `You're invited to attend: ${topic} on ${formattedDate} at ${time}`,
      //       }),
      //     }
      //   );

      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }

      //   // const data = await response.json();
      //   // console.log("Email sent successfully:", data);
      //   // First try to read as text
      //   const responseText = await response.text();
      //   console.log("Email sent successfully:", responseText);
      // const responseData = await response.json();

      //   // Then optionally try to parse as JSON if needed
      //   try {
      //     const data = JSON.parse(responseText);
      //     console.log("Parsed response:", data);
      //   } catch (e) {
      //     console.log("Response was not valid JSON");
      //   }
      // } catch (error) {
      //   console.error("Error sending email:", error);
      //   toast({
      //     title: "Warning",
      //     description: "Seminar created but email notification failed to send.",
      //     variant: "default",
      //   });
      // }
      try {
        console.log("Sending Email Notification...");
        const response = await fetch(
          "https://rxyfrjfgydldjdqelixe.supabase.co/functions/v1/send-email",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${supabaseAnonKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: "prasanthjg4@gmail.com",
              // email: session.user.email,
              subject: `Seminar Invitation: ${topic}`,
              message: `Dear Host,<br><br>
You are scheduled to host the following seminar:<br><br>
<strong>Topic:</strong> ${topic}<br>
<strong>Date:</strong> ${formattedDate}<br>
<strong>Time:</strong> ${time}<br>
<strong>Speakers:</strong> ${validSpeakers.join(", ")}<br><br>

<strong>Preparation Checklist:</strong><br>
- Please arrive 15 minutes early to set up<br>
- Test all audio/video equipment beforehand<br>
- Review the seminar description:<br>
${description}<br><br>

<strong>Meeting Agenda:</strong><br>
1. Introduction (5 mins)<br>
2. Speaker presentations (${
                validSpeakers.length > 1
                  ? `${validSpeakers.length * 20} mins total`
                  : "20 mins"
              })<br>
3. Q&A Session (15 mins)<br>
4. Closing remarks (5 mins)<br><br>

The attendees list and other details have been saved in host seminar.<br><br>

Looking forward to a successful seminar!
`,

              // message: `You're invited to attend the following seminar:

              //       Topic: ${topic}
              //       Date: ${formattedDate}
              //       Time: ${time}
              //       Host: ${hostName}
              //       Speakers: ${validSpeakers.join(', ')}

              //       Description:
              //       ${description}`,
              // message: `You're invited to attend: ${topic} on ${formattedDate} at ${time}`,
            }),
          }
        );

        // First try to read as text
        const responseText = await response.text();

        if (!response.ok) {
          throw new Error(responseText || "Failed to send email");
        }

        // Then try to parse as JSON if possible
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = { message: responseText };
        }

        console.log("Email sent successfully:", responseData);
        toast({
          title: "Success",
          description:
            responseData.message || "Email notification sent successfully!",
          variant: "default",
        });
      } catch (error) {
        console.error("Error sending email:", error);
        toast({
          title: "Warning",
          description:
            error.message ||
            "Seminar created but email notification failed to send.",
          variant: "destructive",
        });
      }
      toast({
        title: "Success",
        description: "Seminar created successfully!",
      });

      // Reset form
      setHostName("");
      setTopic("");
      setDescription("");
      setDate(undefined);
      setTime("");
      setSpeakers([{ name: "", qualification: "", department: "" }]);

      // Navigate back to e-seminar page
      navigate("/e-seminar");
    } catch (error) {
      console.error("Error creating seminar:", error);
      toast({
        title: "Error",
        description: "Failed to create seminar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header - Same as ProductPortal */}
      {/* <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate("/e-seminar")}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                title="Go back"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">MedPortal</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
               <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  <Layout className="h-4 w-4" />
                </Button>
              </div> 
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                    Welcome, {user.email}
                  </span>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    onClick={() => navigate("/profile")}
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/register">
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      Register
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                title="Go to home page"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </header> */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo and Back Button */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate("/e-seminar")}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
                title="Go back"
              >
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              {/* <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  MedPortal
                </h1>
              </Link> */}
              <div className="flex items-center space-x-2">
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
            </div>

            {/* Right Section - Navigation Items */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {user ? (
                <>
                  {/* Desktop View - Full User Info */}
                  <div className="hidden md:flex items-center space-x-4">
                    <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                      Welcome, {user.email}
                    </span>
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
                      onClick={() => navigate("/profile")}
                      title="Profile"
                    >
                      <UserIcon className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Profile</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
                      onClick={handleSignOut}
                      title="Sign Out"
                    >
                      <span className="hidden sm:inline">Sign Out</span>
                    </Button>
                  </div>

                  {/* Mobile View - User Menu Dropdown */}
                  <div className="md:hidden">
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
                      className="hidden sm:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      Register
                    </Button>
                  </Link>

                  <Link to="/">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 sm:px-4 sm:py-2"
                      title="Sign In"
                    >
                      <UserIcon className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Sign In</span>
                    </Button>
                  </Link>
                </>
              )}

              {/* Home Button - Icon only on mobile */}
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
                title="Go to home page"
              >
                <Home className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Host a Seminar</h1>
          <p className="text-gray-600">
            Create and schedule your medical seminar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Seminar Details</CardTitle>
              <CardDescription>
                Provide basic information about your seminar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hostName">Host Name *</Label>
                  <Input
                    id="hostName"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="topic">Seminar Topic *</Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter seminar topic"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a brief description of the seminar"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="time">Time (IST Indian) *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Select
                    value={country}
                    onValueChange={(value) => {
                      setCountry(value);
                      setTimezone(""); // Reset timezone when country changes
                    }}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                      <SelectItem value="Albania">Albania</SelectItem>
                      <SelectItem value="Algeria">Algeria</SelectItem>
                      <SelectItem value="Andorra">Andorra</SelectItem>
                      <SelectItem value="Angola">Angola</SelectItem>
                      <SelectItem value="Antigua and Barbuda">
                        Antigua and Barbuda
                      </SelectItem>
                      <SelectItem value="Argentina">Argentina</SelectItem>
                      <SelectItem value="Armenia">Armenia</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Austria">Austria</SelectItem>
                      <SelectItem value="Azerbaijan">Azerbaijan</SelectItem>
                      <SelectItem value="Bahamas">Bahamas</SelectItem>
                      <SelectItem value="Bahrain">Bahrain</SelectItem>
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="Barbados">Barbados</SelectItem>
                      <SelectItem value="Belarus">Belarus</SelectItem>
                      <SelectItem value="Belgium">Belgium</SelectItem>
                      <SelectItem value="Belize">Belize</SelectItem>
                      <SelectItem value="Benin">Benin</SelectItem>
                      <SelectItem value="Bhutan">Bhutan</SelectItem>
                      <SelectItem value="Bolivia">Bolivia</SelectItem>
                      <SelectItem value="Bosnia and Herzegovina">
                        Bosnia and Herzegovina
                      </SelectItem>
                      <SelectItem value="Botswana">Botswana</SelectItem>
                      <SelectItem value="Brazil">Brazil</SelectItem>
                      <SelectItem value="Brunei">Brunei</SelectItem>
                      <SelectItem value="Bulgaria">Bulgaria</SelectItem>
                      <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                      <SelectItem value="Burundi">Burundi</SelectItem>
                      <SelectItem value="Cabo Verde">Cabo Verde</SelectItem>
                      <SelectItem value="Cambodia">Cambodia</SelectItem>
                      <SelectItem value="Cameroon">Cameroon</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Central African Republic">
                        Central African Republic
                      </SelectItem>
                      <SelectItem value="Chad">Chad</SelectItem>
                      <SelectItem value="Chile">Chile</SelectItem>
                      <SelectItem value="China">China</SelectItem>
                      <SelectItem value="Colombia">Colombia</SelectItem>
                      <SelectItem value="Comoros">Comoros</SelectItem>
                      <SelectItem value="Congo">Congo</SelectItem>
                      <SelectItem value="Costa Rica">Costa Rica</SelectItem>
                      <SelectItem value="Cote d'Ivoire">
                        Cote d'Ivoire
                      </SelectItem>
                      <SelectItem value="Croatia">Croatia</SelectItem>
                      <SelectItem value="Cuba">Cuba</SelectItem>
                      <SelectItem value="Cyprus">Cyprus</SelectItem>
                      <SelectItem value="Czech Republic">
                        Czech Republic
                      </SelectItem>
                      <SelectItem value="Denmark">Denmark</SelectItem>
                      <SelectItem value="Djibouti">Djibouti</SelectItem>
                      <SelectItem value="Dominica">Dominica</SelectItem>
                      <SelectItem value="Dominican Republic">
                        Dominican Republic
                      </SelectItem>
                      <SelectItem value="Ecuador">Ecuador</SelectItem>
                      <SelectItem value="Egypt">Egypt</SelectItem>
                      <SelectItem value="El Salvador">El Salvador</SelectItem>
                      <SelectItem value="Equatorial Guinea">
                        Equatorial Guinea
                      </SelectItem>
                      <SelectItem value="Eritrea">Eritrea</SelectItem>
                      <SelectItem value="Estonia">Estonia</SelectItem>
                      <SelectItem value="Eswatini">Eswatini</SelectItem>
                      <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                      <SelectItem value="Fiji">Fiji</SelectItem>
                      <SelectItem value="Finland">Finland</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Gabon">Gabon</SelectItem>
                      <SelectItem value="Gambia">Gambia</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Ghana">Ghana</SelectItem>
                      <SelectItem value="Greece">Greece</SelectItem>
                      <SelectItem value="Grenada">Grenada</SelectItem>
                      <SelectItem value="Guatemala">Guatemala</SelectItem>
                      <SelectItem value="Guinea">Guinea</SelectItem>
                      <SelectItem value="Guinea-Bissau">
                        Guinea-Bissau
                      </SelectItem>
                      <SelectItem value="Guyana">Guyana</SelectItem>
                      <SelectItem value="Haiti">Haiti</SelectItem>
                      <SelectItem value="Honduras">Honduras</SelectItem>
                      <SelectItem value="Hungary">Hungary</SelectItem>
                      <SelectItem value="Iceland">Iceland</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Indonesia">Indonesia</SelectItem>
                      <SelectItem value="Iran">Iran</SelectItem>
                      <SelectItem value="Iraq">Iraq</SelectItem>
                      <SelectItem value="Ireland">Ireland</SelectItem>
                      <SelectItem value="Israel">Israel</SelectItem>
                      <SelectItem value="Italy">Italy</SelectItem>
                      <SelectItem value="Jamaica">Jamaica</SelectItem>
                      <SelectItem value="Japan">Japan</SelectItem>
                      <SelectItem value="Jordan">Jordan</SelectItem>
                      <SelectItem value="Kazakhstan">Kazakhstan</SelectItem>
                      <SelectItem value="Kenya">Kenya</SelectItem>
                      <SelectItem value="Kiribati">Kiribati</SelectItem>
                      <SelectItem value="Korea, North">Korea, North</SelectItem>
                      <SelectItem value="Korea, South">Korea, South</SelectItem>
                      <SelectItem value="Kosovo">Kosovo</SelectItem>
                      <SelectItem value="Kuwait">Kuwait</SelectItem>
                      <SelectItem value="Kyrgyzstan">Kyrgyzstan</SelectItem>
                      <SelectItem value="Laos">Laos</SelectItem>
                      <SelectItem value="Latvia">Latvia</SelectItem>
                      <SelectItem value="Lebanon">Lebanon</SelectItem>
                      <SelectItem value="Lesotho">Lesotho</SelectItem>
                      <SelectItem value="Liberia">Liberia</SelectItem>
                      <SelectItem value="Libya">Libya</SelectItem>
                      <SelectItem value="Liechtenstein">
                        Liechtenstein
                      </SelectItem>
                      <SelectItem value="Lithuania">Lithuania</SelectItem>
                      <SelectItem value="Luxembourg">Luxembourg</SelectItem>
                      <SelectItem value="Madagascar">Madagascar</SelectItem>
                      <SelectItem value="Malawi">Malawi</SelectItem>
                      <SelectItem value="Malaysia">Malaysia</SelectItem>
                      <SelectItem value="Maldives">Maldives</SelectItem>
                      <SelectItem value="Mali">Mali</SelectItem>
                      <SelectItem value="Malta">Malta</SelectItem>
                      <SelectItem value="Marshall Islands">
                        Marshall Islands
                      </SelectItem>
                      <SelectItem value="Mauritania">Mauritania</SelectItem>
                      <SelectItem value="Mauritius">Mauritius</SelectItem>
                      <SelectItem value="Mexico">Mexico</SelectItem>
                      <SelectItem value="Micronesia">Micronesia</SelectItem>
                      <SelectItem value="Moldova">Moldova</SelectItem>
                      <SelectItem value="Monaco">Monaco</SelectItem>
                      <SelectItem value="Mongolia">Mongolia</SelectItem>
                      <SelectItem value="Montenegro">Montenegro</SelectItem>
                      <SelectItem value="Morocco">Morocco</SelectItem>
                      <SelectItem value="Mozambique">Mozambique</SelectItem>
                      <SelectItem value="Myanmar">Myanmar</SelectItem>
                      <SelectItem value="Namibia">Namibia</SelectItem>
                      <SelectItem value="Nauru">Nauru</SelectItem>
                      <SelectItem value="Nepal">Nepal</SelectItem>
                      <SelectItem value="Netherlands">Netherlands</SelectItem>
                      <SelectItem value="New Zealand">New Zealand</SelectItem>
                      <SelectItem value="Nicaragua">Nicaragua</SelectItem>
                      <SelectItem value="Niger">Niger</SelectItem>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                      <SelectItem value="North Macedonia">
                        North Macedonia
                      </SelectItem>
                      <SelectItem value="Norway">Norway</SelectItem>
                      <SelectItem value="Oman">Oman</SelectItem>
                      <SelectItem value="Pakistan">Pakistan</SelectItem>
                      <SelectItem value="Palau">Palau</SelectItem>
                      <SelectItem value="Panama">Panama</SelectItem>
                      <SelectItem value="Papua New Guinea">
                        Papua New Guinea
                      </SelectItem>
                      <SelectItem value="Paraguay">Paraguay</SelectItem>
                      <SelectItem value="Peru">Peru</SelectItem>
                      <SelectItem value="Philippines">Philippines</SelectItem>
                      <SelectItem value="Poland">Poland</SelectItem>
                      <SelectItem value="Portugal">Portugal</SelectItem>
                      <SelectItem value="Qatar">Qatar</SelectItem>
                      <SelectItem value="Romania">Romania</SelectItem>
                      <SelectItem value="Russia">Russia</SelectItem>
                      <SelectItem value="Rwanda">Rwanda</SelectItem>
                      <SelectItem value="Saint Kitts and Nevis">
                        Saint Kitts and Nevis
                      </SelectItem>
                      <SelectItem value="Saint Lucia">Saint Lucia</SelectItem>
                      <SelectItem value="Saint Vincent and the Grenadines">
                        Saint Vincent and the Grenadines
                      </SelectItem>
                      <SelectItem value="Samoa">Samoa</SelectItem>
                      <SelectItem value="San Marino">San Marino</SelectItem>
                      <SelectItem value="Sao Tome and Principe">
                        Sao Tome and Principe
                      </SelectItem>
                      <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                      <SelectItem value="Senegal">Senegal</SelectItem>
                      <SelectItem value="Serbia">Serbia</SelectItem>
                      <SelectItem value="Seychelles">Seychelles</SelectItem>
                      <SelectItem value="Sierra Leone">Sierra Leone</SelectItem>
                      <SelectItem value="Singapore">Singapore</SelectItem>
                      <SelectItem value="Slovakia">Slovakia</SelectItem>
                      <SelectItem value="Slovenia">Slovenia</SelectItem>
                      <SelectItem value="Solomon Islands">
                        Solomon Islands
                      </SelectItem>
                      <SelectItem value="Somalia">Somalia</SelectItem>
                      <SelectItem value="South Africa">South Africa</SelectItem>
                      <SelectItem value="South Sudan">South Sudan</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                      <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                      <SelectItem value="Sudan">Sudan</SelectItem>
                      <SelectItem value="Suriname">Suriname</SelectItem>
                      <SelectItem value="Sweden">Sweden</SelectItem>
                      <SelectItem value="Switzerland">Switzerland</SelectItem>
                      <SelectItem value="Syria">Syria</SelectItem>
                      <SelectItem value="Taiwan">Taiwan</SelectItem>
                      <SelectItem value="Tajikistan">Tajikistan</SelectItem>
                      <SelectItem value="Tanzania">Tanzania</SelectItem>
                      <SelectItem value="Thailand">Thailand</SelectItem>
                      <SelectItem value="Timor-Leste">Timor-Leste</SelectItem>
                      <SelectItem value="Togo">Togo</SelectItem>
                      <SelectItem value="Tonga">Tonga</SelectItem>
                      <SelectItem value="Trinidad and Tobago">
                        Trinidad and Tobago
                      </SelectItem>
                      <SelectItem value="Tunisia">Tunisia</SelectItem>
                      <SelectItem value="Turkey">Turkey</SelectItem>
                      <SelectItem value="Turkmenistan">Turkmenistan</SelectItem>
                      <SelectItem value="Tuvalu">Tuvalu</SelectItem>
                      <SelectItem value="Uganda">Uganda</SelectItem>
                      <SelectItem value="Ukraine">Ukraine</SelectItem>
                      <SelectItem value="United Arab Emirates">
                        United Arab Emirates
                      </SelectItem>
                      <SelectItem value="United Kingdom">
                        United Kingdom
                      </SelectItem>
                      <SelectItem value="United States">
                        United States
                      </SelectItem>
                      <SelectItem value="Uruguay">Uruguay</SelectItem>
                      <SelectItem value="Uzbekistan">Uzbekistan</SelectItem>
                      <SelectItem value="Vanuatu">Vanuatu</SelectItem>
                      <SelectItem value="Vatican City">Vatican City</SelectItem>
                      <SelectItem value="Venezuela">Venezuela</SelectItem>
                      <SelectItem value="Vietnam">Vietnam</SelectItem>
                      <SelectItem value="Yemen">Yemen</SelectItem>
                      <SelectItem value="Zambia">Zambia</SelectItem>
                      <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* <div>
                  <Label htmlFor="timezone">Timezone *</Label>
                  <Select
                    value={timezone}
                    onValueChange={setTimezone}
                    disabled={!country}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          country ? "Select timezone" : "Select country first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {formatTimezoneLabel(tz)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
            </CardContent>
          </Card>

          {/* Speakers Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Speaker Details
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSpeaker}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Speaker
                </Button>
              </CardTitle>
              <CardDescription>
                Add information about the speakers for this seminar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {speakers.map((speaker, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Speaker {index + 1}</h4>
                    {speakers.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSpeaker(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`speaker-name-${index}`}>Name</Label>
                      <Input
                        id={`speaker-name-${index}`}
                        value={speaker.name}
                        onChange={(e) =>
                          updateSpeaker(index, "name", e.target.value)
                        }
                        placeholder="Speaker name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`speaker-qualification-${index}`}>
                        Qualification
                      </Label>
                      <Input
                        id={`speaker-qualification-${index}`}
                        value={speaker.qualification}
                        onChange={(e) =>
                          updateSpeaker(index, "qualification", e.target.value)
                        }
                        placeholder="e.g., MD, PhD"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`speaker-department-${index}`}>
                        Department
                      </Label>
                      <Input
                        id={`speaker-department-${index}`}
                        value={speaker.department}
                        onChange={(e) =>
                          updateSpeaker(index, "department", e.target.value)
                        }
                        placeholder="e.g., Cardiology"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8"
              disabled={loading}
            >
              {loading ? "Creating Seminar..." : "Create Seminar"}
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default HostSeminar;

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   CalendarIcon,
//   Plus,
//   Trash2,
//   ArrowLeft,
//   DollarSign,
// } from "lucide-react";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import { useNavigate } from "react-router-dom";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Speaker {
//   name: string;
//   qualification: string;
//   department: string;
// }

// const HostSeminar = () => {
//   const [hostName, setHostName] = useState("");
//   const [topic, setTopic] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState<Date>();
//   const [time, setTime] = useState("");
//   const [speakers, setSpeakers] = useState<Speaker[]>([
//     { name: "", qualification: "", department: "" },
//   ]);
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [eventType, setEventType] = useState<"free" | "paid">("");
//   const [price, setPrice] = useState("");
//   const [currency, setCurrency] = useState("USD");

//   const addSpeaker = () => {
//     setSpeakers([...speakers, { name: "", qualification: "", department: "" }]);
//   };

//   const removeSpeaker = (index: number) => {
//     if (speakers.length > 1) {
//       setSpeakers(speakers.filter((_, i) => i !== index));
//     }
//   };

//   const updateSpeaker = (
//     index: number,
//     field: keyof Speaker,
//     value: string
//   ) => {
//     const updatedSpeakers = [...speakers];
//     updatedSpeakers[index][field] = value;
//     setSpeakers(updatedSpeakers);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!date || !time || !hostName || !topic) {
//       toast({
//         title: "Error",
//         description: "Please fill in all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Validate speakers
//     const validSpeakers = speakers.filter(
//       (speaker) => speaker.name && speaker.qualification && speaker.department
//     );

//     if (validSpeakers.length === 0) {
//       toast({
//         title: "Error",
//         description: "Please add at least one speaker with complete details.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Validate price for paid events
//     if (
//       eventType === "paid" &&
//       (!price || isNaN(Number(price)) || Number(price) <= 0)
//     ) {
//       toast({
//         title: "Invalid Price",
//         description: "Please enter a valid price for paid events.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (!session?.user) {
//         toast({
//           title: "Error",
//           description: "You must be logged in to host a seminar.",
//           variant: "destructive",
//         });
//         return;
//       }

//       // Prepare seminar data
//       const seminarData = {
//         host_id: session.user.id,
//         host_name: hostName,
//         topic,
//         description,
//         date: format(date, "yyyy-MM-dd"),
//         time,
//         event_type: eventType,
//         ...(eventType === "paid" && {
//           price: Number(price),
//           currency,
//         }),
//       };

//       // Insert seminar
//       const { data: seminarResponse, error: seminarError } = await supabase
//         .from("seminars")
//         .insert(seminarData)
//         .select()
//         .single();

//       if (seminarError) throw seminarError;

//       // Insert speakers
//       const speakersToInsert = validSpeakers.map((speaker) => ({
//         seminar_id: seminarResponse.id,
//         name: speaker.name,
//         qualification: speaker.qualification,
//         department: speaker.department,
//       }));

//       const { error: speakersError } = await supabase
//         .from("speakers")
//         .insert(speakersToInsert);

//       if (speakersError) throw speakersError;

//       toast({
//         title: "Success",
//         description: "Seminar created successfully!",
//       });

//       // Reset form
//       setHostName("");
//       setTopic("");
//       setDescription("");
//       setDate(undefined);
//       setTime("");
//       setSpeakers([{ name: "", qualification: "", department: "" }]);
//       setEventType("free");
//       setPrice("");
//       setCurrency("USD");

//       // Navigate back to e-seminar page
//       navigate("/e-seminar");
//     } catch (error) {
//       console.error("Error creating seminar:", error);
//       toast({
//         title: "Error",
//         description: "Failed to create seminar. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <Button
//             variant="outline"
//             onClick={() => navigate("/e-seminar")}
//             className="flex items-center gap-2"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to E-Seminar
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Host a Seminar</h1>
//             <p className="text-gray-600">
//               Create and schedule your medical seminar
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Basic Information */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Seminar Details</CardTitle>
//               <CardDescription>
//                 Provide basic information about your seminar
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="hostName">Host Name *</Label>
//                   <Input
//                     id="hostName"
//                     value={hostName}
//                     onChange={(e) => setHostName(e.target.value)}
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="topic">Seminar Topic *</Label>
//                   <Input
//                     id="topic"
//                     value={topic}
//                     onChange={(e) => setTopic(e.target.value)}
//                     placeholder="Enter seminar topic"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Provide a brief description of the seminar"
//                   rows={3}
//                 />
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Date *</Label>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className={cn(
//                           "w-full justify-start text-left font-normal",
//                           !date && "text-muted-foreground"
//                         )}
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {date ? format(date, "PPP") : "Pick a date"}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0">
//                       <Calendar
//                         mode="single"
//                         selected={date}
//                         onSelect={setDate}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </div>
//                 <div>
//                   <Label htmlFor="time">Time *</Label>
//                   <Input
//                     id="time"
//                     type="time"
//                     value={time}
//                     onChange={(e) => setTime(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Event Type and Pricing */}
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Event Type *</Label>
//                   <Select
//                     value={eventType}
//                     onValueChange={(value: "free" | "paid") =>
//                       setEventType(value)
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select event type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="free">Free Event</SelectItem>
//                       <SelectItem value="paid">Paid Event</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 {eventType === "paid" && (
//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="col-span-2">
//                       <Label htmlFor="price">Price *</Label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                           <DollarSign className="h-4 w-4 text-gray-500" />
//                         </div>
//                         <Input
//                           id="price"
//                           type="number"
//                           value={price}
//                           onChange={(e) => setPrice(e.target.value)}
//                           placeholder="Enter price"
//                           className="pl-8"
//                           min="0"
//                           step="0.01"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <Label htmlFor="currency">Currency</Label>
//                       <Select value={currency} onValueChange={setCurrency}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Currency" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="USD">USD</SelectItem>
//                           <SelectItem value="EUR">EUR</SelectItem>
//                           <SelectItem value="GBP">GBP</SelectItem>
//                           <SelectItem value="JPY">JPY</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Speakers Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 Speaker Details
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={addSpeaker}
//                   className="flex items-center gap-2"
//                 >
//                   <Plus className="h-4 w-4" />
//                   Add Speaker
//                 </Button>
//               </CardTitle>
//               <CardDescription>
//                 Add information about the speakers for this seminar
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {speakers.map((speaker, index) => (
//                 <div key={index} className="border rounded-lg p-4 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h4 className="font-medium">Speaker {index + 1}</h4>
//                     {speakers.length > 1 && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => removeSpeaker(index)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>

//                   <div className="grid md:grid-cols-3 gap-4">
//                     <div>
//                       <Label htmlFor={`speaker-name-${index}`}>Name</Label>
//                       <Input
//                         id={`speaker-name-${index}`}
//                         value={speaker.name}
//                         onChange={(e) =>
//                           updateSpeaker(index, "name", e.target.value)
//                         }
//                         placeholder="Speaker name"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor={`speaker-qualification-${index}`}>
//                         Qualification
//                       </Label>
//                       <Input
//                         id={`speaker-qualification-${index}`}
//                         value={speaker.qualification}
//                         onChange={(e) =>
//                           updateSpeaker(index, "qualification", e.target.value)
//                         }
//                         placeholder="e.g., MD, PhD"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor={`speaker-department-${index}`}>
//                         Department
//                       </Label>
//                       <Input
//                         id={`speaker-department-${index}`}
//                         value={speaker.department}
//                         onChange={(e) =>
//                           updateSpeaker(index, "department", e.target.value)
//                         }
//                         placeholder="e.g., Cardiology"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <Button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 px-8"
//               disabled={loading}
//             >
//               {loading ? "Creating Seminar..." : "Create Seminar"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default HostSeminar;

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   CalendarIcon,
//   Plus,
//   Trash2,
//   ArrowLeft,
//   Shield,
//   Layout,
//   Grid3X3,
//   Home,
//   User as UserIcon,
//   Globe,
// } from "lucide-react";
// import { format } from "date-fns";
// import { toZonedTime, fromZonedTime} from "date-fns-tz";
// import { cn } from "@/lib/utils";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import { useNavigate, Link } from "react-router-dom";
// import type { User as AuthUser } from "@supabase/supabase-js";

// interface Speaker {
//   name: string;
//   qualification: string;
//   department: string;
// }

// const timeZones = [
//   { value: "Pacific/Honolulu", label: "Hawaii (UTC-10:00)" },
//   { value: "America/Anchorage", label: "Alaska (UTC-09:00)" },
//   { value: "America/Los_Angeles", label: "Pacific Time (UTC-08:00)" },
//   { value: "America/Denver", label: "Mountain Time (UTC-07:00)" },
//   { value: "America/Chicago", label: "Central Time (UTC-06:00)" },
//   { value: "America/New_York", label: "Eastern Time (UTC-05:00)" },
//   { value: "America/Sao_Paulo", label: "Brazil (UTC-03:00)" },
//   { value: "UTC", label: "UTC (UTC±00:00)" },
//   { value: "Europe/London", label: "London (UTC±00:00)" },
//   { value: "Europe/Paris", label: "Paris (UTC+01:00)" },
//   { value: "Africa/Cairo", label: "Cairo (UTC+02:00)" },
//   { value: "Asia/Dubai", label: "Dubai (UTC+04:00)" },
//   { value: "Asia/Kolkata", label: "India (UTC+05:30)" },
//   { value: "Asia/Shanghai", label: "China (UTC+08:00)" },
//   { value: "Asia/Tokyo", label: "Japan (UTC+09:00)" },
//   { value: "Australia/Sydney", label: "Sydney (UTC+10:00)" },
//   { value: "Pacific/Auckland", label: "Auckland (UTC+12:00)" },
// ];

// const HostSeminar = () => {
//   const [hostName, setHostName] = useState("");
//   const [topic, setTopic] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState<Date>();
//   const [time, setTime] = useState("");
//   const [timeZone, setTimeZone] = useState("UTC");
//   const [localTime, setLocalTime] = useState("");
//   const [speakers, setSpeakers] = useState<Speaker[]>([
//     { name: "", qualification: "", department: "" },
//   ]);
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [user, setUser] = useState<AuthUser | null>(null);

//   useEffect(() => {
//     checkUser();
//     // Try to get user's local timezone
//     try {
//       const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//       if (timeZones.some((tz) => tz.value === userTimeZone)) {
//         setTimeZone(userTimeZone);
//       }
//     } catch (e) {
//       console.log("Could not detect timezone", e);
//     }
//   }, []);

//   useEffect(() => {
//     if (date && time) {
//       updateLocalTime();
//     }
//   }, [date, time, timeZone]);

//   const updateLocalTime = () => {
//     if (!date || !time) return;

//     try {
//       // Create a Date object from the selected date and time
//       const dateTimeStr = `${format(date, "yyyy-MM-dd")}T${time}`;
//       const localDate = new Date(dateTimeStr);

//       // Convert to selected timezone
//       const zonedTime = toZonedTime(localDate, timeZone);
//       const formattedTime = format(zonedTime, "h:mm a");
//       const formattedDate = format(zonedTime, "PPP");

//       setLocalTime(
//         `Local time: ${formattedTime}, ${formattedDate} (${timeZone})`
//       );
//     } catch (error) {
//       console.error("Error calculating local time:", error);
//       setLocalTime("");
//     }
//   };

//   const checkUser = async () => {
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setUser(session?.user || null);
//     } catch (error) {
//       console.error("Error checking user:", error);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setUser(null);
//       toast({
//         title: "Signed Out",
//         description: "You have been successfully signed out.",
//       });
//     } catch (error) {
//       console.error("Sign out error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to sign out. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleBackNavigation = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate("/");
//     }
//   };

//   const addSpeaker = () => {
//     setSpeakers([...speakers, { name: "", qualification: "", department: "" }]);
//   };

//   const removeSpeaker = (index: number) => {
//     if (speakers.length > 1) {
//       setSpeakers(speakers.filter((_, i) => i !== index));
//     }
//   };

//   const updateSpeaker = (
//     index: number,
//     field: keyof Speaker,
//     value: string
//   ) => {
//     const updatedSpeakers = [...speakers];
//     updatedSpeakers[index][field] = value;
//     setSpeakers(updatedSpeakers);
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();

//   //   if (!date || !time || !hostName || !topic) {
//   //     toast({
//   //       title: "Error",
//   //       description: "Please fill in all required fields.",
//   //       variant: "destructive",
//   //     });
//   //     return;
//   //   }

//   //   // Validate speakers
//   //   const validSpeakers = speakers.filter(
//   //     (speaker) => speaker.name && speaker.qualification && speaker.department
//   //   );

//   //   if (validSpeakers.length === 0) {
//   //     toast({
//   //       title: "Error",
//   //       description: "Please add at least one speaker with complete details.",
//   //       variant: "destructive",
//   //     });
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     const {
//   //       data: { session },
//   //     } = await supabase.auth.getSession();

//   //     if (!session?.user) {
//   //       toast({
//   //         title: "Error",
//   //         description: "You must be logged in to host a seminar.",
//   //         variant: "destructive",
//   //       });
//   //       return;
//   //     }

//   //     // Combine date and time
//   //     const dateTimeStr = `${format(date, "yyyy-MM-dd")}T${time}`;
//   //     const localDateTime = new Date(dateTimeStr);

//   //     // Convert to UTC for storage
//   //     const utcDateTime = zonedTimeToUtc(localDateTime, timeZone);

//   //     // Insert seminar
//   //     const { data: seminarData, error: seminarError } = await supabase
//   //       .from("seminars")
//   //       .insert({
//   //         host_id: session.user.id,
//   //         host_name: hostName,
//   //         topic,
//   //         description,
//   //         date: format(utcDateTime, "yyyy-MM-dd"),
//   //         time: format(utcDateTime, "HH:mm:ss"),
//   //         time_zone: timeZone,
//   //       })
//   //       .select()
//   //       .single();

//   //     if (seminarError) throw seminarError;

//   //     // Insert speakers
//   //     const speakersToInsert = validSpeakers.map((speaker) => ({
//   //       seminar_id: seminarData.id,
//   //       name: speaker.name,
//   //       qualification: speaker.qualification,
//   //       department: speaker.department,
//   //     }));

//   //     const { error: speakersError } = await supabase
//   //       .from("speakers")
//   //       .insert(speakersToInsert);

//   //     if (speakersError) throw speakersError;

//   //     toast({
//   //       title: "Success",
//   //       description: "Seminar created successfully!",
//   //     });

//   //     // Reset form
//   //     setHostName("");
//   //     setTopic("");
//   //     setDescription("");
//   //     setDate(undefined);
//   //     setTime("");
//   //     setSpeakers([{ name: "", qualification: "", department: "" }]);

//   //     // Navigate back to e-seminar page
//   //     navigate("/e-seminar");
//   //   } catch (error) {
//   //     console.error("Error creating seminar:", error);
//   //     toast({
//   //       title: "Error",
//   //       description: "Failed to create seminar. Please try again.",
//   //       variant: "destructive",
//   //     });
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!date || !time || !hostName || !topic) {
//       toast({
//         title: "Error",
//         description: "Please fill in all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Validate speakers
//     const validSpeakers = speakers.filter(
//       (speaker) => speaker.name && speaker.qualification && speaker.department
//     );

//     if (validSpeakers.length === 0) {
//       toast({
//         title: "Error",
//         description: "Please add at least one speaker with complete details.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (!session?.user) {
//         toast({
//           title: "Error",
//           description: "You must be logged in to host a seminar.",
//           variant: "destructive",
//         });
//         return;
//       }

//       // Combine date and time
//       const dateTimeStr = `${format(date, "yyyy-MM-dd")}T${time}`;
//       const localDateTime = new Date(dateTimeStr);

//       // Convert to UTC for storage
//       const utcDateTime = fromZonedTime(localDateTime, timeZone);

//       // Insert seminar
//       const { data: seminarData, error: seminarError } = await supabase
//         .from("seminars")
//         .insert({
//           host_id: session.user.id,
//           host_name: hostName,
//           topic,
//           description,
//           date: format(utcDateTime, "yyyy-MM-dd"),
//           time: format(utcDateTime, "HH:mm:ss"),
//           time_zone: timeZone,
//         })
//         .select()
//         .single();

//       if (seminarError) throw seminarError;

//       // Insert speakers
//       const speakersToInsert = validSpeakers.map((speaker) => ({
//         seminar_id: seminarData.id,
//         name: speaker.name,
//         qualification: speaker.qualification,
//         department: speaker.department,
//       }));

//       const { error: speakersError } = await supabase
//         .from("speakers")
//         .insert(speakersToInsert);

//       if (speakersError) throw speakersError;

//       toast({
//         title: "Success",
//         description: "Seminar created successfully!",
//       });

//       // Reset form
//       setHostName("");
//       setTopic("");
//       setDescription("");
//       setDate(undefined);
//       setTime("");
//       setSpeakers([{ name: "", qualification: "", department: "" }]);

//       // Navigate back to e-seminar page
//       navigate("/e-seminar");
//     } catch (error) {
//       console.error("Error creating seminar:", error);
//       toast({
//         title: "Error",
//         description: "Failed to create seminar. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       {/* Header - Same as ProductPortal */}
//       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={() => navigate("/e-seminar")}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go back"
//               >
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back
//               </Button>
//               <Link to="/" className="flex items-center space-x-2">
//                 <Shield className="h-8 w-8 text-blue-400" />
//                 <h1 className="text-2xl font-bold text-white">MedPortal</h1>
//               </Link>
//             </div>
//             <div className="flex items-center space-x-4">
//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                     Welcome, {user.email}
//                   </span>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={() => navigate("/profile")}
//                   >
//                     <UserIcon className="mr-2 h-4 w-4" />
//                     Profile
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     onClick={handleSignOut}
//                   >
//                     Sign Out
//                   </Button>
//                 </div>
//               ) : (
//                 <>
//                   <Link to="/register">
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     >
//                       Register
//                     </Button>
//                   </Link>
//                   <Link to="/">
//                     <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
//                       <UserIcon className="mr-2 h-4 w-4" />
//                       Sign In
//                     </Button>
//                   </Link>
//                 </>
//               )}
//               <Button
//                 variant="outline"
//                 onClick={() => navigate("/")}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                 title="Go to home page"
//               >
//                 <Home className="mr-2 h-4 w-4" />
//                 Home
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Host a Seminar</h1>
//           <p className="text-gray-600">
//             Create and schedule your medical seminar
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Basic Information */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Seminar Details</CardTitle>
//               <CardDescription>
//                 Provide basic information about your seminar
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="hostName">Host Name *</Label>
//                   <Input
//                     id="hostName"
//                     value={hostName}
//                     onChange={(e) => setHostName(e.target.value)}
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="topic">Seminar Topic *</Label>
//                   <Input
//                     id="topic"
//                     value={topic}
//                     onChange={(e) => setTopic(e.target.value)}
//                     placeholder="Enter seminar topic"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Provide a brief description of the seminar"
//                   rows={3}
//                 />
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Date *</Label>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className={cn(
//                           "w-full justify-start text-left font-normal",
//                           !date && "text-muted-foreground"
//                         )}
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {date ? format(date, "PPP") : "Pick a date"}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0">
//                       <Calendar
//                         mode="single"
//                         selected={date}
//                         onSelect={setDate}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </div>
//                 <div>
//                   <Label htmlFor="time">Time *</Label>
//                   <Input
//                     id="time"
//                     type="time"
//                     value={time}
//                     onChange={(e) => setTime(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="timeZone">Time Zone *</Label>
//                   <div className="relative">
//                     <select
//                       id="timeZone"
//                       value={timeZone}
//                       onChange={(e) => setTimeZone(e.target.value)}
//                       className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                     >
//                       {timeZones.map((tz) => (
//                         <option key={tz.value} value={tz.value}>
//                           {tz.label}
//                         </option>
//                       ))}
//                     </select>
//                     <Globe className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
//                   </div>
//                 </div>
//                 <div className="flex items-end">
//                   {localTime && (
//                     <p className="text-sm text-muted-foreground">{localTime}</p>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Speakers Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 Speaker Details
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={addSpeaker}
//                   className="flex items-center gap-2"
//                 >
//                   <Plus className="h-4 w-4" />
//                   Add Speaker
//                 </Button>
//               </CardTitle>
//               <CardDescription>
//                 Add information about the speakers for this seminar
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {speakers.map((speaker, index) => (
//                 <div key={index} className="border rounded-lg p-4 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h4 className="font-medium">Speaker {index + 1}</h4>
//                     {speakers.length > 1 && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => removeSpeaker(index)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>

//                   <div className="grid md:grid-cols-3 gap-4">
//                     <div>
//                       <Label htmlFor={`speaker-name-${index}`}>Name</Label>
//                       <Input
//                         id={`speaker-name-${index}`}
//                         value={speaker.name}
//                         onChange={(e) =>
//                           updateSpeaker(index, "name", e.target.value)
//                         }
//                         placeholder="Speaker name"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor={`speaker-qualification-${index}`}>
//                         Qualification
//                       </Label>
//                       <Input
//                         id={`speaker-qualification-${index}`}
//                         value={speaker.qualification}
//                         onChange={(e) =>
//                           updateSpeaker(index, "qualification", e.target.value)
//                         }
//                         placeholder="e.g., MD, PhD"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor={`speaker-department-${index}`}>
//                         Department
//                       </Label>
//                       <Input
//                         id={`speaker-department-${index}`}
//                         value={speaker.department}
//                         onChange={(e) =>
//                           updateSpeaker(index, "department", e.target.value)
//                         }
//                         placeholder="e.g., Cardiology"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <Button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 px-8"
//               disabled={loading}
//             >
//               {loading ? "Creating Seminar..." : "Create Seminar"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default HostSeminar;
