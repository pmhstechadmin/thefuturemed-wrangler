// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Textarea } from "@/components/ui/textarea";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/integrations/supabase/client";

// interface CreateSeminarModalProps {
//   userId: string;
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// export const CreateSeminarModal = ({
//   userId,
//   isOpen,
//   onClose,
//   onSuccess,
// }: CreateSeminarModalProps) => {
//   const [formData, setFormData] = useState({
//     topic: "",
//     description: "",
//     date: new Date(),
//     startTime: "09:00",
//     endTime: "17:00",
//   });
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { error } = await supabase.from("seminars").insert({
//         host_id: userId,
//         topic: formData.topic,
//         description: formData.description,
//         date: formData.date.toISOString(),
//         start_time: formData.startTime,
//         end_time: formData.endTime,
//         is_published: false, // Default to unpublished
//       });

//       if (error) throw error;

//       toast({
//         title: "Success",
//         description: "Seminar created successfully!",
//       });
//       onSuccess();
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
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Create New Seminar</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="topic">Topic</Label>
//             <Input
//               id="topic"
//               value={formData.topic}
//               onChange={(e) =>
//                 setFormData({ ...formData, topic: e.target.value })
//               }
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               rows={4}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <Label>Date</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start text-left font-normal"
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {formData.date ? (
//                       format(formData.date, "PPP")
//                     ) : (
//                       <span>Pick a date</span>
//                     )}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     selected={formData.date}
//                     onSelect={(date) =>
//                       date && setFormData({ ...formData, date })
//                     }
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>

//             <div>
//               <Label htmlFor="startTime">Start Time</Label>
//               <Input
//                 id="startTime"
//                 type="time"
//                 value={formData.startTime}
//                 onChange={(e) =>
//                   setFormData({ ...formData, startTime: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="endTime">End Time</Label>
//               <Input
//                 id="endTime"
//                 type="time"
//                 value={formData.endTime}
//                 onChange={(e) =>
//                   setFormData({ ...formData, endTime: e.target.value })
//                 }
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-2 pt-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               disabled={loading}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? "Creating..." : "Create Seminar"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };


import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  Plus,
  Trash2,
  ArrowLeft,
  Shield,
  User as UserIcon,
  LogOut,
  Home,
  CheckCircle,
  CircleSlash,
  Users,
  Clock,
  MapPin,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import type { User as AuthUser } from "@supabase/supabase-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/footer/Header";
import Footer from "@/footer/Footer";

interface Speaker {
  name: string;
  qualification: string;
  department: string;
}

interface Seminar {
  id: string;
  host_id: string;
  host_name: string;
  topic: string;
  description: string;
  date: string;
  time: string;
  is_published: boolean;
  created_at: string;
  host_country: string;
  speakers: Speaker[];
}

export const CreateSeminarModal = () => {
  const [hostName, setHostName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [speakers, setSpeakers] = useState<Speaker[]>([
    { name: "", qualification: "", department: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [country, setCountry] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchSeminars();
    }
  }, [user]);

  const fetchSeminars = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("seminars")
      .select("*")
      .eq("host_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching seminars:", error);
      toast({
        title: "Error",
        description: "Failed to fetch seminars",
        variant: "destructive",
      });
      return;
    }

    // Fetch speakers for each seminar
    const seminarsWithSpeakers = await Promise.all(
      data.map(async (seminar) => {
        const { data: speakersData } = await supabase
          .from("speakers")
          .select("*")
          .eq("seminar_id", seminar.id);
        return { ...seminar, speakers: speakersData || [] };
      })
    );

    setSeminars(seminarsWithSpeakers);
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

    if (!date || !time || !hostName || !topic || !country) {
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
      const formattedDate = format(date, "yyyy-MM-dd");

      // Insert seminar
      const { data: seminarData, error: seminarError } = await supabase
        .from("seminars")
        .insert({
          host_id: user?.id,
          host_name: hostName,
          topic,
          description,
          date: formattedDate,
          time,
          is_published: false,
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
      setCountry("");
      setIsCreating(false);

      // Refresh seminars list
      await fetchSeminars();
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

//   const handleTogglePublish = async (
//     seminarId: string,
//     currentStatus: boolean
//   ) => {
//     try {
//       const { error } = await supabase
//         .from("seminars")
//         .update({ is_published: !currentStatus })
//         .eq("id", seminarId);

//       if (error) throw error;

//       toast({
//         title: currentStatus ? "Unpublished" : "Published",
//         description: `Seminar successfully ${
//           currentStatus ? "unpublished" : "published"
//         }.`,
//       });

//       // Update local state
//       setSeminars((prev) =>
//         prev.map((seminar) =>
//           seminar.id === seminarId
//             ? { ...seminar, is_published: !currentStatus }
//             : seminar
//         )
//       );
//     } catch (error) {
//       console.error("Error toggling publish status:", error);
//       toast({
//         title: "Error",
//         description: "Failed to update seminar status.",
//         variant: "destructive",
//       });
//     }
//   };
// const handleTogglePublish = async (
//   seminarId: string,
//   currentStatus: boolean
// ) => {
//   try {
//     // First update the publish status
//     const { error } = await supabase
//       .from("seminars")
//       .update({ is_published: !currentStatus })
//       .eq("id", seminarId);

//     if (error) throw error;

//     // Only send email when publishing (not when unpublishing)
//     if (!currentStatus) {
//       const seminar = seminars.find((s) => s.id === seminarId);
//       if (seminar) {
//         console.log("Sending Email Notification...");
//         const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

//         const response = await fetch(
//           "https://rxyfrjfgydldjdqelixe.supabase.co/functions/v1/send-email",
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${supabaseAnonKey}`,
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               email: user?.email,
//               subject: `Seminar Published: ${seminar.topic}`,
//               message: `Dear Host,<br><br>
// Your seminar has been successfully published:<br><br>
// <strong>Topic:</strong> ${seminar.topic}<br>
// <strong>Date:</strong> ${seminar.date}<br>
// <strong>Time:</strong> ${seminar.time}<br>
// <strong>Speakers:</strong> ${seminar.speakers
//                 .map((s) => s.name)
//                 .join(", ")}<br><br>

// <strong>Preparation Checklist:</strong><br>
// - Please Login 15 minutes early to set up<br>
// - Test all audio/video equipment beforehand<br>
// - Review the seminar description:<br>
// ${seminar.description}<br><br>

// The seminar is now visible to attendees.<br><br>

// Looking forward to your presentation!
// `,
//             }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const responseText = await response.text();
//         console.log("Email sent successfully:", responseText);
//       }
//     }

//     toast({
//       title: currentStatus ? "published" : "UnPublished",
//       description: `Seminar successfully ${
//         currentStatus ? "published" : "Unpublished"
//       }.`,
//     });

//     // Update local state
//     setSeminars((prev) =>
//       prev.map((seminar) =>
//         seminar.id === seminarId
//           ? { ...seminar, is_published: !currentStatus }
//           : seminar
//       )
//     );
//   } catch (error) {
//     console.error("Error toggling publish status:", error);
//     toast({
//       title: "Error",
//       description:
//         error instanceof Error
//           ? error.message
//           : "Failed to update seminar status.",
//       variant: "destructive",
//     });
//   }
// };
const handleTogglePublish = async (
  seminarId: string,
  currentStatus: boolean
) => {
  try {
    // First get the current session to access user email
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      throw new Error("User not authenticated");
    }

    // Update the publish status
    const { error } = await supabase
      .from("seminars")
      .update({ is_published: !currentStatus })
      .eq("id", seminarId);

    if (error) throw error;

    // Only send email when publishing (not when unpublishing)
    if (!currentStatus) {
      const seminar = seminars.find((s) => s.id === seminarId);
      if (seminar) {
        console.log("Sending Email Notification...");
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        const response = await fetch(
          "https://rxyfrjfgydldjdqelixe.supabase.co/functions/v1/send-email",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${supabaseAnonKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: session.user.email, // Use session user's email
              subject: `Seminar Published: ${seminar.topic}`,
              message: `Dear Host,<br><br>
Your seminar has been successfully published:<br><br>
<strong>Topic:</strong> ${seminar.topic}<br>
<strong>Date:</strong> ${seminar.date}<br>
<strong>Time:</strong> ${seminar.time}<br>
<strong>Speakers:</strong> ${seminar.speakers
                .map((s) => s.name)
                .join(", ")}<br><br>

<strong>Preparation Checklist:</strong><br>
- Please Login 15 minutes early to set up<br>
- Test all audio/video equipment beforehand<br>
- Review the seminar description:<br>
${seminar.description}<br><br>

The seminar is now visible to attendees.<br><br>

Looking forward to your presentation!
`,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Email failed: ${errorText}`);
        }

        console.log("Email sent successfully to:", session.user.email);
      }
    }

    toast({
      title: currentStatus ? "Published" : "UnPublished",
      description: `Seminar successfully ${
        currentStatus ? "Published" : "Unpublished"
      }.`,
    });

    // Update local state
    setSeminars((prev) =>
      prev.map((seminar) =>
        seminar.id === seminarId
          ? { ...seminar, is_published: !currentStatus }
          : seminar
      )
    );
  } catch (error) {
    console.error("Error toggling publish status:", error);
    toast({
      title: "Error",
      description:
        error instanceof Error
          ? error.message
          : "Failed to update seminar status.",
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            {/* <Button
            variant="outline"
            onClick={handleBackNavigation}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button> */}

            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">My Seminars</h1>
              <p className="text-gray-600">
                Create and manage your medical seminars
              </p>
            </div>

            {/* <Button
            // onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Seminar
          </Button> */}
            <Link to="/host-seminar">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                New Seminar
              </Button>
            </Link>
          </div>

          {/* Seminars List */}
          <div className="grid gap-6">
            {seminars.map((seminar) => (
              <Card
                key={seminar.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                // onClick={() => setSelectedSeminar(seminar)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {seminar.topic}
                        <Badge
                          variant={
                            seminar.is_published ? "default" : "secondary"
                          }
                          className="ml-2"
                        >
                          {seminar.is_published ? "Published" : "Draft"}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-900">
                        Hosted by: {seminar.host_name}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                         {/* <Link to={`/my-seminar/edit/${seminar.id}`}>
                                                        <Button variant="outline">Edit</Button>
                                                      </Link> */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePublish(seminar.id, seminar.is_published);
                        }}
                      >
                        {seminar.is_published ? (
                          <>
                            <CircleSlash className="mr-2 h-4 w-4" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Publish
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {new Date(seminar.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {seminar.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {seminar.host_country}
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 line-clamp-2">
                    {seminar.description}
                  </p>
                  <div className="mt-4">
                    <Badge variant="outline" className="mr-2">
                      {seminar.speakers.length}{" "}
                      {seminar.speakers.length === 1 ? "Speaker" : "Speakers"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}

            {seminars.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-500">
                    You haven't created any seminars yet.
                  </p>
                  <Button
                    onClick={() => setIsCreating(true)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                  >
                    Create Your First Seminar
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Create Seminar Modal */}
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Create New Seminar</h2>
                  <button onClick={() => setIsCreating(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                          <Label htmlFor="time">Time *</Label>
                          <Input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Enter country"
                          required
                        />
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
                        <div
                          key={index}
                          className="border rounded-lg p-4 space-y-4"
                        >
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
                              <Label htmlFor={`speaker-name-${index}`}>
                                Name
                              </Label>
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
                                  updateSpeaker(
                                    index,
                                    "qualification",
                                    e.target.value
                                  )
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
                                  updateSpeaker(
                                    index,
                                    "department",
                                    e.target.value
                                  )
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
                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreating(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 px-8"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Seminar"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* View Seminar Modal */}
        {selectedSeminar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    {selectedSeminar.topic}
                  </h2>
                  <button onClick={() => setSelectedSeminar(null)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Seminar Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Host Name</Label>
                          <p className="text-gray-900">
                            {selectedSeminar.host_name}
                          </p>
                        </div>
                        <div>
                          <Label>Country</Label>
                          <p className="text-gray-900">
                            {selectedSeminar.host_country}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label>Description</Label>
                        <p className="text-gray-700">
                          {selectedSeminar.description}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Date</Label>
                          <p className="text-gray-900">
                            {new Date(selectedSeminar.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div>
                          <Label>Time</Label>
                          <p className="text-gray-900">
                            {selectedSeminar.time}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Speakers ({selectedSeminar.speakers.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedSeminar.speakers.map((speaker, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 space-y-2"
                        >
                          <h4 className="font-medium">{speaker.name}</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>Qualification</Label>
                              <p className="text-gray-900">
                                {speaker.qualification}
                              </p>
                            </div>
                            <div>
                              <Label>Department</Label>
                              <p className="text-gray-900">
                                {speaker.department}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        handleTogglePublish(
                          selectedSeminar.id,
                          selectedSeminar.is_published
                        )
                      }
                      variant="outline"
                      className="mr-2"
                    >
                      {selectedSeminar.is_published ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Publish
                        </>
                      ) : (
                        <>
                          <CircleSlash className="mr-2 h-4 w-4" />
                          Unpublish
                        </>
                      )}
                    </Button>
                    <Button onClick={() => setSelectedSeminar(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
