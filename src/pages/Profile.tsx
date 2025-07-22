// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Badge } from "@/components/ui/badge";
// // import { Separator } from "@/components/ui/separator";
// // import {
// //   Shield,
// //   Edit,
// //   User,
// //   Activity,
// //   DollarSign,
// //   BookOpen,
// //   Users,
// //   Calendar,
// //   TrendingUp,
// //   ArrowLeft,
// // } from "lucide-react";
// // import { supabase } from "@/integrations/supabase/client";
// // import { useToast } from "@/hooks/use-toast";
// // import EditProfileModal from "@/components/profile/EditProfileModal";
// // import ProfilePictureUpload from "@/components/profile/ProfilePictureUpload";
// // import { UserProductsSection } from "@/components/profile/UserProductsSection";
// // import type { User as SupabaseUser } from "@supabase/supabase-js";

// // interface Profile {
// //   id: string;
// //   first_name: string | null;
// //   last_name: string | null;
// //   email: string | null;
// //   phone: string | null;
// //   bio: string | null;
// //   profile_image_url: string | null;
// //   date_of_birth: string | null;
// //   gender: string | null;
// //   city: string | null;
// //   country: string | null;
// //   medical_specialty: string | null;
// //   category: string | null;
// //   institution: string | null;
// //   degree_level: string | null;
// //   year_of_study: string | null;
// // }

// // interface Activity {
// //   id: string;
// //   activity_type: string;
// //   activity_description: string | null;
// //   points_earned: number | null;
// //   created_at: string;
// // }

// // interface Earning {
// //   id: string;
// //   earning_type: string;
// //   amount: number;
// //   currency: string | null;
// //   description: string | null;
// //   status: string | null;
// //   earned_at: string;
// // }

// // const Profile = () => {
// //   const [user, setUser] = useState<SupabaseUser | null>(null);
// //   const [profile, setProfile] = useState<Profile | null>(null);
// //   const [activities, setActivities] = useState<Activity[]>([]);
// //   const [earnings, setEarnings] = useState<Earning[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const { toast } = useToast();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     checkAuth();
// //   }, []);

// //   const checkAuth = async () => {
// //     try {
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();
// //       if (!session?.user) {
// //         navigate("/");
// //         return;
// //       }
// //       setUser(session.user);
// //       await fetchProfileData(
// //         session.user.id,
// //         session.user.email,
// //         session.user.phone
// //       );
// //     } catch (error) {
// //       console.error("Auth check error:", error);
// //       navigate("/");
// //     }
// //   };

// //   const fetchProfileData = async (
// //     userId: string,
// //     userEmail?: string,
// //     userPhone?: string
// //   ) => {
// //     try {
// //       setLoading(true);

// //       // Fetch profile
// //       const { data: profileData, error: profileError } = await supabase
// //         .from("profiles")
// //         .select("*")
// //         .eq("id", userId)
// //         .single();

// //       if (profileError && profileError.code !== "PGRST116") {
// //         throw profileError;
// //       }

// //       // If no profile exists, create one with email and phone from auth
// //       if (!profileData) {
// //         const { data: newProfile, error: createError } = await supabase
// //           .from("profiles")
// //           .insert({
// //             id: userId,
// //             email: userEmail || null,
// //             phone: userPhone || null,
// //           })
// //           .select()
// //           .single();

// //         if (createError) throw createError;
// //         setProfile(newProfile);
// //       } else {
// //         // Update profile with email and phone from auth if not already set
// //         const updates: Partial<Profile> = {};

// //         if (!profileData.email && userEmail) {
// //           updates.email = userEmail;
// //         }

// //         if (!profileData.phone && userPhone) {
// //           updates.phone = userPhone;
// //         }

// //         // If we have updates to make, update the profile
// //         if (Object.keys(updates).length > 0) {
// //           const { data: updatedProfile, error: updateError } = await supabase
// //             .from("profiles")
// //             .update(updates)
// //             .eq("id", userId)
// //             .select()
// //             .single();

// //           if (updateError) {
// //             console.error(
// //               "Error updating profile with auth data:",
// //               updateError
// //             );
// //             setProfile(profileData); // Use existing profile if update fails
// //           } else {
// //             setProfile(updatedProfile);
// //           }
// //         } else {
// //           setProfile(profileData);
// //         }
// //       }

// //       // Fetch activities
// //       const { data: activitiesData, error: activitiesError } = await supabase
// //         .from("user_activities")
// //         .select("*")
// //         .eq("user_id", userId)
// //         .order("created_at", { ascending: false })
// //         .limit(10);

// //       if (activitiesError) throw activitiesError;
// //       setActivities(activitiesData || []);

// //       // Fetch earnings
// //       const { data: earningsData, error: earningsError } = await supabase
// //         .from("user_earnings")
// //         .select("*")
// //         .eq("user_id", userId)
// //         .order("earned_at", { ascending: false });

