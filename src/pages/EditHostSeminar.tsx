// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
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
//   LogOut,
// } from "lucide-react";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import type { User as AuthUser } from "@supabase/supabase-js";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import logo from "@/image/thefuturemed_logo (1).jpg";
// import Footer from "@/footer/Footer";

// interface Speaker {
//   id?: number;
//   name: string;
//   qualification: string;
//   department: string;
// }

// const EditHostSeminar = () => {
//   const { seminarId } = useParams<{ seminarId: string }>();
//   const [hostName, setHostName] = useState("");
//   const [topic, setTopic] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState<Date>();
//   const [time, setTime] = useState("");
//   const [speakers, setSpeakers] = useState<Speaker[]>([
//     { name: "", qualification: "", department: "" },
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [user, setUser] = useState<AuthUser | null>(null);

//   useEffect(() => {
//     const fetchSeminar = async () => {
//       if (!seminarId) return;

//       setInitialLoading(true);
//       try {
//         // Fetch seminar data
//         const { data: seminarData, error: seminarError } = await supabase
//           .from("seminars")
//           .select("*")
//           .eq("id", seminarId)
//           .single();

//         if (seminarError) throw seminarError;

//         // Fetch speakers
//         const { data: speakersData, error: speakersError } = await supabase
//           .from("speakers")
//           .select("*")
//           .eq("seminar_id", seminarId);

//         if (speakersError) throw speakersError;

//         // Set form state
//         setHostName(seminarData.host_name);
//         setTopic(seminarData.topic);
//         setDescription(seminarData.description || "");
//         setDate(new Date(seminarData.date));
//         setTime(seminarData.time);
//         setSpeakers(
//           speakersData.length > 0
//             ? speakersData
//             : [{ name: "", qualification: "", department: "" }]
//         );
//       } catch (error) {
//         console.error("Error fetching seminar:", error);
//         toast({
//           title: "Error",
//           description: "Failed to load seminar data",
//           variant: "destructive",
//         });
//         navigate("/e-seminar");
//       } finally {
//         setInitialLoading(false);
//       }
//     };

//     const checkUser = async () => {
//       try {
//         const {
//           data: { session },
//         } = await supabase.auth.getSession();
//         setUser(session?.user || null);
//       } catch (error) {
//         console.error("Error checking user:", error);
//       }
//     };

//     checkUser();
//     fetchSeminar();
//   }, [seminarId, toast, navigate]);

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
//     navigate("/e-seminar");
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
//           description: "You must be logged in to edit a seminar.",
//           variant: "destructive",
//         });
//         return;
//       }

//       // Update seminar
//       const { error: seminarError } = await supabase
//         .from("seminars")
//         .update({
//           host_name: hostName,
//           topic,
//           description,
//           date: format(date, "yyyy-MM-dd"),
//           time,
//         })
//         .eq("id", seminarId);

//       if (seminarError) throw seminarError;

//       // Delete existing speakers
//       const { error: deleteError } = await supabase
//         .from("speakers")
//         .delete()
//         .eq("seminar_id", seminarId);

//       if (deleteError) throw deleteError;

//       // Insert updated speakers
//       const speakersToInsert = validSpeakers.map((speaker) => ({
//         seminar_id: seminarId,
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
//         description: "Seminar updated successfully!",
//       });

//       // Navigate back to e-seminar page
//       navigate("/e-seminar");
//     } catch (error) {
//       console.error("Error updating seminar:", error);
//       toast({
//         title: "Error",
//         description: "Failed to update seminar. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (initialLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
//         <div className="text-center">
//           <p>Loading seminar data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={handleBackNavigation}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
//                 title="Go back"
//               >
//                 <ArrowLeft className="h-4 w-4 sm:mr-2" />
//                 <span className="hidden sm:inline">Back</span>
//               </Button>
//               <div className="flex items-center space-x-2">
//                 <Link to="/">
//                   <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
//                 </Link>
//               </div>
//             </div>

//             <div className="flex items-center space-x-2 sm:space-x-4">
//               {user ? (
//                 <>
//                   <div className="hidden md:flex items-center space-x-4">
//                     <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
//                       Welcome, {user.email}
//                     </span>
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
//                       onClick={() => navigate("/profile")}
//                       title="Profile"
//                     >
//                       <UserIcon className="h-4 w-4 sm:mr-2" />
//                       <span className="hidden sm:inline">Profile</span>
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
//                       onClick={handleSignOut}
//                       title="Sign Out"
//                     >
//                       <span className="hidden sm:inline">Sign Out</span>
//                     </Button>
//                   </div>

