








// import { useState } from "react";
//  import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/integrations/supabase/client";
// import { Building, MapPin, User, Mail, Phone, Lock } from "lucide-react";

// interface JobProviderFormData {
//   organizationName: string;
//   organizationType: string;
//   managerName: string;
//   managerEmail: string;
//   managerContact: string;
//   address: string;
//   googleLocation: string;
// }

// export const JobProviderForm = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();
//   const form = useForm<JobProviderFormData>();

//   const organizationTypes = [
//     { value: "trust", label: "Trust" },
//     { value: "proprietary", label: "Proprietary" },
//     { value: "llc", label: "LLC (Limited Liability Company)" },
//     { value: "llp", label: "LLP (Limited Liability Partnership)" },
//     { value: "corporation", label: "Corporation" },
//     { value: "partnership", label: "Partnership" },
//     { value: "other", label: "Other" }
//   ];



//   // data storing

//   // const onSubmit = async (data: JobProviderFormData) => {
//   //   setIsSubmitting(true);
//   //   try {
//   //     const { data: { user } } = await supabase.auth.getUser();

//   //     if (!user) {
//   //       toast({
//   //         title: "Authentication Required",
//   //         description: "Please sign in to register as a job provider.",
//   //         variant: "destructive",
//   //       });
//   //       return;
//   //     }
//   //     const { error } = await supabase
//   //       .from('job_providers')
//   //       .insert([
//   //         {
//   //           user_id: user.id,
//   //           organization_name: data.organizationName,
//   //           organization_type: data.organizationType,
//   //           manager_name: data.managerName,
//   //           manager_email: data.managerEmail,
//   //           manager_contact: data.managerContact,
//   //           address: data.address,
//   //           google_location: data.googleLocation,
//   //         }
//   //       ]);

//   //     if (error) throw error;

//   //     toast({
//   //       title: "Success!",
//   //       description: "Your organization has been registered successfully.",
//   //     });

//   //     form.reset();
//   //   } catch (error) {
//   //     console.error('Error:', error);
//   //     toast({
//   //       title: "Error",
//   //       description: "Failed to register organization. Please try again.",
//   //       variant: "destructive",
//   //     });
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };


//   const onSubmit = async (data: JobProviderFormData) => {
//   setIsSubmitting(true);
//   try {
//     const { data: { user } } = await supabase.auth.getUser();

//     if (!user) {
//       toast({
//         title: "Authentication Required",
//         description: "Please sign in to register as a job provider.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // ✅ Console log added here to show what's being stored
//     console.log("Data being stored  job provider:", {
//       user_id: user.id,
//       organization_name: data.organizationName,
//       organization_type: data.organizationType,
//       manager_name: data.managerName,
//       manager_email: data.managerEmail,
//       manager_contact: data.managerContact,
//       address: data.address,
//       google_location: data.googleLocation,
//     });

//     const { error } = await supabase
//       .from('job_providers')
//       .insert([
//         {
//           user_id: user.id,
//           organization_name: data.organizationName,
//           organization_type: data.organizationType,
//           manager_name: data.managerName,
//           manager_email: data.managerEmail,
//           manager_contact: data.managerContact,
//           address: data.address,
//           google_location: data.googleLocation,
//         }
//       ]);

//     if (error) throw error;

//     toast({
//       title: "Success!",
//       description: "Your organization has been registered successfully.",
//     });

//     form.reset();
//   } catch (error) {
//     console.error('Error:', error);
//     toast({
//       title: "Error",
//       description: "Failed to register organization. Please try again.",
//       variant: "destructive",
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };





//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         {/* Organization Details */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Building className="h-4 w-4" />
//               Organization Details
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <FormField
//               control={form.control}
//               name="organizationName"
//               rules={{ required: "Organization name is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Organization Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter organization name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="organizationType"
//               rules={{ required: "Organization type is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Organization Type</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select organization type" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {organizationTypes.map((type) => (
//                         <SelectItem key={type.value} value={type.value}>
//                           {type.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         {/* Manager Details */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="h-4 w-4" />
//               Manager Details
//             </CardTitle>
//             <CardDescription>
//               Contact information for the hiring manager
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <FormField
//               control={form.control}
//               name="managerName"
//               rules={{ required: "Manager name is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Manager Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter manager's full name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="managerEmail"
//               rules={{ 
//                 required: "Manager email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Invalid email address"
//                 }
//               }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex items-center gap-2">
//                     <Mail className="h-4 w-4" />
//                     Manager Email
//                     <Lock className="h-3 w-3 text-gray-400" />
//                     <span className="text-xs text-gray-500">(Hidden from public)</span>
//                   </FormLabel>
//                   <FormControl>
//                     <Input type="email" placeholder="manager@organization.com" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="managerContact"
//               rules={{ required: " is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex items-center gap-2">
//                     <Phone className="h-4 w-4" />
//                     Manager Contact
//                     <Lock className="h-3 w-3 text-gray-400" />
//                     <span className="text-xs text-gray-500">(Hidden from public)</span>
//                   </FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter contact number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         {/* Location Details */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <MapPin className="h-4 w-4" />
//               Location Details
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <FormField
//               control={form.control}
//               name="address"
//               rules={{ required: "Address is required" }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Public Address</FormLabel>
//                   <FormControl>
//                     <Textarea 
//                       placeholder="Enter the address that will be visible to job seekers"
//                       className="min-h-[80px]"
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="googleLocation"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex items-center gap-2">
//                     Google Location/Maps Link
//                     <Lock className="h-3 w-3 text-gray-400" />
//                     <span className="text-xs text-gray-500">(Hidden from public)</span>
//                   </FormLabel>
//                   <FormControl>
//                     <Input 
//                       placeholder="Enter Google Maps link or precise location"
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         <Button type="submit" className="w-full" disabled={isSubmitting}>
//           {isSubmitting ? "Registering..." : "Register Organization"}
//         </Button>
//       </form>
//     </Form>
//   );
// };






import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Building, MapPin, User, Mail, Phone, Lock } from "lucide-react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import currencyCodes from "currency-codes";
import getSymbolFromCurrency from "currency-symbol-map";


interface JobProviderFormData {
  organizationName: string;
  organizationType: string;
  managerName: string;
  managerEmail: string;
  managerContact: string;
  address: string;
  googleLocation: string;

  managerContactCcode: string;
  department: string;
  number_of_vacancies: data.numberOfVacancies,
  dutyHours: string; // ✅ new field
  salaryRange: string; // ✅ new field
  jobCountry: string; // ✅ new
  jobState: string;
  qualificationRequired: string;
  employmentType: string;
  contractDetails: string;
  salary:string;
}

export const JobProviderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<JobProviderFormData>();

  const organizationTypes = [
    { value: "trust", label: "Trust" },
    { value: "proprietary", label: "Proprietary" },
    { value: "llc", label: "LLC (Limited Liability Company)" },
    { value: "llp", label: "LLP (Limited Liability Partnership)" },
    { value: "corporation", label: "Corporation" },
    { value: "partnership", label: "Partnership" },
    { value: "other", label: "Other" },
  ];

  const employmentTypes = [
    { value: "full_time", label: "Full-time" },
    { value: "part_time", label: "Part-time" },
    { value: "locum", label: "Locum" },

  ];