// //       if (earningsError) throw earningsError;
// //       setEarnings(earningsData || []);
// //     } catch (error) {
// //       console.error("Error fetching profile data:", error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to load profile data. Please try again.",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleProfileUpdate = (updatedProfile: Profile) => {
// //     setProfile(updatedProfile);
// //     setShowEditModal(false);
// //     toast({
// //       title: "Success",
// //       description: "Profile updated successfully!",
// //     });
// //   };

// //   const handleProfileImageUpdate = (newImageUrl: string) => {
// //     if (profile) {
// //       setProfile((prev) =>
// //         prev ? { ...prev, profile_image_url: newImageUrl } : null
// //       );
// //     }
// //   };

// //   const totalEarnings = earnings.reduce(
// //     (sum, earning) => sum + Number(earning.amount),
// //     0
// //   );
// //   const totalPoints = activities.reduce(
// //     (sum, activity) => sum + (activity.points_earned || 0),
// //     0
// //   );

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b border-blue-100">
// //         <div className="container mx-auto px-4 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center space-x-4">
// //               <Button
// //                 variant="ghost"
// //                 onClick={() => navigate("/products")}
// //                 className="hover:bg-blue-50"
// //               >
// //                 <ArrowLeft className="h-4 w-4 mr-2" />
// //                 Back to Products
// //               </Button>
// //               <div className="flex items-center space-x-2">
// //                 <Shield className="h-8 w-8 text-blue-600" />
// //                 <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
// //               </div>
// //             </div>
// //             <Button
// //               onClick={() => setShowEditModal(true)}
// //               className="bg-blue-600 hover:bg-blue-700"
// //             >
// //               <Edit className="h-4 w-4 mr-2" />
// //               Edit Profile
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="container mx-auto px-4 py-8">
// //         {/* Profile Header */}
// //         <Card className="mb-8">
// //           <CardContent className="pt-6">
// //             <div className="flex items-start space-x-6">
// //               <ProfilePictureUpload
// //                 currentImageUrl={profile?.profile_image_url}
// //                 userInitial={
// //                   profile?.first_name?.charAt(0) ||
// //                   profile?.email?.charAt(0) ||
// //                   "U"
// //                 }
// //                 userId={profile?.id || ""}
// //                 onImageUpdate={handleProfileImageUpdate}
// //               />
// //               <div className="flex-1">
// //                 <h2 className="text-3xl font-bold text-gray-900 mb-2">
// //                   {profile?.first_name && profile?.last_name
// //                     ? `${profile.first_name} ${profile.last_name}`
// //                     : profile?.email || "User"}
// //                 </h2>
// //                 <p className="text-gray-600 mb-2">{profile?.email}</p>
// //                 {profile?.bio && <p className="text-gray-700">{profile.bio}</p>}
// //                 <div className="flex flex-wrap gap-2 mt-4">
// //                   {profile?.medical_specialty && (
// //                     <Badge
// //                       variant="outline"
// //                       className="bg-blue-50 text-blue-700 border-blue-200"
// //                     >
// //                       {profile.medical_specialty}
// //                     </Badge>
// //                   )}
// //                   {profile?.category && (
// //                     <Badge
// //                       variant="outline"
// //                       className="bg-green-50 text-green-700 border-green-200"
// //                     >
// //                       {profile.category}
// //                     </Badge>
// //                   )}
// //                   {profile?.institution && (
// //                     <Badge
// //                       variant="outline"
// //                       className="bg-purple-50 text-purple-700 border-purple-200"
// //                     >
// //                       {profile.institution}
// //                     </Badge>
// //                   )}
// //                 </div>
// //               </div>
// //               <div className="text-right">
// //                 <div className="bg-blue-50 rounded-lg p-4">
// //                   <div className="text-2xl font-bold text-blue-600">
// //                     {totalPoints}
// //                   </div>
// //                   <div className="text-sm text-blue-700">Total Points</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
// //           <Card>
// //             <CardContent className="pt-6">
// //               <div className="flex items-center space-x-2">
// //                 <DollarSign className="h-8 w-8 text-green-600" />
// //                 <div>
// //                   <div className="text-2xl font-bold text-gray-900">
// //                     ₹{totalEarnings.toFixed(2)}
// //                   </div>
// //                   <div className="text-sm text-gray-600">Total Earnings</div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardContent className="pt-6">
// //               <div className="flex items-center space-x-2">
// //                 <Activity className="h-8 w-8 text-blue-600" />
// //                 <div>
// //                   <div className="text-2xl font-bold text-gray-900">
// //                     {activities.length}
// //                   </div>
// //                   <div className="text-sm text-gray-600">Activities</div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardContent className="pt-6">
// //               <div className="flex items-center space-x-2">
// //                 <BookOpen className="h-8 w-8 text-purple-600" />
// //                 <div>
// //                   <div className="text-2xl font-bold text-gray-900">
// //                     {
// //                       activities.filter((a) =>
// //                         a.activity_type.includes("course")
// //                       ).length
// //                     }
// //                   </div>
// //                   <div className="text-sm text-gray-600">Courses</div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardContent className="pt-6">
// //               <div className="flex items-center space-x-2">
// //                 <Calendar className="h-8 w-8 text-orange-600" />
// //                 <div>
// //                   <div className="text-2xl font-bold text-gray-900">
// //                     {
// //                       activities.filter((a) =>
// //                         a.activity_type.includes("seminar")
// //                       ).length
// //                     }
// //                   </div>
// //                   <div className="text-sm text-gray-600">Seminars</div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Tabs Section */}
// //         <Tabs defaultValue="products" className="space-y-6">
// //           <TabsList className="grid w-full grid-cols-4">
// //             <TabsTrigger value="products">My Products</TabsTrigger>
// //             <TabsTrigger value="details">Personal Details</TabsTrigger>
// //             <TabsTrigger value="activities">Platform Activity</TabsTrigger>
// //             <TabsTrigger value="earnings">Earnings</TabsTrigger>
// //           </TabsList>

