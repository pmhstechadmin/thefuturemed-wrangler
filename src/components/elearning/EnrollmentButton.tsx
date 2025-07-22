// // // // // // // // // // import { useState } from "react";
// // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // // // // import { Loader2, CreditCard } from "lucide-react";
// // // // // // // // // // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // // // // // // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// // // // // // // // // // interface EnrollmentButtonProps {
// // // // // // // // // //   courseId: string;
// // // // // // // // // //   isEnrolled: boolean;
// // // // // // // // // //   onEnrollmentChange: () => void;
// // // // // // // // // // }

// // // // // // // // // // export const EnrollmentButton = ({ courseId, isEnrolled, onEnrollmentChange }: EnrollmentButtonProps) => {
// // // // // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // // // // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // // // // // // // // //   const { toast } = useToast();

// // // // // // // // // //   const handlePaymentMethodSelect = async (paymentMethod: string) => {
// // // // // // // // // //     try {
// // // // // // // // // //       setIsLoading(true);

// // // // // // // // // //       // Get current session
// // // // // // // // // //       const { data: { session } } = await supabase.auth.getSession();
// // // // // // // // // //       if (!session) {
// // // // // // // // // //         toast({
// // // // // // // // // //           title: "Authentication Required",
// // // // // // // // // //           description: "Please log in to enroll in this course.",
// // // // // // // // // //           variant: "destructive",
// // // // // // // // // //         });
// // // // // // // // // //         return;
// // // // // // // // // //       }

// // // // // // // // // //       if (paymentMethod === 'stripe') {
// // // // // // // // // //         console.log('Creating Stripe payment for course:', courseId);

// // // // // // // // // //         // Create Stripe payment session
// // // // // // // // // //         const { data, error } = await supabase.functions.invoke('create-course-payment', {
// // // // // // // // // //           body: { courseId, paymentMethod },
// // // // // // // // // //           headers: {
// // // // // // // // // //             Authorization: `Bearer ${session.access_token}`,
// // // // // // // // // //           },
// // // // // // // // // //         });

// // // // // // // // // //         if (error) {
// // // // // // // // // //           console.error('Payment creation error:', error);
// // // // // // // // // //           throw new Error(error.message || 'Failed to create payment session');
// // // // // // // // // //         }

// // // // // // // // // //         if (data?.url) {
// // // // // // // // // //           // Open Stripe checkout in current window for better UX
// // // // // // // // // //           window.location.href = data.url;

// // // // // // // // // //           toast({
// // // // // // // // // //             title: "Redirecting to Payment",
// // // // // // // // // //             description: "You'll be redirected to secure payment processing...",
// // // // // // // // // //           });
// // // // // // // // // //         } else {
// // // // // // // // // //           throw new Error('No payment URL received');
// // // // // // // // // //         }
// // // // // // // // // //       } else if (paymentMethod === 'paypal') {
// // // // // // // // // //         // PayPal integration placeholder - would implement PayPal SDK here
// // // // // // // // // //         toast({
// // // // // // // // // //           title: "PayPal Integration",
// // // // // // // // // //           description: "PayPal payment integration is coming soon! Please use card payment for now.",
// // // // // // // // // //           variant: "destructive",
// // // // // // // // // //         });
// // // // // // // // // //       } else if (paymentMethod === 'bank') {
// // // // // // // // // //         // Bank transfer integration placeholder
// // // // // // // // // //         toast({
// // // // // // // // // //           title: "Bank Transfer",
// // // // // // // // // //           description: "Bank transfer option is coming soon! Please use card payment for now.",
// // // // // // // // // //           variant: "destructive",
// // // // // // // // // //         });
// // // // // // // // // //       }

// // // // // // // // // //       setShowPaymentMethods(false);
// // // // // // // // // //     } catch (error: any) {
// // // // // // // // // //       console.error('Enrollment error:', error);

// // // // // // // // // //       let errorMessage = "Failed to start enrollment process. Please try again.";

// // // // // // // // // //       if (error.message?.includes('Stripe is not configured')) {
// // // // // // // // // //         errorMessage = "Payment system is not configured. Please contact support.";
// // // // // // // // // //       } else if (error.message?.includes('Course not found')) {
// // // // // // // // // //         errorMessage = "Course not found. Please refresh the page and try again.";
// // // // // // // // // //       } else if (error.message?.includes('already enrolled')) {
// // // // // // // // // //         errorMessage = "You are already enrolled in this course.";
// // // // // // // // // //         onEnrollmentChange(); // Refresh enrollment status
// // // // // // // // // //       }

// // // // // // // // // //       toast({
// // // // // // // // // //         title: "Enrollment Failed",
// // // // // // // // // //         description: errorMessage,
// // // // // // // // // //         variant: "destructive",
// // // // // // // // // //       });
// // // // // // // // // //     } finally {
// // // // // // // // // //       setIsLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   if (isEnrolled) {
// // // // // // // // // //     return (
// // // // // // // // // //       <Button className="w-full" variant="secondary" disabled>
// // // // // // // // // //         Already Enrolled
// // // // // // // // // //       </Button>
// // // // // // // // // //     );
// // // // // // // // // //   }

// // // // // // // // // //   return (
// // // // // // // // // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // // // // // // // // //       <DialogTrigger asChild>
// // // // // // // // // //         <Button
// // // // // // // // // //           className="w-full"
// // // // // // // // // //           size="lg"
// // // // // // // // // //           disabled={isLoading}
// // // // // // // // // //         >
// // // // // // // // // //           {isLoading ? (
// // // // // // // // // //             <>
// // // // // // // // // //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // // // // // // //               Processing...
// // // // // // // // // //             </>
// // // // // // // // // //           ) : (
// // // // // // // // // //             <>
// // // // // // // // // //               <CreditCard className="mr-2 h-4 w-4" />
// // // // // // // // // //               Enroll for $49.99
// // // // // // // // // //             </>
// // // // // // // // // //           )}
// // // // // // // // // //         </Button>
// // // // // // // // // //       </DialogTrigger>
// // // // // // // // // //       <DialogContent className="sm:max-w-md">
// // // // // // // // // //         <DialogHeader>
// // // // // // // // // //           <DialogTitle>Choose Payment Method</DialogTitle>
// // // // // // // // // //         </DialogHeader>
// // // // // // // // // //         <PaymentMethodSelector
// // // // // // // // // //           onPaymentMethodSelect={handlePaymentMethodSelect}
// // // // // // // // // //           isLoading={isLoading}
// // // // // // // // // //         />
// // // // // // // // // //       </DialogContent>
// // // // // // // // // //     </Dialog>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // import { useState } from "react";
// // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // // // import { Loader2, CreditCard } from "lucide-react";
// // // // // // // // // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // // // // // // // // import {
// // // // // // // // //   Dialog,
// // // // // // // // //   DialogContent,
// // // // // // // // //   DialogHeader,
// // // // // // // // //   DialogTitle,
// // // // // // // // //   DialogTrigger,
// // // // // // // // // } from "@/components/ui/dialog";

// // // // // // // // // interface EnrollmentButtonProps {
// // // // // // // // //   courseId: string;
// // // // // // // // //   isEnrolled: boolean;
// // // // // // // // //   onEnrollmentChange: () => void;
// // // // // // // // // }

// // // // // // // // // export const EnrollmentButton = ({
// // // // // // // // //   courseId,
// // // // // // // // //   isEnrolled,
// // // // // // // // //   onEnrollmentChange,
// // // // // // // // // }: EnrollmentButtonProps) => {
// // // // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // // // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // // // // // // // //   const { toast } = useToast();

