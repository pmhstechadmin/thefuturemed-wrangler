import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Clock, CalendarDays, Users, CheckCircle, Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User as AuthUser } from '@supabase/supabase-js';

interface Seminar {
  id: string;
  host_name: string;
  topic: string;
  description: string;
  date: string;
  time: string;
  host_id: string;
}

interface Speaker {
  id: string;
  name: string;
  qualification: string;
  department: string;
}

const SeminarDetails = () => {
  const { seminarId } = useParams();
  const navigate = useNavigate();
  const [seminar, setSeminar] = useState<Seminar | null>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const { toast } = useToast();
  const [canceling, setCanceling] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const isHost = user?.id === seminar?.host_id;

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    checkUser();
    if (seminarId) {
      fetchSeminarDetails();
    }
  }, [seminarId]);

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);

      if (session?.user && seminarId) {
        checkRegistrationStatus(session.user.id);
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  const checkRegistrationStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("seminar_registrations")
        .select("id")
        .eq("seminar_id", seminarId)
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking registration:", error);
        return;
      }

      setIsRegistered(!!data);
      if (data) {
        setRegistrationId(data.id);
      }
    } catch (error) {
      console.error("Error checking registration status:", error);
    }
  };

  const fetchSeminarDetails = async () => {
    setLoading(true);
    try {
      // Fetch seminar details
      const { data: seminarData, error: seminarError } = await supabase
        .from("seminars")
        .select("*")
        .eq("id", seminarId)
        .single();

      if (seminarError) throw seminarError;
      setSeminar(seminarData);

      // Fetch speakers
      const { data: speakersData, error: speakersError } = await supabase
        .from("speakers")
        .select("*")
        .eq("seminar_id", seminarId);

      if (speakersError) throw speakersError;
      setSpeakers(speakersData || []);
    } catch (error) {
      console.error("Error fetching seminar details:", error);
      toast({
        title: "Error",
        description: "Failed to load seminar details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  // Add cancel registration handler
  const handleCancelRegistration = async () => {
    if (!registrationId) return;

    setCanceling(true);
    try {
      const { error } = await supabase
        .from("seminar_registrations")
        .delete()
        .eq("id", registrationId);

      if (error) throw error;

      setIsRegistered(false);
      setRegistrationId(null);
      toast({
        title: "Registration Cancelled",
        description: "Your registration has been successfully cancelled.",
      });
    } catch (error) {
      console.error("Error cancelling registration:", error);
      toast({
        title: "Cancellation Failed",
        description: "Failed to cancel your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCanceling(false);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for this seminar.",
        variant: "destructive",
      });
      return;
    }

    if (isRegistered) {
      toast({
        title: "Already Registered",
        description: "You are already registered for this seminar.",
      });
      return;
    }

    setRegistering(true);
    try {
      const { error } = await supabase.from("seminar_registrations").insert({
        seminar_id: seminarId!,
        user_id: user.id,
        payment_status: "completed", // For now, assuming free registration
      });

      if (error) throw error;

      setIsRegistered(true);
      toast({
        title: "Registration Successful",
        description: "You have been successfully registered for this seminar!",
      });

      // Here you would typically integrate with a payment gateway
      // For now, we'll just show a success message
    } catch (error) {
      console.error("Error registering for seminar:", error);
      toast({
        title: "Registration Failed",
        description: "Failed to register for the seminar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRegistering(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading seminar details...</p>
        </div>
      </div>
    );
  }

  if (!seminar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Seminar Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The seminar you're looking for doesn't exist.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={handleBackNavigation}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleBackNavigation}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Seminar Details
              </h1>
              <p className="text-gray-600">
                Complete information about this seminar
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="hover:bg-gray-100"
            title="Go to home page"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>

        {/* Seminar Information */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{seminar.topic}</CardTitle>
                <CardDescription className="text-lg">
                  {seminar.description}
                </CardDescription>
              </div>
              {isRegistered && (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Registered
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Event Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Host</p>
                    <p className="text-gray-600">{seminar.host_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-gray-600">{formatDate(seminar.date)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-gray-600">{formatTime(seminar.time)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Number of Speakers</p>
                    <p className="text-gray-600">
                      {speakers.length} speaker(s)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Button */}
            {/* <div className="flex justify-center pt-4">
              <Button
                onClick={handleRegister}
                disabled={registering || isRegistered}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
              >
                {registering ? "Registering..." : 
                 isRegistered ? "Already Registered" : "Register for Seminar"}
              </Button>
            </div> */}
            {!isHost && (
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleRegister}
                  disabled={registering || isRegistered}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                >
                  {registering
                    ? "Registering..."
                    : isRegistered
                    ? "Already Registered"
                    : "Register for Seminar"}
                </Button>
              </div>
            )}

            {/* {!isHost && (
              <div className="flex justify-center pt-4 gap-4">
                {isRegistered ? (
                  <Button
                    variant="outline"
                    onClick={handleCancelRegistration}
                    disabled={canceling}
                    className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50"
                  >
                    {canceling ? "Cancelling..." : "Cancel Registration"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleRegister}
                    disabled={registering}
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                  >
                    {registering ? "Registering..." : "Register for Seminar"}
                  </Button>
                )}
              </div>
            )} */}
          </CardContent>
        </Card>

        {/* Speakers Section */}
        <Card>
          <CardHeader>
            <CardTitle>Speakers</CardTitle>
            <CardDescription>
              Meet the experts who will be presenting at this seminar
            </CardDescription>
          </CardHeader>
          <CardContent>
            {speakers.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No speakers added yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {speakers.map((speaker) => (
                  <Card key={speaker.id}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {speaker.name}
                      </h3>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Qualification:</span>{" "}
                          {speaker.qualification}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Department:</span>{" "}
                          {speaker.department}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeminarDetails;