// //           <TabsContent value="products">
// //             {profile?.id && <UserProductsSection userId={profile.id} />}
// //           </TabsContent>

// //           <TabsContent value="details">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center space-x-2">
// //                   <User className="h-5 w-5" />
// //                   <span>Personal Information</span>
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div>
// //                     <label className="text-sm font-medium text-gray-600">
// //                       Email
// //                     </label>
// //                     <p className="text-gray-900">
// //                       {profile?.email || "Not provided"}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm font-medium text-gray-600">
// //                       Phone
// //                     </label>
// //                     <p className="text-gray-900">
// //                       {profile?.phone || "Not provided"}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm font-medium text-gray-600">
// //                       Date of Birth
// //                     </label>
// //                     <p className="text-gray-900">
// //                       {profile?.date_of_birth || "Not provided"}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm font-medium text-gray-600">
// //                       Gender
// //                     </label>
// //                     <p className="text-gray-900">
// //                       {profile?.gender || "Not provided"}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm font-medium text-gray-600">
// //                       City
// //                     </label>
// //                     <p className="text-gray-900">
// //                       {profile?.city || "Not provided"}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm font-medium text-gray-600">
// //                       Country
// //                     </label>
// //                     <p className="text-gray-900">
// //                       {profile?.country || "Not provided"}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm font-medium text-gray-600">
// //                       Degree Level
// //                     </label>
// //                     <p className="text-gray-900">
// //                       {profile?.degree_level || "Not provided"}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm font-medium text-gray-600">
// //                       Year of Study
// //                     </label>
// //                     <p className="text-gray-900">
// //                       {profile?.year_of_study || "Not provided"}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </TabsContent>

