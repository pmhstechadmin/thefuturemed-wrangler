
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  category: "student" | "professional" | "";
  yearOfStudy: string;
  degreeLevel: string;
  institution: string;
  additionalQualifications: string;
}

const Register = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    category: "",
    yearOfStudy: "",
    degreeLevel: "",
    institution: "",
    additionalQualifications: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        return;
      }
    }
    if (step === 2 && !formData.category) {
      toast({
        title: "Category Required",
        description: "Please select your category.",
        variant: "destructive",
      });
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Registration Successful!",
      description: "Welcome to MedPortal. Your account has been created.",
    });
    console.log("Registration Data:", formData);
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
              <span>Category</span>
              <span>Qualifications</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Personal Information"}
                {step === 2 && "Professional Category"}
                {step === 3 && "Additional Details"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Enter your basic information to get started"}
                {step === 2 && "Tell us about your professional status"}
                {step === 3 && "Complete your profile with additional qualifications"}
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
                        placeholder="Create a password"
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

              {/* Step 3: Additional Qualifications */}
              {step === 3 && (
                <div className="space-y-4">
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
                      <p><strong>Institution:</strong> {formData.institution}</p>
                      {formData.category === "student" && formData.yearOfStudy && (
                        <p><strong>Year of Study:</strong> {formData.yearOfStudy}</p>
                      )}
                      {formData.category === "professional" && formData.degreeLevel && (
                        <p><strong>Degree Level:</strong> {formData.degreeLevel}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep(prev => prev - 1)}
                  disabled={step === 1}
                >
                  Previous
                </Button>
                {step < 3 ? (
                  <Button onClick={handleNext}>Next</Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                    Complete Registration
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
