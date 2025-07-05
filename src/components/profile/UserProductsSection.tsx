
// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { useToast } from '@/hooks/use-toast';
// import { 
//   FileText, 
//   Users, 
//   Calendar, 
//   BookOpen, 
//   Briefcase, 
//   Edit, 
//   Eye, 
//   DollarSign,
//   TrendingUp,
//   Save,
// } from 'lucide-react';

// interface UserProducts {
//   seminars: any[];
//   courses: any[];
//   publications: any[];
//   jobPostings: any[];
// }

// interface UserProductsSectionProps {
//   userId: string;
// }

// export const UserProductsSection = ({ userId }: UserProductsSectionProps) => {
//   const [products, setProducts] = useState<UserProducts>({
//     seminars: [],
//     courses: [],
//     publications: [],
//     jobPostings: []
//   });
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userId) {
//       fetchUserProducts();
//     }
//   }, [userId]);

//   const fetchUserProducts = async () => {
//     try {
//       setLoading(true);

//       // Fetch user's seminars
//       const { data: seminars, error: seminarsError } = await supabase
//         .from('seminars')
//         .select('*')
//         .eq('host_id', userId);

//       if (seminarsError) throw seminarsError;

//       // Fetch user's courses
//       const { data: courses, error: coursesError } = await supabase
//         .from('courses')
//         .select('*')
//         .eq('creator_id', userId);

//       if (coursesError) throw coursesError;

//       // Fetch user's job postings (if they're a job provider)
//       const { data: jobProviders, error: jobProvidersError } = await supabase
//         .from('job_providers')
//         .select('*')
//         .eq('user_id', userId);

//       if (jobProvidersError) throw jobProvidersError;

//       // For now, publications will be empty since we don't have the table yet
//       // This will be updated when the publications table is created
//       const publications: any[] = [];

//       setProducts({
//         seminars: seminars || [],
//         courses: courses || [],
//         publications,
//         jobPostings: jobProviders || []
//       });

//     } catch (error) {
//       console.error('Error fetching user products:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load your posted products.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNavigateToProduct = (type: string, id?: string) => {
//     switch (type) {
//       case 'seminars':
//         navigate('/e-seminar');
//         break;
//       case 'courses':
//         navigate('/e-learning');
//         break;
//       case 'publications':
//         navigate('/publication');
//         break;
//       case 'jobs':
//         navigate('/my-job');
//         break;
//           case 'saved-job':
//         navigate('/saved-job');
//         break;
//          case 'saved-candidates':
//         navigate('/saved-candidates');
//         break;
//       case 'seminar-detail':
//         if (id) navigate(`/seminar/${id}`);
//         break;
//       case 'course-detail':
//         if (id) navigate(`/course/${id}`);
//         break;
//       default:
//         break;
//     }
//   };

//   if (loading) {
//     return (
//       <Card>
//         <CardContent className="py-8">
//           <div className="text-center">Loading your products...</div>
//         </CardContent>
//       </Card>
//     );
//   }

//   const totalProducts = products.seminars.length + products.courses.length + 
//                        products.publications.length + products.jobPostings.length;

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <TrendingUp className="h-5 w-5" />
//           My Posted Products ({totalProducts})
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         {totalProducts === 0 ? (
//           <div className="text-center py-8 text-gray-500">
//             <p className="mb-4">You haven't posted any products yet.</p>
//             <div className="flex flex-wrap gap-2 justify-center">
//               <Button onClick={() => handleNavigateToProduct('seminars')} variant="outline" size="sm">
//                 Host Seminar
//               </Button>
//               <Button onClick={() => handleNavigateToProduct('courses')} variant="outline" size="sm">
//                 Create Course
//               </Button>
//               <Button onClick={() => handleNavigateToProduct('publications')} variant="outline" size="sm">
//                 Submit Publication
//               </Button>
//               <Button onClick={() => handleNavigateToProduct('jobs')} variant="outline" size="sm">
//                 Post Job
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {/* Seminars Section */}
//             {products.seminars.length > 0 && (
//               <div>
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="text-lg font-semibold flex items-center gap-2">
//                     <Calendar className="h-5 w-5 text-blue-600" />
//                     Seminars ({products.seminars.length})
//                   </h3>
//                   <Button 
//                     onClick={() => handleNavigateToProduct('seminars')} 
//                     variant="outline" 
//                     size="sm"
//                   >
//                     Manage Seminars
//                   </Button>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {products.seminars.slice(0, 4).map((seminar) => (
//                     <Card key={seminar.id} className="bg-blue-50 border-blue-200">
//                       <CardContent className="p-4">
//                         <h4 className="font-medium text-sm mb-2">{seminar.topic}</h4>
//                         <div className="flex items-center justify-between text-xs text-gray-600">
//                           <span>{new Date(seminar.date).toLocaleDateString()}</span>
//                           <div className="flex gap-1">
//                             <Button 
//                               onClick={() => handleNavigateToProduct('seminar-detail', seminar.id)}
//                               size="sm" 
//                               variant="ghost"
//                               className="h-6 px-2"
//                             >
//                               <Eye className="h-3 w-3" />
//                             </Button>
//                             <Button 
//                               onClick={() => handleNavigateToProduct('seminars')}
//                               size="sm" 
//                               variant="ghost"
//                               className="h-6 px-2"
//                             >
//                               <Edit className="h-3 w-3" />
//                             </Button>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//                 {products.seminars.length > 4 && (
//                   <Button 
//                     onClick={() => handleNavigateToProduct('seminars')} 
//                     variant="link" 
//                     className="mt-2"
//                   >
//                     View all {products.seminars.length} seminars
//                   </Button>
//                 )}
//               </div>
//             )}

//             {/* Courses Section */}
//             {products.courses.length > 0 && (
//               <>
//                 <Separator />
//                 <div>
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className="text-lg font-semibold flex items-center gap-2">
//                       <BookOpen className="h-5 w-5 text-green-600" />
//                       Courses ({products.courses.length})
//                     </h3>
//                     <Button 
//                       onClick={() => handleNavigateToProduct('courses')} 
//                       variant="outline" 
//                       size="sm"
//                     >
//                       Manage Courses
//                     </Button>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {products.courses.slice(0, 4).map((course) => (
//                       <Card key={course.id} className="bg-green-50 border-green-200">
//                         <CardContent className="p-4">
//                           <h4 className="font-medium text-sm mb-2">{course.title}</h4>
//                           <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
//                             <Badge variant="outline" className="text-xs">
//                               {course.status}
//                             </Badge>
//                             <span>{course.duration_months} months</span>
//                           </div>
//                           <div className="flex justify-end gap-1">
//                             <Button 
//                               onClick={() => handleNavigateToProduct('course-detail', course.id)}
//                               size="sm" 
//                               variant="ghost"
//                               className="h-6 px-2"
//                             >
//                               <Eye className="h-3 w-3" />
//                             </Button>
//                             <Button 
//                               onClick={() => handleNavigateToProduct('courses')}
//                               size="sm" 
//                               variant="ghost"
//                               className="h-6 px-2"
//                             >
//                               <Edit className="h-3 w-3" />
//                             </Button>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                   {products.courses.length > 4 && (
//                     <Button 
//                       onClick={() => handleNavigateToProduct('courses')} 
//                       variant="link" 
//                       className="mt-2"
//                     >
//                       View all {products.courses.length} courses
//                     </Button>
//                   )}
//                 </div>
//               </>
//             )}

//             {/* Publications Section */}
//             {products.publications.length > 0 && (
//               <>
//                 <Separator />
//                 <div>
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className="text-lg font-semibold flex items-center gap-2">
//                       <FileText className="h-5 w-5 text-purple-600" />
//                       Publications ({products.publications.length})
//                     </h3>
//                     <Button 
//                       onClick={() => handleNavigateToProduct('publications')} 
//                       variant="outline" 
//                       size="sm"
//                     >
//                       Manage Publications
//                     </Button>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {products.publications.slice(0, 4).map((publication) => (
//                       <Card key={publication.id} className="bg-purple-50 border-purple-200">
//                         <CardContent className="p-4">
//                           <h4 className="font-medium text-sm mb-2">{publication.title}</h4>
//                           <div className="flex items-center justify-between text-xs text-gray-600">
//                             <Badge variant="outline" className="text-xs">
//                               {publication.status}
//                             </Badge>
//                             <div className="flex gap-1">
//                               <Button size="sm" variant="ghost" className="h-6 px-2">
//                                 <Eye className="h-3 w-3" />
//                               </Button>
//                               <Button size="sm" variant="ghost" className="h-6 px-2">
//                                 <Edit className="h-3 w-3" />
//                               </Button>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Job Postings Section */}
//             {products.jobPostings.length > 0 && (
//               <>
//                 <Separator />
//                 <div>
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className="text-lg font-semibold flex items-center gap-2">
//                       <Briefcase className="h-5 w-5 text-orange-600" />
//                       Job Postings ({products.jobPostings.length})
//                     </h3>
//                     <Button 
//                       onClick={() => handleNavigateToProduct('jobs')} 
//                       variant="outline" 
//                       size="sm"
//                     >
//                       Manage Jobs
//                     </Button>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {products.jobPostings.slice(0, 4).map((job) => (
//                       <Card key={job.id} className="bg-orange-50 border-orange-200">
//                         <CardContent className="p-4">
//                           <h4 className="font-medium text-sm mb-2">{job.organization_name}</h4>
//                           <div className="flex items-center justify-between text-xs text-gray-600">
//                             <span>{job.department || 'General'}</span>
//                             <div className="flex gap-1">
//                               <Button size="sm" variant="ghost" className="h-6 px-2">
//                                 <Eye className="h-3 w-3" />
//                               </Button>
//                               <Button 
//                                 onClick={() => handleNavigateToProduct('jobs')}
//                                 size="sm" 
//                                 variant="ghost" 
//                                 className="h-6 px-2"
//                               >
//                                 <Edit className="h-3 w-3" />
//                               </Button>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                   {products.jobPostings.length > 4 && (
//                     <Button 
//                       onClick={() => handleNavigateToProduct('jobs')} 
//                       variant="link" 
//                       className="mt-2"
//                     >
//                       View all {products.jobPostings.length} job postings
//                     </Button>
//                   )}
//                 </div>
//               </>
//             )}


            

//             {/* Quick Actions */}
//             <Separator />
//             <div>
//               <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
//               <div className="flex flex-wrap gap-2">
//                 <Button onClick={() => handleNavigateToProduct('seminars')} variant="outline" size="sm">
//                   <Calendar className="h-4 w-4 mr-2" />
//                   Host New Seminar
//                 </Button>
//                 <Button onClick={() => handleNavigateToProduct('courses')} variant="outline" size="sm">
//                   <BookOpen className="h-4 w-4 mr-2" />
//                   Create New Course
//                 </Button>
//                 <Button onClick={() => handleNavigateToProduct('publications')} variant="outline" size="sm">
//                   <FileText className="h-4 w-4 mr-2" />
//                   Submit Publication
//                 </Button>
//                 <Button onClick={() => handleNavigateToProduct('jobs')} variant="outline" size="sm">
//                   <Briefcase className="h-4 w-4 mr-2" />
//                   Post Job Opening
//                 </Button>
//                 <Button onClick={() => handleNavigateToProduct('saved-job')} variant="outline" size="sm">
//                   <Save className="h-4 w-4 mr-2" />
//                   Saved Jobs
//                 </Button>
//                 <Button onClick={() => handleNavigateToProduct('saved-candidates')} variant="outline" size="sm">
//                   <Save className="h-4 w-4 mr-2" />
//                   Saved Candidates
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };





import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Users, 
  Calendar, 
  BookOpen, 
  Briefcase, 
  Edit, 
  Eye, 
  DollarSign,
  TrendingUp,
  Save,
} from 'lucide-react';

interface UserProducts {
  seminars: any[];
  courses: any[];
  publications: any[];
  jobPostings: any[];
   blogs: any[];
}

interface UserProductsSectionProps {
  userId: string;
}

export const UserProductsSection = ({ userId }: UserProductsSectionProps) => {
  const [products, setProducts] = useState<UserProducts>({
    seminars: [],
    courses: [],
    publications: [],
    jobPostings: [],
     blogs: []
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchUserProducts();
    }
  }, [userId]);

  const fetchUserProducts = async () => {
    try {
      setLoading(true);

      // Fetch user's seminars
      const { data: seminars, error: seminarsError } = await supabase
        .from('seminars')
        .select('*')
        .eq('host_id', userId);

      if (seminarsError) throw seminarsError;

      // Fetch user's courses
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .eq('creator_id', userId);

      if (coursesError) throw coursesError;

      // Fetch user's job postings (if they're a job provider)
      const { data: jobProviders, error: jobProvidersError } = await supabase
        .from('job_providers')
        .select('*')
        .eq('user_id', userId);

      if (jobProvidersError) throw jobProvidersError;

      // Fetch user's blogs
const { data: blogs, error: blogsError } = await supabase
  .from('blog')
  .select('*')
  .eq('user_id', userId);

if (blogsError) throw blogsError;

      // For now, publications will be empty since we don't have the table yet
      // This will be updated when the publications table is created
      const publications: any[] = [];

      setProducts({
        seminars: seminars || [],
        courses: courses || [],
        publications,
        jobPostings: jobProviders || [],
         blogs: blogs || []
      });

    } catch (error) {
      console.error('Error fetching user products:', error);
      toast({
        title: "Error",
        description: "Failed to load your posted products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToProduct = (type: string, id?: string) => {
    switch (type) {
      case 'seminars':
        navigate('/e-seminar');
        break;
      case 'courses':
        navigate('/e-learning');
        break;
      case 'publications':
        navigate('/publication');
        break;
      case 'jobs':
        navigate('/my-job');

        break;
          case 'saved-job':
        navigate('/saved-job');
        break;
         case 'saved-candidates':
        navigate('/saved-candidates');

        break;
      case 'seminar-detail':
        if (id) navigate(`/seminar/${id}`);
        break;
         case 'blogs':
        navigate('/my-blogs');
        break;
      case 'course-detail':
        if (id) navigate(`/course/${id}`);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">Loading your products...</div>
        </CardContent>
      </Card>
    );
  }

  const totalProducts = products.seminars.length + products.courses.length + 
                       products.publications.length + products.jobPostings.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          My Posted Products ({totalProducts})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {totalProducts === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">You haven't posted any products yet.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button onClick={() => handleNavigateToProduct('seminars')} variant="outline" size="sm">
                Host Seminar
              </Button>
              <Button onClick={() => handleNavigateToProduct('courses')} variant="outline" size="sm">
                Create Course
              </Button>
              <Button onClick={() => handleNavigateToProduct('publications')} variant="outline" size="sm">
                Submit Publication
              </Button>
              <Button onClick={() => handleNavigateToProduct('jobs')} variant="outline" size="sm">
                Post Job
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Seminars Section */}
            {products.seminars.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Seminars ({products.seminars.length})
                  </h3>
                  <Button 
                    onClick={() => handleNavigateToProduct('seminars')} 
                    variant="outline" 
                    size="sm"
                  >
                    Manage Seminars
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {products.seminars.slice(0, 4).map((seminar) => (
                    <Card key={seminar.id} className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm mb-2">{seminar.topic}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{new Date(seminar.date).toLocaleDateString()}</span>
                          <div className="flex gap-1">
                            <Button 
                              onClick={() => handleNavigateToProduct('seminar-detail', seminar.id)}
                              size="sm" 
                              variant="ghost"
                              className="h-6 px-2"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button 
                              onClick={() => handleNavigateToProduct('seminars')}
                              size="sm" 
                              variant="ghost"
                              className="h-6 px-2"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {products.seminars.length > 4 && (
                  <Button 
                    onClick={() => handleNavigateToProduct('seminars')} 
                    variant="link" 
                    className="mt-2"
                  >
                    View all {products.seminars.length} seminars
                  </Button>
                )}
              </div>
            )}

            {/* Courses Section */}
            {products.courses.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-600" />
                      Courses ({products.courses.length})
                    </h3>
                    <Button 
                      onClick={() => handleNavigateToProduct('courses')} 
                      variant="outline" 
                      size="sm"
                    >
                      Manage Courses
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {products.courses.slice(0, 4).map((course) => (
                      <Card key={course.id} className="bg-green-50 border-green-200">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-sm mb-2">{course.title}</h4>
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {course.status}
                            </Badge>
                            <span>{course.duration_months} months</span>
                          </div>
                          <div className="flex justify-end gap-1">
                            <Button 
                              onClick={() => handleNavigateToProduct('course-detail', course.id)}
                              size="sm" 
                              variant="ghost"
                              className="h-6 px-2"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button 
                              onClick={() => handleNavigateToProduct('courses')}
                              size="sm" 
                              variant="ghost"
                              className="h-6 px-2"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {products.courses.length > 4 && (
                    <Button 
                      onClick={() => handleNavigateToProduct('courses')} 
                      variant="link" 
                      className="mt-2"
                    >
                      View all {products.courses.length} courses
                    </Button>
                  )}
                </div>
              </>
            )}

            {/* Publications Section */}
            {products.publications.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      Publications ({products.publications.length})
                    </h3>
                    <Button 
                      onClick={() => handleNavigateToProduct('publications')} 
                      variant="outline" 
                      size="sm"
                    >
                      Manage Publications
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {products.publications.slice(0, 4).map((publication) => (
                      <Card key={publication.id} className="bg-purple-50 border-purple-200">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-sm mb-2">{publication.title}</h4>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <Badge variant="outline" className="text-xs">
                              {publication.status}
                            </Badge>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="h-6 px-2">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 px-2">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Job Postings Section */}
            {products.jobPostings.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-orange-600" />
                      Job Postings ({products.jobPostings.length})
                    </h3>
                    <Button 
                      onClick={() => handleNavigateToProduct('jobs')} 
                      variant="outline" 
                      size="sm"
                    >
                      Manage Jobs
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {products.jobPostings.slice(0, 4).map((job) => (
                      <Card key={job.id} className="bg-orange-50 border-orange-200">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-sm mb-2">{job.organization_name}</h4>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{job.department || 'General'}</span>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="h-6 px-2">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button 
                                onClick={() => handleNavigateToProduct('jobs')}
                                size="sm" 
                                variant="ghost" 
                                className="h-6 px-2"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {products.jobPostings.length > 4 && (
                    <Button 
                      onClick={() => handleNavigateToProduct('jobs')} 
                      variant="link" 
                      className="mt-2"
                    >
                      View all {products.jobPostings.length} job postings
                    </Button>
                  )}
                </div>
              </>
            )}

{/* 3333333333333333333333333333333333333333 */}
              {products.blogs.length > 0 && (
  <>
    <Separator />
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-teal-600" />
          Blogs ({products.blogs.length})
        </h3>
        <Button 
          onClick={() => handleNavigateToProduct('blogs')} 
          variant="outline" 
          size="sm"
        >
          Manage Blogs
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {products.blogs.slice(0, 4).map((blog) => (
          <Card key={blog.id} className="bg-teal-50 border-teal-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">{blog.title}</h4>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 px-2"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button 
                    onClick={() => handleNavigateToProduct('blogs')}
                    size="sm" 
                    variant="ghost" 
                    className="h-6 px-2"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {products.blogs.length > 4 && (
        <Button 
          onClick={() => handleNavigateToProduct('blogs')} 
          variant="link" 
          className="mt-2"
        >
          View all {products.blogs.length} blogs
        </Button>
      )}
    </div>
  </>
)}


            {/* Quick Actions */}
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => handleNavigateToProduct('seminars')} variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Host New Seminar
                </Button>
                <Button onClick={() => handleNavigateToProduct('courses')} variant="outline" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create New Course
                </Button>
                <Button onClick={() => handleNavigateToProduct('publications')} variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Publication
                </Button>
                <Button onClick={() => handleNavigateToProduct('jobs')} variant="outline" size="sm">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Post Job Opening
                </Button>
                <Button onClick={() => handleNavigateToProduct('saved-job')} variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Saved Jobs
                </Button>
                <Button onClick={() => handleNavigateToProduct('saved-candidates')} variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Saved Candidates
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
