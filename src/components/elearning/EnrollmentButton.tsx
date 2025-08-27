// // // // // // // import { useState } from "react";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // import { Loader2, CreditCard, CheckCircle } from "lucide-react";
// // // // // // // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // // // // // // import {
// // // // // // //   Dialog,
// // // // // // //   DialogContent,
// // // // // // //   DialogHeader,
// // // // // // //   DialogTitle,
// // // // // // //   DialogTrigger,
// // // // // // //   DialogDescription,
// // // // // // // } from "@/components/ui/dialog";
// // // // // // // import { mixpanelInstance } from "@/utils/mixpanel";

// // // // // // // interface Props {
// // // // // // //   courseId: string;
// // // // // // //   isEnrolled: boolean;
// // // // // // //   isPaid: boolean;
// // // // // // //   price: number;
// // // // // // //   onEnrollmentChange: () => void;
// // // // // // // }

// // // // // // // type PaymentMethod = "razorpay" | "free" | "upi" | "card" | "netbanking";

// // // // // // // declare global {
// // // // // // //   interface Window {
// // // // // // //     Razorpay: any;
// // // // // // //   }
// // // // // // // }

// // // // // // // export const EnrollmentButton = ({
// // // // // // //   courseId,
// // // // // // //   isEnrolled,
// // // // // // //   isPaid,
// // // // // // //   price,
// // // // // // //   onEnrollmentChange,
// // // // // // // }: Props) => {
// // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // // // // // //   const [paymentSuccess, setPaymentSuccess] = useState(false);
// // // // // // //   const { toast } = useToast();
// // // // // // //   const Key_payment = import.meta.env.VITE_RAZORPAY_KEY_ID;

