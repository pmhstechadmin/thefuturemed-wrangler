// import React, { useEffect, useState } from 'react';
// import { supabase } from '@/integrations/supabase/client';
// import { Card, CardHeader, CardTitle, CardContent, CardDescription, } from '@/components/ui/card';
// import {
//   Search,
//   MapPin,
//   Clock,
//   DollarSign,
//   Briefcase,
//   Building,
//   X,
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// const SaveJob = () => {
//   const [savedJobs, setSavedJobs] = useState([]);
//   const [user, setUser] = useState(null);
//   const [selectedJobId, setSelectedJobId] = useState(null);
// const [selectedSeekerId, setSelectedSeekerId] = useState(null);


//   useEffect(() => {
//     const fetchUserAndSavedJobs = async () => {
//       const { data: sessionData } = await supabase.auth.getSession();
//       const currentUser = sessionData?.session?.user;
//       if (!currentUser) return;

//       setUser(currentUser);

//       // 1. Get all saved job entries for the user
//       const { data: savedEntries, error: savedError } = await supabase
//         .from('save_jobs')
//         .select('job_providers_id')
//         .eq('user_id', currentUser.id);

//       if (savedError) {
//         console.error('❌ Error fetching saved jobs:', savedError);
//         return;
//       }

//       const jobIds = savedEntries.map((entry) => entry.job_providers_id);

//       if (jobIds.length === 0) {
//         setSavedJobs([]);
//         return;
//       }

//       // 2. Fetch job details from job_providers
//       const { data: jobs, error: jobError } = await supabase
//         .from('job_providers')
//         .select('*')
//         .in('id', jobIds);

//       if (jobError) {
//         console.error('❌ Error fetching job details:', jobError);
//       } else {
//         setSavedJobs(jobs);
//       }
//     };

//     fetchUserAndSavedJobs();
//   }, []);

//   return (
//     <div className="p-4 space-y-4">
//   <h2 className="text-2xl font-bold">Saved Jobs</h2>
//   <div className="grid gap-6">
//     {savedJobs.length === 0 ? (
//       <p className="text-gray-600">No saved job.</p>
//     ) : (
//       savedJobs.map((job) => (
//         <Card key={job.id} className="hover:shadow-lg transition-shadow">
//           <CardHeader>
//             <div className="flex items-start justify-between">
//               <div className="space-y-2">
//                 <CardTitle className="text-xl text-blue-600 hover:text-blue-700 cursor-pointer">
//                   {job.title}
//                 </CardTitle>
//                 <CardDescription className="text-lg font-medium text-gray-900 flex items-center gap-2">
//                   <Building className="h-4 w-4" />
//                   {job.organization_name}
//                 </CardDescription>
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => alert("Feature: Apply from saved jobs coming soon.")}
//               >
//                 Apply Now
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                 <div className="flex items-center">
//                   <MapPin className="mr-1 h-4 w-4" />
//                   {job.google_location}
//                 </div>
//                 <div className="flex items-center">
//                   <Briefcase className="mr-1 h-4 w-4" />
//                   {job.organization_type}
//                 </div>
//                 <div className="flex items-center">
//                   <DollarSign className="mr-1 h-4 w-4" />
//                   {job.salary}
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="mr-1 h-4 w-4" />
//                   Posted on{" "}
//                   {new Date(job.updated_at).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </div>
//               </div>

//               <p className="text-gray-700 leading-relaxed">{job.description}</p>

//               <div className="flex flex-wrap gap-2">
//                 {Array.isArray(job.tags) &&
//                   job.tags.map((tag, index) => (
//                     <Badge
//                       key={index}
//                       variant="secondary"
//                       className="bg-blue-100 text-blue-800"
//                     >
//                       {tag}
//                     </Badge>
//                   ))}
//               </div>
//                   <div className="flex gap-3 pt-4">
//                                 <Button
//                                   className="bg-blue-600 hover:bg-blue-700"
//                                   onClick={() => {
//                                     setSelectedJobId(job.id);
//                                     setSelectedSeekerId(null);
//                                   }}
//                                 >
//                                   Apply Now
//                                 </Button>






//                               </div>
//             </div>
//           </CardContent>
//         </Card>