// // // // // // // // //   const loadRazorpayScript = () => {
// // // // // // // // //     return new Promise((resolve) => {
// // // // // // // // //       const script = document.createElement("script");
// // // // // // // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // // // // // //       script.onload = () => resolve(true);
// // // // // // // // //       script.onerror = () => resolve(false);
// // // // // // // // //       document.body.appendChild(script);
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const handlePaymentMethodSelect = async (paymentMethod: string) => {
// // // // // // // // //     try {
// // // // // // // // //       setIsLoading(true);

// // // // // // // // //       // Get current session
// // // // // // // // //       const {
// // // // // // // // //         data: { session },
// // // // // // // // //       } = await supabase.auth.getSession();
// // // // // // // // //       if (!session) {
// // // // // // // // //         toast({
// // // // // // // // //           title: "Authentication Required",
// // // // // // // // //           description: "Please log in to enroll in this course.",
// // // // // // // // //           variant: "destructive",
// // // // // // // // //         });
// // // // // // // // //         return;
// // // // // // // // //       }

// // // // // // // // //       if (paymentMethod === "razorpay") {
// // // // // // // // //         // Load Razorpay script
// // // // // // // // //         const razorpayLoaded = await loadRazorpayScript();
// // // // // // // // //         if (!razorpayLoaded) {
// // // // // // // // //           throw new Error("Failed to load payment processor");
// // // // // // // // //         }
// // // // // // // // //         const response = await fetch("/api/create-payment", {
// // // // // // // // //           method: "POST",
// // // // // // // // //           headers: {
// // // // // // // // //             "Content-Type": "application/json",
// // // // // // // // //             Authorization: `Bearer ${session.access_token}`,
// // // // // // // // //           },
// // // // // // // // //           body: JSON.stringify({ courseId, paymentMethod }),
// // // // // // // // //         });

// // // // // // // // //         // Create order on your backend
// // // // // // // // //         const { data: course, error: courseError } =
// // // // // // // // //           await supabase.functions.invoke("create-course-payment", {
// // // // // // // // //             body: {
// // // // // // // // //               courseId,
// // // // // // // // //               amount: 4999, // ₹49.99 (amount in paise)
// // // // // // // // //               currency: "INR",
// // // // // // // // //             },
// // // // // // // // //             headers: {
// // // // // // // // //               Authorization: `Bearer ${session.access_token}`,
// // // // // // // // //             },
// // // // // // // // //           });

// // // // // // // // //         if (courseError || !course) {
// // // // // // // // //           throw new Error(
// // // // // // // // //             courseError?.message || "Failed to create payment order"
// // // // // // // // //           );
// // // // // // // // //         }

// // // // // // // // //         // Initialize Razorpay payment
// // // // // // // // //         const options = {
// // // // // // // // //           key: "rzp_test_eK57VjQhXHjIGR",
// // // // // // // // //           amount: course.amount,
// // // // // // // // //           currency: course.currency,
// // // // // // // // //           name: "Course Enrollment",
// // // // // // // // //           description: `Payment for course enrollment`,
// // // // // // // // //           order_id: course.id,
// // // // // // // // //           handler: async (response: any) => {
// // // // // // // // //             try {
// // // // // // // // //               // Verify payment on your backend
// // // // // // // // //               const { error: verifyError } = await supabase.functions.invoke(
// // // // // // // // //                 "verify-payment",
// // // // // // // // //                 {
// // // // // // // // //                   body: {
// // // // // // // // //                     paymentId: response.razorpay_payment_id,
// // // // // // // // //                     orderId: response.razorpay_order_id,
// // // // // // // // //                     signature: response.razorpay_signature,
// // // // // // // // //                     courseId,
// // // // // // // // //                   },
// // // // // // // // //                   headers: {
// // // // // // // // //                     Authorization: `Bearer ${session.access_token}`,
// // // // // // // // //                   },
// // // // // // // // //                 }
// // // // // // // // //               );

// // // // // // // // //               if (verifyError) {
// // // // // // // // //                 throw new Error(
// // // // // // // // //                   verifyError.message || "Payment verification failed"
// // // // // // // // //                 );
// // // // // // // // //               }

// // // // // // // // //               toast({
// // // // // // // // //                 title: "Enrollment Successful",
// // // // // // // // //                 description:
// // // // // // // // //                   "You have been successfully enrolled in the course!",
// // // // // // // // //               });
// // // // // // // // //               onEnrollmentChange();
// // // // // // // // //             } catch (error: any) {
// // // // // // // // //               toast({
// // // // // // // // //                 title: "Payment Verification Failed",
// // // // // // // // //                 description:
// // // // // // // // //                   error.message || "There was an issue verifying your payment",
// // // // // // // // //                 variant: "destructive",
// // // // // // // // //               });
// // // // // // // // //             } finally {
// // // // // // // // //               setIsLoading(false);
// // // // // // // // //               setShowPaymentMethods(false);
// // // // // // // // //             }
// // // // // // // // //           },
// // // // // // // // //           prefill: {
// // // // // // // // //             name: session.user.user_metadata?.full_name || "",
// // // // // // // // //             email: session.user.email || "",
// // // // // // // // //           },
// // // // // // // // //           theme: {
// // // // // // // // //             color: "#2563eb",
// // // // // // // // //           },
// // // // // // // // //           modal: {
// // // // // // // // //             ondismiss: () => {
// // // // // // // // //               toast({
// // // // // // // // //                 title: "Payment Cancelled",
// // // // // // // // //                 description: "You cancelled the payment process",
// // // // // // // // //                 variant: "default",
// // // // // // // // //               });
// // // // // // // // //               setIsLoading(false);
// // // // // // // // //             },
// // // // // // // // //           },
// // // // // // // // //         };

// // // // // // // // //         const razorpay = new (window as any).Razorpay(options);
// // // // // // // // //         razorpay.open();
// // // // // // // // //       } else if (paymentMethod === "paypal") {
// // // // // // // // //         toast({
// // // // // // // // //           title: "PayPal Integration",
// // // // // // // // //           description: "PayPal payment integration is coming soon!",
// // // // // // // // //           variant: "destructive",
// // // // // // // // //         });
// // // // // // // // //       } else if (paymentMethod === "bank") {
// // // // // // // // //         toast({
// // // // // // // // //           title: "Bank Transfer",
// // // // // // // // //           description: "Bank transfer option is coming soon!",
// // // // // // // // //           variant: "destructive",
// // // // // // // // //         });
// // // // // // // // //       }
// // // // // // // // //     } catch (error: any) {
// // // // // // // // //       console.error("Enrollment error:", error);

// // // // // // // // //       let errorMessage =
// // // // // // // // //         "Failed to start enrollment process. Please try again.";

// // // // // // // // //       if (error.message?.includes("already enrolled")) {
// // // // // // // // //         errorMessage = "You are already enrolled in this course.";
// // // // // // // // //         onEnrollmentChange();
// // // // // // // // //       }

// // // // // // // // //       toast({
// // // // // // // // //         title: "Enrollment Failed",
// // // // // // // // //         description: errorMessage,
// // // // // // // // //         variant: "destructive",
// // // // // // // // //       });
// // // // // // // // //     } finally {
// // // // // // // // //       setIsLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   if (isEnrolled) {
// // // // // // // // //     return (
// // // // // // // // //       <Button className="w-full" variant="secondary" disabled>
// // // // // // // // //         Already Enrolled
// // // // // // // // //       </Button>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // // // // // // // //       <DialogTrigger asChild>
// // // // // // // // //         <Button className="w-full" size="lg" disabled={isLoading}>
// // // // // // // // //           {isLoading ? (
// // // // // // // // //             <>
// // // // // // // // //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // // // // // //               Processing...
// // // // // // // // //             </>
// // // // // // // // //           ) : (
// // // // // // // // //             <>
// // // // // // // // //               <CreditCard className="mr-2 h-4 w-4" />
// // // // // // // // //               Enroll for ₹49.99
// // // // // // // // //             </>
// // // // // // // // //           )}
// // // // // // // // //         </Button>
// // // // // // // // //       </DialogTrigger>
// // // // // // // // //       <DialogContent className="sm:max-w-md">
// // // // // // // // //         <DialogHeader>
// // // // // // // // //           <DialogTitle>Choose Payment Method</DialogTitle>
// // // // // // // // //         </DialogHeader>
// // // // // // // // //         <PaymentMethodSelector
// // // // // // // // //           onPaymentMethodSelect={handlePaymentMethodSelect}
// // // // // // // // //           isLoading={isLoading}
// // // // // // // // //         />
// // // // // // // // //       </DialogContent>
// // // // // // // // //     </Dialog>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // import { useState } from "react";
// // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // // import { Loader2, CreditCard } from "lucide-react";
// // // // // // // // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // // // // // // // import {
// // // // // // // //   Dialog,
// // // // // // // //   DialogContent,
// // // // // // // //   DialogHeader,
// // // // // // // //   DialogTitle,
// // // // // // // //   DialogTrigger,
// // // // // // // // } from "@/components/ui/dialog";

// // // // // // // // interface EnrollmentButtonProps {
// // // // // // // //   courseId: string;
// // // // // // // //   isEnrolled: boolean;
// // // // // // // //   onEnrollmentChange: () => void;
// // // // // // // // }

// // // // // // // // export const EnrollmentButton = ({
// // // // // // // //   courseId,
// // // // // // // //   isEnrolled,
// // // // // // // //   onEnrollmentChange,
// // // // // // // // }: EnrollmentButtonProps) => {
// // // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // // // // // // //   const { toast } = useToast();

// // // // // // // //   const loadRazorpayScript = () => {
// // // // // // // //     return new Promise((resolve) => {
// // // // // // // //       const script = document.createElement("script");
// // // // // // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // // // // //       script.onload = () => resolve(true);
// // // // // // // //       script.onerror = () => resolve(false);
// // // // // // // //       document.body.appendChild(script);
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   // const handlePaymentMethodSelect = async (paymentMethod: string) => {
// // // // // // // //   //   try {
// // // // // // // //   //     setIsLoading(true);

// // // // // // // //   //     const {
// // // // // // // //   //       data: { session },
// // // // // // // //   //     } = await supabase.auth.getSession();
// // // // // // // //   //     if (!session) {
// // // // // // // //   //       toast({
// // // // // // // //   //         title: "Authentication Required",
// // // // // // // //   //         description: "Please log in to enroll in this course.",
// // // // // // // //   //         variant: "destructive",
// // // // // // // //   //       });
// // // // // // // //   //       setIsLoading(false);
// // // // // // // //   //       return;
// // // // // // // //   //     }

// // // // // // // //   //     if (paymentMethod === "razorpay") {
// // // // // // // //   //       const razorpayLoaded = await loadRazorpayScript();
// // // // // // // //   //       if (!razorpayLoaded) {
// // // // // // // //   //         throw new Error("Failed to load Razorpay script");
// // // // // // // //   //       }

// // // // // // // //   //       // const response = await fetch("/api/create-payment", {
// // // // // // // //   //       //   method: "POST",
// // // // // // // //   //       //   headers: {
// // // // // // // //   //       //     "Content-Type": "application/json",
// // // // // // // //   //       //     Authorization: `Bearer ${session.access_token}`,
// // // // // // // //   //       //   },
// // // // // // // //   //       //   body: JSON.stringify({ courseId, paymentMethod }),
// // // // // // // //   //       // });
// // // // // // // //   //       console.log("lllllllllll")
// // // // // // // //   //       const response = await fetch("/api/create-payment", {
// // // // // // // //   //         method: "POST",
// // // // // // // //   //         headers: {
// // // // // // // //   //           "Content-Type": "application/json",
// // // // // // // //   //           Authorization: `Bearer ${session.access_token}`,
// // // // // // // //   //         },
// // // // // // // //   //         body: JSON.stringify({ courseId, paymentMethod: "razorpay" }),
// // // // // // // //   //       });

// // // // // // // //   //       if (!response.ok) {
// // // // // // // //   //         const errorText = await response.text(); // fallback in case it's not JSON
// // // // // // // //   //         throw new Error(`Failed to create payment: ${errorText}`);
// // // // // // // //   //       }

// // // // // // // //   //       const data = await response.json(); // ✅ only parse if .ok

// // // // // // // //   //       // const data = await response.json();
// // // // // // // //   //       if (!response.ok) throw new Error(data.error || "Payment init failed");

// // // // // // // //   //       const options = {
// // // // // // // //   //         key: data.key,
// // // // // // // //   //         amount: data.amount,
// // // // // // // //   //         currency: data.currency,
// // // // // // // //   //         name: "Course Enrollment",
// // // // // // // //   //         description: `Enroll in ${data.courseTitle}`,
// // // // // // // //   //         order_id: data.orderId,
// // // // // // // //   //         prefill: {
// // // // // // // //   //           name: session.user.user_metadata?.full_name || "",
// // // // // // // //   //           email: session.user.email || "",
// // // // // // // //   //         },
// // // // // // // //   //         theme: { color: "#2563eb" },
// // // // // // // //   //         modal: {
// // // // // // // //   //           ondismiss: () => {
// // // // // // // //   //             toast({
// // // // // // // //   //               title: "Payment Cancelled",
// // // // // // // //   //               description: "You cancelled the payment process.",
// // // // // // // //   //             });
// // // // // // // //   //             setIsLoading(false);
// // // // // // // //   //           },
// // // // // // // //   //         },
// // // // // // // //   //         handler: async (response: any) => {
// // // // // // // //   //           try {
// // // // // // // //   //             const verifyRes = await fetch("/api/verify-payment", {
// // // // // // // //   //               method: "POST",
// // // // // // // //   //               headers: {
// // // // // // // //   //                 "Content-Type": "application/json",
// // // // // // // //   //                 Authorization: `Bearer ${session.access_token}`,
// // // // // // // //   //               },
// // // // // // // //   //               body: JSON.stringify({
// // // // // // // //   //                 razorpay_payment_id: response.razorpay_payment_id,
// // // // // // // //   //                 razorpay_order_id: response.razorpay_order_id,
// // // // // // // //   //                 razorpay_signature: response.razorpay_signature,
// // // // // // // //   //                 courseId,
// // // // // // // //   //               }),
// // // // // // // //   //             });

// // // // // // // //   //             const verifyData = await verifyRes.json();
// // // // // // // //   //             if (!verifyRes.ok) {
// // // // // // // //   //               throw new Error(
// // // // // // // //   //                 verifyData.error || "Payment verification failed"
// // // // // // // //   //               );
// // // // // // // //   //             }

// // // // // // // //   //             toast({
// // // // // // // //   //               title: "Enrollment Successful",
// // // // // // // //   //               description: "You've been enrolled successfully!",
// // // // // // // //   //             });
// // // // // // // //   //             onEnrollmentChange();
// // // // // // // //   //           } catch (error: any) {
// // // // // // // //   //             toast({
// // // // // // // //   //               title: "Payment Verification Failed",
// // // // // // // //   //               description: error.message || "An error occurred",
// // // // // // // //   //               variant: "destructive",
// // // // // // // //   //             });
// // // // // // // //   //           } finally {
// // // // // // // //   //             setIsLoading(false);
// // // // // // // //   //             setShowPaymentMethods(false);
// // // // // // // //   //           }
// // // // // // // //   //         },
// // // // // // // //   //       };

// // // // // // // //   //       console.log("DDDDDDDDDD", options);
// // // // // // // //   //       const razorpay = new (window as any).Razorpay(options);
// // // // // // // //   //       razorpay.open();
// // // // // // // //   //     } else {
// // // // // // // //   //       toast({
// // // // // // // //   //         title: "Unavailable",
// // // // // // // //   //         description: `${paymentMethod} payment method is coming soon.`,
// // // // // // // //   //         variant: "destructive",
// // // // // // // //   //       });
// // // // // // // //   //       setIsLoading(false);
// // // // // // // //   //     }
// // // // // // // //   //   } catch (error: any) {
// // // // // // // //   //     console.error("Enrollment error:", error);
// // // // // // // //   //     toast({
// // // // // // // //   //       title: "Enrollment Failed",
// // // // // // // //   //       description: error.message || "An error occurred",
// // // // // // // //   //       variant: "destructive",
// // // // // // // //   //     });
// // // // // // // //   //     setIsLoading(false);
// // // // // // // //   //   }
// // // // // // // //   // };
// // // // // // // //   // -- your existing imports --

// // // // // // // //   const handlePaymentMethodSelect = async (paymentMethod: string) => {
// // // // // // // //     try {
// // // // // // // //       setIsLoading(true);

// // // // // // // //       const {
// // // // // // // //         data: { session },
// // // // // // // //       } = await supabase.auth.getSession();
// // // // // // // //       if (!session) {
// // // // // // // //         toast({ title: "Please log in", variant: "destructive" });
// // // // // // // //         setIsLoading(false);
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       if (paymentMethod !== "razorpay") {
// // // // // // // //         toast({ title: "Not implemented yet", variant: "destructive" });
// // // // // // // //         setIsLoading(false);
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       const loaded = await loadRazorpayScript();
// // // // // // // //       if (!loaded) throw new Error("Razorpay failed to load");

// // // // // // // //       const response = await fetch("/api/create-payment", {
// // // // // // // //         method: "POST",
// // // // // // // //         headers: {
// // // // // // // //           "Content-Type": "application/json",
// // // // // // // //           Authorization: `Bearer ${session.access_token}`,
// // // // // // // //         },
// // // // // // // //         body: JSON.stringify({ courseId }),
// // // // // // // //       });

// // // // // // // //       if (!response.ok) {
// // // // // // // //         const errorText = await response.text();
// // // // // // // //         throw new Error(errorText || "Payment init failed");
// // // // // // // //       }

// // // // // // // //       const data = await response.json();

// // // // // // // //       const options = {
// // // // // // // //         key: data.key,
// // // // // // // //         amount: data.amount,
// // // // // // // //         currency: data.currency,
// // // // // // // //         name: "Course Enrollment",
// // // // // // // //         description: data.courseTitle,
// // // // // // // //         order_id: data.orderId,
// // // // // // // //         prefill: {
// // // // // // // //           email: session.user.email || "",
// // // // // // // //         },
// // // // // // // //         handler: async (resp) => {
// // // // // // // //           const verifyRes = await fetch("/api/verify-payment", {
// // // // // // // //             method: "POST",
// // // // // // // //             headers: {
// // // // // // // //               "Content-Type": "application/json",
// // // // // // // //               Authorization: `Bearer ${session.access_token}`,
// // // // // // // //             },
// // // // // // // //             body: JSON.stringify({
// // // // // // // //               razorpay_payment_id: resp.razorpay_payment_id,
// // // // // // // //               razorpay_order_id: resp.razorpay_order_id,
// // // // // // // //               razorpay_signature: resp.razorpay_signature,
// // // // // // // //               courseId,
// // // // // // // //             }),
// // // // // // // //           });

// // // // // // // //           if (!verifyRes.ok) {
// // // // // // // //             const err = await verifyRes.text();
// // // // // // // //             throw new Error(err || "Verification failed");
// // // // // // // //           }

// // // // // // // //           toast({ title: "Enrollment Successful" });
// // // // // // // //           onEnrollmentChange();
// // // // // // // //         },
// // // // // // // //         modal: {
// // // // // // // //           ondismiss: () => {
// // // // // // // //             toast({ title: "Payment Cancelled" });
// // // // // // // //             setIsLoading(false);
// // // // // // // //           },
// // // // // // // //         },
// // // // // // // //       };

// // // // // // // //       new (window as any).Razorpay(options).open();
// // // // // // // //     } catch (err: any) {
// // // // // // // //       toast({
// // // // // // // //         title: "Error",
// // // // // // // //         description: err.message,
// // // // // // // //         variant: "destructive",
// // // // // // // //       });
// // // // // // // //     } finally {
// // // // // // // //       setIsLoading(false);
// // // // // // // //       setShowPaymentMethods(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   if (isEnrolled) {
// // // // // // // //     return (
// // // // // // // //       <Button className="w-full" variant="secondary" disabled>
// // // // // // // //         Already Enrolled
// // // // // // // //       </Button>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // // // // // // //       <DialogTrigger asChild>
// // // // // // // //         <Button className="w-full" size="lg" disabled={isLoading}>
// // // // // // // //           {isLoading ? (
// // // // // // // //             <>
// // // // // // // //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // // // // //               Processing...
// // // // // // // //             </>
// // // // // // // //           ) : (
// // // // // // // //             <>
// // // // // // // //               <CreditCard className="mr-2 h-4 w-4" />
// // // // // // // //               Enroll for ₹49.99
// // // // // // // //             </>
// // // // // // // //           )}
// // // // // // // //         </Button>
// // // // // // // //       </DialogTrigger>
// // // // // // // //       <DialogContent className="sm:max-w-md">
// // // // // // // //         <DialogHeader>
// // // // // // // //           <DialogTitle>Choose Payment Method</DialogTitle>
// // // // // // // //         </DialogHeader>
// // // // // // // //         <PaymentMethodSelector
// // // // // // // //           onPaymentMethodSelect={handlePaymentMethodSelect}
// // // // // // // //           isLoading={isLoading}
// // // // // // // //         />
// // // // // // // //       </DialogContent>
// // // // // // // //     </Dialog>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // import { useState } from "react";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // import { Loader2, CreditCard } from "lucide-react";
// // // // // // // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // // // // // // import {
// // // // // // //   Dialog,
// // // // // // //   DialogContent,
// // // // // // //   DialogHeader,
// // // // // // //   DialogTitle,
// // // // // // //   DialogTrigger,
// // // // // // // } from "@/components/ui/dialog";

// // // // // // // interface Props {
// // // // // // //   courseId: string;
// // // // // // //   isEnrolled: boolean;
// // // // // // //   onEnrollmentChange: () => void;
// // // // // // // }

// // // // // // // export const EnrollmentButton = ({
// // // // // // //   courseId,
// // // // // // //   isEnrolled,
// // // // // // //   onEnrollmentChange,
// // // // // // // }: Props) => {
// // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // // // // // //   const { toast } = useToast();

// // // // // // //   const loadRazorpayScript = () =>
// // // // // // //     new Promise<boolean>((resolve) => {
// // // // // // //       const script = document.createElement("script");
// // // // // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // // // //       script.onload = () => resolve(true);
// // // // // // //       script.onerror = () => resolve(false);
// // // // // // //       document.body.appendChild(script);
// // // // // // //     });

// // // // // // //   const handlePaymentMethodSelect = async (method: string) => {
// // // // // // //     if (method !== "razorpay") {
// // // // // // //       toast({
// // // // // // //         title: "Coming Soon",
// // // // // // //         description: `${method} is not available.`,
// // // // // // //         variant: "destructive",
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     setIsLoading(true);

// // // // // // //     try {
// // // // // // //       const {
// // // // // // //         data: { session },
// // // // // // //       } = await supabase.auth.getSession();
// // // // // // //       if (!session) throw new Error("Please log in");

// // // // // // //       const loaded = await loadRazorpayScript();
// // // // // // //       if (!loaded) throw new Error("Payment script load failed");

// // // // // // //       const res = await fetch("/api/create-payment", {
// // // // // // //         method: "POST",
// // // // // // //         headers: {
// // // // // // //           "Content-Type": "application/json",
// // // // // // //           Authorization: `Bearer ${session.access_token}`,
// // // // // // //         },
// // // // // // //         body: JSON.stringify({ courseId }),
// // // // // // //         prefill: {
// // // // // // //                     name: userData?.name || 'User Name',
// // // // // // //                     email: userData?.email || 'user@example.com',
// // // // // // //                     contact: '9999999999'
// // // // // // //                 },
// // // // // // //                 theme: {
// // // // // // //                     color: '#528FF0'
// // // // // // //                 },
// // // // // // //                 modal: {
// // // // // // //                     ondismiss: function() {
// // // // // // //                         setLoading(false);
// // // // // // //                     }
// // // // // // //       });

// // // // // // //       const json = await res.json();
// // // // // // //       const razorpay = new window.Razorpay(options);
// // // // // // //       razorpay.open();
// // // // // // //       if (!res.ok) throw new Error(json.error || "Payment init failed");

// // // // // // //       const options = {
// // // // // // //         key: json.key,
// // // // // // //         amount: json.amount,
// // // // // // //         currency: json.currency,
// // // // // // //         name: "Course Enrollment",
// // // // // // //         description: json.courseTitle,
// // // // // // //         order_id: json.orderId,
// // // // // // //         prefill: { email: session.user.email || "" },
// // // // // // //         handler: async (rsp: any) => {
// // // // // // //           const v = await fetch("/api/verify-payment", {
// // // // // // //             method: "POST",
// // // // // // //             headers: {
// // // // // // //               "Content-Type": "application/json",
// // // // // // //               Authorization: `Bearer ${session.access_token}`,
// // // // // // //             },
// // // // // // //             body: JSON.stringify({
// // // // // // //               razorpay_order_id: rsp.razorpay_order_id,
// // // // // // //               razorpay_payment_id: rsp.razorpay_payment_id,
// // // // // // //               razorpay_signature: rsp.razorpay_signature,
// // // // // // //               courseId,
// // // // // // //             }),
// // // // // // //           });
// // // // // // //           const vjson = await v.json();
// // // // // // //           if (!v.ok) throw new Error(vjson.error || "Verification failed");

// // // // // // //           toast({
// // // // // // //             title: "Enrolled!",
// // // // // // //             description: "You’ve been enrolled successfully.",
// // // // // // //           });
// // // // // // //           onEnrollmentChange();
// // // // // // //         },
// // // // // // //         modal: {
// // // // // // //           ondismiss: () => toast({ title: "Payment Cancelled" }),
// // // // // // //         },
// // // // // // //       };

// // // // // // //       new (window as any).Razorpay(options).open();
// // // // // // //     } catch (e: any) {
// // // // // // //       toast({ title: "Error", description: e.message, variant: "destructive" });
// // // // // // //     } finally {
// // // // // // //       setIsLoading(false);
// // // // // // //       setShowPaymentMethods(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   if (isEnrolled) {
// // // // // // //     return (
// // // // // // //       <Button className="w-full" variant="secondary" disabled>
// // // // // // //         Already Enrolled
// // // // // // //       </Button>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // // // // // //       <DialogTrigger asChild>
// // // // // // //         <Button size="lg" className="w-full" disabled={isLoading}>
// // // // // // //           {isLoading ? (
// // // // // // //             <Loader2 className="mr-2 animate-spin" />
// // // // // // //           ) : (
// // // // // // //             <CreditCard className="mr-2" />
// // // // // // //           )}
// // // // // // //           {isLoading ? "Processing..." : "Enroll for ₹49.99"}
// // // // // // //         </Button>
// // // // // // //       </DialogTrigger>
// // // // // // //       <DialogContent aria-describedby="payment-desc">
// // // // // // //         <DialogHeader>
// // // // // // //           <DialogTitle>Select Payment Method</DialogTitle>
// // // // // // //         </DialogHeader>
// // // // // // //         <p id="payment-desc" className="sr-only">
// // // // // // //           Choose a payment method.
// // // // // // //         </p>
// // // // // // //         <PaymentMethodSelector
// // // // // // //           onPaymentMethodSelect={handlePaymentMethodSelect}
// // // // // // //           isLoading={isLoading}
// // // // // // //         />
// // // // // // //       </DialogContent>
// // // // // // //     </Dialog>
// // // // // // //   );
// // // // // // // };

// // // // // // // import { useState } from "react";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // import { Loader2, CreditCard } from "lucide-react";
// // // // // // // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // // // // // // import {
// // // // // // //   Dialog,
// // // // // // //   DialogContent,
// // // // // // //   DialogHeader,
// // // // // // //   DialogTitle,
// // // // // // //   DialogTrigger,
// // // // // // // } from "@/components/ui/dialog";

// // // // // // // interface Props {
// // // // // // //   courseId: string;
// // // // // // //   isEnrolled: boolean;
// // // // // // //   onEnrollmentChange: () => void;
// // // // // // // }
// // // // // // // declare global {
// // // // // // //   interface Window {
// // // // // // //     Razorpay: any;
// // // // // // //   }
// // // // // // // }
// // // // // // // export const EnrollmentButton = ({
// // // // // // //   courseId,
// // // // // // //   isEnrolled,
// // // // // // //   onEnrollmentChange,
// // // // // // // }: Props) => {
// // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // // // // // //   const { toast } = useToast();

// // // // // // //   const loadRazorpayScript = () =>
// // // // // // //     new Promise<boolean>((resolve) => {
// // // // // // //       const script = document.createElement("script");
// // // // // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // // // //       script.onload = () => resolve(true);
// // // // // // //       script.onerror = () => resolve(false);
// // // // // // //       document.body.appendChild(script);
// // // // // // //     });

// // // // // // //   const handlePaymentMethodSelect = async (method: string) => {
// // // // // // //     if (method !== "razorpay") {
// // // // // // //       toast({
// // // // // // //         title: "Coming Soon",
// // // // // // //         description: `${method} is not available.`,
// // // // // // //         variant: "destructive",
// // // // // // //       });
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     setIsLoading(true);

// // // // // // //     try {
// // // // // // //       const {
// // // // // // //         data: { session },
// // // // // // //       } = await supabase.auth.getSession();
// // // // // // //       if (!session) throw new Error("Please log in");

// // // // // // //       const loaded = await loadRazorpayScript();
// // // // // // //       if (!loaded) throw new Error("Payment script load failed");

// // // // // // //       // Create payment
// // // // // // //       const res = await fetch("/api/create-payment", {
// // // // // // //         method: "POST",
// // // // // // //         headers: {
// // // // // // //           "Content-Type": "application/json",
// // // // // // //           // Authorization: `Bearer ${session.access_token}`,
// // // // // // //         },
// // // // // // //         body: JSON.stringify({ courseId }),
// // // // // // //       });
// // // // // // //       console.log("ggggggggg");

// // // // // // //       if (!res.ok) {
// // // // // // //         const errorData = await res.json();
// // // // // // //         throw new Error(errorData.error || "Payment initialization failed");
// // // // // // //       }

// // // // // // //       const paymentData = await res.json();

// // // // // // //       // Initialize Razorpay
// // // // // // //       const options = {
// // // // // // //         key: paymentData.key,
// // // // // // //         amount: paymentData.amount,
// // // // // // //         currency: paymentData.currency,
// // // // // // //         name: "Course Enrollment",
// // // // // // //         description: paymentData.courseTitle,
// // // // // // //         order_id: paymentData.orderId,
// // // // // // //         prefill: {
// // // // // // //           name: session.user.user_metadata?.full_name || "User",
// // // // // // //           email: session.user.email || "",
// // // // // // //           contact: session.user.phone || "",
// // // // // // //         },
// // // // // // //         theme: {
// // // // // // //           color: "#528FF0",
// // // // // // //         },
// // // // // // //         handler: async (response: any) => {
// // // // // // //           try {
// // // // // // //             const verificationRes = await fetch("/api/verify-payment", {
// // // // // // //               method: "POST",
// // // // // // //               headers: {
// // // // // // //                 "Content-Type": "application/json",
// // // // // // //                 Authorization: `Bearer ${session.access_token}`,
// // // // // // //               },
// // // // // // //               body: JSON.stringify({
// // // // // // //                 razorpay_order_id: response.razorpay_order_id,
// // // // // // //                 razorpay_payment_id: response.razorpay_payment_id,
// // // // // // //                 razorpay_signature: response.razorpay_signature,
// // // // // // //                 courseId,
// // // // // // //               }),
// // // // // // //             });

// // // // // // //             if (!verificationRes.ok) {
// // // // // // //               throw new Error("Payment verification failed");
// // // // // // //             }

// // // // // // //             toast({
// // // // // // //               title: "Enrolled!",
// // // // // // //               description: "You've been enrolled successfully.",
// // // // // // //             });
// // // // // // //             onEnrollmentChange();
// // // // // // //           } catch (error: any) {
// // // // // // //             toast({
// // // // // // //               title: "Verification Error",
// // // // // // //               description: error.message,
// // // // // // //               variant: "destructive",
// // // // // // //             });
// // // // // // //           }
// // // // // // //         },
// // // // // // //         modal: {
// // // // // // //           ondismiss: () => {
// // // // // // //             toast({ title: "Payment Cancelled" });
// // // // // // //             setIsLoading(false);
// // // // // // //           },
// // // // // // //         },
// // // // // // //       };

// // // // // // //       const razorpay = new window.Razorpay(options);
// // // // // // //       razorpay.open();
// // // // // // //     } catch (error: any) {
// // // // // // //       toast({
// // // // // // //         title: "Error",
// // // // // // //         description: error.message,
// // // // // // //         variant: "destructive",
// // // // // // //       });
// // // // // // //     } finally {
// // // // // // //       setIsLoading(false);
// // // // // // //       setShowPaymentMethods(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   if (isEnrolled) {
// // // // // // //     return (
// // // // // // //       <Button className="w-full" variant="secondary" disabled>
// // // // // // //         Already Enrolled
// // // // // // //       </Button>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // // // // // //       <DialogTrigger asChild>
// // // // // // //         <Button size="lg" className="w-full" disabled={isLoading}>
// // // // // // //           {isLoading ? (
// // // // // // //             <Loader2 className="mr-2 animate-spin" />
// // // // // // //           ) : (
// // // // // // //             <CreditCard className="mr-2" />
// // // // // // //           )}
// // // // // // //           {isLoading ? "Processing..." : "Enroll for ₹49.99"}
// // // // // // //         </Button>
// // // // // // //       </DialogTrigger>
// // // // // // //       <DialogContent>
// // // // // // //         <DialogHeader>
// // // // // // //           <DialogTitle>Select Payment Method</DialogTitle>
// // // // // // //         </DialogHeader>
// // // // // // //         <PaymentMethodSelector
// // // // // // //           onPaymentMethodSelect={handlePaymentMethodSelect}
// // // // // // //           isLoading={isLoading}
// // // // // // //         />
// // // // // // //       </DialogContent>
// // // // // // //     </Dialog>
// // // // // // //   );
// // // // // // // };

// // // // // // import { useState } from "react";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // import { supabase as supabase } from "@/integrations/supabase/client";
// // // // // // import { Loader2, CreditCard } from "lucide-react";
// // // // // // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // // // // // import {
// // // // // //   Dialog,
// // // // // //   DialogContent,
// // // // // //   DialogHeader,
// // // // // //   DialogTitle,
// // // // // //   DialogTrigger,
// // // // // // } from "@/components/ui/dialog";

// // // // // // import Razorpay from "razorpay";
// // // // // // import { createClient } from "@supabase/supabase-js";
// // // // // // import crypto from "crypto";

// // // // // // // ✅ Define interfaces
// // // // // // interface Props {
// // // // // //   courseId: string;
// // // // // //   isEnrolled: boolean;
// // // // // //   onEnrollmentChange: () => void;
// // // // // // }

// // // // // // interface PaymentData {
// // // // // //   success: boolean;
// // // // // //   key: string;
// // // // // //   orderId: string;
// // // // // //   amount: number;
// // // // // //   currency: string;
// // // // // //   courseTitle: string;
// // // // // // }

// // // // // // declare global {
// // // // // //   interface Window {
// // // // // //     Razorpay: any;
// // // // // //   }
// // // // // // }

// // // // // // // ✅ Supabase Admin Client
// // // // // // const supabase = createClient(
// // // // // //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
// // // // // //   process.env.SUPABASE_SERVICE_ROLE_KEY!
// // // // // // );

// // // // // // // ✅ Razorpay Init
// // // // // // const razorpay = new Razorpay({
// // // // // //   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
// // // // // //   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// // // // // // });

// // // // // // // ✅ Mocked handler function replacing Next.js API endpoint
// // // // // // const handleCreatePayment = async (
// // // // // //   courseId: string,
// // // // // //   token: string
// // // // // // ): Promise<PaymentData> => {
// // // // // //   const {
// // // // // //     data: { user },
// // // // // //     error: userError,
// // // // // //   } = await supabase.auth.getUser(token);
// // // // // //   if (!user || userError) throw new Error("Invalid or expired token");

// // // // // //   const { data: course, error: courseError } = await supabase
// // // // // //     .from("courses")
// // // // // //     .select("id, title")
// // // // // //     .eq("id", courseId)
// // // // // //     .single();

// // // // // //   if (courseError || !course) throw new Error("Course not found");

// // // // // //   const { data: existingEnrollment } = await supabase
// // // // // //     .from("orders")
// // // // // //     .select("id")
// // // // // //     .eq("user_id", user.id)
// // // // // //     .eq("course_id", courseId)
// // // // // //     .eq("status", "paid")
// // // // // //     .maybeSingle();

// // // // // //   if (existingEnrollment) throw new Error("Already enrolled in this course.");

// // // // // //   const order = await razorpay.orders.create({
// // // // // //     amount: 4999,
// // // // // //     currency: "INR",
// // // // // //     receipt: `receipt_${courseId}_${user.id}_${Date.now()}`,
// // // // // //     notes: {
// // // // // //       userId: user.id,
// // // // // //       courseId,
// // // // // //     },
// // // // // //   });

// // // // // //   const { error: insertError } = await supabase.from("orders").insert([
// // // // // //     {
// // // // // //       user_id: user.id,
// // // // // //       course_id: courseId,
// // // // // //       razorpay_order_id: order.id,
// // // // // //       amount: order.amount,
// // // // // //       status: "created",
// // // // // //     },
// // // // // //   ]);

// // // // // //   if (insertError) throw new Error("Failed to store order info");

// // // // // //   return {
// // // // // //     success: true,
// // // // // //     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
// // // // // //     orderId: order.id,
// // // // // //     amount: Number(order.amount),
// // // // // //     currency: order.currency,
// // // // // //     courseTitle: course.title,
// // // // // //   };
// // // // // // };

// // // // // // // ✅ Verification handler
// // // // // // const handleVerifyPayment = async (
// // // // // //   razorpay_order_id: string,
// // // // // //   razorpay_payment_id: string,
// // // // // //   razorpay_signature: string,
// // // // // //   courseId: string
// // // // // // ): Promise<void> => {
// // // // // //   const generatedSignature = crypto
// // // // // //     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
// // // // // //     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
// // // // // //     .digest("hex");

// // // // // //   if (generatedSignature !== razorpay_signature)
// // // // // //     throw new Error("Invalid Razorpay signature");

// // // // // //   const { data: order } = await supabase
// // // // // //     .from("orders")
// // // // // //     .select("*")
// // // // // //     .eq("razorpay_order_id", razorpay_order_id)
// // // // // //     .single();

// // // // // //   if (!order) throw new Error("Order not found");

// // // // // //   await supabase
// // // // // //     .from("orders")
// // // // // //     .update({
// // // // // //       status: "paid",
// // // // // //       razorpay_payment_id,
// // // // // //     })
// // // // // //     .eq("id", order.id);

// // // // // //   await supabase.from("course_enrollments").insert({
// // // // // //     user_id: order.user_id,
// // // // // //     course_id: order.course_id,
// // // // // //     payment_status: "paid",
// // // // // //   });
// // // // // // };

// // // // // // // ✅ Main Component
// // // // // // export const EnrollmentButton = ({
// // // // // //   courseId,
// // // // // //   isEnrolled,
// // // // // //   onEnrollmentChange,
// // // // // // }: Props) => {
// // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // // // // //   const { toast } = useToast();

// // // // // //   const loadRazorpayScript = () =>
// // // // // //     new Promise<boolean>((resolve) => {
// // // // // //       const script = document.createElement("script");
// // // // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // // //       script.onload = () => resolve(true);
// // // // // //       script.onerror = () => resolve(false);
// // // // // //       document.body.appendChild(script);
// // // // // //     });

// // // // // //   const handlePaymentMethodSelect = async (method: string) => {
// // // // // //     if (method !== "razorpay") {
// // // // // //       toast({
// // // // // //         title: "Coming Soon",
// // // // // //         description: `${method} is not available.`,
// // // // // //         variant: "destructive",
// // // // // //       });
// // // // // //       return;
// // // // // //     }

// // // // // //     setIsLoading(true);

// // // // // //     try {
// // // // // //       const {
// // // // // //         data: { session },
// // // // // //       } = await supabase.auth.getSession();

// // // // // //       if (!session) throw new Error("Please log in");

// // // // // //       const loaded = await loadRazorpayScript();
// // // // // //       if (!loaded) throw new Error("Failed to load payment script");

// // // // // //       const paymentData = await handleCreatePayment(
// // // // // //         courseId,
// // // // // //         session.access_token
// // // // // //       );

// // // // // //       const options = {
// // // // // //         key: paymentData.key,
// // // // // //         amount: paymentData.amount,
// // // // // //         currency: paymentData.currency,
// // // // // //         name: "Course Enrollment",
// // // // // //         description: paymentData.courseTitle,
// // // // // //         order_id: paymentData.orderId,
// // // // // //         prefill: {
// // // // // //           name: session.user.user_metadata?.full_name || "User",
// // // // // //           email: session.user.email || "",
// // // // // //           contact: session.user.phone || "",
// // // // // //         },
// // // // // //         theme: { color: "#528FF0" },
// // // // // //         handler: async (response: any) => {
// // // // // //           try {
// // // // // //             await handleVerifyPayment(
// // // // // //               response.razorpay_order_id,
// // // // // //               response.razorpay_payment_id,
// // // // // //               response.razorpay_signature,
// // // // // //               courseId
// // // // // //             );
// // // // // //             toast({
// // // // // //               title: "Enrolled!",
// // // // // //               description: "You've been enrolled successfully.",
// // // // // //             });
// // // // // //             onEnrollmentChange();
// // // // // //           } catch (error: any) {
// // // // // //             toast({
// // // // // //               title: "Verification Error",
// // // // // //               description: error.message,
// // // // // //               variant: "destructive",
// // // // // //             });
// // // // // //           }
// // // // // //         },
// // // // // //         modal: {
// // // // // //           ondismiss: () => {
// // // // // //             toast({ title: "Payment Cancelled" });
// // // // // //             setIsLoading(false);
// // // // // //           },
// // // // // //         },
// // // // // //       };

// // // // // //       const razorpay = new window.Razorpay(options);
// // // // // //       razorpay.open();
// // // // // //     } catch (error: any) {
// // // // // //       toast({
// // // // // //         title: "Payment Error",
// // // // // //         description: error.message,
// // // // // //         variant: "destructive",
// // // // // //       });
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //       setShowPaymentMethods(false);
// // // // // //     }
// // // // // //   };

// // // // // //   if (isEnrolled) {
// // // // // //     return (
// // // // // //       <Button className="w-full" variant="secondary" disabled>
// // // // // //         Already Enrolled
// // // // // //       </Button>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // // // // //       <DialogTrigger asChild>
// // // // // //         <Button size="lg" className="w-full" disabled={isLoading}>
// // // // // //           {isLoading ? (
// // // // // //             <Loader2 className="mr-2 animate-spin" />
// // // // // //           ) : (
// // // // // //             <CreditCard className="mr-2" />
// // // // // //           )}
// // // // // //           {isLoading ? "Processing..." : "Enroll for ₹49.99"}
// // // // // //         </Button>
// // // // // //       </DialogTrigger>
// // // // // //       <DialogContent>
// // // // // //         <DialogHeader>
// // // // // //           <DialogTitle>Select Payment Method</DialogTitle>
// // // // // //         </DialogHeader>
// // // // // //         <PaymentMethodSelector
// // // // // //           onPaymentMethodSelect={handlePaymentMethodSelect}
// // // // // //           isLoading={isLoading}
// // // // // //         />
// // // // // //       </DialogContent>
// // // // // //     </Dialog>
// // // // // //   );
// // // // // // };
// // // // // // export default EnrollmentButton;

// // // // // import { useState } from "react";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { useToast } from "@/hooks/use-toast";
// // // // // import { supabase as supabase } from "@/integrations/supabase/client";
// // // // // import { Loader2, CreditCard } from "lucide-react";
// // // // // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // // // // import {
// // // // //   Dialog,
// // // // //   DialogContent,
// // // // //   DialogHeader,
// // // // //   DialogTitle,
// // // // //   DialogTrigger,
// // // // // } from "@/components/ui/dialog";

// // // // // import Razorpay from "razorpay";
// // // // // import { createClient } from "@supabase/supabase-js";
// // // // // import crypto from "crypto";

// // // // // // ✅ Define environment variables at the top
// // // // // const NEXT_PUBLIC_SUPABASE_URL = "your_supabase_url";
// // // // // const SUPABASE_SERVICE_ROLE_KEY = "your_anon_key";
// // // // // const NEXT_PUBLIC_RAZORPAY_KEY_ID = "rzp_test_eK57VjQhXHjIGR";
// // // // // const RAZORPAY_KEY_SECRET = "MJpdeMCa9LPE7IAzYhchp8AF";

// // // // // // ✅ Define interfaces
// // // // // interface Props {
// // // // //   courseId: string;
// // // // //   isEnrolled: boolean;
// // // // //   onEnrollmentChange: () => void;
// // // // // }

// // // // // interface PaymentData {
// // // // //   success: boolean;
// // // // //   key: string;
// // // // //   orderId: string;
// // // // //   amount: number;
// // // // //   currency: string;
// // // // //   courseTitle: string;
// // // // // }

// // // // // declare global {
// // // // //   interface Window {
// // // // //     Razorpay: any;
// // // // //   }
// // // // // }

// // // // // // ✅ Supabase Admin Client
// // // // // const supabase = createClient(
// // // // //   NEXT_PUBLIC_SUPABASE_URL,
// // // // //   SUPABASE_SERVICE_ROLE_KEY
// // // // // );

// // // // // // ✅ Razorpay Init
// // // // // const razorpay = new Razorpay({
// // // // //   key_id: NEXT_PUBLIC_RAZORPAY_KEY_ID,
// // // // //   key_secret: RAZORPAY_KEY_SECRET,
// // // // // });

// // // // // // ✅ Mocked handler function replacing Next.js API endpoint
// // // // // const handleCreatePayment = async (
// // // // //   courseId: string,
// // // // //   token: string
// // // // // ): Promise<PaymentData> => {
// // // // //   const {
// // // // //     data: { user },
// // // // //     error: userError,
// // // // //   } = await supabase.auth.getUser(token);
// // // // //   if (!user || userError) throw new Error("Invalid or expired token");

// // // // //   const { data: course, error: courseError } = await supabase
// // // // //     .from("courses")
// // // // //     .select("id, title")
// // // // //     .eq("id", courseId)
// // // // //     .single();

// // // // //   if (courseError || !course) throw new Error("Course not found");

// // // // //   const { data: existingEnrollment } = await supabase
// // // // //     .from("orders")
// // // // //     .select("id")
// // // // //     .eq("user_id", user.id)
// // // // //     .eq("course_id", courseId)
// // // // //     .eq("status", "paid")
// // // // //     .maybeSingle();

// // // // //   if (existingEnrollment) throw new Error("Already enrolled in this course.");

// // // // //   const order = await razorpay.orders.create({
// // // // //     amount: 4999,
// // // // //     currency: "INR",
// // // // //     receipt: `receipt_${courseId}_${user.id}_${Date.now()}`,
// // // // //     notes: {
// // // // //       userId: user.id,
// // // // //       courseId,
// // // // //     },
// // // // //   });

// // // // //   const { error: insertError } = await supabase.from("orders").insert([
// // // // //     {
// // // // //       user_id: user.id,
// // // // //       course_id: courseId,
// // // // //       razorpay_order_id: order.id,
// // // // //       amount: order.amount,
// // // // //       status: "created",
// // // // //     },
// // // // //   ]);

// // // // //   if (insertError) throw new Error("Failed to store order info");

// // // // //   return {
// // // // //     success: true,
// // // // //     key: NEXT_PUBLIC_RAZORPAY_KEY_ID,
// // // // //     orderId: order.id,
// // // // //     amount: Number(order.amount),
// // // // //     currency: order.currency,
// // // // //     courseTitle: course.title,
// // // // //   };
// // // // // };

// // // // // // ✅ Verification handler
// // // // // const handleVerifyPayment = async (
// // // // //   razorpay_order_id: string,
// // // // //   razorpay_payment_id: string,
// // // // //   razorpay_signature: string,
// // // // //   courseId: string
// // // // // ): Promise<void> => {
// // // // //   const generatedSignature = crypto
// // // // //     .createHmac("sha256", RAZORPAY_KEY_SECRET)
// // // // //     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
// // // // //     .digest("hex");

// // // // //   if (generatedSignature !== razorpay_signature)
// // // // //     throw new Error("Invalid Razorpay signature");

// // // // //   const { data: order } = await supabase
// // // // //     .from("orders")
// // // // //     .select("*")
// // // // //     .eq("razorpay_order_id", razorpay_order_id)
// // // // //     .single();

// // // // //   if (!order) throw new Error("Order not found");

// // // // //   await supabase
// // // // //     .from("orders")
// // // // //     .update({
// // // // //       status: "paid",
// // // // //       razorpay_payment_id,
// // // // //     })
// // // // //     .eq("id", order.id);

// // // // //   await supabase.from("course_enrollments").insert({
// // // // //     user_id: order.user_id,
// // // // //     course_id: order.course_id,
// // // // //     payment_status: "paid",
// // // // //   });
// // // // // };

// // // // // // ✅ Main Component
// // // // // export const EnrollmentButton = ({
// // // // //   courseId,
// // // // //   isEnrolled,
// // // // //   onEnrollmentChange,
// // // // // }: Props) => {
// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // // // //   const { toast } = useToast();

// // // // //   const loadRazorpayScript = () =>
// // // // //     new Promise<boolean>((resolve) => {
// // // // //       const script = document.createElement("script");
// // // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // //       script.onload = () => resolve(true);
// // // // //       script.onerror = () => resolve(false);
// // // // //       document.body.appendChild(script);
// // // // //     });

// // // // //   const handlePaymentMethodSelect = async (method: string) => {
// // // // //     if (method !== "razorpay") {
// // // // //       toast({
// // // // //         title: "Coming Soon",
// // // // //         description: `${method} is not available.`,
// // // // //         variant: "destructive",
// // // // //       });
// // // // //       return;
// // // // //     }

// // // // //     setIsLoading(true);

// // // // //     try {
// // // // //       const {
// // // // //         data: { session },
// // // // //       } = await supabase.auth.getSession();

// // // // //       if (!session) throw new Error("Please log in");

// // // // //       const loaded = await loadRazorpayScript();
// // // // //       if (!loaded) throw new Error("Failed to load payment script");

// // // // //       const paymentData = await handleCreatePayment(
// // // // //         courseId,
// // // // //         session.access_token
// // // // //       );

// // // // //       const options = {
// // // // //         key: paymentData.key,
// // // // //         amount: paymentData.amount,
// // // // //         currency: paymentData.currency,
// // // // //         name: "Course Enrollment",
// // // // //         description: paymentData.courseTitle,
// // // // //         order_id: paymentData.orderId,
// // // // //         prefill: {
// // // // //           name: session.user.user_metadata?.full_name || "User",
// // // // //           email: session.user.email || "",
// // // // //           contact: session.user.phone || "",
// // // // //         },
// // // // //         theme: { color: "#528FF0" },
// // // // //         handler: async (response: any) => {
// // // // //           try {
// // // // //             await handleVerifyPayment(
// // // // //               response.razorpay_order_id,
// // // // //               response.razorpay_payment_id,
// // // // //               response.razorpay_signature,
// // // // //               courseId
// // // // //             );
// // // // //             toast({
// // // // //               title: "Enrolled!",
// // // // //               description: "You've been enrolled successfully.",
// // // // //             });
// // // // //             onEnrollmentChange();
// // // // //           } catch (error: any) {
// // // // //             toast({
// // // // //               title: "Verification Error",
// // // // //               description: error.message,
// // // // //               variant: "destructive",
// // // // //             });
// // // // //           }
// // // // //         },
// // // // //         modal: {
// // // // //           ondismiss: () => {
// // // // //             toast({ title: "Payment Cancelled" });
// // // // //             setIsLoading(false);
// // // // //           },
// // // // //         },
// // // // //       };

// // // // //       const razorpay = new window.Razorpay(options);
// // // // //       razorpay.open();
// // // // //     } catch (error: any) {
// // // // //       toast({
// // // // //         title: "Payment Error",
// // // // //         description: error.message,
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //       setShowPaymentMethods(false);
// // // // //     }
// // // // //   };

// // // // //   if (isEnrolled) {
// // // // //     return (
// // // // //       <Button className="w-full" variant="secondary" disabled>
// // // // //         Already Enrolled
// // // // //       </Button>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // // // //       <DialogTrigger asChild>
// // // // //         <Button size="lg" className="w-full" disabled={isLoading}>
// // // // //           {isLoading ? (
// // // // //             <Loader2 className="mr-2 animate-spin" />
// // // // //           ) : (
// // // // //             <CreditCard className="mr-2" />
// // // // //           )}
// // // // //           {isLoading ? "Processing..." : "Enroll for ₹49.99"}
// // // // //         </Button>
// // // // //       </DialogTrigger>
// // // // //       <DialogContent>
// // // // //         <DialogHeader>
// // // // //           <DialogTitle>Select Payment Method</DialogTitle>
// // // // //         </DialogHeader>
// // // // //         <PaymentMethodSelector
// // // // //           onPaymentMethodSelect={handlePaymentMethodSelect}
// // // // //           isLoading={isLoading}
// // // // //         />
// // // // //       </DialogContent>
// // // // //     </Dialog>
// // // // //   );
// // // // // };
// // // // // export default EnrollmentButton;

// // // // import { useState } from "react";
// // // // import { Button } from "@/components/ui/button";
// // // // import { useToast } from "@/hooks/use-toast";
// // // // import { supabase as supabase } from "@/integrations/supabase/client";
// // // // import { Loader2, CreditCard } from "lucide-react";
// // // // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // // // import {
// // // //   Dialog,
// // // //   DialogContent,
// // // //   DialogHeader,
// // // //   DialogTitle,
// // // //   DialogTrigger,
// // // // } from "@/components/ui/dialog";

// // // // import Razorpay from "razorpay";
// // // // import { createClient } from "@supabase/supabase-js";
// // // // import crypto from "crypto";

// // // // // ✅ Define environment variables at the top - MAKE SURE TO USE YOUR ACTUAL SUPABASE URL
// // // // const NEXT_PUBLIC_SUPABASE_URL = "https://your-project-ref.supabase.co"; // Replace with your actual Supabase URL
// // // // const SUPABASE_SERVICE_ROLE_KEY = "your_service_role_key_here"; // Replace with your actual key
// // // // const NEXT_PUBLIC_RAZORPAY_KEY_ID = "rzp_test_eK57VjQhXHjIGR";
// // // // const RAZORPAY_KEY_SECRET = "MJpdeMCa9LPE7IAzYhchp8AF";

// // // // // ✅ Define interfaces
// // // // interface Props {
// // // //   courseId: string;
// // // //   isEnrolled: boolean;
// // // //   onEnrollmentChange: () => void;
// // // // }

// // // // interface PaymentData {
// // // //   success: boolean;
// // // //   key: string;
// // // //   orderId: string;
// // // //   amount: number;
// // // //   currency: string;
// // // //   courseTitle: string;
// // // // }

// // // // declare global {
// // // //   interface Window {
// // // //     Razorpay: any;
// // // //   }
// // // // }

// // // // // ✅ Supabase Admin Client
// // // // const supabase = createClient(
// // // //   NEXT_PUBLIC_SUPABASE_URL,
// // // //   SUPABASE_SERVICE_ROLE_KEY
// // // // );

// // // // // ✅ Razorpay Init
// // // // const razorpay = new Razorpay({
// // // //   key_id: NEXT_PUBLIC_RAZORPAY_KEY_ID,
// // // //   key_secret: RAZORPAY_KEY_SECRET,
// // // // });

// // // // // ✅ Mocked handler function replacing Next.js API endpoint
// // // // const handleCreatePayment = async (
// // // //   courseId: string,
// // // //   token: string
// // // // ): Promise<PaymentData> => {
// // // //   const {
// // // //     data: { user },
// // // //     error: userError,
// // // //   } = await supabase.auth.getUser(token);
// // // //   if (!user || userError) throw new Error("Invalid or expired token");

// // // //   const { data: course, error: courseError } = await supabase
// // // //     .from("courses")
// // // //     .select("id, title")
// // // //     .eq("id", courseId)
// // // //     .single();

// // // //   if (courseError || !course) throw new Error("Course not found");

// // // //   const { data: existingEnrollment } = await supabase
// // // //     .from("orders")
// // // //     .select("id")
// // // //     .eq("user_id", user.id)
// // // //     .eq("course_id", courseId)
// // // //     .eq("status", "paid")
// // // //     .maybeSingle();

// // // //   if (existingEnrollment) throw new Error("Already enrolled in this course.");

// // // //   const order = await razorpay.orders.create({
// // // //     amount: 4999,
// // // //     currency: "INR",
// // // //     receipt: `receipt_${courseId}_${user.id}_${Date.now()}`,
// // // //     notes: {
// // // //       userId: user.id,
// // // //       courseId,
// // // //     },
// // // //   });

// // // //   const { error: insertError } = await supabase.from("orders").insert([
// // // //     {
// // // //       user_id: user.id,
// // // //       course_id: courseId,
// // // //       razorpay_order_id: order.id,
// // // //       amount: order.amount,
// // // //       status: "created",
// // // //     },
// // // //   ]);

// // // //   if (insertError) throw new Error("Failed to store order info");

// // // //   return {
// // // //     success: true,
// // // //     key: NEXT_PUBLIC_RAZORPAY_KEY_ID,
// // // //     orderId: order.id,
// // // //     amount: Number(order.amount),
// // // //     currency: order.currency,
// // // //     courseTitle: course.title,
// // // //   };
// // // // };

// // // // // ✅ Verification handler
// // // // const handleVerifyPayment = async (
// // // //   razorpay_order_id: string,
// // // //   razorpay_payment_id: string,
// // // //   razorpay_signature: string,
// // // //   courseId: string
// // // // ): Promise<void> => {
// // // //   const generatedSignature = crypto
// // // //     .createHmac("sha256", RAZORPAY_KEY_SECRET)
// // // //     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
// // // //     .digest("hex");

// // // //   if (generatedSignature !== razorpay_signature)
// // // //     throw new Error("Invalid Razorpay signature");

// // // //   const { data: order } = await supabase
// // // //     .from("orders")
// // // //     .select("*")
// // // //     .eq("razorpay_order_id", razorpay_order_id)
// // // //     .single();

// // // //   if (!order) throw new Error("Order not found");

// // // //   await supabase
// // // //     .from("orders")
// // // //     .update({
// // // //       status: "paid",
// // // //       razorpay_payment_id,
// // // //     })
// // // //     .eq("id", order.id);

// // // //   await supabase.from("course_enrollments").insert({
// // // //     user_id: order.user_id,
// // // //     course_id: order.course_id,
// // // //     payment_status: "paid",
// // // //   });
// // // // };

// // // // // ✅ Main Component
// // // // export const EnrollmentButton = ({
// // // //   courseId,
// // // //   isEnrolled,
// // // //   onEnrollmentChange,
// // // // }: Props) => {
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // // //   const { toast } = useToast();

// // // //   const loadRazorpayScript = () =>
// // // //     new Promise<boolean>((resolve) => {
// // // //       const script = document.createElement("script");
// // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // //       script.onload = () => resolve(true);
// // // //       script.onerror = () => resolve(false);
// // // //       document.body.appendChild(script);
// // // //     });

// // // //   const handlePaymentMethodSelect = async (method: string) => {
// // // //     if (method !== "razorpay") {
// // // //       toast({
// // // //         title: "Coming Soon",
// // // //         description: `${method} is not available.`,
// // // //         variant: "destructive",
// // // //       });
// // // //       return;
// // // //     }

// // // //     setIsLoading(true);

// // // //     try {
// // // //       const {
// // // //         data: { session },
// // // //       } = await supabase.auth.getSession();

// // // //       if (!session) throw new Error("Please log in");

// // // //       const loaded = await loadRazorpayScript();
// // // //       if (!loaded) throw new Error("Failed to load payment script");

// // // //       const paymentData = await handleCreatePayment(
// // // //         courseId,
// // // //         session.access_token
// // // //       );

// // // //       const options = {
// // // //         key: paymentData.key,
// // // //         amount: paymentData.amount,
// // // //         currency: paymentData.currency,
// // // //         name: "Course Enrollment",
// // // //         description: paymentData.courseTitle,
// // // //         order_id: paymentData.orderId,
// // // //         prefill: {
// // // //           name: session.user.user_metadata?.full_name || "User",
// // // //           email: session.user.email || "",
// // // //           contact: session.user.phone || "",
// // // //         },
// // // //         theme: { color: "#528FF0" },
// // // //         handler: async (response: any) => {
// // // //           try {
// // // //             await handleVerifyPayment(
// // // //               response.razorpay_order_id,
// // // //               response.razorpay_payment_id,
// // // //               response.razorpay_signature,
// // // //               courseId
// // // //             );
// // // //             toast({
// // // //               title: "Enrolled!",
// // // //               description: "You've been enrolled successfully.",
// // // //             });
// // // //             onEnrollmentChange();
// // // //           } catch (error: any) {
// // // //             toast({
// // // //               title: "Verification Error",
// // // //               description: error.message,
// // // //               variant: "destructive",
// // // //             });
// // // //           }
// // // //         },
// // // //         modal: {
// // // //           ondismiss: () => {
// // // //             toast({ title: "Payment Cancelled" });
// // // //             setIsLoading(false);
// // // //           },
// // // //         },
// // // //       };

// // // //       const razorpay = new window.Razorpay(options);
// // // //       razorpay.open();
// // // //     } catch (error) {
// // // //       toast({
// // // //         title: "Payment Error",
// // // //         description: error.message,
// // // //         variant: "destructive",
// // // //       });
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //       setShowPaymentMethods(false);
// // // //     }
// // // //   };

// // // //   if (isEnrolled) {
// // // //     return (
// // // //       <Button className="w-full" variant="secondary" disabled>
// // // //         Already Enrolled
// // // //       </Button>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // // //       <DialogTrigger asChild>
// // // //         <Button size="lg" className="w-full" disabled={isLoading}>
// // // //           {isLoading ? (
// // // //             <Loader2 className="mr-2 animate-spin" />
// // // //           ) : (
// // // //             <CreditCard className="mr-2" />
// // // //           )}
// // // //           {isLoading ? "Processing..." : "Enroll for ₹49.99"}
// // // //         </Button>
// // // //       </DialogTrigger>
// // // //       <DialogContent>
// // // //         <DialogHeader>
// // // //           <DialogTitle>Select Payment Method</DialogTitle>
// // // //         </DialogHeader>
// // // //         <PaymentMethodSelector
// // // //           onPaymentMethodSelect={handlePaymentMethodSelect}
// // // //           isLoading={isLoading}
// // // //         />
// // // //       </DialogContent>
// // // //     </Dialog>
// // // //   );
// // // // };
// // // // export default EnrollmentButton;

// // // import { useState } from "react";
// // // import { Button } from "@/components/ui/button";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { supabase } from "@/integrations/supabase/client";
// // // import { Loader2, CreditCard } from "lucide-react";
// // // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogHeader,
// // //   DialogTitle,
// // //   DialogTrigger,
// // //   DialogDescription,
// // // } from "@/components/ui/dialog";

// // // // ✅ Define interfaces
// // // interface Props {
// // //   courseId: string;
// // //   isEnrolled: boolean;
// // //   onEnrollmentChange: () => void;
// // // }

// // // interface PaymentData {
// // //   success: boolean;
// // //   key: string;
// // //   orderId: string;
// // //   amount: number;
// // //   currency: string;
// // //   courseTitle: string;
// // // }

// // // declare global {
// // //   interface Window {
// // //     Razorpay: any;
// // //   }
// // // }

// // // // ✅ Main Component
// // // export const EnrollmentButton = ({
// // //   courseId,
// // //   isEnrolled,
// // //   onEnrollmentChange,
// // // }: Props) => {
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // //   const { toast } = useToast();

// // //   const loadRazorpayScript = () =>
// // //     new Promise<boolean>((resolve) => {
// // //       if (window.Razorpay) return resolve(true);

// // //       const script = document.createElement("script");
// // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // //       script.onload = () => resolve(true);
// // //       script.onerror = () => resolve(false);
// // //       document.body.appendChild(script);
// // //     });

// // //   const handleCreatePayment = async (
// // //     courseId: string,
// // //     token: string
// // //   ): Promise<PaymentData> => {
// // //     const {
// // //       data: { user },
// // //       error: userError,
// // //     } = await supabase.auth.getUser(token);

// // //     if (!user || userError) throw new Error("Invalid or expired token");

// // //     const { data: course, error: courseError } = await supabase
// // //       .from("courses")
// // //       .select("id, title")
// // //       .eq("id", courseId)
// // //       .single();

// // //     if (courseError || !course) throw new Error("Course not found");

// // //     const { data: existingEnrollment } = await supabase
// // //       .from("orders")
// // //       .select("id")
// // //       .eq("user_id", user.id)
// // //       .eq("course_id", courseId)
// // //       .eq("status", "paid")
// // //       .maybeSingle();

// // //     if (existingEnrollment) throw new Error("Already enrolled in this course.");

// // //     // Create order in your database first
// // //     const { data: order, error: insertError } = await supabase
// // //       .from("orders")
// // //       .insert([
// // //         {
// // //           user_id: user.id,
// // //           course_id: courseId,
// // //           amount: 4999,
// // //           currency: "INR",
// // //           status: "created",
// // //         },
// // //       ])
// // //       .select()
// // //       .single();

// // //     if (insertError || !order) throw new Error("Failed to store order info");

// // //     return {
// // //       success: true,
// // //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
// // //       orderId: order.id,
// // //       amount: 4999,
// // //       currency: "INR",
// // //       courseTitle: course.title,
// // //     };
// // //   };

// // //   const handleVerifyPayment = async (
// // //     razorpay_order_id: string,
// // //     razorpay_payment_id: string,
// // //     razorpay_signature: string,
// // //     courseId: string
// // //   ): Promise<void> => {
// // //     const { data: order } = await supabase
// // //       .from("orders")
// // //       .select("*")
// // //       .eq("id", razorpay_order_id)
// // //       .single();

// // //     if (!order) throw new Error("Order not found");

// // //     // Update order status
// // //     await supabase
// // //       .from("orders")
// // //       .update({
// // //         status: "paid",
// // //         razorpay_payment_id,
// // //         razorpay_signature,
// // //       })
// // //       .eq("id", order.id);

// // //     // Create enrollment
// // //     console.log("jjjjjjjjjjjj", supabase);
// // //     await supabase.from("course_enrollments").insert({
// // //       user_id: order.user_id,
// // //       course_id: order.course_id,
// // //       payment_status: "paid",
// // //     });
// // //   };

// // //   const handlePaymentMethodSelect = async (method: string) => {
// // //     if (method !== "razorpay") {
// // //       toast({
// // //         title: "Coming Soon",
// // //         description: `${method} is not available.`,
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     setIsLoading(true);

// // //     try {
// // //       console.log("vvvvvvvvvvv");
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();

// // //       if (!session) throw new Error("Please log in");

// // //       const loaded = await loadRazorpayScript();
// // //       if (!loaded) throw new Error("Failed to load payment script");

// // //       const paymentData = await handleCreatePayment(
// // //         courseId,
// // //         session.access_token
// // //       );

// // //       const options = {
// // //         key: paymentData.key,
// // //         amount: paymentData.amount,
// // //         currency: paymentData.currency,
// // //         name: "Course Enrollment",
// // //         description: paymentData.courseTitle,
// // //         order_id: paymentData.orderId,
// // //         handler: async (response: any) => {
// // //           try {
// // //             await handleVerifyPayment(
// // //               paymentData.orderId, // Using our database order ID
// // //               response.razorpay_payment_id,
// // //               response.razorpay_signature,
// // //               courseId
// // //             );
// // //             toast({
// // //               title: "Enrolled!",
// // //               description: "You've been enrolled successfully.",
// // //             });
// // //             onEnrollmentChange();
// // //           } catch (error: any) {
// // //             toast({
// // //               title: "Verification Error",
// // //               description: error.message,
// // //               variant: "destructive",
// // //             });
// // //           }
// // //         },
// // //         prefill: {
// // //           name: session.user.user_metadata?.full_name || "User",
// // //           email: session.user.email || "",
// // //         },
// // //         theme: { color: "#528FF0" },
// // //         modal: {
// // //           ondismiss: () => {
// // //             toast({ title: "Payment Cancelled" });
// // //             setIsLoading(false);
// // //           },
// // //         },
// // //       };

// // //       const rzp = new window.Razorpay(options);
// // //       rzp.open();
// // //     } catch (error: any) {
// // //       toast({
// // //         title: "Payment Error",
// // //         description: "failed",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setIsLoading(false);
// // //       setShowPaymentMethods(false);
// // //     }
// // //   };

// // //   if (isEnrolled) {
// // //     return (
// // //       <Button className="w-full" variant="secondary" disabled>
// // //         Already Enrolled
// // //       </Button>
// // //     );
// // //   }

// // //   return (
// // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // //       <DialogTrigger asChild>
// // //         <Button size="lg" className="w-full" disabled={isLoading}>
// // //           {isLoading ? (
// // //             <Loader2 className="mr-2 animate-spin" />
// // //           ) : (
// // //             <CreditCard className="mr-2" />
// // //           )}
// // //           {isLoading ? "Processing..." : ""}
// // //         </Button>
// // //       </DialogTrigger>
// // //       <DialogContent>
// // //         <DialogHeader>
// // //           <DialogTitle>Select Payment Method</DialogTitle>
// // //           <DialogDescription>
// // //             Choose your preferred payment method to enroll in this course
// // //           </DialogDescription>
// // //         </DialogHeader>
// // //         <PaymentMethodSelector
// // //           onPaymentMethodSelect={handlePaymentMethodSelect}
// // //           isLoading={isLoading}
// // //         />
// // //       </DialogContent>
// // //     </Dialog>
// // //   );
// // // };

// // // export default EnrollmentButton;

// // // const handlePaymentMethodSelect = async (method: string) => {
// // //   if (method !== "razorpay") {
// // //     toast({
// // //       title: "Coming Soon",
// // //       description: `${method} is not available.`,
// // //       variant: "destructive",
// // //     });
// // //     return;
// // //   }

// // //   setIsLoading(true);

// // //   try {
// // //     // Get user session
// // //     const {
// // //       data: { session },
// // //     } = await supabase.auth.getSession();

// // //     if (!session) throw new Error("Please log in to enroll");

// // //     const userId = session.user.id;
// // //     // ✅ CHECK for existing enrollment BEFORE creating an order
// // //     const { data: existingEnrollment, error: checkError } = await supabase
// // //       .from("course_enrollments")
// // //       .select("id")
// // //       .eq("user_id", userId)
// // //       .eq("course_id", courseId)
// // //       .eq("payment_status", "paid")
// // //       .limit(1)
// // //       .maybeSingle();

// // //     if (checkError) {
// // //       throw new Error("Failed to check enrollment status");
// // //     }

// // //     if (existingEnrollment) {
// // //       throw new Error("You are already enrolled in this course");
// // //     }

// // //     // Load Razorpay script
// // //     const loaded = await loadRazorpayScript();
// // //     if (!loaded) throw new Error("Failed to load payment processor");

// // //     // ✅ NOW insert order only after confirming user is not enrolled
// // //     const { data: order, error: orderError } = await supabase
// // //       .from("orders")
// // //       .insert({
// // //         user_id: userId,
// // //         course_id: courseId,
// // //         amount: 499,
// // //         currency: "INR",
// // //         status: "created",
// // //         payment_method: "razorpay",
// // //       })
// // //       .select()
// // //       .single();

// // //     if (orderError || !order) {
// // //       throw new Error(orderError?.message || "Failed to create order");
// // //     }
// // //     console.log("ORder created : ", order.id);
// // //     const options = {
// // //       key: "rzp_test_eK57VjQhXHjIGR",
// // //       // key: process.env.RAZORPAY_KEY_ID,
// // //       amount: order.amount,
// // //       currency: order.currency,
// // //       name: "TheFutemed",
// // //       description: `Payment for course enrollment`,
// // //       // order_id: order.id,
// // //       order_id: undefined,
// // //       handler: async function (response) {
// // //         try {
// // //           const paymentId = response.razorpay_payment_id;
// // //           // Capture payment
// // //           await handleCapturePayment(paymentId, priceAmount / 100); // Convert paise to rupees
// // //           // Update subscription after capturing payment
// // //           await handleUpdateSubscription();
// // //           setCurrentPlan();
// // //           localStorage.setItem("userPlan"); // Sync localStorage
// // //           setSuccessMessage(
// // //             `Successfully subscribed to plan. Payment ID: `
// // //           );
// // //           const { error: verifyError } = await supabase
// // //             .from("orders")
// // //             .update({
// // //               status: "paid",
// // //               razorpay_payment_id: response.razorpay_payment_id,
// // //               razorpay_signature: response.razorpay_signature,
// // //             })
// // //             .eq("id", order.id);

// // //           if (verifyError) {
// // //             throw new Error("Payment verification failed");
// // //           }
// // //           Id = response.razorpay_payment_id;
// // //           console.log("zzzzzzzzzzzzzzz", order.id);
// // //           const { error: enrollmentError } = await supabase
// // //             .from("course_enrollments")
// // //             .insert({
// // //               user_id: userId,
// // //               course_id: courseId,
// // //               payment_status: "paid",
// // //               razorpay_payment_id: sessionId,
// // //               amount: order.amount,
// // //               currency: order.currency,
// // //               payment_method: "razorpay", // Corrected column name
// // //               enrolled_at: new Date().toISOString(), // Add enrolled date
// // //             });

// // //           if (enrollmentError) {
// // //             throw new Error("Failed to create enrollment");
// // //           }

// // //           toast({
// // //             title: "Enrollment Successful",
// // //             description: "You have been enrolled in the course!",
// // //           });
// // //           onEnrollmentChange();
// // //         } catch (error: any) {
// // //           toast({
// // //             title: "Payment Verification Failed 123333",
// // //             description: error.message,
// // //             variant: "destructive",
// // //           });
// // //         }
// // //       },
// // //       prefill: {
// // //         name: session.user.user_metadata?.full_name || "User",
// // //         email: session.user.email || "",
// // //         contact: session.user.phone || "",
// // //       },
// // //       theme: {
// // //         color: "#528FF0",
// // //       },
// // //       modal: {
// // //         ondismiss: () => {
// // //           toast({
// // //             title: "Payment Cancelled",
// // //             description: "You cancelled the payment process",
// // //           });
// // //           setIsLoading(false);
// // //         },
// // //       },
// // //     };

// // //     const rzp = new window.Razorpay(options);
// // //     rzp.open();
// // //   } catch (error: any) {
// // //     console.log("Payment error:", error);
// // //     toast({
// // //       title: "Payment Failed 456",
// // //       description: error.message,
// // //       variant: "destructive",
// // //     });
// // //   } finally {
// // //     setIsLoading(false);
// // //     setShowPaymentMethods(false);
// // //   }
// // // };

// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { useToast } from "@/hooks/use-toast";
// // import { supabase } from "@/integrations/supabase/client";
// // import { Loader2, CreditCard, CheckCircle } from "lucide-react";
// // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// //   DialogDescription,
// // } from "@/components/ui/dialog";

// // interface Props {
// //   courseId: string;
// //   isEnrolled: boolean;
// //   isPaid: boolean;
// //   onEnrollmentChange: () => void;
// // }

// // declare global {
// //   interface Window {
// //     Razorpay: any;
// //   }
// // }

// // export const EnrollmentButton = ({
// //   courseId,
// //   isEnrolled,
// //   onEnrollmentChange,
// // }: Props) => {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// //   const [paymentSuccess, setPaymentSuccess] = useState(false);
// //   const { toast } = useToast();

// //   const loadRazorpayScript = (): Promise<boolean> => {
// //     return new Promise((resolve) => {
// //       if (window.Razorpay) return resolve(true);
// //       const script = document.createElement("script");
// //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //       script.onload = () => resolve(true);
// //       script.onerror = () => resolve(false);
// //       document.body.appendChild(script);
// //     });
// //   };

// //   const handlePaymentMethodSelect = async (method: string) => {
// //     if (method !== "razorpay" && method !== "free") {
// //       toast({
// //         title: "Coming Soon",
// //         description: `${method} is not available.`,
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     setIsLoading(true);

// //     try {
// //       // Get user session
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();

// //       if (!session) throw new Error("Please log in to enroll");

// //       const userId = session.user.id;
// //       // Check for existing enrollment
// //       const { data: existingEnrollment, error: checkError } = await supabase
// //         .from("course_enrollments")
// //         .select("id")
// //         .eq("user_id", userId)
// //         .eq("course_id", courseId)
// //         .eq("payment_status", "paid")
// //         .limit(1)
// //         .maybeSingle();

// //       if (checkError) {
// //         throw new Error("Failed to check enrollment status");
// //       }

// //       if (existingEnrollment) {
// //         throw new Error("You are already enrolled in this course");
// //       }
// //       // ✅ Handle FREE plan
// //       if (method === "free") {
// //         const { error: freeError } = await supabase
// //           .from("course_enrollments")
// //           .insert({
// //             user_id: userId,
// //             course_id: courseId,
// //             payment_status: "paid",
// //             amount: 0,
// //             currency: "INR",
// //             payment_method: "free",
// //             enrolled_at: new Date().toISOString(),
// //           });

// //         if (freeError) {
// //           throw new Error("Failed to enroll in free course.");
// //         }

// //         toast({
// //           title: "Enrolled Successfully",
// //           description: "You are now enrolled in the free course.",
// //         });
// //         setPaymentSuccess(true);
// //         onEnrollmentChange();
// //         return;
// //       }

// //       // Load Razorpay script
// //       const loaded = await loadRazorpayScript();
// //       if (!loaded) throw new Error("Failed to load payment processor");

// //       // Create order - fixed amount to 4999 (₹49.99 in paise)
// //       const amountInPaise = 4999;
// //       const { data: order, error: orderError } = await supabase
// //         .from("orders")
// //         .insert({
// //           user_id: userId,
// //           course_id: courseId,
// //           amount: amountInPaise,
// //           currency: "INR",
// //           status: "created",
// //           payment_method: "razorpay",
// //         })
// //         .select()
// //         .single();

// //       if (orderError || !order) {
// //         throw new Error(orderError?.message || "Failed to create order");
// //       }

// //       const options = {
// //         key: "rzp_test_eK57VjQhXHjIGR",
// //         amount: amountInPaise.toString(), // Convert to string
// //         currency: "INR",
// //         name: "TheFutemed",
// //         description: `Payment for course enrollment`,
// //         handler: async function (response: any) {
// //           try {
// //             // Update order status
// //             const { error: verifyError } = await supabase
// //               .from("orders")
// //               .update({
// //                 status: "paid",
// //                 razorpay_payment_id: response.razorpay_payment_id,
// //                 // razorpay_signature: response.razorpay_signature,
// //               })
// //               .eq("id", order.id);

// //             if (verifyError) {
// //               throw new Error("Payment verification failed");
// //             }

// //             // Create enrollment - fixed column names
// //             const { error: enrollmentError } = await supabase
// //               .from("course_enrollments")
// //               .insert({
// //                 user_id: userId,
// //                 course_id: courseId,
// //                 payment_status: "paid",
// //                 amount: amountInPaise,
// //                 currency: "INR",
// //                 payment_method: "razorpay",
// //                 razorpay_payment_id: response.razorpay_payment_id,
// //                 enrolled_at: new Date().toISOString(),
// //               });
// //             console.log("kkkkkkkkkkk", enrollmentError);

// //             if (enrollmentError) {
// //               throw new Error("Failed to create enrollment");
// //             }

// //             // Success message
// //             toast({
// //               title: "🎉 Enrollment Successful!",
// //               description: "You've been enrolled in the course!",
// //             });
// //             setPaymentSuccess(true);
// //             onEnrollmentChange();
// //           } catch (error: any) {
// //             toast({
// //               title: "Payment Verification Failed 1111111",
// //               description: error.message,
// //               variant: "destructive",
// //             });
// //           }
// //         },
// //         prefill: {
// //           name: session.user.user_metadata?.full_name || "User",
// //           email: session.user.email || "",
// //           contact: session.user.phone || "",
// //         },
// //         theme: {
// //           color: "#528FF0",
// //         },
// //         modal: {
// //           ondismiss: () => {
// //             toast({
// //               title: "Payment Cancelled",
// //               description: "You cancelled the payment process",
// //             });
// //             setIsLoading(false);
// //           },
// //         },
// //       };

// //       const rzp = new window.Razorpay(options);

// //       // Add payment failure handler
// //       rzp.on("payment.failed", function (response: any) {
// //         toast({
// //           title: "Payment Failed",
// //           description: response.error.description,
// //           variant: "destructive",
// //         });
// //       });

// //       rzp.open();
// //     } catch (error: any) {
// //       console.log("Payment error:", error);
// //       toast({
// //         title: "Payment Failed",
// //         description: error.message,
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setIsLoading(false);
// //       setShowPaymentMethods(false);
// //     }
// //   };
// //   if (isEnrolled) {
// //     return (
// //       <Button className="w-full" variant="secondary" disabled>
// //         Already Enrolled
// //       </Button>
// //     );
// //   }

// //   return (
// //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// //       <DialogTrigger asChild>
// //         {/* <Button size="lg" className="w-full" disabled={isLoading}>
// //           {isLoading ? (
// //             <>
// //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //               Processing...
// //             </>
// //           ) : (
// //             <>
// //               <CreditCard className="mr-2 h-4 w-4" />
// //               Enroll for ₹49.99
// //             </>
// //           )}
// //         </Button> */}
// //         <Button
// //           size="lg"
// //           className="w-full"
// //           disabled={isLoading || paymentSuccess}
// //         >
// //           {isLoading ? (
// //             <>
// //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //               Processing...
// //             </>
// //           ) : paymentSuccess ? (
// //             <>
// //               <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
// //               Enrolled
// //             </>
// //           ) : (
// //             <>
// //               <CreditCard className="mr-2 h-4 w-4" />
// //               Enroll for ₹49.99
// //             </>
// //           )}
// //         </Button>
// //       </DialogTrigger>
// //       <DialogContent>
// //         <DialogHeader>
// //           <DialogTitle>Select Payment Method</DialogTitle>
// //           <DialogDescription>
// //             Choose your preferred payment method to enroll in this course
// //           </DialogDescription>
// //         </DialogHeader>
// //         <PaymentMethodSelector
// //           onPaymentMethodSelect={handlePaymentMethodSelect}
// //           isLoading={isLoading}
// //         />
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default EnrollmentButton;

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/integrations/supabase/client";
// import { Loader2, CreditCard, CheckCircle } from "lucide-react";
// import { PaymentMethodSelector } from "./PaymentMethodSelector";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogDescription,
// } from "@/components/ui/dialog";

// interface Props {
//   courseId: string;
//   isEnrolled: boolean;
//   isPaid: boolean;
//   onEnrollmentChange: () => void;
// }

// type PaymentMethod = "razorpay" | "free" | "upi" | "card" | "netbanking";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export const EnrollmentButton = ({
//   courseId,
//   isEnrolled,
//   isPaid,
//   onEnrollmentChange,
// }: Props) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const { toast } = useToast();

//   const loadRazorpayScript = (): Promise<boolean> => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) return resolve(true);
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const enrollUser = async (
//     paymentMethod: PaymentMethod,
//     amount: number = 0
//   ) => {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     if (!session) throw new Error("Please log in to enroll");

//     const { error } = await supabase.from("course_enrollments").insert({
//       user_id: session.user.id,
//       course_id: courseId,
//       payment_status: "paid",
//       amount,
//       currency: "INR",
//       payment_method: paymentMethod,
//       enrolled_at: new Date().toISOString(),
//     });

//     if (error) throw new Error(`Failed to enroll: ${error.message}`);
//   };

//   const handlePaymentMethodSelect = async (method: PaymentMethod) => {
//     setIsLoading(true);

//     try {
//       // Check if user is logged in
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       if (!session) throw new Error("Please log in to enroll");

//       // Check for existing enrollment
//       const { data: existingEnrollment } = await supabase
//         .from("course_enrollments")
//         .select("id")
//         .eq("user_id", session.user.id)
//         .eq("course_id", courseId)
//         .eq("payment_status", "paid")
//         .limit(1)
//         .maybeSingle();

//       if (existingEnrollment) {
//         throw new Error("You are already enrolled in this course");
//       }

//       // Handle FREE enrollment
//       if (!isPaid || method === "free") {
//         await enrollUser("free", 0);
//         toast({
//           title: "Enrolled Successfully",
//           description: "You are now enrolled in the course.",
//         });
//         setPaymentSuccess(true);
//         onEnrollmentChange();
//         return;
//       }

//       // Handle PAID enrollment
//       if (method !== "razorpay") {
//         toast({
//           title: "Coming Soon",
//           description: `${method} is not available yet.`,
//           variant: "destructive",
//         });
//         return;
//       }

//       // Load Razorpay script for paid courses
//       const loaded = await loadRazorpayScript();
//       if (!loaded) throw new Error("Failed to load payment processor");

//       // Create order - fixed amount to 4999 (₹49.99 in paise)
//       const amountInPaise = 4999;
//       const { data: order, error: orderError } = await supabase
//         .from("orders")
//         .insert({
//           user_id: session.user.id,
//           course_id: courseId,
//           amount: amountInPaise,
//           currency: "INR",
//           status: "created",
//           payment_method: "razorpay",
//         })
//         .select()
//         .single();

//       if (orderError || !order) {
//         throw new Error(orderError?.message || "Failed to create order");
//       }

//       const options = {
//         key: "rzp_test_eK57VjQhXHjIGR",
//         amount: amountInPaise.toString(),
//         currency: "INR",
//         name: "TheFutemed",
//         description: `Payment for course enrollment`,
//         handler: async function (response: any) {
//           try {
//             // Verify payment and update order
//             const { error: verifyError } = await supabase
//               .from("orders")
//               .update({
//                 status: "paid",
//                 razorpay_payment_id: response.razorpay_payment_id,
//               })
//               .eq("id", order.id);

//             if (verifyError) throw new Error("Payment verification failed");

//             // Create enrollment
//             await enrollUser("razorpay", amountInPaise);

//             toast({
//               title: "🎉 Enrollment Successful!",
//               description: "You've been enrolled in the course!",
//             });
//             setPaymentSuccess(true);
//             onEnrollmentChange();
//           } catch (error: any) {
//             toast({
//               title: "Payment Verification Failed",
//               description: error.message,
//               variant: "destructive",
//             });
//           }
//         },
//         prefill: {
//           name: session.user.user_metadata?.full_name || "User",
//           email: session.user.email || "",
//           contact: session.user.phone || "",
//         },
//         theme: {
//           color: "#528FF0",
//         },
//         modal: {
//           ondismiss: () => {
//             toast({
//               title: "Payment Cancelled",
//               description: "You cancelled the payment process",
//             });
//             setIsLoading(false);
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.on("payment.failed", function (response: any) {
//         toast({
//           title: "Payment Failed",
//           description: response.error.description,
//           variant: "destructive",
//         });
//       });
//       rzp.open();
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//       setShowPaymentMethods(false);
//     }
//   };

//   if (isEnrolled) {
//     return (
//       <Button className="w-full" variant="secondary" disabled>
//         Already Enrolled
//       </Button>
//     );
//   }

//   return (
//     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
//       <DialogTrigger asChild>
//         <Button
//           size="lg"
//           className="w-full"
//           disabled={isLoading || paymentSuccess}
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Processing...
//             </>
//           ) : paymentSuccess ? (
//             <>
//               <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
//               Enrolled
//             </>
//           ) : (
//             <>
//               <CreditCard className="mr-2 h-4 w-4" />
//               {isPaid ? "Enroll for ₹49.99" : "Enroll for Free"}
//             </>
//           )}
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             {isPaid ? "Select Payment Method" : "Confirm Enrollment"}
//           </DialogTitle>
//           <DialogDescription>
//             {isPaid
//               ? "Choose your preferred payment method to enroll in this course"
//               : "Click confirm to enroll in this free course"}
//           </DialogDescription>
//         </DialogHeader>
//         {isPaid ? (
//           <PaymentMethodSelector
//             onPaymentMethodSelect={handlePaymentMethodSelect}
//             isLoading={isLoading}
//           />
//         ) : (
//           <div className="flex justify-end gap-2">
//             <Button
//               variant="outline"
//               onClick={() => setShowPaymentMethods(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={() => handlePaymentMethodSelect("free")}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 "Confirm Enrollment"
//               )}
//             </Button>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EnrollmentButton;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CreditCard, CheckCircle } from "lucide-react";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  courseId: string;
  isEnrolled: boolean;
  isPaid: boolean;
  price?: number; // Add price prop
  onEnrollmentChange: () => void;
}

type PaymentMethod = "razorpay" | "free" | "upi" | "card" | "netbanking";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const EnrollmentButton = ({
  courseId,
  isEnrolled,
  isPaid,
  price = 4999, // Default price in paise (₹49.99)
  onEnrollmentChange,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { toast } = useToast();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const enrollUser = async (
    paymentMethod: PaymentMethod,
    amount: number = 0
  ) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("Please log in to enroll");

    const { error } = await supabase.from("course_enrollments").insert({
      user_id: session.user.id,
      course_id: courseId,
      payment_status: paymentMethod === "free" ? "free" : "paid",
      amount,
      currency: "INR",
      payment_method: paymentMethod,
      enrolled_at: new Date().toISOString(),
    });

    if (error) throw new Error(`Failed to enroll: ${error.message}`);
  };

  const handleFreeEnrollment = async () => {
    setIsLoading(true);
    try {
      await enrollUser("free");
      toast({
        title: "🎉 Enrollment Successful!",
        description: "You've been enrolled in this free course!",
      });
      setPaymentSuccess(true);
      onEnrollmentChange();
    } catch (error: any) {
      toast({
        title: "Enrollment Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaidEnrollment = async (method: PaymentMethod) => {
    setIsLoading(true);
    try {
      // Check if user is logged in
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Please log in to enroll");

      // Check for existing enrollment
      const { data: existingEnrollment } = await supabase
        .from("course_enrollments")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("course_id", courseId)
        .or("payment_status.eq.paid,payment_status.eq.free")
        .limit(1)
        .maybeSingle();

      if (existingEnrollment) {
        throw new Error("You are already enrolled in this course");
      }

      if (method !== "razorpay") {
        toast({
          title: "Coming Soon",
          description: `${method} is not available yet.`,
          variant: "destructive",
        });
        return;
      }

      // Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Failed to load payment processor");

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: session.user.id,
          course_id: courseId,
          amount: price,
          currency: "INR",
          status: "created",
          payment_method: "razorpay",
        })
        .select()
        .single();

      if (orderError || !order) {
        throw new Error(orderError?.message || "Failed to create order");
      }

      const options = {
        key: "rzp_test_eK57VjQhXHjIGR",
        amount: price.toString(),
        currency: "INR",
        name: "TheFutemed",
        description: `Payment for course enrollment`,
        handler: async function (response: any) {
          try {
            // Verify payment
            const { error: verifyError } = await supabase
              .from("orders")
              .update({
                status: "paid",
                razorpay_payment_id: response.razorpay_payment_id,
              })
              .eq("id", order.id);

            if (verifyError) throw new Error("Payment verification failed");

            // Create enrollment
            await enrollUser("razorpay", price);

            toast({
              title: "🎉 Enrollment Successful!",
              description: "You've been enrolled in the course!",
            });
            setPaymentSuccess(true);
            onEnrollmentChange();
          } catch (error: any) {
            toast({
              title: "Payment Verification Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: session.user.user_metadata?.full_name || "User",
          email: session.user.email || "",
          contact: session.user.phone || "",
        },
        theme: {
          color: "#528FF0",
        },
        modal: {
          ondismiss: () => {
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process",
            });
            setIsLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        toast({
          title: "Payment Failed",
          description: response.error.description,
          variant: "destructive",
        });
      });
      rzp.open();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowPaymentMethods(false);
    }
  };

  if (isEnrolled) {
    return (
      <Button className="w-full" variant="secondary" disabled>
        <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
        Already Enrolled
      </Button>
    );
  }

  return (
    <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full"
          disabled={isLoading || paymentSuccess}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : paymentSuccess ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Enrolled
            </>
          ) : isPaid ? (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              {`Enroll for ₹${(price / 100).toFixed(2)}`}
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Enroll for Free
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isPaid ? "Complete Your Enrollment" : "Confirm Free Enrollment"}
          </DialogTitle>
          <DialogDescription>
            {isPaid
              ? `Please pay ₹${(price / 100).toFixed(
                  2
                )} to enroll in this course`
              : "You're about to enroll in this free course"}
          </DialogDescription>
        </DialogHeader>
        {isPaid ? (
          <PaymentMethodSelector
            onPaymentMethodSelect={handlePaidEnrollment}
            isLoading={isLoading}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800">
                Free Enrollment Confirmation
              </h4>
              <p className="text-sm text-green-600 mt-1">
                You will get immediate access to all course materials.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPaymentMethods(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleFreeEnrollment}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Free Enrollment"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentButton;
