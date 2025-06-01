
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, DollarSign, Briefcase, Plus, Building, User, Users } from "lucide-react";
import { JobProviderForm } from "@/components/job-portal/JobProviderForm";
import { JobSeekerForm } from "@/components/job-portal/JobSeekerForm";
import { JobListings } from "@/components/job-portal/JobListings";
import { JobSeekerProfiles } from "@/components/job-portal/JobSeekerProfiles";

const JobPortal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Medical Job Portal</h1>
            <p className="text-gray-600 text-lg">Connect healthcare professionals with opportunities</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Jobs
            </TabsTrigger>
            <TabsTrigger value="job-provider" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Job Provider
            </TabsTrigger>
            <TabsTrigger value="job-seeker" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Job Seeker
            </TabsTrigger>
            <TabsTrigger value="candidates" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Find Candidates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <JobListings />
          </TabsContent>

          <TabsContent value="job-provider">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Job Provider Registration
                  </CardTitle>
                  <CardDescription>
                    Register your organization to post job opportunities and connect with healthcare professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <JobProviderForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="job-seeker">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Job Seeker Profile
                  </CardTitle>
                  <CardDescription>
                    Create your professional profile to be discovered by healthcare employers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <JobSeekerForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="candidates">
            <JobSeekerProfiles />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JobPortal;