// //           <TabsContent value="activities">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center space-x-2">
// //                   <Activity className="h-5 w-5" />
// //                   <span>Recent Activities</span>
// //                 </CardTitle>
// //                 <CardDescription>
// //                   Your recent platform activities and earned points
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 {activities.length === 0 ? (
// //                   <p className="text-gray-500 text-center py-8">
// //                     No activities yet. Start exploring the platform!
// //                   </p>
// //                 ) : (
// //                   <div className="space-y-4">
// //                     {activities.map((activity) => (
// //                       <div
// //                         key={activity.id}
// //                         className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
// //                       >
// //                         <div>
// //                           <h4 className="font-medium text-gray-900 capitalize">
// //                             {activity.activity_type.replace("_", " ")}
// //                           </h4>
// //                           {activity.activity_description && (
// //                             <p className="text-sm text-gray-600">
// //                               {activity.activity_description}
// //                             </p>
// //                           )}
// //                           <p className="text-xs text-gray-500">
// //                             {new Date(activity.created_at).toLocaleDateString()}
// //                           </p>
// //                         </div>
// //                         {activity.points_earned && (
// //                           <Badge className="bg-blue-100 text-blue-800">
// //                             +{activity.points_earned} points
// //                           </Badge>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           </TabsContent>

// //           <TabsContent value="earnings">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center space-x-2">
// //                   <DollarSign className="h-5 w-5" />
// //                   <span>Earnings History</span>
// //                 </CardTitle>
// //                 <CardDescription>
// //                   Your income from platform activities
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 {earnings.length === 0 ? (
// //                   <p className="text-gray-500 text-center py-8">
// //                     No earnings yet. Start creating content or hosting seminars!
// //                   </p>
// //                 ) : (
// //                   <div className="space-y-4">
// //                     {earnings.map((earning) => (
// //                       <div
// //                         key={earning.id}
// //                         className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
// //                       >
// //                         <div>
// //                           <h4 className="font-medium text-gray-900 capitalize">
// //                             {earning.earning_type.replace("_", " ")}
// //                           </h4>
// //                           {earning.description && (
// //                             <p className="text-sm text-gray-600">
// //                               {earning.description}
// //                             </p>
// //                           )}
// //                           <p className="text-xs text-gray-500">
// //                             {new Date(earning.earned_at).toLocaleDateString()}
// //                           </p>
// //                         </div>
// //                         <div className="text-right">
// //                           <p className="font-bold text-green-600">
// //                             ₹{Number(earning.amount).toFixed(2)}{" "}
// //                             {earning.currency}
// //                           </p>
// //                           <Badge
// //                             variant={
// //                               earning.status === "completed"
// //                                 ? "default"
// //                                 : "secondary"
// //                             }
// //                             className={
// //                               earning.status === "completed"
// //                                 ? "bg-green-100 text-green-800"
// //                                 : ""
// //                             }
// //                           >
// //                             {earning.status}
// //                           </Badge>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           </TabsContent>
// //         </Tabs>
// //       </div>

// //       {/* Edit Profile Modal */}
// //       {showEditModal && profile && (
// //         <EditProfileModal
// //           profile={profile}
// //           isOpen={showEditModal}
// //           onClose={() => setShowEditModal(false)}
// //           onUpdate={handleProfileUpdate}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Profile;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   Shield,
//   Edit,
//   User,
//   Activity,
//   DollarSign,
//   BookOpen,
//   Users,
//   Calendar,
//   TrendingUp,
//   ArrowLeft,
//   Menu,
//   X,
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import EditProfileModal from "@/components/profile/EditProfileModal";
// import ProfilePictureUpload from "@/components/profile/ProfilePictureUpload";
// import { UserProductsSection } from "@/components/profile/UserProductsSection";
// import type { User as SupabaseUser } from "@supabase/supabase-js";

// interface Profile {
//   id: string;
//   first_name: string | null;
//   last_name: string | null;
//   email: string | null;
//   phone: string | null;
//   bio: string | null;
//   profile_image_url: string | null;
//   date_of_birth: string | null;
//   gender: string | null;
//   city: string | null;
//   country: string | null;
//   medical_specialty: string | null;
//   category: string | null;
//   institution: string | null;
//   degree_level: string | null;
//   year_of_study: string | null;
// }

// interface Activity {
//   id: string;
//   activity_type: string;
//   activity_description: string | null;
//   points_earned: number | null;
//   created_at: string;
// }

// interface Earning {
//   id: string;
//   earning_type: string;
//   amount: number;
//   currency: string | null;
//   description: string | null;
//   status: string | null;
//   earned_at: string;
// }

// const Profile = () => {
//   const [user, setUser] = useState<SupabaseUser | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [activities, setActivities] = useState<Activity[]>([]);
//   const [earnings, setEarnings] = useState<Earning[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       if (!session?.user) {
//         navigate("/");
//         return;
//       }
//       setUser(session.user);
//       await fetchProfileData(
//         session.user.id,
//         session.user.email,
//         session.user.phone
//       );
//     } catch (error) {
//       console.error("Auth check error:", error);
//       navigate("/");
//     }
//   };

//   const fetchProfileData = async (
//     userId: string,
//     userEmail?: string,
//     userPhone?: string
//   ) => {
//     try {
//       setLoading(true);

//       // Fetch profile
//       const { data: profileData, error: profileError } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", userId)
//         .single();

//       if (profileError && profileError.code !== "PGRST116") {
//         throw profileError;
//       }

//       // If no profile exists, create one with email and phone from auth
//       if (!profileData) {
//         const { data: newProfile, error: createError } = await supabase
//           .from("profiles")
//           .insert({
//             id: userId,
//             email: userEmail || null,
//             phone: userPhone || null,
//           })
//           .select()
//           .single();

//         if (createError) throw createError;
//         setProfile(newProfile);
//       } else {
//         // Update profile with email and phone from auth if not already set
//         const updates: Partial<Profile> = {};

//         if (!profileData.email && userEmail) {
//           updates.email = userEmail;
//         }

//         if (!profileData.phone && userPhone) {
//           updates.phone = userPhone;
//         }

//         // If we have updates to make, update the profile
//         if (Object.keys(updates).length > 0) {
//           const { data: updatedProfile, error: updateError } = await supabase
//             .from("profiles")
//             .update(updates)
//             .eq("id", userId)
//             .select()
//             .single();

//           if (updateError) {
//             console.error(
//               "Error updating profile with auth data:",
//               updateError
//             );
//             setProfile(profileData); // Use existing profile if update fails
//           } else {
//             setProfile(updatedProfile);
//           }
//         } else {
//           setProfile(profileData);
//         }
//       }

//       // Fetch activities
//       const { data: activitiesData, error: activitiesError } = await supabase
//         .from("user_activities")
//         .select("*")
//         .eq("user_id", userId)
//         .order("created_at", { ascending: false })
//         .limit(10);

//       if (activitiesError) throw activitiesError;
//       setActivities(activitiesData || []);

//       // Fetch earnings
//       const { data: earningsData, error: earningsError } = await supabase
//         .from("user_earnings")
//         .select("*")
//         .eq("user_id", userId)
//         .order("earned_at", { ascending: false });

//       if (earningsError) throw earningsError;
//       setEarnings(earningsData || []);
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load profile data. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProfileUpdate = (updatedProfile: Profile) => {
//     setProfile(updatedProfile);
//     setShowEditModal(false);
//     toast({
//       title: "Success",
//       description: "Profile updated successfully!",
//     });
//   };

//   const handleProfileImageUpdate = (newImageUrl: string) => {
//     if (profile) {
//       setProfile((prev) =>
//         prev ? { ...prev, profile_image_url: newImageUrl } : null
//       );
//     }
//   };

//   const totalEarnings = earnings.reduce(
//     (sum, earning) => sum + Number(earning.amount),
//     0
//   );
//   const totalPoints = activities.reduce(
//     (sum, activity) => sum + (activity.points_earned || 0),
//     0
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       {/* Mobile Menu Overlay */}
//       {mobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setMobileMenuOpen(false)}
//         ></div>
//       )}

//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-blue-100">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="ghost"
//                 onClick={() => navigate("/products")}
//                 className="hover:bg-blue-50 p-2"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//                 <span className="hidden sm:inline ml-2">Back to Products</span>
//               </Button>
//               <div className="flex items-center space-x-2">
//                 <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
//                 <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
//                   My Profile
//                 </h1>
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <Button
//                 onClick={() => setShowEditModal(true)}
//                 className="bg-blue-600 hover:bg-blue-700 hidden sm:flex"
//               >
//                 <Edit className="h-4 w-4 mr-2" />
//                 Edit Profile
//               </Button>

//               <Button
//                 variant="ghost"
//                 className="lg:hidden text-gray-700"
//                 onClick={() => setMobileMenuOpen(true)}
//               >
//                 <Menu className="h-6 w-6" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         {/* Profile Header */}
//         <Card className="mb-8">
//           <CardContent className="pt-6">
//             <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
//               <ProfilePictureUpload
//                 currentImageUrl={profile?.profile_image_url}
//                 userInitial={
//                   profile?.first_name?.charAt(0) ||
//                   profile?.email?.charAt(0) ||
//                   "U"
//                 }
//                 userId={profile?.id || ""}
//                 onImageUpdate={handleProfileImageUpdate}
//               />
//               <div className="flex-1">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
//                       {profile?.first_name && profile?.last_name
//                         ? `${profile.first_name} ${profile.last_name}`
//                         : profile?.email || "User"}
//                     </h2>
//                     <p className="text-gray-600 mb-2">{profile?.email}</p>
//                     {profile?.bio && (
//                       <p className="text-gray-700 text-sm sm:text-base">
//                         {profile.bio}
//                       </p>
//                     )}
//                   </div>
//                   <div className="mt-2 sm:mt-0 text-right">
//                     <div className="bg-blue-50 rounded-lg p-3 sm:p-4 inline-block">
//                       <div className="text-xl sm:text-2xl font-bold text-blue-600">
//                         {totalPoints}
//                       </div>
//                       <div className="text-xs sm:text-sm text-blue-700">
//                         Total Points
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-4">
//                   {profile?.medical_specialty && (
//                     <Badge
//                       variant="outline"
//                       className="bg-blue-50 text-blue-700 border-blue-200 text-xs sm:text-sm"
//                     >
//                       {profile.medical_specialty}
//                     </Badge>
//                   )}
//                   {profile?.category && (
//                     <Badge
//                       variant="outline"
//                       className="bg-green-50 text-green-700 border-green-200 text-xs sm:text-sm"
//                     >
//                       {profile.category}
//                     </Badge>
//                   )}
//                   {profile?.institution && (
//                     <Badge
//                       variant="outline"
//                       className="bg-purple-50 text-purple-700 border-purple-200 text-xs sm:text-sm"
//                     >
//                       {profile.institution}
//                     </Badge>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-8">
//           <Card className="col-span-1">
//             <CardContent className="pt-4 sm:pt-6">
//               <div className="flex items-center space-x-2">
//                 <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
//                 <div>
//                   <div className="text-lg sm:text-2xl font-bold text-gray-900">
//                     ₹{totalEarnings.toFixed(2)}
//                   </div>
//                   <div className="text-xs sm:text-sm text-gray-600">
//                     Total Earnings
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="col-span-1">
//             <CardContent className="pt-4 sm:pt-6">
//               <div className="flex items-center space-x-2">
//                 <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
//                 <div>
//                   <div className="text-lg sm:text-2xl font-bold text-gray-900">
//                     {activities.length}
//                   </div>
//                   <div className="text-xs sm:text-sm text-gray-600">
//                     Activities
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="col-span-1">
//             <CardContent className="pt-4 sm:pt-6">
//               <div className="flex items-center space-x-2">
//                 <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
//                 <div>
//                   <div className="text-lg sm:text-2xl font-bold text-gray-900">
//                     {
//                       activities.filter((a) =>
//                         a.activity_type.includes("course")
//                       ).length
//                     }
//                   </div>
//                   <div className="text-xs sm:text-sm text-gray-600">
//                     Courses
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="col-span-1">
//             <CardContent className="pt-4 sm:pt-6">
//               <div className="flex items-center space-x-2">
//                 <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
//                 <div>
//                   <div className="text-lg sm:text-2xl font-bold text-gray-900">
//                     {
//                       activities.filter((a) =>
//                         a.activity_type.includes("seminar")
//                       ).length
//                     }
//                   </div>
//                   <div className="text-xs sm:text-sm text-gray-600">
//                     Seminars
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Tabs Section */}
//         <Tabs defaultValue="products" className="space-y-6">
//           <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
//             <TabsTrigger value="products" className="text-xs sm:text-sm py-2">
//               My Products
//             </TabsTrigger>
//             <TabsTrigger value="details" className="text-xs sm:text-sm py-2">
//               Personal
//             </TabsTrigger>
//             <TabsTrigger value="activities" className="text-xs sm:text-sm py-2">
//               Activity
//             </TabsTrigger>
//             <TabsTrigger value="earnings" className="text-xs sm:text-sm py-2">
//               Earnings
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="products">
//             {profile?.id && <UserProductsSection userId={profile.id} />}
//           </TabsContent>

//           <TabsContent value="details">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <User className="h-4 w-4 sm:h-5 sm:w-5" />
//                   <span className="text-base sm:text-xl">
//                     Personal Information
//                   </span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   <div>
//                     <label className="text-xs sm:text-sm font-medium text-gray-600">
//                       Email
//                     </label>
//                     <p className="text-gray-900 text-sm sm:text-base">
//                       {profile?.email || "Not provided"}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-xs sm:text-sm font-medium text-gray-600">
//                       Phone
//                     </label>
//                     <p className="text-gray-900 text-sm sm:text-base">
//                       {profile?.phone || "Not provided"}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-xs sm:text-sm font-medium text-gray-600">
//                       Date of Birth
//                     </label>
//                     <p className="text-gray-900 text-sm sm:text-base">
//                       {profile?.date_of_birth || "Not provided"}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-xs sm:text-sm font-medium text-gray-600">
//                       Gender
//                     </label>
//                     <p className="text-gray-900 text-sm sm:text-base">
//                       {profile?.gender || "Not provided"}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-xs sm:text-sm font-medium text-gray-600">
//                       City
//                     </label>
//                     <p className="text-gray-900 text-sm sm:text-base">
//                       {profile?.city || "Not provided"}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-xs sm:text-sm font-medium text-gray-600">
//                       Country
//                     </label>
//                     <p className="text-gray-900 text-sm sm:text-base">
//                       {profile?.country || "Not provided"}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-xs sm:text-sm font-medium text-gray-600">
//                       Degree Level
//                     </label>
//                     <p className="text-gray-900 text-sm sm:text-base">
//                       {profile?.degree_level || "Not provided"}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-xs sm:text-sm font-medium text-gray-600">
//                       Year of Study
//                     </label>
//                     <p className="text-gray-900 text-sm sm:text-base">
//                       {profile?.year_of_study || "Not provided"}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="activities">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
//                   <span className="text-base sm:text-xl">
//                     Recent Activities
//                   </span>
//                 </CardTitle>
//                 <CardDescription className="text-xs sm:text-sm">
//                   Your recent platform activities and earned points
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {activities.length === 0 ? (
//                   <p className="text-gray-500 text-center py-8 text-sm sm:text-base">
//                     No activities yet. Start exploring the platform!
//                   </p>
//                 ) : (
//                   <div className="space-y-3 sm:space-y-4">
//                     {activities.map((activity) => (
//                       <div
//                         key={activity.id}
//                         className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"
//                       >
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-medium text-gray-900 text-sm sm:text-base capitalize truncate">
//                             {activity.activity_type.replace("_", " ")}
//                           </h4>
//                           {activity.activity_description && (
//                             <p className="text-xs sm:text-sm text-gray-600 truncate">
//                               {activity.activity_description}
//                             </p>
//                           )}
//                           <p className="text-xs text-gray-500">
//                             {new Date(activity.created_at).toLocaleDateString()}
//                           </p>
//                         </div>
//                         {activity.points_earned && (
//                           <Badge className="bg-blue-100 text-blue-800 text-xs sm:text-sm">
//                             +{activity.points_earned} points
//                           </Badge>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="earnings">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
//                   <span className="text-base sm:text-xl">Earnings History</span>
//                 </CardTitle>
//                 <CardDescription className="text-xs sm:text-sm">
//                   Your income from platform activities
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {earnings.length === 0 ? (
//                   <p className="text-gray-500 text-center py-8 text-sm sm:text-base">
//                     No earnings yet. Start creating content or hosting seminars!
//                   </p>
//                 ) : (
//                   <div className="space-y-3 sm:space-y-4">
//                     {earnings.map((earning) => (
//                       <div
//                         key={earning.id}
//                         className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"
//                       >
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-medium text-gray-900 text-sm sm:text-base capitalize truncate">
//                             {earning.earning_type.replace("_", " ")}
//                           </h4>
//                           {earning.description && (
//                             <p className="text-xs sm:text-sm text-gray-600 truncate">
//                               {earning.description}
//                             </p>
//                           )}
//                           <p className="text-xs text-gray-500">
//                             {new Date(earning.earned_at).toLocaleDateString()}
//                           </p>
//                         </div>
//                         <div className="text-right min-w-[100px]">
//                           <p className="font-bold text-green-600 text-sm sm:text-base">
//                             ₹{Number(earning.amount).toFixed(2)}{" "}
//                             {earning.currency}
//                           </p>
//                           <Badge
//                             variant={
//                               earning.status === "completed"
//                                 ? "default"
//                                 : "secondary"
//                             }
//                             className={
//                               earning.status === "completed"
//                                 ? "bg-green-100 text-green-800 text-xs sm:text-sm"
//                                 : "text-xs sm:text-sm"
//                             }
//                           >
//                             {earning.status}
//                           </Badge>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Edit Profile Modal */}
//       {showEditModal && profile && (
//         <EditProfileModal
//           profile={profile}
//           isOpen={showEditModal}
//           onClose={() => setShowEditModal(false)}
//           onUpdate={handleProfileUpdate}
//         />
//       )}

//       {/* Mobile Edit Button */}
//       <div className="fixed bottom-4 right-4 z-10 sm:hidden">
//         <Button
//           onClick={() => setShowEditModal(true)}
//           className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 shadow-lg"
//           size="icon"
//         >
//           <Edit className="h-5 w-5" />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Edit,
  User,
  Activity,
  DollarSign,
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  ArrowLeft,
  Menu,
  X,
  Home,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EditProfileModal from "@/components/profile/EditProfileModal";
import ProfilePictureUpload from "@/components/profile/ProfilePictureUpload";
import { UserProductsSection } from "@/components/profile/UserProductsSection";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import logo from "@/image/thefuturemed_logo (1).jpg";

import Footer from "@/footer/Footer";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
  profile_image_url: string | null;
  date_of_birth: string | null;
  gender: string | null;
  city: string | null;
  country: string | null;
  medical_specialty: string | null;
  category: string | null;
  institution: string | null;
  degree_level: string | null;
  year_of_study: string | null;
}

interface Activity {
  id: string;
  activity_type: string;
  activity_description: string | null;
  points_earned: number | null;
  created_at: string;
}

interface Earning {
  id: string;
  earning_type: string;
  amount: number;
  currency: string | null;
  description: string | null;
  status: string | null;
  earned_at: string;
}

const Profile = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/");
        return;
      }
      setUser(session.user);
      await fetchProfileData(
        session.user.id,
        session.user.email,
        session.user.phone
      );
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/");
    }
  };

  const fetchProfileData = async (
    userId: string,
    userEmail?: string,
    userPhone?: string
  ) => {
    try {
      setLoading(true);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError;
      }

      // If no profile exists, create one with email and phone from auth
      if (!profileData) {
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert({
            id: userId,
            email: userEmail || null,
            phone: userPhone || null,
          })
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
      } else {
        // Update profile with email and phone from auth if not already set
        const updates: Partial<Profile> = {};

        if (!profileData.email && userEmail) {
          updates.email = userEmail;
        }

        if (!profileData.phone && userPhone) {
          updates.phone = userPhone;
        }

        // If we have updates to make, update the profile
        if (Object.keys(updates).length > 0) {
          const { data: updatedProfile, error: updateError } = await supabase
            .from("profiles")
            .update(updates)
            .eq("id", userId)
            .select()
            .single();

          if (updateError) {
            console.error(
              "Error updating profile with auth data:",
              updateError
            );
            setProfile(profileData); // Use existing profile if update fails
          } else {
            setProfile(updatedProfile);
          }
        } else {
          
          setProfile(profileData);
        }
      }

      // Fetch activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from("user_activities")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (activitiesError) throw activitiesError;
      setActivities(activitiesData || []);

      // Fetch earnings
      const { data: earningsData, error: earningsError } = await supabase
        .from("user_earnings")
        .select("*")
        .eq("user_id", userId)
        .order("earned_at", { ascending: false });

      if (earningsError) throw earningsError;
      setEarnings(earningsData || []);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast({
        title: "Error",
        description: "Failed to load profile data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setShowEditModal(false);
    toast({
      title: "Success",
      description: "Profile updated successfully!",
    });
  };

  const handleProfileImageUpdate = (newImageUrl: string) => {
    if (profile) {
      setProfile((prev) =>
        prev ? { ...prev, profile_image_url: newImageUrl } : null
      );
    }
  };

  const totalEarnings = earnings.reduce(
    (sum, earning) => sum + Number(earning.amount),
    0
  );
  const totalPoints = activities.reduce(
    (sum, activity) => sum + (activity.points_earned || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-end">
          <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-4">
          <div className="mt-6">
            <Button
              variant="ghost"
              className="w-full justify-start mb-2"
              onClick={() => {
                setShowEditModal(true);
                setMobileMenuOpen(false);
              }}
            >
              <Edit className="h-4 w-4" />
              <span className="ml-2">Edit Profile</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate("/")}
            >
              <Home className="h-4 w-4" />
              <span className="ml-2">Home</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="hover:bg-blue-50 p-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Back to Dashboard</span>
              </Button>
              {/* <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  My Profile
                </h1>
              </div> */}
              <div className="flex items-center space-x-2">
                {/* <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setShowEditModal(true)}
                className="bg-blue-600 hover:bg-blue-700 hidden sm:flex"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>

              <Button
                variant="ghost"
                className="lg:hidden text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <ProfilePictureUpload
                currentImageUrl={profile?.profile_image_url}
                userInitial={
                  profile?.first_name?.charAt(0) ||
                  profile?.email?.charAt(0) ||
                  "U"
                }
                userId={profile?.id || ""}
                onImageUpdate={handleProfileImageUpdate}
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                      {profile?.first_name && profile?.last_name
                        ? `${profile.first_name} ${profile.last_name}`
                        : profile?.email || "User"}
                    </h2>
                    <p className="text-gray-600 mb-2">{profile?.email}</p>
                    {profile?.bio && (
                      <p className="text-gray-700 text-sm sm:text-base">
                        {profile.bio}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <div className="bg-blue-50 rounded-lg p-3 sm:p-4 inline-block">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">
                        {totalPoints}
                      </div>
                      <div className="text-xs sm:text-sm text-blue-700">
                        Total Points
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {profile?.medical_specialty && (
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200 text-xs sm:text-sm"
                    >
                      {profile.medical_specialty}
                    </Badge>
                  )}
                  {profile?.category && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 text-xs sm:text-sm"
                    >
                      {profile.category}
                    </Badge>
                  )}
                  {profile?.institution && (
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700 border-purple-200 text-xs sm:text-sm"
                    >
                      {profile.institution}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-8">
          <Card className="col-span-1">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">
                    ₹{totalEarnings.toFixed(2)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Total Earnings
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">
                    {activities.length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Activities
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">
                    {
                      activities.filter((a) =>
                        a.activity_type.includes("course")
                      ).length
                    }
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Courses
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">
                    {
                      activities.filter((a) =>
                        a.activity_type.includes("seminar")
                      ).length
                    }
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Seminars
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
            <TabsTrigger value="products" className="text-xs sm:text-sm py-2">
              My Products
            </TabsTrigger>
            <TabsTrigger value="details" className="text-xs sm:text-sm py-2">
              Personal
            </TabsTrigger>
            <TabsTrigger value="activities" className="text-xs sm:text-sm py-2">
              Activity
            </TabsTrigger>
            <TabsTrigger value="earnings" className="text-xs sm:text-sm py-2">
              Earnings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            {profile?.id && <UserProductsSection userId={profile.id} />}
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-base sm:text-xl">
                    Personal Information
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {profile?.email || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-600">
                      Phone
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {profile?.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-600">
                      Date of Birth
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {profile?.date_of_birth || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-600">
                      Gender
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {profile?.gender || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-600">
                      City
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {profile?.city || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-600">
                      Country
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {profile?.country || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-600">
                      Degree Level
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {profile?.degree_level || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-600">
                      Year of Study
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {profile?.year_of_study || "Not provided"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-base sm:text-xl">
                    Recent Activities
                  </span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Your recent platform activities and earned points
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activities.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 text-sm sm:text-base">
                    No activities yet. Start exploring the platform!
                  </p>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base capitalize truncate">
                            {activity.activity_type.replace("_", " ")}
                          </h4>
                          {activity.activity_description && (
                            <p className="text-xs sm:text-sm text-gray-600 truncate">
                              {activity.activity_description}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {new Date(activity.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        {activity.points_earned && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs sm:text-sm">
                            +{activity.points_earned} points
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-base sm:text-xl">Earnings History</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Your income from platform activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {earnings.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 text-sm sm:text-base">
                    No earnings yet. Start creating content or hosting seminars!
                  </p>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {earnings.map((earning) => (
                      <div
                        key={earning.id}
                        className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base capitalize truncate">
                            {earning.earning_type.replace("_", " ")}
                          </h4>
                          {earning.description && (
                            <p className="text-xs sm:text-sm text-gray-600 truncate">
                              {earning.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {new Date(earning.earned_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right min-w-[100px]">
                          <p className="font-bold text-green-600 text-sm sm:text-base">
                            ₹{Number(earning.amount).toFixed(2)}{" "}
                            {earning.currency}
                          </p>
                          <Badge
                            variant={
                              earning.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              earning.status === "completed"
                                ? "bg-green-100 text-green-800 text-xs sm:text-sm"
                                : "text-xs sm:text-sm"
                            }
                          >
                            {earning.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && profile && (
        <EditProfileModal
          profile={profile}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleProfileUpdate}
        />
      )}

      {/* Mobile Edit Button */}
      <div className="fixed bottom-4 right-4 z-10 sm:hidden">
        <Button
          onClick={() => setShowEditModal(true)}
          className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 shadow-lg"
          size="icon"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;