//       ))
//     )}

//   </div>

// </div>

//   );
// };

// export default SaveJob;




import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, } from '@/components/ui/card';
import {
    Search,
    MapPin,
    Clock,
    DollarSign,
    Briefcase,
    Building,
    X,
     ArrowLeft,
      Shield,
      UserPlus,
       Home,
        User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate,Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import logo from "@/image/thefuturemed_logo (1).jpg";
<<<<<<< HEAD
=======
import Footer from '@/footer/Footer';
>>>>>>> 8c4c5c5addf49b5f79e7d037752dae9cad5d1ae0

const SaveJob = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [selectedSeekerId, setSelectedSeekerId] = useState(null);
     const [jobSeekers, setJobSeekers] = useState([]);
  const [appliedSeekerIds, setAppliedSeekerIds] = useState([]);
   const navigate = useNavigate();
     const { toast } = useToast();

 const handleBackNavigation = () => {
    navigate(-1);
  };

    const handleSignOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setUser(null);
        toast({ title: "Signed Out", description: "You have been signed out." });
      }
    };

    useEffect(() => {
        const fetchUserAndSavedJobs = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            const currentUser = sessionData?.session?.user;
            if (!currentUser) return;

            setUser(currentUser);

            // 1. Get all saved job entries for the user
            const { data: savedEntries, error: savedError } = await supabase
                .from('save_jobs')
                .select('job_providers_id')
                .eq('user_id', currentUser.id);

            if (savedError) {
                console.error('❌ Error fetching saved jobs:', savedError);
                return;
            }

            const jobIds = savedEntries.map((entry) => entry.job_providers_id);

            if (jobIds.length === 0) {
                setSavedJobs([]);
                return;
            }

            // 2. Fetch job details from job_providers
            const { data: jobs, error: jobError } = await supabase
                .from('job_providers')
                .select('*')
                .in('id', jobIds);

            if (jobError) {
                console.error('❌ Error fetching job details:', jobError);
            } else {
                setSavedJobs(jobs);
            }
        };

        fetchUserAndSavedJobs();
    }, []);


    const handleApplyOnBehalf = async (seekerId) => {
        const selectedSeeker = jobSeekers.find(seeker => seeker.id === seekerId);
    
        const { data: existingApplications, error: fetchError } = await supabase
          .from("job_applications")
          .select("*")
          .eq("job_providers_id", selectedJobId)
    
          .eq("job_seekers_id", seekerId)
          .limit(1);
    
        if (fetchError) {
          console.error("Error checking existing application:", fetchError);
          alert("Error checking application status.");
          return;
        }
    
        if (existingApplications.length > 0) {
          alert(`⚠️ This seeker has already applied for this job.`);
          return;
        }
    
        console.log("📤 Applying with data:", {
          job_providers_id: selectedJobId,
          job_seekers_id: seekerId,
          seeker_profile: selectedSeeker,
        });
    
        try {
          const { error } = await supabase.from("job_applications").insert([
            {
              job_providers_id: selectedJobId,
              job_seekers_id: seekerId,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
          ]);
    
          if (error) {
            console.error("Insert error:", error);
            alert("Failed to apply.");
          } else {
            // alert("✅ Application submitted successfully.");
            setAppliedSeekerIds((prev) => [...prev, seekerId]);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("Something went wrong.");
        }
      };


        useEffect(() => {
          const fetchJobSeekers = async () => {
            const {
              data: { user },
            } = await supabase.auth.getUser();
            if (!user) return;
      
            const { data, error } = await supabase
              .from("job_seekers")
              .select("*")
              .eq("user_id", user.id);
            if (error) {
              console.error("Error fetching seekers:", error);
            } else {
              console.log("✅ Job Seekers Datazzzzzzzzzzzzzzz:", data);
              setJobSeekers(data);
            }
          };
          fetchJobSeekers();
        }, []);

        useEffect(() => {
  const fetchAppliedSeekers = async () => {
    if (!selectedJobId || !user) return;

    const { data, error } = await supabase
      .from("job_applications")
      .select("job_seekers_id")
      .eq("job_providers_id", selectedJobId);

    if (error) {
      console.error("❌ Error fetching applied seekers:", error);
    } else {
      const seekerIds = data.map((entry) => entry.job_seekers_id);
      console.log("✅ Already applied seeker IDs:", seekerIds);
      setAppliedSeekerIds(seekerIds);
    }
  };

  fetchAppliedSeekers();
}, [selectedJobId, user]);


<<<<<<< HEAD
const handleUnsaveJob = async (jobId) => {
  if (!user) return;

  const { error } = await supabase
    .from("save_jobs")
    .delete()
    .eq("user_id", user.id)
    .eq("job_providers_id", jobId);

  if (error) {
    console.error("❌ Error unsaving job:", error);
    toast({
      title: "Failed to Unsave",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  } else {
    toast({
      title: "Job Unsaved",
      description: "✅ The job has been removed from your saved list.",
    });
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
  }
};


=======
>>>>>>> 8c4c5c5addf49b5f79e7d037752dae9cad5d1ae0
    return (
      <div className="p-4 space-y-4">
        <header className="bg-black border-b border-white/20 sticky top-0 z-50 shadow-xl">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleBackNavigation}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {/* <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">MedPortal</h1>
            </Link> */}
              <div className="flex items-center space-x-2">
                {/* <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1> */}
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                    Welcome, {user.email}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/profile")}
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    Sign Out
                  </Button>
                </>
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
                      <UserPlus className="mr-2 h-4 w-4" /> Sign In
                    </Button>
                  </Link>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
              >
                <Home className="mr-2 h-4 w-4" /> Home
              </Button>
            </div>
          </div>
        </header>

        <h2 className="text-2xl font-bold">Saved Jobs</h2>
        <div className="grid gap-6">
          {savedJobs.length === 0 ? (
            <p className="text-gray-600">No saved job.</p>
          ) : (
            savedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-blue-600 hover:text-blue-700 cursor-pointer">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {job.organization_name}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        alert("Feature: Apply from saved jobs coming soon.")
                      }
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {job.google_location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {job.organization_type}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        Posted on{" "}
                        {new Date(job.updated_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(job.tags) &&
                        job.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-blue-100 text-blue-800"
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setSelectedSeekerId(null);
                        }}
                      >
                        Apply Now
                      </Button>
<<<<<<< HEAD

       <Button
  className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white"
  onClick={() => handleUnsaveJob(job.id)}
>
  Unsave
</Button>


=======
>>>>>>> 8c4c5c5addf49b5f79e7d037752dae9cad5d1ae0
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {selectedJobId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-lg">
              <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                onClick={() => {
                  setSelectedJobId(null);
                  setSelectedSeekerId(null);
                }}
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-bold mb-4">Job Seeker Profiles</h2>

              {jobSeekers.map((seeker) => (
                <Card
                  key={seeker.id}
                  className={`mb-4 ${
                    selectedSeekerId === seeker.id
                      ? "border-2 border-blue-600"
                      : "border"
                  }`}
                >
                  <CardHeader>
                    <CardTitle>{seeker.highest_qualification}</CardTitle>
                    <CardDescription>{seeker.specialization}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>
                      <strong>Skills:</strong>{" "}
                      {Array.isArray(seeker.skills)
                        ? seeker.skills.join(", ")
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Experience:</strong>{" "}
                      {seeker.years_of_experience || "N/A"} years
                    </p>
                    <p>
                      <strong>Preferred Location:</strong>{" "}
                      {seeker.preferred_location}
                    </p>
                    <p>
                      <strong>Availability:</strong> {seeker.availability}
                    </p>
                    <p>
                      <strong>Email:</strong> {seeker.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {seeker.phone}
                    </p>

                    {appliedSeekerIds.includes(seeker.id) ? (
                      <Button
                        className="mt-3 bg-gray-400 cursor-not-allowed"
                        disabled
                      >
                        Applied
                      </Button>
                    ) : (
                      <Button
                        className="mt-3 bg-green-600 hover:bg-green-700"
                        onClick={() => handleApplyOnBehalf(seeker.id)}
                      >
                        Apply Here
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
<<<<<<< HEAD
=======
        <Footer/>
>>>>>>> 8c4c5c5addf49b5f79e7d037752dae9cad5d1ae0
      </div>
    );
};

export default SaveJob;
