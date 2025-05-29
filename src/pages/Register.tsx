import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  category: "student" | "professional" | "";
  medicalSpecialty: string;
  yearOfStudy: string;
  degreeLevel: string;
  institution: string;
  additionalQualifications: string;
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  agreedToDataUsage: boolean;
}

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    category: "",
    medicalSpecialty: "",
    yearOfStudy: "",
    degreeLevel: "",
    institution: "",
    additionalQualifications: "",
    agreedToTerms: false,
    agreedToPrivacy: false,
    agreedToDataUsage: false,
  });

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      toast({
        title: "Missing Information",
        description: "First name is required.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.lastName.trim()) {
      toast({
        title: "Missing Information",
        description: "Last name is required.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Email is required.",
        variant: "destructive",
      });
      return false;
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.password) {
      toast({
        title: "Missing Information",
        description: "Password is required.",
        variant: "destructive",
      });
      return false;
    }
    // Password validation
    if (formData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.category) {
      toast({
        title: "Category Required",
        description: "Please select your category.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.medicalSpecialty) {
      toast({
        title: "Medical Specialty Required",
        description: "Please select your medical specialty.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.institution.trim()) {
      toast({
        title: "Institution Required",
        description: "Please enter your institution or hospital name.",
        variant: "destructive",
      });
      return false;
    }
    if (formData.category === "student" && !formData.yearOfStudy) {
      toast({
        title: "Year of Study Required",
        description: "Please select your current year of study.",
        variant: "destructive",
      });
      return false;
    }
    if (formData.category === "professional" && !formData.degreeLevel) {
      toast({
        title: "Degree Level Required",
        description: "Please select your highest degree level.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.agreedToTerms) {
      toast({
        title: "Terms of Service Required",
        description: "Please agree to the Terms of Service to continue.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.agreedToPrivacy) {
      toast({
        title: "Privacy Policy Required",
        description: "Please agree to the Privacy Policy to continue.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.agreedToDataUsage) {
      toast({
        title: "Data Usage Policy Required",
        description: "Please agree to the Data Usage Policy to continue.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setLoading(true);
    console.log("Starting registration process...");

    try {
      // Create the user account in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });

      if (authError) {
        console.error("Auth error:", authError);
        toast({
          title: "Registration Failed",
          description: authError.message,
          variant: "destructive",
        });
        return;
      }

      if (!authData.user) {
        toast({
          title: "Registration Failed",
          description: "Failed to create user account.",
          variant: "destructive",
        });
        return;
      }

      console.log("User created successfully:", authData.user.id);

      // Create the user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          category: formData.category,
          medical_specialty: formData.medicalSpecialty,
          institution: formData.institution,
          year_of_study: formData.category === "student" ? formData.yearOfStudy : null,
          degree_level: formData.category === "professional" ? formData.degreeLevel : null,
        });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        toast({
          title: "Profile Creation Failed",
          description: "Account created but profile setup failed. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      console.log("Profile created successfully");

      toast({
        title: "Registration Successful!",
        description: "Welcome to MedPortal. Please check your email to verify your account.",
      });

      // Redirect to login or products page
      setTimeout(() => {
        navigate('/products');
      }, 2000);

    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1>
            </Link>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > stepNum ? <CheckCircle className="h-5 w-5" /> : stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-24 h-1 mx-2 ${
                      step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Personal Info</span>
              <span>Category & Specialty</span>
              <span>Legal Agreements</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Personal Information"}
                {step === 2 && "Professional Category & Specialty"}
                {step === 3 && "Legal Agreements & Terms"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Enter your basic information to get started"}
                {step === 2 && "Tell us about your professional status and medical specialty"}
                {step === 3 && "Review and agree to our policies and terms"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => updateFormData("password", e.target.value)}
                        placeholder="Create a password (min 6 characters)"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Category Selection */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-4 block">Professional Category *</Label>
                    <RadioGroup
                      value={formData.category}
                      onValueChange={(value) => updateFormData("category", value)}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="student" id="student" />
                        <Label htmlFor="student" className="cursor-pointer flex-1">
                          <div>
                            <div className="font-semibold">Student</div>
                            <div className="text-sm text-gray-600">Currently enrolled in medical school</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="professional" id="professional" />
                        <Label htmlFor="professional" className="cursor-pointer flex-1">
                          <div>
                            <div className="font-semibold">Medical Professional</div>
                            <div className="text-sm text-gray-600">Licensed healthcare practitioner</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="medicalSpecialty">Medical Specialty *</Label>
                    <Select value={formData.medicalSpecialty} onValueChange={(value) => updateFormData("medicalSpecialty", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your medical specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="dentist">Dentist</SelectItem>
                        <SelectItem value="superspecialist">Superspecialist</SelectItem>
                        <SelectItem value="nursing">Nursing</SelectItem>
                        <SelectItem value="allied-health">Allied Health</SelectItem>
                        <SelectItem value="dietician">Dietician</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="ayurveda">Ayurveda</SelectItem>
                        <SelectItem value="homeopathy">Homeopathy</SelectItem>
                        <SelectItem value="naturopathy">Naturopathy</SelectItem>
                        <SelectItem value="unani">Unani</SelectItem>
                        <SelectItem value="fitness-coach">Fitness Coach</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="institution">Institution/Hospital *</Label>
                    <Input
                      id="institution"
                      value={formData.institution}
                      onChange={(e) => updateFormData("institution", e.target.value)}
                      placeholder="Enter your institution or hospital name"
                    />
                  </div>

                  {/* Conditional Fields */}
                  {formData.category === "student" && (
                    <div>
                      <Label htmlFor="yearOfStudy">Year of Study *</Label>
                      <Select value={formData.yearOfStudy} onValueChange={(value) => updateFormData("yearOfStudy", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your current year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st-year">1st Year</SelectItem>
                          <SelectItem value="2nd-year">2nd Year</SelectItem>
                          <SelectItem value="3rd-year">3rd Year</SelectItem>
                          <SelectItem value="4th-year">4th Year</SelectItem>
                          <SelectItem value="5th-year">5th Year</SelectItem>
                          <SelectItem value="6th-year">6th Year</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="residency">Residency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.category === "professional" && (
                    <div>
                      <Label htmlFor="degreeLevel">Degree Level *</Label>
                      <Select value={formData.degreeLevel} onValueChange={(value) => updateFormData("degreeLevel", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your highest degree" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="doctorate">Doctorate (PhD/MD)</SelectItem>
                          <SelectItem value="specialist">Specialist Certification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Legal Agreements */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="additionalQualifications">Additional Qualifications</Label>
                    <Textarea
                      id="additionalQualifications"
                      value={formData.additionalQualifications}
                      onChange={(e) => updateFormData("additionalQualifications", e.target.value)}
                      placeholder="List any additional certifications, specializations, or qualifications..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Registration Summary</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Category:</strong> {formData.category}</p>
                      <p><strong>Medical Specialty:</strong> {formData.medicalSpecialty}</p>
                      <p><strong>Institution:</strong> {formData.institution}</p>
                      {formData.category === "student" && formData.yearOfStudy && (
                        <p><strong>Year of Study:</strong> {formData.yearOfStudy}</p>
                      )}
                      {formData.category === "professional" && formData.degreeLevel && (
                        <p><strong>Degree Level:</strong> {formData.degreeLevel}</p>
                      )}
                    </div>
                  </div>

                  {/* Legal Agreements */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Legal Agreements Required</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={formData.agreedToTerms}
                          onCheckedChange={(checked) => updateFormData("agreedToTerms", !!checked)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="terms" className="text-sm cursor-pointer">
                            I agree to the Terms of Service *
                          </Label>
                          <Link
                            to="/terms-of-service"
                            target="_blank"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            Read Terms of Service
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="privacy"
                          checked={formData.agreedToPrivacy}
                          onCheckedChange={(checked) => updateFormData("agreedToPrivacy", !!checked)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="privacy" className="text-sm cursor-pointer">
                            I agree to the Privacy Policy *
                          </Label>
                          <Link
                            to="/privacy-policy"
                            target="_blank"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            Read Privacy Policy
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="dataUsage"
                          checked={formData.agreedToDataUsage}
                          onCheckedChange={(checked) => updateFormData("agreedToDataUsage", !!checked)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="dataUsage" className="text-sm cursor-pointer">
                            I agree to the Data Usage Policy *
                          </Label>
                          <Link
                            to="/data-usage-policy"
                            target="_blank"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            Read Data Usage Policy
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> By registering, you acknowledge that you are responsible for maintaining secure backups of your files. 
                        The platform is not liable for data loss due to technical issues or unforeseen circumstances.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep(prev => prev - 1)}
                  disabled={step === 1 || loading}
                >
                  Previous
                </Button>
                {step < 3 ? (
                  <Button onClick={handleNext} disabled={loading}>Next</Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={loading || !formData.agreedToTerms || !formData.agreedToPrivacy || !formData.agreedToDataUsage}
                  >
                    {loading ? "Creating Account..." : "Complete Registration"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Register;
