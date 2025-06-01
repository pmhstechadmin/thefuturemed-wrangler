
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, DollarSign, Briefcase, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const JobPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Senior Cardiologist",
      company: "City General Hospital",
      location: "New York, NY",
      type: "Full-time",
      salary: "$200,000 - $300,000",
      postedDate: "2 days ago",
      description: "We are seeking an experienced cardiologist to join our cardiology department...",
      requirements: ["MD in Cardiology", "5+ years experience", "Board certification"],
      tags: ["Cardiology", "Hospital", "Senior Level"]
    },
    {
      id: 2,
      title: "Emergency Medicine Physician",
      company: "Metro Medical Center",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$180,000 - $250,000",
      postedDate: "1 week ago",
      description: "Join our emergency department team providing critical care services...",
      requirements: ["MD in Emergency Medicine", "ACLS certified", "3+ years experience"],
      tags: ["Emergency Medicine", "Critical Care", "Hospital"]
    },
    {
      id: 3,
      title: "Medical Research Coordinator",
      company: "Research Institute of Medicine",
      location: "Boston, MA",
      type: "Contract",
      salary: "$65,000 - $80,000",
      postedDate: "3 days ago",
      description: "Coordinate clinical trials and research studies in our oncology department...",
      requirements: ["Bachelor's degree", "Research experience", "Clinical trial knowledge"],
      tags: ["Research", "Clinical Trials", "Oncology"]
    },
    {
      id: 4,
      title: "Pediatric Nurse Practitioner",
      company: "Children's Healthcare Network",
      location: "Chicago, IL",
      type: "Part-time",
      salary: "$90,000 - $120,000",
      postedDate: "5 days ago",
      description: "Provide primary care services to pediatric patients in our outpatient clinic...",
      requirements: ["MSN in Pediatrics", "NP certification", "2+ years experience"],
      tags: ["Pediatrics", "Nurse Practitioner", "Primary Care"]
    },
    {
      id: 5,
      title: "Medical Device Sales Representative",
      company: "MedTech Solutions",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $150,000 + Commission",
      postedDate: "1 day ago",
      description: "Sell cutting-edge medical devices to hospitals and healthcare facilities...",
      requirements: ["Bachelor's degree", "Sales experience", "Medical device knowledge"],
      tags: ["Sales", "Medical Devices", "Remote"]
    },
    {
      id: 6,
      title: "Radiologic Technologist",
      company: "Imaging Centers of America",
      location: "Miami, FL",
      type: "Full-time",
      salary: "$55,000 - $70,000",
      postedDate: "4 days ago",
      description: "Operate imaging equipment and assist radiologists with patient care...",
      requirements: ["Associate degree in Radiologic Technology", "ARRT certification", "1+ years experience"],
      tags: ["Radiology", "Imaging", "Technologist"]
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "" || 
                           job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Medical Job Portal</h1>
              <p className="text-gray-600 mt-2">Find your next career opportunity in healthcare</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Post a Job
            </Button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Search className="mr-2 h-4 w-4" />
                Search Jobs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline">All Categories</Badge>
            <Badge variant="outline">Full-time</Badge>
            <Badge variant="outline">Remote</Badge>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-blue-600 hover:text-blue-700 cursor-pointer">
                      {job.title}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium text-gray-900">
                      {job.company}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Apply Now
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Job Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      Posted {job.postedDate}
                    </div>
                  </div>

                  {/* Job Description */}
                  <p className="text-gray-700 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Requirements Preview */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Apply Now
                    </Button>
                    <Button variant="outline">
                      Save Job
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobPortal;