const currencyOptions = currencyCodes.data
  .map((currency) => {
    const symbol = getSymbolFromCurrency(currency.code);
    return {
      code: currency.code,
      name: currency.currency,
      symbol: symbol || currency.code,
    };
  })
  .filter((currency, index, self) =>
    index === self.findIndex(c => c.code === currency.code) // remove duplicates
  );

  const onSubmit = async (data: JobProviderFormData) => {
    setIsSubmitting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to register as a job provider.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("job_providers").insert([
        {
          user_id: user.id,
          organization_name: data.organizationName,
          organization_type: data.organizationType,
          manager_name: data.managerName,
          manager_email: data.managerEmail,
          manager_contact: data.managerContact,
          manager_contact_ccode: data.managerContactCcode,
          address: data.address,
          google_location: data.googleLocation,

          department: data.department,
          number_of_vacancies: data.numberOfVacancies,
          duty_hours: data.dutyHours,         // ✅ map correctly
          salary_range: data.salaryRange,
          job_country: data.jobCountry, // ✅ new
          job_state: data.jobState,
          qualification_required: data.qualificationRequired,
          employment_type: data.employmentType, // ✅ new
          contract_details: data.contractDetails,
          salary_range_currency:data. salary,

        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your organization has been registered successfully.",
      });

      form.reset();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to register organization. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Organization Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-4 w-4" /> Organization Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Organization Name */}
            <FormField
              control={form.control}
              name="organizationName"
              rules={{ required: "Organization name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Organization Type */}
            <FormField
              control={form.control}
              name="organizationType"
              rules={{ required: "Organization type is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {organizationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Country */}
            <FormField
              control={form.control}
              name="jobCountry"
              rules={{ required: "Job country is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Country</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. India" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job State */}
            <FormField
              control={form.control}
              name="jobState"
              rules={{ required: "Job state is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job State</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Karnataka" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>




        {/* Manager Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" /> Manager Details
            </CardTitle>
            <CardDescription>
              Contact information for the hiring manager
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="managerName"
              rules={{ required: "Manager name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter manager's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="managerEmail"
              rules={{
                required: "Manager email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Manager Email
                    <Lock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      (Hidden from public)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="manager@organization.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="managerContact"
              rules={{ required: "Manager contact is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Manager Contact
                    <Lock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">(Hidden from public)</span>
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      country={'in'}
                      value={field.value}
                      onChange={(value, country) => {
                        form.setValue('managerContact', value);
                        form.setValue('managerContactCcode', `+${country.dialCode}`);
                      }}
                      inputStyle={{ width: '100%' }}
                      dropdownStyle={{ zIndex: 9999 }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="managerContactCcode"
              render={({ field }) => (
                <input type="hidden" {...field} />
              )}
            />



          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Job Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* department */}
            <FormField
              control={form.control}
              name="department"
              rules={{ required: "Department is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter department name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Outside Card */}
            <FormField
              control={form.control}
              name="qualificationRequired"
              rules={{ required: "Qualification is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. B.Pharm, D.Pharm, M.Sc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />





            <FormField
              control={form.control}
              name="employmentType"
              rules={{ required: "Employment type is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />





            <FormField
              control={form.control}
              name="numberOfVacancies"
              rules={{
                required: "Number of vacancies is required",
                min: { value: 1, message: "Must be at least 1" },
                valueAsNumber: true,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Vacancies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of job openings"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dutyHours"
              rules={{ required: "Duty hours are required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duty Hours</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 9AM - 5PM, Mon to Fri" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


   <div className="grid grid-cols-2 gap-4">
  {/* Currency Dropdown */}
  <FormField
    control={form.control}
    name="salaryCurrency"
    rules={{ required: "Currency is required" }}
    render={({ field }) => (
      <FormItem>
        <FormLabel>Currency</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {currencyOptions.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.symbol} {currency.code} - {currency.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Salary Range Input */}
  <FormField
    control={form.control}
    name="salaryRange"
    rules={{ required: "Salary range is required" }}
    render={({ field }) => (
      <FormItem>
        <FormLabel>Salary Range</FormLabel>
        <FormControl>
          <Input placeholder="e.g. 15,000 - 25,000 / month" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>





            <FormField
              control={form.control}
              name="contractDetails"
              rules={{ required: "Contract details are required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter contract terms, duration, notice period, etc."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />






            <FormField
              control={form.control}
              name="address"
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the address that will be visible to job seekers"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <FormField
              control={form.control}
              name="googleLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Google Location/Maps Link
                    <Lock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      (Hidden from public)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Google Maps link or precise location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register Organization"}
        </Button>
      </form>
    </Form>
  );
};
