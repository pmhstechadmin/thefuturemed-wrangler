
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PhoneNumberInput from './PhoneNumberInput';
import CountrySelect from './CountrySelect';
import DateOfBirthInput from './DateOfBirthInput';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { FormProvider, useForm } from 'react-hook-form';
import { Phone } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';

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

interface EditProfileModalProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedProfile: Profile) => void;
}

const EditProfileModal = ({ profile, isOpen, onClose, onUpdate }: EditProfileModalProps) => {
  const [formData, setFormData] = useState<Profile>(profile);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
   const form = useForm({
    defaultValues: {
      phone: profile.phone || "",
      // other form fields if needed
    },});

  const handleInputChange = (field: keyof Profile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value || null
    }));
  };
  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        phone: profile.phone || "", // Ensure phone is not null
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate age if date of birth is provided
    if (formData.date_of_birth) {
      const birthDate = new Date(formData.date_of_birth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        toast({
          title: "Age Restriction",
          description: "You must be at least 18 years old to register.",
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          bio: formData.bio,
          date_of_birth: formData.date_of_birth,
          gender: formData.gender,
          city: formData.city,
          country: formData.country,
          medical_specialty: formData.medical_specialty,
          category: formData.category,
          institution: formData.institution,
          degree_level: formData.degree_level,
          year_of_study: formData.year_of_study,
        })
        .eq('id', profile.id)
        .select()
        .single();

      if (error) throw error;

      onUpdate(data);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and professional details.
          </DialogDescription>
        </DialogHeader>
  <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={formData.first_name || ""}
                onChange={(e) =>
                  handleInputChange("first_name", e.target.value)
                }
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={formData.last_name || ""}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
            {/* <div className="md:col-span-2">
              <PhoneNumberInput
                value={formData.phone || ''}
                onChange={(value) => handleInputChange('phone', value)}
              />
            </div> */}
            <FormField
              control={useForm().control} // Or use your existing form control
              name="phone"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <div className="w-full">
                      <PhoneInput
                        country={"in"}
                        containerClass="!w-full !max-w-full"
                        inputClass="!w-full !pl-12 !pr-3 !py-2 !border !rounded-md !text-sm"
                        buttonClass="!left-1"
                        specialLabel=""
                        value={formData.phone || ""}
                        onChange={(phone) => handleInputChange("phone", phone)}
                        inputProps={{
                          name: "phone",
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <DateOfBirthInput
                value={formData.date_of_birth || ""}
                onChange={(value) => handleInputChange("date_of_birth", value)}
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender || ""}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city || ""}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="Enter your city"
              />
            </div>
            <div className="md:col-span-2">
              <CountrySelect
                value={formData.country || ""}
                onChange={(value) => handleInputChange("country", value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category || ""}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="dentist">Dentist</SelectItem>
                  <SelectItem value="nursing">Nursing</SelectItem>
                  <SelectItem value="allied_health_professions">
                    Allied Health Professions
                  </SelectItem>
                  <SelectItem value="physiotherapist">
                    Physiotherapist
                  </SelectItem>
                  <SelectItem value="ayurveda">Ayurveda</SelectItem>
                  <SelectItem value="unani">Unani</SelectItem>
                  <SelectItem value="homeopathy">Homeopathy</SelectItem>
                  <SelectItem value="naturopathy">Naturopathy</SelectItem>
                  <SelectItem value="dietician">Dietician</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="fitness_coach">Fitness Coach</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="medical_specialty">Medical Specialty</Label>
              <Input
                id="medical_specialty"
                value={formData.medical_specialty || ""}
                onChange={(e) =>
                  handleInputChange("medical_specialty", e.target.value)
                }
                placeholder="e.g., Cardiology, Pediatrics"
              />
            </div>
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                value={formData.institution || ""}
                onChange={(e) =>
                  handleInputChange("institution", e.target.value)
                }
                placeholder="Hospital, University, or Organization"
              />
            </div>
            <div>
              <Label htmlFor="degree_level">Degree Level</Label>
              <Select
                value={formData.degree_level || ""}
                onValueChange={(value) =>
                  handleInputChange("degree_level", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select degree level" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="bachelor">Bachelor's</SelectItem>
                  <SelectItem value="master">Master's</SelectItem>
                  <SelectItem value="doctorate">Doctorate</SelectItem>
                  <SelectItem value="md">MD</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="year_of_study">Year of Study</Label>
              <Input
                id="year_of_study"
                value={formData.year_of_study || ""}
                onChange={(e) =>
                  handleInputChange("year_of_study", e.target.value)
                }
                placeholder="e.g., 1st year, 2nd year"
              />
            </div>
          </div>

          <div className="col-span-full">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio || ""}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Tell us about yourself, your interests, and your goals"
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