//                   <div className="md:hidden">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                         >
//                           <UserIcon className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20">
//                         <DropdownMenuLabel className="text-white">
//                           {user.email}
//                         </DropdownMenuLabel>
//                         <DropdownMenuSeparator className="bg-white/20" />
//                         <DropdownMenuItem
//                           className="text-white hover:bg-white/10"
//                           onClick={() => navigate("/profile")}
//                         >
//                           <UserIcon className="mr-2 h-4 w-4" />
//                           <span>Profile</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           className="text-white hover:bg-white/10"
//                           onClick={handleSignOut}
//                         >
//                           <LogOut className="mr-2 h-4 w-4" />
//                           <span>Sign Out</span>
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/register">
//                     <Button
//                       variant="outline"
//                       className="hidden sm:flex text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
//                     >
//                       Register
//                     </Button>
//                   </Link>

//                   <Link to="/">
//                     <Button
//                       className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2 sm:px-4 sm:py-2"
//                       title="Sign In"
//                     >
//                       <UserIcon className="h-4 w-4 sm:mr-2" />
//                       <span className="hidden sm:inline">Sign In</span>
//                     </Button>
//                   </Link>
//                 </>
//               )}

//               <Button
//                 variant="outline"
//                 onClick={() => navigate("/")}
//                 className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
//                 title="Go to home page"
//               >
//                 <Home className="h-4 w-4 sm:mr-2" />
//                 <span className="hidden sm:inline">Home</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Edit Seminar</h1>
//           <p className="text-gray-600">Update your medical seminar details</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Seminar Details</CardTitle>
//               <CardDescription>
//                 Update basic information about your seminar
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
//                 Update information about the speakers for this seminar
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

//           <div className="flex justify-end">
//             <Button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 px-8"
//               disabled={loading}
//             >
//               {loading ? "Updating Seminar..." : "Update Seminar"}
//             </Button>
//           </div>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default EditHostSeminar;


import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  Home,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
import ImageResize from "quill-image-resize-module-react";
import ReactQuill, { Quill } from "react-quill";
import { Switch } from "@/components/ui/switch";

// Fix: Update Speaker interface to match database schema
interface Speaker {
  id?: string | number; // Changed to allow both string and number
  name: string;
  qualification: string;
  department: string;
  seminar_id?: string; // Added to match database schema
  created_at?: string; // Added to match database schema
  // is_paid?: boolean; // Added to match database schema
  // price?: number; // Added to match database schema
  // currency?: string; // Added to match database schema
  // is_certificate?: boolean; // Added to match database schema
}
Quill.register("modules/imageResize", ImageResize);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  imageResize: {
    parchment: Quill.import("parchment"),
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
];
const seminarTypeMap = {
  webminar: "webminar", // Display: "Webminar", Value: "webminar"
  conference: "conference",
  seminar: "seminar",
} as const;

type SeminarTypeKey = keyof typeof seminarTypeMap;