// // // // // // //   const loadRazorpayScript = (): Promise<boolean> => {
// // // // // // //     return new Promise((resolve) => {
// // // // // // //       if (window.Razorpay) return resolve(true);
// // // // // // //       const script = document.createElement("script");
// // // // // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // // // //       script.onload = () => resolve(true);
// // // // // // //       script.onerror = () => resolve(false);
// // // // // // //       document.body.appendChild(script);
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const enrollUser = async (
// // // // // // //     paymentMethod: PaymentMethod,
// // // // // // //     amount: number = 0
// // // // // // //   ) => {
// // // // // // //     const {
// // // // // // //       data: { session },
// // // // // // //     } = await supabase.auth.getSession();
// // // // // // //     if (!session) throw new Error("Please log in to enroll");

// // // // // // //     const { error } = await supabase.from("course_enrollments").insert({
// // // // // // //       user_id: session.user.id,
// // // // // // //       course_id: courseId,
// // // // // // //       payment_status: paymentMethod === "free" ? "free" : "paid",
// // // // // // //       amount,
// // // // // // //       currency: "INR",
// // // // // // //       payment_method: paymentMethod,
// // // // // // //       enrolled_at: new Date().toISOString(),
// // // // // // //     });

// // // // // // //     if (error) throw new Error(`Failed to enroll: ${error.message}`);
// // // // // // //   };

// // // // // // //   const handleFreeEnrollment = async () => {
// // // // // // //     setIsLoading(true);
// // // // // // //     try {
// // // // // // //       await enrollUser("free");
// // // // // // //       toast({
// // // // // // //         title: "🎉 Enrollment Successful!",
// // // // // // //         description: "You've been enrolled in this free course!",
// // // // // // //       });
// // // // // // //       setPaymentSuccess(true);
// // // // // // //       onEnrollmentChange();
// // // // // // //     } catch (error: any) {
// // // // // // //       toast({
// // // // // // //         title: "Enrollment Failed",
// // // // // // //         description: error.message,
// // // // // // //         variant: "destructive",
// // // // // // //       });
// // // // // // //     } finally {
// // // // // // //       setIsLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handlePaidEnrollment = async (method: PaymentMethod) => {
// // // // // // //     setIsLoading(true);
// // // // // // //     try {
// // // // // // //       // Check if user is logged in
// // // // // // //       console.log("Starting payment process with method:", method);
// // // // // // //       console.log("Course ID:", courseId);
// // // // // // //       console.log("Price:", price, "paise (₹" + (price / 100).toFixed(2) + ")");
// // // // // // //       const {
// // // // // // //         data: { session },
// // // // // // //       } = await supabase.auth.getSession();
// // // // // // //       if (!session) throw new Error("Please log in to enroll");
// // // // // // //       console.log("User:", session.user.id);
// // // // // // //       // Check for existing enrollment
// // // // // // //       const { data: existingEnrollment } = await supabase
// // // // // // //         .from("course_enrollments")
// // // // // // //         .select("id")
// // // // // // //         .eq("user_id", session.user.id)
// // // // // // //         .eq("course_id", courseId)
// // // // // // //         .or("payment_status.eq.paid,payment_status.eq.free")
// // // // // // //         .limit(1)
// // // // // // //         .maybeSingle();

// // // // // // //       if (existingEnrollment) {
// // // // // // //         throw new Error("You are already enrolled in this course");
// // // // // // //       }

// // // // // // //       if (method !== "razorpay") {
// // // // // // //         console.log("Payment method not available:", method);
// // // // // // //         toast({
// // // // // // //           title: "Coming Soon",
// // // // // // //           description: `${method} is not available yet.`,
// // // // // // //           variant: "destructive",
// // // // // // //         });
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       // Load Razorpay script
// // // // // // //       const loaded = await loadRazorpayScript();
// // // // // // //       if (!loaded) throw new Error("Failed to load payment processor");
// // // // // // //       console.log("Razorpay script loaded");
// // // // // // //       // Create order
// // // // // // //       const { data: order, error: orderError } = await supabase
// // // // // // //         .from("orders")
// // // // // // //         .insert({
// // // // // // //           user_id: session.user.id,
// // // // // // //           course_id: courseId,
// // // // // // //           amount: price,
// // // // // // //           currency: "INR",
// // // // // // //           status: "created",
// // // // // // //           payment_method: "razorpay",
// // // // // // //         })
// // // // // // //         .select()
// // // // // // //         .single();

// // // // // // //       if (orderError || !order) {
// // // // // // //         throw new Error(orderError?.message || "Failed to create order");
// // // // // // //       }
// // // // // // //       console.log("Order created:", order.id);

// // // // // // //       const options = {
// // // // // // //         key: Key_payment,
// // // // // // //         // key: "rzp_test_eK57VjQhXHjIGR",
// // // // // // //         amount: Math.round(price * 100).toString(),
// // // // // // //         // amount: price.toString(),
// // // // // // //         currency: "INR",
// // // // // // //         name: "TheFutemed",
// // // // // // //         description: `Payment for course enrollment`,
// // // // // // //         handler: async function (response: any) {
// // // // // // //           try {
// // // // // // //             // Verify payment
// // // // // // //             const { error: verifyError } = await supabase
// // // // // // //               .from("orders")
// // // // // // //               .update({
// // // // // // //                 status: "paid",
// // // // // // //                 razorpay_payment_id: response.razorpay_payment_id,
// // // // // // //               })
// // // // // // //               .eq("id", order.id);

// // // // // // //             if (verifyError) throw new Error("Payment verification failed");

// // // // // // //             // Create enrollment
// // // // // // //             await enrollUser("razorpay", price);

// // // // // // //             toast({
// // // // // // //               title: "🎉 Enrollment Successful!",
// // // // // // //               description: "You've been enrolled in the course!",
// // // // // // //             });
// // // // // // //             setPaymentSuccess(true);
// // // // // // //             onEnrollmentChange();
// // // // // // //           } catch (error: any) {
// // // // // // //             toast({
// // // // // // //               title: "Payment Verification Failed",
// // // // // // //               description: error.message,
// // // // // // //               variant: "destructive",
// // // // // // //             });
// // // // // // //           }
// // // // // // //         },
// // // // // // //         prefill: {
// // // // // // //           name: session.user.user_metadata?.full_name || "User",
// // // // // // //           email: session.user.email || "",
// // // // // // //           contact: session.user.phone || "",
// // // // // // //         },
// // // // // // //         theme: {
// // // // // // //           color: "#528FF0",
// // // // // // //         },
// // // // // // //         modal: {
// // // // // // //           ondismiss: () => {
// // // // // // //             toast({
// // // // // // //               title: "Payment Cancelled",
// // // // // // //               description: "You cancelled the payment process",
// // // // // // //             });
// // // // // // //             setIsLoading(false);
// // // // // // //           },
// // // // // // //         },
// // // // // // //       };

// // // // // // //       const rzp = new window.Razorpay(options);
// // // // // // //       rzp.on("payment.failed", function (response: any) {
// // // // // // //         console.error("Payment failed:", response.error);
// // // // // // //         toast({
// // // // // // //           title: "Payment Failed",
// // // // // // //           description: response.error.description,
// // // // // // //           variant: "destructive",
// // // // // // //         });
// // // // // // //       });
// // // // // // //       rzp.open();
// // // // // // //     } catch (error: any) {
// // // // // // //       console.error("Payment process error:", error);
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
// // // // // // //         <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
// // // // // // //         Already Enrolled
// // // // // // //       </Button>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // // // // // //       <DialogTrigger asChild>
// // // // // // //         <Button
// // // // // // //           size="lg"
// // // // // // //           className="w-full"
// // // // // // //           disabled={isLoading || paymentSuccess}
// // // // // // //         >
// // // // // // //           {isLoading ? (
// // // // // // //             <>
// // // // // // //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // // // //               Processing...
// // // // // // //             </>
// // // // // // //           ) : paymentSuccess ? (
// // // // // // //             <>
// // // // // // //               <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
// // // // // // //               Enrolled
// // // // // // //             </>
// // // // // // //           ) : isPaid ? (
// // // // // // //             <>
// // // // // // //               <CreditCard className="mr-2 h-4 w-4" />
// // // // // // //               {`Enroll for ₹${price.toFixed(2)}`}
// // // // // // //               {/* {`Enroll for ₹${(price / 100).toFixed(2)}`} */}
// // // // // // //             </>
// // // // // // //           ) : (
// // // // // // //             <>
// // // // // // //               <CheckCircle className="mr-2 h-4 w-4" />
// // // // // // //               Enroll for Free
// // // // // // //             </>
// // // // // // //           )}
// // // // // // //         </Button>
// // // // // // //       </DialogTrigger>
// // // // // // //       <DialogContent>
// // // // // // //         <DialogHeader>
// // // // // // //           <DialogTitle>
// // // // // // //             {isPaid ? "Complete Your Enrollment" : "Confirm Free Enrollment"}
// // // // // // //           </DialogTitle>
// // // // // // //           <DialogDescription>
// // // // // // //             {isPaid
// // // // // // //               ? `Please pay ₹${(price / 100).toFixed(
// // // // // // //                   2
// // // // // // //                 )} to enroll in this course`
// // // // // // //               : "You're about to enroll in this free course"}
// // // // // // //           </DialogDescription>
// // // // // // //         </DialogHeader>
// // // // // // //         {isPaid ? (
// // // // // // //           <PaymentMethodSelector
// // // // // // //             onPaymentMethodSelect={handlePaidEnrollment}
// // // // // // //             isLoading={isLoading}
// // // // // // //             price={price}
// // // // // // //           />
// // // // // // //         ) : (
// // // // // // //           <div className="flex flex-col gap-4">
// // // // // // //             <div className="bg-green-50 p-4 rounded-lg border border-green-100">
// // // // // // //               <h4 className="font-medium text-green-800">
// // // // // // //                 Free Enrollment Confirmation
// // // // // // //               </h4>
// // // // // // //               <p className="text-sm text-green-600 mt-1">
// // // // // // //                 You will get immediate access to all course materials.
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //             <div className="flex justify-end gap-2">
// // // // // // //               <Button
// // // // // // //                 variant="outline"
// // // // // // //                 onClick={() => setShowPaymentMethods(false)}
// // // // // // //               >
// // // // // // //                 Cancel
// // // // // // //               </Button>
// // // // // // //               <Button
// // // // // // //                onClick={() => {
// // // // // // //                                               mixpanelInstance.track(
// // // // // // //                                                 " Confirm Free Enrollment view elearning Button Clicked",
// // // // // // //                                                 {
// // // // // // //                                                   timestamp: new Date().toISOString(),
// // // // // // //                                                 }
// // // // // // //                                               );
// // // // // // //                                               handleFreeEnrollment();
// // // // // // //                                             }}
// // // // // // //                 // onClick={handleFreeEnrollment}
// // // // // // //                 disabled={isLoading}
// // // // // // //                 className="bg-green-600 hover:bg-green-700"
// // // // // // //               >
// // // // // // //                 {isLoading ? (
// // // // // // //                   <>
// // // // // // //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // // // //                     Processing...
// // // // // // //                   </>
// // // // // // //                 ) : (
// // // // // // //                   "Confirm Free Enrollment"
// // // // // // //                 )}
// // // // // // //               </Button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </DialogContent>
// // // // // // //     </Dialog>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default EnrollmentButton;

// // // // // // import { useState, useEffect } from "react";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // import { Loader2, CreditCard, CheckCircle } from "lucide-react";
// // // // // // import { PaymentMethodSelector } from "./PaymentMethodSelector";
// // // // // // import {
// // // // // //   Dialog,
// // // // // //   DialogContent,
// // // // // //   DialogHeader,
// // // // // //   DialogTitle,
// // // // // //   DialogTrigger,
// // // // // //   DialogDescription,
// // // // // // } from "@/components/ui/dialog";
// // // // // // import { mixpanelInstance } from "@/utils/mixpanel";
// // // // // // import { loadStripe } from "@stripe/stripe-js";

// // // // // // // Make sure to install the Stripe package: npm install @stripe/stripe-js
// // // // // // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// // // // // // interface Props {
// // // // // //   courseId: string;
// // // // // //   isEnrolled: boolean;
// // // // // //   isPaid: boolean;
// // // // // //   price: number;
// // // // // //   onEnrollmentChange: () => void;
// // // // // // }

// // // // // // type PaymentMethod = "stripe" | "free";

// // // // // // export const EnrollmentButton = ({
// // // // // //   courseId,
// // // // // //   isEnrolled,
// // // // // //   isPaid,
// // // // // //   price,
// // // // // //   onEnrollmentChange,
// // // // // // }: Props) => {
// // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // // // // //   const [paymentSuccess, setPaymentSuccess] = useState(false);
// // // // // //   const { toast } = useToast();

// // // // // //   // Check for payment success in URL params
// // // // // //   useEffect(() => {
// // // // // //     const queryParams = new URLSearchParams(window.location.search);
// // // // // //     const paymentStatus = queryParams.get("payment");
// // // // // //     const sessionId = queryParams.get("session_id");

// // // // // //     if (paymentStatus === "success" && sessionId) {
// // // // // //       handlePaymentSuccess(sessionId);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   const enrollUser = async (
// // // // // //     paymentMethod: PaymentMethod,
// // // // // //     amount: number = 0
// // // // // //   ) => {
// // // // // //     const {
// // // // // //       data: { session },
// // // // // //     } = await supabase.auth.getSession();
// // // // // //     if (!session) throw new Error("Please log in to enroll");

// // // // // //     const { error } = await supabase.from("course_enrollments").insert({
// // // // // //       user_id: session.user.id,
// // // // // //       course_id: courseId,
// // // // // //       payment_status: paymentMethod === "free" ? "free" : "paid",
// // // // // //       amount,
// // // // // //       currency: "USD",
// // // // // //       payment_method: paymentMethod,
// // // // // //       enrolled_at: new Date().toISOString(),
// // // // // //     });

// // // // // //     if (error) throw new Error(`Failed to enroll: ${error.message}`);
// // // // // //   };

// // // // // //   const handleFreeEnrollment = async () => {
// // // // // //     setIsLoading(true);
// // // // // //     try {
// // // // // //       await enrollUser("free");
// // // // // //       toast({
// // // // // //         title: "🎉 Enrollment Successful!",
// // // // // //         description: "You've been enrolled in this free course!",
// // // // // //       });
// // // // // //       setPaymentSuccess(true);
// // // // // //       onEnrollmentChange();
// // // // // //     } catch (error: any) {
// // // // // //       toast({
// // // // // //         title: "Enrollment Failed",
// // // // // //         description: error.message,
// // // // // //         variant: "destructive",
// // // // // //       });
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handlePaymentSuccess = async (sessionId: string) => {
// // // // // //     setIsLoading(true);
// // // // // //     try {
// // // // // //       // Verify payment with our backend
// // // // // //       const { data, error } = await supabase.functions.invoke(
// // // // // //         "verify-stripe-payment",
// // // // // //         {
// // // // // //           body: { sessionId },
// // // // // //         }
// // // // // //       );

// // // // // //       if (error) throw error;

// // // // // //       if (data?.enrolled) {
// // // // // //         setPaymentSuccess(true);
// // // // // //         onEnrollmentChange();
// // // // // //         toast({
// // // // // //           title: "Payment Successful!",
// // // // // //           description: "You've been enrolled in the course!",
// // // // // //         });
// // // // // //         // Clear the payment params from URL
// // // // // //         window.history.replaceState({}, "", window.location.pathname);
// // // // // //       }
// // // // // //     } catch (error: any) {
// // // // // //       toast({
// // // // // //         title: "Payment Verification Failed",
// // // // // //         description: error.message,
// // // // // //         variant: "destructive",
// // // // // //       });
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handlePaidEnrollment = async () => {
// // // // // //     setIsLoading(true);
// // // // // //     try {
// // // // // //       const {
// // // // // //         data: { session },
// // // // // //       } = await supabase.auth.getSession();
// // // // // //       if (!session) throw new Error("Please log in to enroll");

// // // // // //       // Check for existing enrollment
// // // // // //       const { data: existingEnrollment } = await supabase
// // // // // //         .from("course_enrollments")
// // // // // //         .select("id")
// // // // // //         .eq("user_id", session.user.id)
// // // // // //         .eq("course_id", courseId)
// // // // // //         .or("payment_status.eq.paid,payment_status.eq.free")
// // // // // //         .limit(1)
// // // // // //         .maybeSingle();

// // // // // //       if (existingEnrollment) {
// // // // // //         throw new Error("You are already enrolled in this course");
// // // // // //       }

// // // // // //       // Create a Stripe checkout session
// // // // // //       const { data: checkoutSession, error: checkoutError } =
// // // // // //         await supabase.functions.invoke("create-stripe-checkout", {
// // // // // //           body: {
// // // // // //             courseId,
// // // // // //             price: Math.round(price * 100), // Convert to cents
// // // // // //             userId: session.user.id,
// // // // // //             userEmail: session.user.email,
// // // // // //             successUrl: `${window.location.origin}/course/${courseId}?payment=success`,
// // // // // //             cancelUrl: `${window.location.origin}/course/${courseId}?payment=cancel`,
// // // // // //           },
// // // // // //         });

// // // // // //       if (checkoutError || !checkoutSession) {
// // // // // //         throw new Error(
// // // // // //           checkoutError?.message || "Failed to create payment session"
// // // // // //         );
// // // // // //       }

// // // // // //       // Redirect to Stripe checkout
// // // // // //       const stripe = await stripePromise;
// // // // // //       const { error: stripeError } = await stripe!.redirectToCheckout({
// // // // // //         sessionId: checkoutSession.id,
// // // // // //       });

// // // // // //       if (stripeError) {
// // // // // //         throw new Error(stripeError.message);
// // // // // //       }
// // // // // //     } catch (error: any) {
// // // // // //       console.error("Payment process error:", error);
// // // // // //       toast({
// // // // // //         title: "Error",
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
// // // // // //         <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
// // // // // //         Already Enrolled
// // // // // //       </Button>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // // // // //       <DialogTrigger asChild>
// // // // // //         <Button
// // // // // //           size="lg"
// // // // // //           className="w-full"
// // // // // //           disabled={isLoading || paymentSuccess}
// // // // // //         >
// // // // // //           {isLoading ? (
// // // // // //             <>
// // // // // //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // // //               Processing...
// // // // // //             </>
// // // // // //           ) : paymentSuccess ? (
// // // // // //             <>
// // // // // //               <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
// // // // // //               Enrolled
// // // // // //             </>
// // // // // //           ) : isPaid ? (
// // // // // //             <>
// // // // // //               <CreditCard className="mr-2 h-4 w-4" />
// // // // // //               {`Enroll for ₹${price.toFixed(2)}`}
// // // // // //             </>
// // // // // //           ) : (
// // // // // //             <>
// // // // // //               <CheckCircle className="mr-2 h-4 w-4" />
// // // // // //               Enroll for Free
// // // // // //             </>
// // // // // //           )}
// // // // // //         </Button>
// // // // // //       </DialogTrigger>
// // // // // //       <DialogContent>
// // // // // //         <DialogHeader>
// // // // // //           <DialogTitle>
// // // // // //             {isPaid ? "Complete Your Enrollment" : "Confirm Free Enrollment"}
// // // // // //           </DialogTitle>
// // // // // //           <DialogDescription>
// // // // // //             {isPaid
// // // // // //               ? `Please pay $${price.toFixed(2)} to enroll in this course`
// // // // // //               : "You're about to enroll in this free course"}
// // // // // //           </DialogDescription>
// // // // // //         </DialogHeader>
// // // // // //         {isPaid ? (
// // // // // //           <div className="flex flex-col gap-4">
// // // // // //             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
// // // // // //               <h4 className="font-medium text-blue-800">
// // // // // //                 Secure Payment with Stripe
// // // // // //               </h4>
// // // // // //               <p className="text-sm text-blue-600 mt-1">
// // // // // //                 You'll be redirected to Stripe's secure payment page to complete
// // // // // //                 your enrollment.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <div className="flex justify-end gap-2">
// // // // // //               <Button
// // // // // //                 variant="outline"
// // // // // //                 onClick={() => setShowPaymentMethods(false)}
// // // // // //               >
// // // // // //                 Cancel
// // // // // //               </Button>
// // // // // //               <Button
// // // // // //                 onClick={() => {
// // // // // //                   mixpanelInstance.track(
// // // // // //                     "Stripe Payment Enrollment Button Clicked",
// // // // // //                     {
// // // // // //                       timestamp: new Date().toISOString(),
// // // // // //                     }
// // // // // //                   );
// // // // // //                   handlePaidEnrollment();
// // // // // //                 }}
// // // // // //                 disabled={isLoading}
// // // // // //                 className="bg-blue-600 hover:bg-blue-700"
// // // // // //               >
// // // // // //                 {isLoading ? (
// // // // // //                   <>
// // // // // //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // // //                     Processing...
// // // // // //                   </>
// // // // // //                 ) : (
// // // // // //                   "Proceed to Payment"
// // // // // //                 )}
// // // // // //               </Button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <div className="flex flex-col gap-4">
// // // // // //             <div className="bg-green-50 p-4 rounded-lg border border-green-100">
// // // // // //               <h4 className="font-medium text-green-800">
// // // // // //                 Free Enrollment Confirmation
// // // // // //               </h4>
// // // // // //               <p className="text-sm text-green-600 mt-1">
// // // // // //                 You will get immediate access to all course materials.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <div className="flex justify-end gap-2">
// // // // // //               <Button
// // // // // //                 variant="outline"
// // // // // //                 onClick={() => setShowPaymentMethods(false)}
// // // // // //               >
// // // // // //                 Cancel
// // // // // //               </Button>
// // // // // //               <Button
// // // // // //                 onClick={() => {
// // // // // //                   mixpanelInstance.track(
// // // // // //                     "Confirm Free Enrollment Button Clicked",
// // // // // //                     {
// // // // // //                       timestamp: new Date().toISOString(),
// // // // // //                     }
// // // // // //                   );
// // // // // //                   handleFreeEnrollment();
// // // // // //                 }}
// // // // // //                 disabled={isLoading}
// // // // // //                 className="bg-green-600 hover:bg-green-700"
// // // // // //               >
// // // // // //                 {isLoading ? (
// // // // // //                   <>
// // // // // //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // // //                     Processing...
// // // // // //                   </>
// // // // // //                 ) : (
// // // // // //                   "Confirm Free Enrollment"
// // // // // //                 )}
// // // // // //               </Button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </DialogContent>
// // // // // //     </Dialog>
// // // // // //   );
// // // // // // };

// // // // // // export default EnrollmentButton;

// // // // // import { useState, useEffect } from "react";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { useToast } from "@/hooks/use-toast";
// // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // import { Loader2, CreditCard, CheckCircle } from "lucide-react";
// // // // // import {
// // // // //   Dialog,
// // // // //   DialogContent,
// // // // //   DialogHeader,
// // // // //   DialogTitle,
// // // // //   DialogTrigger,
// // // // //   DialogDescription,
// // // // // } from "@/components/ui/dialog";
// // // // // import { mixpanelInstance } from "@/utils/mixpanel";
// // // // // import { loadStripe } from "@stripe/stripe-js";
// // // // // import { PaymentMethodSelector } from "./PaymentMethodSelector";

// // // // // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// // // // // interface Props {
// // // // //   courseId: string;
// // // // //   isEnrolled: boolean;
// // // // //   isPaid: boolean; // Make sure this prop is passed from parent component
// // // // //   price: number;
// // // // //   onEnrollmentChange: () => void;
// // // // // }

// // // // // type PaymentMethod = "stripe" | "free";

// // // // // export const EnrollmentButton = ({
// // // // //   courseId,
// // // // //   isEnrolled,
// // // // //   isPaid, // Now receiving isPaid prop
// // // // //   price,
// // // // //   onEnrollmentChange,
// // // // // }: Props) => {
// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// // // // //   const [paymentSuccess, setPaymentSuccess] = useState(false);
// // // // //   const { toast } = useToast();

// // // // //   useEffect(() => {
// // // // //     const queryParams = new URLSearchParams(window.location.search);
// // // // //     const paymentStatus = queryParams.get("payment");
// // // // //     const sessionId = queryParams.get("session_id");

// // // // //     if (paymentStatus === "success" && sessionId) {
// // // // //       handlePaymentSuccess(sessionId);
// // // // //     }
// // // // //   }, []);

// // // // //   const enrollUser = async (
// // // // //     paymentMethod: PaymentMethod,
// // // // //     amount: number = 0
// // // // //   ) => {
// // // // //     const {
// // // // //       data: { session },
// // // // //     } = await supabase.auth.getSession();
// // // // //     if (!session) throw new Error("Please log in to enroll");

// // // // //     const { error } = await supabase.from("course_enrollments").insert({
// // // // //       user_id: session.user.id,
// // // // //       course_id: courseId,
// // // // //       payment_status: paymentMethod === "free" ? "free" : "paid",
// // // // //       amount,
// // // // //       currency: "INR",
// // // // //       payment_method: paymentMethod,
// // // // //       enrolled_at: new Date().toISOString(),
// // // // //     });

// // // // //     if (error) throw new Error(`Failed to enroll: ${error.message}`);
// // // // //   };

// // // // //   const handleFreeEnrollment = async () => {
// // // // //     setIsLoading(true);
// // // // //     try {
// // // // //       await enrollUser("free");
// // // // //       toast({
// // // // //         title: "🎉 Enrollment Successful!",
// // // // //         description: "You've been enrolled in this free course!",
// // // // //       });
// // // // //       setPaymentSuccess(true);
// // // // //       onEnrollmentChange();
// // // // //     } catch (error: any) {
// // // // //       toast({
// // // // //         title: "Enrollment Failed",
// // // // //         description: error.message,
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handlePaymentSuccess = async (sessionId: string) => {
// // // // //     setIsLoading(true);
// // // // //     try {
// // // // //       // Verify payment with our backend
// // // // //       const { data, error } = await supabase.functions.invoke(
// // // // //         "verify-payment",
// // // // //         {
// // // // //           body: { sessionId },
// // // // //         }
// // // // //       );

// // // // //       if (error) throw error;

// // // // //       if (data?.enrolled) {
// // // // //         setPaymentSuccess(true);
// // // // //         onEnrollmentChange();
// // // // //         toast({
// // // // //           title: "Payment Successful!",
// // // // //           description: "You've been enrolled in the course!",
// // // // //         });
// // // // //         // Clear the payment params from URL
// // // // //         window.history.replaceState({}, "", window.location.pathname);
// // // // //       }
// // // // //     } catch (error: any) {
// // // // //       toast({
// // // // //         title: "Payment Verification Failed",
// // // // //         description: error.message,
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handlePaidEnrollment = async () => {
// // // // //     setIsLoading(true);
// // // // //     try {
// // // // //       const {
// // // // //         data: { session },
// // // // //       } = await supabase.auth.getSession();
// // // // //       if (!session) throw new Error("Please log in to enroll");

// // // // //       // Check for existing enrollment - FIXED QUERY
// // // // //       const { data: existingEnrollment, error: queryError } = await supabase
// // // // //         .from("course_enrollments")
// // // // //         .select("id")
// // // // //         .eq("user_id", session.user.id)
// // // // //         .eq("course_id", courseId)
// // // // //         .in("payment_status", ["paid", "free"])
// // // // //         .limit(1)
// // // // //         .maybeSingle();

// // // // //       if (queryError) {
// // // // //         console.error("Query error:", queryError);
// // // // //         throw new Error("Failed to check enrollment status");
// // // // //       }

// // // // //       if (existingEnrollment) {
// // // // //         throw new Error("You are already enrolled in this course");
// // // // //       }

// // // // //       // Create a Stripe checkout session using direct fetch to avoid CORS issues
// // // // //       const response = await fetch(
// // // // //         "https://rxyfrjfgydldjdqelixe.supabase.co/functions/v1/create-course-payment",
// // // // //         {
// // // // //           method: "POST",
// // // // //           headers: {
// // // // //             "Content-Type": "application/json",
// // // // //             Authorization: `Bearer ${
// // // // //               (
// // // // //                 await supabase.auth.getSession()
// // // // //               ).data.session?.access_token
// // // // //             }`,
// // // // //           },
// // // // //           body: JSON.stringify({
// // // // //             courseId,
// // // // //             price: Math.round(price * 100), // Convert to paise
// // // // //             userId: session.user.id,
// // // // //             userEmail: session.user.email,
// // // // //             successUrl: `${window.location.origin}/course/${courseId}?payment=success`,
// // // // //             cancelUrl: `${window.location.origin}/course/${courseId}?payment=cancel`,
// // // // //           }),
// // // // //         }
// // // // //       );

// // // // //       if (!response.ok) {
// // // // //         const errorData = await response.json();
// // // // //         throw new Error(errorData.error || "Failed to create payment session");
// // // // //       }

// // // // //       const checkoutSession = await response.json();

// // // // //       // Redirect to Stripe checkout
// // // // //       const stripe = await stripePromise;
// // // // //       if (!stripe) throw new Error("Stripe failed to load");

// // // // //       const { error: stripeError } = await stripe.redirectToCheckout({
// // // // //         sessionId: checkoutSession.id,
// // // // //       });

// // // // //       if (stripeError) {
// // // // //         throw new Error(stripeError.message);
// // // // //       }
// // // // //     } catch (error: any) {
// // // // //       console.error("Payment process error:", error);
// // // // //       toast({
// // // // //         title: "Error",
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
// // // // //         <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
// // // // //         Already Enrolled
// // // // //       </Button>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// // // // //       <DialogTrigger asChild>
// // // // //         <Button
// // // // //           size="lg"
// // // // //           className="w-full"
// // // // //           disabled={isLoading || paymentSuccess}
// // // // //         >
// // // // //           {isLoading ? (
// // // // //             <>
// // // // //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // //               Processing...
// // // // //             </>
// // // // //           ) : paymentSuccess ? (
// // // // //             <>
// // // // //               <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
// // // // //               Enrolled
// // // // //             </>
// // // // //           ) : isPaid ? (
// // // // //             <>
// // // // //               <CreditCard className="mr-2 h-4 w-4" />
// // // // //               {`Enroll for ₹${price.toFixed(2)}`}
// // // // //             </>
// // // // //           ) : (
// // // // //             <>
// // // // //               <CheckCircle className="mr-2 h-4 w-4" />
// // // // //               Enroll for Free
// // // // //             </>
// // // // //           )}
// // // // //         </Button>
// // // // //       </DialogTrigger>
// // // // //       <DialogContent>
// // // // //         <DialogHeader>
// // // // //           <DialogTitle>
// // // // //             {isPaid ? "Complete Your Enrollment" : "Confirm Free Enrollment"}
// // // // //           </DialogTitle>
// // // // //           <DialogDescription>
// // // // //             {isPaid
// // // // //               ? `Please pay ₹${price.toFixed(2)} to enroll in this course`
// // // // //               : "You're about to enroll in this free course"}
// // // // //           </DialogDescription>
// // // // //         </DialogHeader>
// // // // //         {isPaid ? (
// // // // //           <PaymentMethodSelector
// // // // //             onPaymentMethodSelect={handlePaidEnrollment}
// // // // //             isLoading={isLoading}
// // // // //             price={price}
// // // // //           />
// // // // //         ) : (
// // // // //           <div className="flex flex-col gap-4">
// // // // //             <div className="bg-green-50 p-4 rounded-lg border border-green-100">
// // // // //               <h4 className="font-medium text-green-800">
// // // // //                 Free Enrollment Confirmation
// // // // //               </h4>
// // // // //               <p className="text-sm text-green-600 mt-1">
// // // // //                 You will get immediate access to all course materials.
// // // // //               </p>
// // // // //             </div>
// // // // //             <div className="flex justify-end gap-2">
// // // // //               <Button
// // // // //                 variant="outline"
// // // // //                 onClick={() => setShowPaymentMethods(false)}
// // // // //               >
// // // // //                 Cancel
// // // // //               </Button>
// // // // //               <Button
// // // // //                 onClick={() => {
// // // // //                   mixpanelInstance.track(
// // // // //                     "Confirm Free Enrollment view elearning Button Clicked",
// // // // //                     {
// // // // //                       timestamp: new Date().toISOString(),
// // // // //                     }
// // // // //                   );
// // // // //                   handleFreeEnrollment();
// // // // //                 }}
// // // // //                 disabled={isLoading}
// // // // //                 className="bg-green-600 hover:bg-green-700"
// // // // //               >
// // // // //                 {isLoading ? (
// // // // //                   <>
// // // // //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // //                     Processing...
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   "Confirm Free Enrollment"
// // // // //                 )}
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </DialogContent>
// // // // //     </Dialog>
// // // // //   );
// // // // // };

// // // // // export default EnrollmentButton;

// // import { useState, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import { useToast } from "@/hooks/use-toast";
// // import { supabase } from "@/integrations/supabase/client";
// // import { Loader2, CreditCard, CheckCircle } from "lucide-react";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// //   DialogDescription,
// // } from "@/components/ui/dialog";
// // import { mixpanelInstance } from "@/utils/mixpanel";
// // import { loadStripe } from "@stripe/stripe-js";
// // import { PaymentMethodSelector } from "./PaymentMethodSelector";

// // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// // interface Props {
// //   productType?:string;
// //   seminarId: string;
// //   isEnrolled: boolean;
// //   isPaid: boolean;
// //   price: number;
// //   onEnrollmentChange: () => void;
// // }

// // type PaymentMethod = "stripe" | "free";

// // export const EnrollmentButton = ({
// //   seminarId,
// //   isEnrolled,
// //   productType,
// //   isPaid,
// //   price,
// //   onEnrollmentChange,
// // }: Props) => {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
// //   const [paymentSuccess, setPaymentSuccess] = useState(false);
// //   const { toast } = useToast();

// //   useEffect(() => {
// //     const queryParams = new URLSearchParams(window.location.search);
// //     const paymentStatus = queryParams.get("payment");
// //     const sessionId = queryParams.get("session_id");

// //     if (paymentStatus === "success" && sessionId) {
// //       handlePaymentSuccess(sessionId);
// //     }
// //   }, []);

// //   const enrollUser = async (
// //     paymentMethod: PaymentMethod,
// //     amount: number = 0
// //   ) => {
// //     const {
// //       data: { session },
// //     } = await supabase.auth.getSession();
// //     if (!session) throw new Error("Please log in to enroll");

// //     const { error } = await supabase.from("seminer").insert({
// //       // const { error } = await supabase.from("course_enrollments").insert({
// //       user_id: session.user.id,
// //       seminer_id: seminarId,
// //       payment_status: paymentMethod === "free" ? "free" : "paid",
// //       amount,
// //       currency: "INR",
// //       payment_method: paymentMethod,
// //       enrolled_at: new Date().toISOString(),
// //     });

// //     if (error) throw new Error(`Failed to enroll: ${error.message}`);
// //   };

// //   const handleFreeEnrollment = async () => {
// //     setIsLoading(true);
// //     try {
// //       await enrollUser("free");
// //       toast({
// //         title: "🎉 Enrollment Successful!",
// //         description: "You've been enrolled in this free course!",
// //       });
// //       setPaymentSuccess(true);
// //       onEnrollmentChange();
// //     } catch (error: any) {
// //       toast({
// //         title: "Enrollment Failed",
// //         description: error.message,
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handlePaymentSuccess = async (sessionId: string) => {
// //     setIsLoading(true);
// //     try {
// //       const { data, error } = await supabase.functions.invoke(
// //         "verify-payment",
// //         {
// //           body: { sessionId },
// //         }
// //       );

// //       if (error) throw error;

// //       if (data?.enrolled) {
// //         setPaymentSuccess(true);
// //         onEnrollmentChange();
// //         toast({
// //           title: "Payment Successful!",
// //           description: "You've been enrolled in the course!",
// //         });
// //         window.history.replaceState({}, "", window.location.pathname);
// //       }
// //     } catch (error: any) {
// //       toast({
// //         title: "Payment Verification Failed",
// //         description: error.message,
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handlePaidEnrollment = async () => {
// //     setIsLoading(true);
// //     try {
// //       const {
// //         data: { session },
// //       } = await supabase.auth.getSession();
// //       if (!session) throw new Error("Please log in to enroll");

// //       // FIXED: Check for existing enrollment using proper syntax
// //       // const { data: existingEnrollment, error: queryError } = await supabase
// //       //   .from("course_enrollments")
// //       //   .select("id")
// //       //   .eq("user_id", session.user.id)
// //       //   .eq("course_id", courseId)
// //       //   .or("payment_status.eq.paid,payment_status.eq.free")
// //       //   .limit(1)
// //       //   .maybeSingle();

// //       // if (queryError) {
// //       //   console.error("Query error:", queryError);
// //       //   throw new Error("Failed to check enrollment status");
// //       // }

// //       // if (existingEnrollment) {
// //       //   throw new Error("You are already enrolled in this course");
// //       // }

// //       // Create a Stripe checkout session
// //         if (
// //           !seminarId ||
// //           seminarId === "" ||
// //           !session.user.id ||
// //           session.user.id === ""
// //         ) {
// //           throw new Error("Missing seminarId or userId. Please try again.");
// //         }
// //       const response = await fetch(
// //         "https://rxyfrjfgydldjdqelixe.supabase.co/functions/v1/create-stripe-session",
// //         // "https://rxyfrjfgydldjdqelixe.supabase.co/functions/v1/verify-payment",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${
// //               (
// //                 await supabase.auth.getSession()
// //               ).data.session?.access_token
// //             }`,
// //           },
// //           body: JSON.stringify({
// //             // courseId,
// //             productType: "seminer", // required by your function
// //             productId: seminarId,
// //             // price: Math.round(price),
// //             price: Math.round(price * 100),
// //             userId: session.user.id,
// //             userEmail: session.user.email,
// //             currency: "INR",
// //             successUrl: `${window.location.origin}/seminer/${seminarId}?payment=success`,
// //             cancelUrl: `${window.location.origin}/seminar/${seminarId}?payment=cancel`,
// //             // successUrl: `${window.location.origin}/course/${courseId}?payment=success`,
// //             // cancelUrl: `${window.location.origin}/course/${courseId}?payment=cancel`,
// //           }),
// //         }
// //       );

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.error || "Failed to create payment session");
// //       }

// //       const checkoutSession = await response.json();

// //       const stripe = await stripePromise;
// //       if (!stripe) throw new Error("Stripe failed to load");

// //       const { error: stripeError } = await stripe.redirectToCheckout({
// //         sessionId: checkoutSession.id,
// //       });

// //       if (stripeError) {
// //         throw new Error(stripeError.message);
// //       }
// //     } catch (error: any) {
// //       console.error("Payment process error:", error);
// //       toast({
// //         title: "Error",
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
// //         <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
// //         Already Enrolled
// //       </Button>
// //     );
// //   }

// //   return (
// //     <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
// //       <DialogTrigger asChild>
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
// //           ) : isPaid ? (
// //             <>
// //               <CreditCard className="mr-2 h-4 w-4" />
// //               {`Enroll for ₹${price.toFixed(2)}`}
// //             </>
// //           ) : (
// //             <>
// //               <CheckCircle className="mr-2 h-4 w-4" />
// //               Enroll for Free
// //             </>
// //           )}
// //         </Button>
// //       </DialogTrigger>
// //       <DialogContent>
// //         <DialogHeader>
// //           <DialogTitle>
// //             {isPaid ? "Complete Your Enrollment" : "Confirm Free Enrollment"}
// //           </DialogTitle>
// //           <DialogDescription>
// //             {isPaid
// //               ? `Please pay ₹${price.toFixed(2)} to enroll in this course`
// //               : "You're about to enroll in this free course"}
// //           </DialogDescription>
// //         </DialogHeader>
// //         {isPaid ? (
// //           <PaymentMethodSelector
// //             onPaymentMethodSelect={handlePaidEnrollment}
// //             isLoading={isLoading}
// //             price={price}
// //           />
// //         ) : (
// //           <div className="flex flex-col gap-4">
// //             <div className="bg-green-50 p-4 rounded-lg border border-green-100">
// //               <h4 className="font-medium text-green-800">
// //                 Free Enrollment Confirmation
// //               </h4>
// //               <p className="text-sm text-green-600 mt-1">
// //                 You will get immediate access to all course materials.
// //               </p>
// //             </div>
// //             <div className="flex justify-end gap-2">
// //               <Button
// //                 variant="outline"
// //                 onClick={() => setShowPaymentMethods(false)}
// //               >
// //                 Cancel
// //               </Button>
// //               <Button
// //                 onClick={() => {
// //                   mixpanelInstance.track(
// //                     "Confirm Free Enrollment view elearning Button Clicked",
// //                     {
// //                       timestamp: new Date().toISOString(),
// //                     }
// //                   );
// //                   handleFreeEnrollment();
// //                 }}
// //                 disabled={isLoading}
// //                 className="bg-green-600 hover:bg-green-700"
// //               >
// //                 {isLoading ? (
// //                   <>
// //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                     Processing...
// //                   </>
// //                 ) : (
// //                   "Confirm Free Enrollment"
// //                 )}
// //               </Button>
// //             </div>
// //           </div>
// //         )}
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default EnrollmentButton;

// // // import React, { useState, useEffect } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Loader2, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
// // // import { supabase } from "@/integrations/supabase/client";
// // // import { useToast } from "@/hooks/use-toast";

// // // const EnrollmentButton = () => {
// // //   const { paymentId } = useParams();
// // //   const navigate = useNavigate();
// // //   const { toast } = useToast();
// // //   const [payment, setPayment] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [refunding, setRefunding] = useState(false);

// // //   useEffect(() => {
// // //     const fetchPaymentDetails = async () => {
// // //       try {
// // //         const {
// // //           data: { session },
// // //         } = await supabase.auth.getSession();
// // //         if (!session) {
// // //           toast({
// // //             title: "Authentication required",
// // //             description: "Please log in to view payment details",
// // //             variant: "destructive",
// // //           });
// // //           navigate("/login");
// // //           return;
// // //         }

// // //         // Fetch payment details
// // //         const { data, error } = await supabase
// // //           .from("payments")
// // //           .select(
// // //             `
// // //             *,
// // //             seminar:seminars(*),
// // //             course:courses(*)
// // //           `
// // //           )
// // //           .eq("id", paymentId)
// // //           .eq("user_id", session.user.id)
// // //           .single();

// // //         if (error) throw error;

// // //         if (!data) {
// // //           toast({
// // //             title: "Payment not found",
// // //             description: "The requested payment does not exist",
// // //             variant: "destructive",
// // //           });
// // //           navigate("/payments");
// // //           return;
// // //         }

// // //         setPayment(data);
// // //       } catch (error) {
// // //         console.error("Error fetching payment details:", error);
// // //         toast({
// // //           title: "Error",
// // //           description: "Failed to load payment details",
// // //           variant: "destructive",
// // //         });
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchPaymentDetails();
// // //   }, [paymentId, navigate, toast]);

// // //   const handleRefund = async () => {
// // //     if (!payment) return;

// // //     try {
// // //       setRefunding(true);

// // //       // Call your refund endpoint
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();

// // //       const response = await fetch(
// // //         `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-refund`,
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             Authorization: `Bearer ${session.access_token}`,
// // //           },
// // //           body: JSON.stringify({
// // //             payment_id: paymentId,
// // //             amount: payment.amount,
// // //           }),
// // //         }
// // //       );

// // //       if (!response.ok) {
// // //         throw new Error("Refund request failed");
// // //       }

// // //       const result = await response.json();

// // //       if (result.success) {
// // //         // Update local state
// // //         setPayment({ ...payment, status: "refunded" });

// // //         toast({
// // //           title: "Refund processed",
// // //           description: "Your refund has been successfully processed",
// // //         });
// // //       } else {
// // //         throw new Error(result.message || "Refund failed");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error processing refund:", error);
// // //       toast({
// // //         title: "Refund failed",
// // //         description: error.message || "Could not process refund",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setRefunding(false);
// // //     }
// // //   };

// // //   const formatDate = (dateString) => {
// // //     return new Date(dateString).toLocaleDateString("en-US", {
// // //       year: "numeric",
// // //       month: "long",
// // //       day: "numeric",
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //     });
// // //   };

// // //   const formatAmount = (amount) => {
// // //     return new Intl.NumberFormat("en-US", {
// // //       style: "currency",
// // //       currency: "USD",
// // //     }).format(amount / 100);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-screen">
// // //         <Loader2 className="h-8 w-8 animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   if (!payment) {
// // //     return (
// // //       <div className="container mx-auto px-4 py-8">
// // //         <div className="text-center">
// // //           <h1 className="text-2xl font-bold mb-4">Payment Not Found</h1>
// // //           <Button onClick={() => navigate("/payments")}>
// // //             Back to Payments
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="container mx-auto px-4 py-8 max-w-4xl">
// // //       <div className="flex items-center mb-6">
// // //         <Button variant="outline" onClick={() => navigate(-1)} className="mr-4">
// // //           <ArrowLeft className="h-4 w-4 mr-2" />
// // //           Back
// // //         </Button>
// // //         <h1 className="text-3xl font-bold">Payment Details</h1>
// // //       </div>

// // //       <Card className="mb-6">
// // //         <CardHeader>
// // //           <div className="flex justify-between items-center">
// // //             <CardTitle>Payment Information</CardTitle>
// // //             <Badge
// // //               variant={
// // //                 payment.status === "succeeded"
// // //                   ? "default"
// // //                   : payment.status === "refunded"
// // //                   ? "secondary"
// // //                   : "destructive"
// // //               }
// // //               className={
// // //                 payment.status === "succeeded"
// // //                   ? "bg-green-100 text-green-800"
// // //                   : payment.status === "refunded"
// // //                   ? "bg-gray-100 text-gray-800"
// // //                   : "bg-red-100 text-red-800"
// // //               }
// // //             >
// // //               {payment.status === "succeeded" && (
// // //                 <CheckCircle className="h-3 w-3 mr-1" />
// // //               )}
// // //               {payment.status === "refunded" && (
// // //                 <XCircle className="h-3 w-3 mr-1" />
// // //               )}
// // //               {payment.status?.charAt(0).toUpperCase() +
// // //                 payment.status?.slice(1)}
// // //             </Badge>
// // //           </div>
// // //         </CardHeader>
// // //         <CardContent className="space-y-4">
// // //           <div className="grid md:grid-cols-2 gap-4">
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Payment ID</p>
// // //               <p className="font-mono">{payment.id}</p>
// // //             </div>
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Stripe ID</p>
// // //               <p className="font-mono">{payment.stripe_payment_id || "N/A"}</p>
// // //             </div>
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Amount</p>
// // //               <p className="text-lg font-semibold">
// // //                 {formatAmount(payment.amount)}
// // //               </p>
// // //             </div>
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Date</p>
// // //               <p>{formatDate(payment.created_at)}</p>
// // //             </div>
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">
// // //                 Payment Method
// // //               </p>
// // //               <p>{payment.payment_method || "Card"}</p>
// // //             </div>
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Currency</p>
// // //               <p>{payment.currency?.toUpperCase() || "USD"}</p>
// // //             </div>
// // //           </div>
// // //         </CardContent>
// // //       </Card>

// // //       <Card className="mb-6">
// // //         <CardHeader>
// // //           <CardTitle>Product Information</CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           {payment.seminar ? (
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Product Type</p>
// // //               <p className="font-semibold">Seminar</p>

// // //               <p className="text-sm font-medium text-gray-500 mt-2">
// // //                 Seminar Title
// // //               </p>
// // //               <p>{payment.seminar.topic}</p>

// // //               <p className="text-sm font-medium text-gray-500 mt-2">Host</p>
// // //               <p>{payment.seminar.host_name}</p>

// // //               <p className="text-sm font-medium text-gray-500 mt-2">
// // //                 Date & Time
// // //               </p>
// // //               <p>
// // //                 {payment.seminar.date && formatDate(payment.seminar.date)}
// // //                 {payment.seminar.time && ` at ${payment.seminar.time}`}
// // //               </p>
// // //             </div>
// // //           ) : payment.course ? (
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Product Type</p>
// // //               <p className="font-semibold">Course</p>

// // //               <p className="text-sm font-medium text-gray-500 mt-2">
// // //                 Course Title
// // //               </p>
// // //               <p>{payment.course.title}</p>

// // //               <p className="text-sm font-medium text-gray-500 mt-2">
// // //                 Instructor
// // //               </p>
// // //               <p>{payment.course.instructor_name || "N/A"}</p>
// // //             </div>
// // //           ) : (
// // //             <p>Product information not available</p>
// // //           )}
// // //         </CardContent>
// // //       </Card>

// // //       {payment.status === "succeeded" && (
// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Refund</CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <p className="text-sm text-gray-600 mb-4">
// // //               If you're not satisfied with your purchase, you can request a
// // //               refund. Refunds are typically processed within 5-7 business days.
// // //             </p>
// // //             <Button
// // //               variant="outline"
// // //               onClick={handleRefund}
// // //               disabled={refunding}
// // //             >
// // //               {refunding ? (
// // //                 <>
// // //                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// // //                   Processing Refund...
// // //                 </>
// // //               ) : (
// // //                 "Request Refund"
// // //               )}
// // //             </Button>
// // //           </CardContent>
// // //         </Card>
// // //       )}

// // //       {payment.status === "refunded" && (
// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Refund Information</CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <p className="text-sm text-gray-600">
// // //               This payment has been refunded. The amount should appear on your
// // //               original payment method within 5-10 business days.
// // //             </p>
// // //           </CardContent>
// // //         </Card>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default EnrollmentButton;

// // // import React, { useState, useEffect } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Loader2, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
// // // import { supabase } from "@/integrations/supabase/client";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { EnrollmentButtonProps } from "./EnrollmentButtonProps ";

// // // interface Payment {
// // //   id: string;
// // //   status: string;
// // //   amount: number;
// // //   created_at: string;
// // //   stripe_payment_id?: string;
// // //   payment_method?: string;
// // //   currency?: string;
// // //   seminar?: {
// // //     topic: string;
// // //     host_name: string;
// // //     date?: string;
// // //     time?: string;
// // //   };
// // //   course?: {
// // //     title: string;
// // //     instructor_name?: string;
// // //   };
// // // }



// // // const EnrollmentButton: React.FC<EnrollmentButtonProps> = ({
// // //   seminarId,
// // //   courseId,
// // //   isEnrolled,
// // //   isPaid,
// // //   price,
// // //   onEnrollmentChange,
// // // }) => {
// // //   // const EnrollmentButton = () => {
// // //   const { paymentId } = useParams<{ paymentId: string }>();
// // //   const navigate = useNavigate();
// // //   const { toast } = useToast();
// // //   const [payment, setPayment] = useState<Payment | null>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [refunding, setRefunding] = useState(false);

// // //   useEffect(() => {
// // //     const fetchPaymentDetails = async () => {
// // //       try {
// // //         const {
// // //           data: { session },
// // //         } = await supabase.auth.getSession();
// // //         if (!session) {
// // //           toast({
// // //             title: "Authentication required",
// // //             description: "Please log in to view payment details",
// // //             variant: "destructive",
// // //           });
// // //           navigate("/login");
// // //           return;
// // //         }

// // //         // Fetch payment details
// // //         const { data, error } = await supabase
// // //           .from("payments")
// // //           .select(
// // //             `
// // //             *,
// // //             seminar:seminars(*),
// // //             course:courses(*)
// // //           `
// // //           )
// // //           .eq("id", paymentId)
// // //           .eq("user_id", session.user.id)
// // //           .single();

// // //         if (error) throw error;

// // //         if (!data) {
// // //           toast({
// // //             title: "Payment not found",
// // //             description: "The requested payment does not exist",
// // //             variant: "destructive",
// // //           });
// // //           navigate("/payments");
// // //           return;
// // //         }

// // //         setPayment(data as Payment);
// // //       } catch (error) {
// // //         console.error("Error fetching payment details:", error);
// // //         toast({
// // //           title: "Error",
// // //           description: "Failed to load payment details",
// // //           variant: "destructive",
// // //         });
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     if (paymentId) {
// // //       fetchPaymentDetails();
// // //     }
// // //   }, [paymentId, navigate, toast]);

// // //   const handleRefund = async () => {
// // //     if (!payment) return;

// // //     try {
// // //       setRefunding(true);

// // //       // Call your refund endpoint
// // //       const {
// // //         data: { session },
// // //       } = await supabase.auth.getSession();

// // //       if (!session) {
// // //         toast({
// // //           title: "Authentication required",
// // //           description: "Please log in to process refund",
// // //           variant: "destructive",
// // //         });
// // //         return;
// // //       }

// // //       const response = await fetch(
// // //         `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/`,
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             Authorization: `Bearer ${session.access_token}`,
// // //           },
// // //           body: JSON.stringify({
// // //             payment_id: paymentId,
// // //             amount: payment.amount,
// // //           }),
// // //         }
// // //       );

// // //       if (!response.ok) {
// // //         throw new Error("Refund request failed");
// // //       }

// // //       const result = await response.json();

// // //       if (result.success) {
// // //         // Update local state
// // //         setPayment({ ...payment, status: "refunded" });

// // //         toast({
// // //           title: "Refund processed",
// // //           description: "Your refund has been successfully processed",
// // //         });
// // //       } else {
// // //         throw new Error(result.message || "Refund failed");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error processing refund:", error);
// // //       toast({
// // //         title: "Refund failed",
// // //         description:
// // //           error instanceof Error ? error.message : "Could not process refund",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setRefunding(false);
// // //     }
// // //   };

// // //   const formatDate = (dateString: string) => {
// // //     return new Date(dateString).toLocaleDateString("en-US", {
// // //       year: "numeric",
// // //       month: "long",
// // //       day: "numeric",
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //     });
// // //   };

// // //   const formatAmount = (amount: number) => {
// // //     return new Intl.NumberFormat("en-US", {
// // //       style: "currency",
// // //       currency: "USD",
// // //     }).format(amount / 100);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-screen">
// // //         <Loader2 className="h-8 w-8 animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   if (!payment) {
// // //     return (
// // //       <div className="container mx-auto px-4 py-8">
// // //         <div className="text-center">
// // //           <h1 className="text-2xl font-bold mb-4">Payment Not Found</h1>
// // //           <Button onClick={() => navigate("/payments")}>
// // //             Back to Payments
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="container mx-auto px-4 py-8 max-w-4xl">
// // //       <div className="flex items-center mb-6">
// // //         <Button variant="outline" onClick={() => navigate(-1)} className="mr-4">
// // //           <ArrowLeft className="h-4 w-4 mr-2" />
// // //           Back
// // //         </Button>
// // //         <h1 className="text-3xl font-bold">Payment Details</h1>
// // //       </div>

// // //       <Card className="mb-6">
// // //         <CardHeader>
// // //           <div className="flex justify-between items-center">
// // //             <CardTitle>Payment Information</CardTitle>
// // //             <Badge
// // //               variant={
// // //                 payment.status === "succeeded"
// // //                   ? "default"
// // //                   : payment.status === "refunded"
// // //                   ? "secondary"
// // //                   : "destructive"
// // //               }
// // //               className={
// // //                 payment.status === "succeeded"
// // //                   ? "bg-green-100 text-green-800"
// // //                   : payment.status === "refunded"
// // //                   ? "bg-gray-100 text-gray-800"
// // //                   : "bg-red-100 text-red-800"
// // //               }
// // //             >
// // //               {payment.status === "succeeded" && (
// // //                 <CheckCircle className="h-3 w-3 mr-1" />
// // //               )}
// // //               {payment.status === "refunded" && (
// // //                 <XCircle className="h-3 w-3 mr-1" />
// // //               )}
// // //               {payment.status?.charAt(0).toUpperCase() +
// // //                 payment.status?.slice(1)}
// // //             </Badge>
// // //           </div>
// // //         </CardHeader>
// // //         <CardContent className="space-y-4">
// // //           <div className="grid md:grid-cols-2 gap-4">
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Payment ID</p>
// // //               <p className="font-mono">{payment.id}</p>
// // //             </div>
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Stripe ID</p>
// // //               <p className="font-mono">{payment.stripe_payment_id || "N/A"}</p>
// // //             </div>
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Amount</p>
// // //               <p className="text-lg font-semibold">
// // //                 {formatAmount(payment.amount)}
// // //               </p>
// // //             </div>
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Date</p>
// // //               <p>{formatDate(payment.created_at)}</p>
// // //             </div>
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">
// // //                 Payment Method
// // //               </p>
// // //               <p>{payment.payment_method || "Card"}</p>
// // //             </div>
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Currency</p>
// // //               <p>{payment.currency?.toUpperCase() || "USD"}</p>
// // //             </div>
// // //           </div>
// // //         </CardContent>
// // //       </Card>

// // //       <Card className="mb-6">
// // //         <CardHeader>
// // //           <CardTitle>Product Information</CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           {payment.seminar ? (
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Product Type</p>
// // //               <p className="font-semibold">Seminar</p>

// // //               <p className="text-sm font-medium text-gray-500 mt-2">
// // //                 Seminar Title
// // //               </p>
// // //               <p>{payment.seminar.topic}</p>

// // //               <p className="text-sm font-medium text-gray-500 mt-2">Host</p>
// // //               <p>{payment.seminar.host_name}</p>

// // //               <p className="text-sm font-medium text-gray-500 mt-2">
// // //                 Date & Time
// // //               </p>
// // //               <p>
// // //                 {payment.seminar.date && formatDate(payment.seminar.date)}
// // //                 {payment.seminar.time && ` at ${payment.seminar.time}`}
// // //               </p>
// // //             </div>
// // //           ) : payment.course ? (
// // //             <div>
// // //               <p className="text-sm font-medium text-gray-500">Product Type</p>
// // //               <p className="font-semibold">Course</p>

// // //               <p className="text-sm font-medium text-gray-500 mt-2">
// // //                 Course Title
// // //               </p>
// // //               <p>{payment.course.title}</p>

// // //               <p className="text-sm font-medium text-gray-500 mt-2">
// // //                 Instructor
// // //               </p>
// // //               <p>{payment.course.instructor_name || "N/A"}</p>
// // //             </div>
// // //           ) : (
// // //             <p>Product information not available</p>
// // //           )}
// // //         </CardContent>
// // //       </Card>

// // //       {payment.status === "succeeded" && (
// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Refund</CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <p className="text-sm text-gray-600 mb-4">
// // //               If you're not satisfied with your purchase, you can request a
// // //               refund. Refunds are typically processed within 5-7 business days.
// // //             </p>
// // //             <Button
// // //               variant="outline"
// // //               onClick={handleRefund}
// // //               disabled={refunding}
// // //             >
// // //               {refunding ? (
// // //                 <>
// // //                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// // //                   Processing Refund...
// // //                 </>
// // //               ) : (
// // //                 "Request Refund"
// // //               )}
// // //             </Button>
// // //           </CardContent>
// // //         </Card>
// // //       )}

// // //       {payment.status === "refunded" && (
// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Refund Information</CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <p className="text-sm text-gray-600">
// // //               This payment has been refunded. The amount should appear on your
// // //               original payment method within 5-10 business days.
// // //             </p>
// // //           </CardContent>
// // //         </Card>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default EnrollmentButton;

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/integrations/supabase/client";
// import { Loader2, CreditCard, CheckCircle } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { mixpanelInstance } from "@/utils/mixpanel";
// import { loadStripe } from "@stripe/stripe-js";
// import { PaymentMethodSelector } from "./PaymentMethodSelector";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// interface Props {
//   productType?: string;
//   seminarId: string;
//   isEnrolled: boolean;
//   isPaid: boolean;
//   price: number;
//   productName: string;
//   onEnrollmentChange: () => void;
// }

// type PaymentMethod = "stripe" | "free";

// export const EnrollmentButton = ({
//   seminarId,
//   isEnrolled,
//   productType,
//   productName,
//   isPaid,
//   price,
//   onEnrollmentChange,
// }: Props) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPaymentMethods, setShowPaymentMethods] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const { toast } = useToast();

//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const paymentStatus = queryParams.get("payment");
//     const sessionId = queryParams.get("session_id");

//     if (paymentStatus === "success" && sessionId) {
//       handlePaymentSuccess(sessionId);
//     }
//   }, []);

//   const enrollUser = async (
//     paymentMethod: PaymentMethod,
//     amount: number = 0
//   ) => {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     if (!session) throw new Error("Please log in to enroll");

//     const { error } = await supabase.from("seminer").insert({
//       user_id: session.user.id,
//       seminer_id: seminarId,
//       payment_status: paymentMethod === "free" ? "free" : "paid",
//       amount,
//       currency: "INR",
//       payment_method: paymentMethod,
//       enrolled_at: new Date().toISOString(),
//     });

//     if (error) throw new Error(`Failed to enroll: ${error.message}`);
//   };

//   const handleFreeEnrollment = async () => {
//     setIsLoading(true);
//     try {
//       await enrollUser("free");
//       toast({
//         title: "🎉 Enrollment Successful!",
//         description: "You've been enrolled in this free course!",
//       });
//       setPaymentSuccess(true);
//       onEnrollmentChange();
//     } catch (error: any) {
//       toast({
//         title: "Enrollment Failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePaymentSuccess = async (sessionId: string) => {
//     setIsLoading(true);
//     try {
//       const { data, error } = await supabase.functions.invoke(
//         "verify-payment",
//         {
//           body: { sessionId },
//         }
//       );

//       if (error) throw error;

//       if (data?.enrolled) {
//         setPaymentSuccess(true);
//         onEnrollmentChange();
//         toast({
//           title: "Payment Successful!",
//           description: "You've been enrolled in the course!",
//         });
//         window.history.replaceState({}, "", window.location.pathname);
//       }
//     } catch (error: any) {
//       toast({
//         title: "Payment Verification Failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePaidEnrollment = async () => {
//     setIsLoading(true);
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       if (!session) throw new Error("Please log in to enroll");

//       // Validate seminarId is not empty
//       // if (!seminarId || seminarId.trim() === "") {
//       //   throw new Error("Seminar ID is missing. Please try again.");
//       // }
// if (
//   !seminarId ||
//   seminarId.trim() === "" ||
//   !session.user.id ||
//   session.user.id.trim() === ""
// ) {
//   throw new Error("Seminar ID or User ID is missing. Please try again.");
// }
//       console.log("Creating Stripe session for seminar:", seminarId);

//       // Create a Stripe checkout session
//       const response = await fetch(
//         "https://rxyfrjfgydldjdqelixe.supabase.co/functions/v1/create-stripe-session",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${
//               (
//                 await supabase.auth.getSession()
//               ).data.session?.access_token
//             }`,
//           },
//           body: JSON.stringify({
//             productType: productType, // FIXED: Changed from "seminer" to "seminar"
//             productId: seminarId,
//             productName:productName,
//             price: Math.round(price * 100),
//             userId: session.user.id,
//             // userEmail: session.user.email,
//             currency: "INR",
//             // successUrl: `${window.location.origin}/seminar/${seminarId}?payment=success&session_id={VITE_STRIPE_PUBLIC_KEY}`,
//             successUrl: `${window.location.origin}/seminar/${seminarId}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
//             cancelUrl: `${window.location.origin}/seminar/${seminarId}?payment=cancel`,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("Stripe session creation failed:", errorText);

//         let errorMessage = "Failed to create payment session";
//         try {
//           const errorData = JSON.parse(errorText);
//           errorMessage = errorData.error || errorData.message || errorMessage;
//         } catch (e) {
//           errorMessage = errorText || errorMessage;
//         }

//         throw new Error(errorMessage);
//       }

//       const checkoutSession = await response.json();
//       console.log("Checkout session created:", checkoutSession);

//       const stripe = await stripePromise;
//       if (!stripe) throw new Error("Stripe failed to load");

//       const { error: stripeError } = await stripe.redirectToCheckout({
//         sessionId: checkoutSession.id,
//       });

//       if (stripeError) {
//         throw new Error(stripeError.message);
//       }
//     } catch (error: any) {
//       console.error("Payment process error:", error);
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
//         <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
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
//           ) : isPaid ? (
//             <>
//               <CreditCard className="mr-2 h-4 w-4" />
//               {`Enroll for ₹${price.toFixed(2)}`}
//             </>
//           ) : (
//             <>
//               <CheckCircle className="mr-2 h-4 w-4" />
//               Enroll for Free
//             </>
//           )}
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             {isPaid ? "Complete Your Enrollment" : "Confirm Free Enrollment"}
//           </DialogTitle>
//           <DialogDescription>
//             {isPaid
//               ? `Please pay ₹${price.toFixed(2)} to enroll in this course`
//               : "You're about to enroll in this free course"}
//           </DialogDescription>
//         </DialogHeader>
//         {isPaid ? (
//           <PaymentMethodSelector
//             onPaymentMethodSelect={handlePaidEnrollment}
//             isLoading={isLoading}
//             price={price}
//           />
//         ) : (
//           <div className="flex flex-col gap-4">
//             <div className="bg-green-50 p-4 rounded-lg border border-green-100">
//               <h4 className="font-medium text-green-800">
//                 Free Enrollment Confirmation
//               </h4>
//               <p className="text-sm text-green-600 mt-1">
//                 You will get immediate access to all course materials.
//               </p>
//             </div>
//             <div className="flex justify-end gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowPaymentMethods(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={() => {
//                   mixpanelInstance.track(
//                     "Confirm Free Enrollment view elearning Button Clicked",
//                     {
//                       timestamp: new Date().toISOString(),
//                     }
//                   );
//                   handleFreeEnrollment();
//                 }}
//                 disabled={isLoading}
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing...
//                   </>
//                 ) : (
//                   "Confirm Free Enrollment"
//                 )}
//               </Button>
//             </div>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EnrollmentButton;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CreditCard, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { mixpanelInstance } from "@/utils/mixpanel";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentMethodSelector } from "./PaymentMethodSelector";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface Props {
  productType: "course" | "seminar";
  productId: string;
  isEnrolled: boolean;
  courseId?: string;
  seminarId?: string;
  isPaid: boolean;
  price: number;
  productName: string;
  onEnrollmentChange: () => void;
  mixpanelInstance?: any;
}

type PaymentMethod = "stripe" | "free";

export const EnrollmentButton = ({
  productType,
  productId,
  courseId,
  seminarId,
  isEnrolled,
  productName,
  isPaid,
  price,
  onEnrollmentChange,
  mixpanelInstance,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paymentStatus = queryParams.get("payment");
    const sessionId = queryParams.get("session_id");

    if (paymentStatus === "success" && sessionId) {
      handlePaymentSuccess(sessionId);
    }
  }, []);

  const trackEvent = (eventName: string, additionalProperties: any = {}) => {
    mixpanelInstance.track(eventName, {
      productType,
      productName,
      productId,
      price: isPaid ? price : 0,
      isPaid,
      ...additionalProperties,
      timestamp: new Date().toISOString(),
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

    // Determine the table name and column names based on product type
    const tableName =
      productType === "course" ? "course_enrollments" : "seminar_registrations";
    const idColumn = productType === "course" ? "course_id" : "seminar_id";
    const paymentStatusColumn =
      productType === "course" ? "payment_status" : "payment_status";

    const { error } = await supabase.from(tableName).insert({
      user_id: session.user.id,
      [idColumn]: productId,
      [paymentStatusColumn]: paymentMethod === "free" ? "free" : "paid",
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
        description: `You've been enrolled in this ${productType}!`,
      });
      setPaymentSuccess(true);
      onEnrollmentChange();
      mixpanelInstance?.track("Register Successful", {
        productType,
        productName,
        productId,
        price: 0,
        status: "success",
        timestamp: new Date().toISOString(),
      });
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

  const handlePaymentSuccess = async (sessionId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "verify-payment",
        {
          body: { sessionId },
        }
      );

      if (error) throw error;

      if (data?.enrolled) {
        setPaymentSuccess(true);
        onEnrollmentChange();
        mixpanelInstance?.track("Regiater Successful", {
        productType,
        productName,
        productId,
        price: isPaid ? price : 0,
        status: "success",
        timestamp: new Date().toISOString(),
      });
        toast({
          title: "Payment Successful!",
          description: `You've been enrolled in the ${productType}!`,
        });
        window.history.replaceState({}, "", window.location.pathname);
      }
    } catch (error: any) {
      toast({
        title: "Payment Verification Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaidEnrollment = async () => {
    setIsLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Please log in to enroll");

      // Validate productId and userId
      if (
        !productId ||
        productId.trim() === "" ||
        !session.user.id ||
        session.user.id.trim() === ""
      ) {
        throw new Error("Product ID or User ID is missing. Please try again.");
      }

      console.log(`Creating Stripe session for ${productType}:`, productId);

      // Create a Stripe checkout session
      const response = await fetch(
        "https://rxyfrjfgydldjdqelixe.supabase.co/functions/v1/create-stripe-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              (
                await supabase.auth.getSession()
              ).data.session?.access_token
            }`,
          },
          body: JSON.stringify({
            productType: productType,
            productId: productId,
            productName: productName,
            price: Math.round(price * 100),
            userId: session.user.id,
            currency: "INR",
            successUrl: `${window.location.origin}/${productType}/${productId}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}/${productType}/${productId}?payment=cancel&session_id={CHECKOUT_SESSION_ID}`,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Stripe session creation failed:", errorText);

        let errorMessage = "Failed to create payment session";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const checkoutSession = await response.json();
      console.log("Checkout session created:", checkoutSession);

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (error: any) {
      console.error("Payment process error:", error);
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
          // onClick={() => {
          //   // ✅ Track button click in Mixpanel
          //   mixpanelInstance.track("Seminar Enroll First Button Clicked", {
          //     price: isPaid ? price : 0,
          //     isPaid: isPaid,
          //     user_id: supabase.auth.getUser().then((res) => res.data.user?.id), // optional: attach user id
          //     timestamp: new Date().toISOString(),
          //   });
          // }}
          onClick={() => {
            // Track button click in Mixpanel
            const eventName =
              productType === "course"
                ? "Course Enroll First Button Clicked"
                : "Seminar Enroll First Button Clicked";
              
            trackEvent(eventName, { action: "first_click" });
          }}
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
              {`Enroll for ₹${price.toFixed(2)}`}
              {/* {`Enroll for ₹${price.toFixed(2)}`} */}
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
              ? `Please pay ₹${price.toFixed(
                  2
                )} to enroll in this ${productType}`
              : `You're about to enroll in this free ${productType}`}
          </DialogDescription>
        </DialogHeader>
        {isPaid ? (
          <PaymentMethodSelector
            onPaymentMethodSelect={handlePaidEnrollment}
            isLoading={isLoading}
            price={price}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800">
                Free Enrollment Confirmation
              </h4>
              <p className="text-sm text-green-600 mt-1">
                You will get immediate access to all {productType} materials.
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
                onClick={() => {
                  mixpanelInstance.track(
                    `Confirm Free Enrollment view ${productType} Button Clicked`,
                    {
                      timestamp: new Date().toISOString(),
                    }
                  );
                  handleFreeEnrollment();
                }}
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