const EditHostSeminar = () => {
  const { seminarId } = useParams<{ seminarId: string }>();
  const [hostName, setHostName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [speakers, setSpeakers] = useState<Speaker[]>([
    { name: "", qualification: "", department: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [timezones, setTimezones] = useState<string[]>([]);
  // Add these state variables near the other useState declarations
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [currency, setCurrency] = useState("INR");
  const [certificate, setCertificate] = useState(false);
  const [seminarType, setSeminarType] = useState("");
  // Add these handler functions
  const handlePaidToggle = (paid: boolean) => {
    setIsPaid(paid);
    if (!paid) {
      setPrice(undefined);
    }
  };

  const handleNumberInput = (value: string) => {
    if (value === "") {
      setPrice(undefined);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setPrice(numValue >= 0 ? numValue : 0);
      }
    }
  };

  const handleCertificateToggle = (checked: boolean) => {
    setCertificate(checked);
  };

  // You can remove the unused formatTimezoneLabel function or keep it if you plan to use it later

  useEffect(() => {
    const fetchSeminar = async () => {
      if (!seminarId) return;

      setInitialLoading(true);
      try {
        // Fetch seminar data
        const { data: seminarData, error: seminarError } = await supabase
          .from("seminars")
          .select("*")
          .eq("id", seminarId)
          .single();

        if (seminarError) throw seminarError;

        // Fetch speakers
        const { data: speakersData, error: speakersError } = await supabase
          .from("speakers")
          .select("*")
          .eq("seminar_id", seminarId);

        if (speakersError) throw speakersError;

        // Set form state
        setHostName(seminarData.host_name);
        setTopic(seminarData.topic);
        setDescription(seminarData.description || "");
        setDate(new Date(seminarData.date));
        setTime(seminarData.time);
        setCountry(seminarData.host_country || "");
        setIsPaid(seminarData.is_paid || false);
        setPrice(seminarData.price || undefined);
        setCurrency(seminarData.currency || "INR");
        setCertificate(seminarData.is_certificate || false);
        setSpeakers(
          speakersData && speakersData.length > 0
            ? speakersData
            : [{ name: "", qualification: "", department: "" }]
        );
        setSeminarType(seminarData.type || "");
      } catch (error) {
        console.error("Error fetching seminar:", error);
        toast({
          title: "Error",
          description: "Failed to load seminar data",
          variant: "destructive",
        });
        navigate("/e-seminar");
      } finally {
        setInitialLoading(false);
      }
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

    checkUser();
    fetchSeminar();
  }, [seminarId, toast, navigate]);

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
    navigate("/e-seminar");
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
    value: string | boolean | number | undefined
  ) => {
    const updatedSpeakers = [...speakers];
    (updatedSpeakers[index] as any)[field] = value;
    // updatedSpeakers[index][field] = value;
    setSpeakers(updatedSpeakers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !hostName || !topic || !seminarId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

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
          description: "You must be logged in to edit a seminar.",
          variant: "destructive",
        });
        return;
      }

      // Update seminar
      const { error: seminarError } = await supabase
        .from("seminars")
        .update({
          host_name: hostName,
          topic,
          description,
          date: format(date, "yyyy-MM-dd"),
          time,
          host_country: country,
          is_paid: isPaid,
          type: seminarType,
          // currency: currency,
          currency: currency ? currency : null,
          price: isPaid ? price : 0,
          is_certificate: certificate,
        })
        .eq("id", seminarId);

      if (seminarError) throw seminarError;

      // Delete existing speakers
      const { error: deleteError } = await supabase
        .from("speakers")
        .delete()
        .eq("seminar_id", seminarId);

      if (deleteError) throw deleteError;

      // Insert updated speakers
      const speakersToInsert = validSpeakers.map((speaker) => ({
        seminar_id: seminarId,
        name: speaker.name,
        qualification: speaker.qualification,
        department: speaker.department,
        // is_paid: speaker.is_paid || false, // Include other speaker fields
        // price: speaker.price || 0,
        // currency: speaker.currency || "INR",
        // is_certificate: speaker.is_certificate || false,
      }));

      // Fix: Add type assertion to resolve TypeScript error
      const { error: speakersError } = await supabase
        .from("speakers")
        .insert(speakersToInsert as any);

      if (speakersError) throw speakersError;

      toast({
        title: "Success",
        description: "Seminar updated successfully!",
      });

      // Navigate back to e-seminar page
      navigate("/e-seminar");
    } catch (error) {
      console.error("Error updating seminar:", error);
      toast({
        title: "Error",
        description: "Failed to update seminar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSeminarTypeChange = (displayValue: string) => {
    // Convert display value to database enum value
    const enumValue = seminarTypeMap[displayValue as SeminarTypeKey];
    setSeminarType(enumValue);
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p>Loading seminar data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="outline"
                onClick={handleBackNavigation}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm p-2 sm:px-4 sm:py-2"
                title="Go back"
              >
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {user ? (
                <>
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Seminar</h1>
          <p className="text-gray-600">Update your medical seminar details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Seminar Details</CardTitle>
              <CardDescription>
                Update basic information about your seminar
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
                {/* <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a brief description of the seminar"
                  rows={3}
                /> */}
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  modules={modules}
                  formats={formats}
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
                {/* <div className="grid md:grid-cols-2 gap-4"> */}
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select value={country} onValueChange={setCountry} required>
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
                        <SelectItem value="Burkina Faso">
                          Burkina Faso
                        </SelectItem>
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
                        <SelectItem value="Korea, North">
                          Korea, North
                        </SelectItem>
                        <SelectItem value="Korea, South">
                          Korea, South
                        </SelectItem>
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
                        <SelectItem value="Saudi Arabia">
                          Saudi Arabia
                        </SelectItem>
                        <SelectItem value="Senegal">Senegal</SelectItem>
                        <SelectItem value="Serbia">Serbia</SelectItem>
                        <SelectItem value="Seychelles">Seychelles</SelectItem>
                        <SelectItem value="Sierra Leone">
                          Sierra Leone
                        </SelectItem>
                        <SelectItem value="Singapore">Singapore</SelectItem>
                        <SelectItem value="Slovakia">Slovakia</SelectItem>
                        <SelectItem value="Slovenia">Slovenia</SelectItem>
                        <SelectItem value="Solomon Islands">
                          Solomon Islands
                        </SelectItem>
                        <SelectItem value="Somalia">Somalia</SelectItem>
                        <SelectItem value="South Africa">
                          South Africa
                        </SelectItem>
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
                        <SelectItem value="Turkmenistan">
                          Turkmenistan
                        </SelectItem>
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
                        <SelectItem value="Vatican City">
                          Vatican City
                        </SelectItem>
                        <SelectItem value="Venezuela">Venezuela</SelectItem>
                        <SelectItem value="Vietnam">Vietnam</SelectItem>
                        <SelectItem value="Yemen">Yemen</SelectItem>
                        <SelectItem value="Zambia">Zambia</SelectItem>
                        <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                                    <Label htmlFor="type">Type *</Label>
                                    <Select
                                      value={Object.keys(seminarTypeMap).find(key => 
                                        seminarTypeMap[key as SeminarTypeKey] === seminarType
                                      ) || ""}
                                      onValueChange={handleSeminarTypeChange}
                                      required
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a type" />
                                      </SelectTrigger>
                                      <SelectContent className="max-h-60 overflow-y-auto">
                                        <SelectItem value="webminar">Webminar</SelectItem>
                                        <SelectItem value="conference">Conference</SelectItem>
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
                {/* </div> */}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-green-800">
                      Enrollment Type (Free/Paid) *
                    </Label>
                    <p className="text-sm text-green-600 mt-1">
                      <b>Status:</b>{" "}
                      {isPaid ? (
                        <span className="font-semibold text-green-700">
                          Paid
                        </span>
                      ) : (
                        <span className="font-semibold text-green-600">
                          Free
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-green-500 mt-1">
                      This setting determines whether students need to pay to
                      enroll
                    </p>
                  </div>
                  <Switch
                    checked={isPaid}
                    onCheckedChange={handlePaidToggle}
                    className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-400"
                  />
                </div>

                {isPaid && (
                  <div className="mt-3 pl-2 border-l-2 border-green-200">
                    <Label htmlFor="price" className="text-green-800">
                      Registration Price (INR) / Per Participant * (Please note
                      that 25% platform fees will be deducted)
                    </Label>
                    <div className="flex items-center gap-3 mt-1">
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        value={price ?? ""}
                        onChange={(e) => handleNumberInput(e.target.value)}
                        placeholder="Enter seminar price"
                        className="mt-1 focus:border-green-400 focus:ring-green-200"
                      />
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:border-green-400 focus:ring-green-200 mt-2"
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="AUD">AUD</option>
                        <option value="CAD">CAD</option>
                      </select>
                    </div>
                    {/* <p className="text-xs text-green-600 mt-1">
                      Please enter the price attendees will pay to join this
                      seminar
                    </p>  */}
                  </div>
                )}
              </div>
              <br />
              <div className="flex items-center justify-between mt-4">
                <div>
                  <Label className="text-base font-medium text-green-800">
                    Include Certificate* (Default Template Provided) View Sample Certificate
                  </Label>
                  <p className="text-sm text-green-600 mt-1">
                    <b>Status:</b>{" "}
                    {certificate ? (
                      <span className="font-semibold text-green-700">Yes</span>
                    ) : (
                      <span className="font-semibold text-green-600">No</span>
                    )}
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    This setting determines whether students receive a
                    certificate
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    To provide customized certificate template, please email us at drshan@thefuturemed.com
                  </p>
                </div>

                <Switch
                  checked={certificate}
                  onCheckedChange={handleCertificateToggle}
                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-400"
                />
              </div>
            </CardContent>
          </Card>
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
                Update information about the speakers for this seminar
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

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8"
              disabled={loading}
            >
              {loading ? "Updating Seminar..." : "Update Seminar"}
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditHostSeminar;