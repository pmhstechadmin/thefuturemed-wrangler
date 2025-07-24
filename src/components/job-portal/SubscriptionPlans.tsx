// // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // // import { Check, Crown, Zap } from "lucide-react";

// // // // // // // // interface SubscriptionPlan {
// // // // // // // //   id: string;
// // // // // // // //   name: string;
// // // // // // // //   description: string;
// // // // // // // //   price: number;
// // // // // // // //   currency: string;
// // // // // // // //   billing_cycle: string;
// // // // // // // //   features: string[];
// // // // // // // //   active: boolean;
// // // // // // // //   created_at: string;
// // // // // // // // }

// // // // // // // // export const SubscriptionPlans = () => {
// // // // // // // //   const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [subscribing, setSubscribing] = useState<string | null>(null);
// // // // // // // //   const { toast } = useToast();

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchPlans();
// // // // // // // //   }, []);

// // // // // // // //   const fetchPlans = async () => {
// // // // // // // //     try {
// // // // // // // //       const { data, error } = await supabase
// // // // // // // //         .from('subscription_plans')
// // // // // // // //         .select('*')
// // // // // // // //         .eq('active', true)
// // // // // // // //         .order('price', { ascending: true });

// // // // // // // //       if (error) throw error;

// // // // // // // //       // Parse features as string array
// // // // // // // //       const parsedPlans = (data || []).map(plan => ({
// // // // // // // //         ...plan,
// // // // // // // //         features: Array.isArray(plan.features) ? plan.features :
// // // // // // // //                   typeof plan.features === 'string' ? JSON.parse(plan.features) : []
// // // // // // // //       })) as SubscriptionPlan[];

// // // // // // // //       setPlans(parsedPlans);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error fetching plans:', error);
// // // // // // // //       toast({
// // // // // // // //         title: "Error",
// // // // // // // //         description: "Failed to load subscription plans.",
// // // // // // // //         variant: "destructive",
// // // // // // // //       });
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSubscribe = async (planId: string) => {
// // // // // // // //     try {
// // // // // // // //       setSubscribing(planId);

// // // // // // // //       const { data: { user } } = await supabase.auth.getUser();
// // // // // // // //       if (!user) {
// // // // // // // //         toast({
// // // // // // // //           title: "Authentication Required",
// // // // // // // //           description: "Please sign in to subscribe to a plan.",
// // // // // // // //           variant: "destructive",
// // // // // // // //         });
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       // Call edge function to create subscription
// // // // // // // //       const { data, error } = await supabase.functions.invoke('create-subscription', {
// // // // // // // //         body: { planId, userId: user.id }
// // // // // // // //       });

// // // // // // // //       if (error) throw error;

// // // // // // // //       if (data.success) {
// // // // // // // //         // In a real implementation, redirect to Stripe checkout
// // // // // // // //         // For demo, just show success message
// // // // // // // //         toast({
// // // // // // // //           title: "Subscription Created",
// // // // // // // //           description: "Your subscription has been activated successfully!",
// // // // // // // //         });

// // // // // // // //         // Simulate redirect to payment
// // // // // // // //         window.location.href = data.url;
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error creating subscription:', error);
// // // // // // // //       toast({
// // // // // // // //         title: "Error",
// // // // // // // //         description: "Failed to create subscription. Please try again.",
// // // // // // // //         variant: "destructive",
// // // // // // // //       });
// // // // // // // //     } finally {
// // // // // // // //       setSubscribing(null);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const getBillingCycleDisplay = (cycle: string) => {
// // // // // // // //     switch (cycle) {
// // // // // // // //       case 'monthly': return '/month';
// // // // // // // //       case 'quarterly': return '/3 months';
// // // // // // // //       case 'annually': return '/year';
// // // // // // // //       default: return `/${cycle}`;
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const getPlanIcon = (planName: string) => {
// // // // // // // //     if (planName.toLowerCase().includes('premium')) {
// // // // // // // //       return <Crown className="h-5 w-5 text-yellow-500" />;
// // // // // // // //     }
// // // // // // // //     return <Zap className="h-5 w-5 text-blue-500" />;
// // // // // // // //   };

// // // // // // // //   if (loading) {
// // // // // // // //     return <div className="text-center py-8">Loading subscription plans...</div>;
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="space-y-6">
// // // // // // // //       <div className="text-center">
// // // // // // // //         <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
// // // // // // // //         <p className="text-gray-600 max-w-2xl mx-auto">
// // // // // // // //           Subscribe to access job seeker profiles and contact information. Choose the plan that best fits your hiring needs.
// // // // // // // //         </p>
// // // // // // // //       </div>

// // // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // //         {plans.map((plan) => (
// // // // // // // //           <Card key={plan.id} className={`relative hover:shadow-lg transition-shadow ${
// // // // // // // //             plan.name.toLowerCase().includes('premium') ? 'border-yellow-200 bg-yellow-50' : ''
// // // // // // // //           }`}>
// // // // // // // //             {plan.name.toLowerCase().includes('premium') && (
// // // // // // // //               <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
// // // // // // // //                 Most Popular
// // // // // // // //               </Badge>
// // // // // // // //             )}

// // // // // // // //             <CardHeader className="text-center">
// // // // // // // //               <div className="flex justify-center mb-2">
// // // // // // // //                 {getPlanIcon(plan.name)}
// // // // // // // //               </div>
// // // // // // // //               <CardTitle className="text-xl">{plan.name}</CardTitle>
// // // // // // // //               <CardDescription>{plan.description}</CardDescription>
// // // // // // // //               <div className="mt-4">
// // // // // // // //                 <span className="text-3xl font-bold">${plan.price}</span>
// // // // // // // //                 <span className="text-gray-500">{getBillingCycleDisplay(plan.billing_cycle)}</span>
// // // // // // // //               </div>
// // // // // // // //             </CardHeader>

// // // // // // // //             <CardContent>
// // // // // // // //               <ul className="space-y-2">
// // // // // // // //                 {plan.features.map((feature, index) => (
// // // // // // // //                   <li key={index} className="flex items-center gap-2">
// // // // // // // //                     <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
// // // // // // // //                     <span className="text-sm">{feature}</span>
// // // // // // // //                   </li>
// // // // // // // //                 ))}
// // // // // // // //               </ul>
// // // // // // // //             </CardContent>

// // // // // // // //             <CardFooter>
// // // // // // // //               <Button
// // // // // // // //                 className="w-full"
// // // // // // // //                 onClick={() => handleSubscribe(plan.id)}
// // // // // // // //                 disabled={subscribing === plan.id}
// // // // // // // //                 variant={plan.name.toLowerCase().includes('premium') ? 'default' : 'outline'}
// // // // // // // //               >
// // // // // // // //                 {subscribing === plan.id ? 'Processing...' : 'Subscribe Now'}
// // // // // // // //               </Button>
// // // // // // // //             </CardFooter>
// // // // // // // //           </Card>
// // // // // // // //         ))}
// // // // // // // //       </div>

// // // // // // // //       <div className="text-center text-sm text-gray-500">
// // // // // // // //         <p>All plans include access to our secure platform and customer support.</p>
// // // // // // // //         <p>You can cancel your subscription at any time.</p>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // "use client";

// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import {
// // // // // // //   Card,
// // // // // // //   CardContent,
// // // // // // //   CardDescription,
// // // // // // //   CardFooter,
// // // // // // //   CardHeader,
// // // // // // //   CardTitle,
// // // // // // // } from "@/components/ui/card";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // // import { createClient } from "@supabase/supabase-js";
// // // // // // // import { Check, Crown, Zap, Loader2 } from "lucide-react";
// // // // // // // import { supabase } from "@/integrations/supabase/client";

// // // // // // // // Razorpay type declaration
// // // // // // // declare global {
// // // // // // //   interface Window {
// // // // // // //     Razorpay: any;
// // // // // // //   }
// // // // // // // }

// // // // // // // interface SubscriptionPlan {
// // // // // // //   id: string;
// // // // // // //   name: string;
// // // // // // //   description: string;
// // // // // // //   price: number;
// // // // // // //   currency: string;
// // // // // // //   billing_cycle: string;
// // // // // // //   features: string[];
// // // // // // //   active: boolean;
// // // // // // //   created_at: string;
// // // // // // // }

// // // // // // // export const SubscriptionPlans = () => {
// // // // // // //   const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [subscribing, setSubscribing] = useState<string | null>(null);
// // // // // // //   const { toast } = useToast();

// // // // // // //   useEffect(() => {
// // // // // // //     fetchPlans();
// // // // // // //   }, []);

// // // // // // //   const fetchPlans = async () => {
// // // // // // //     try {
// // // // // // //       const { data, error } = await supabase
// // // // // // //         .from("subscription_plans")
// // // // // // //         .select("*")
// // // // // // //         .eq("active", true)
// // // // // // //         .order("price", { ascending: true });

// // // // // // //       if (error) throw error;

// // // // // // //       const parsedPlans = (data || []).map((plan) => ({
// // // // // // //         ...plan,
// // // // // // //         features: Array.isArray(plan.features)
// // // // // // //           ? plan.features
// // // // // // //           : typeof plan.features === "string"
// // // // // // //           ? JSON.parse(plan.features)
// // // // // // //           : [],
// // // // // // //       })) as SubscriptionPlan[];

// // // // // // //       setPlans(parsedPlans);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error fetching plans:", error);
// // // // // // //       toast({
// // // // // // //         title: "Error",
// // // // // // //         description: "Failed to load subscription plans.",
// // // // // // //         variant: "destructive",
// // // // // // //       });
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

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

// // // // // // //   const handleSubscribe = async (plan: SubscriptionPlan) => {
// // // // // // //     try {
// // // // // // //       setSubscribing(plan.id);

// // // // // // //       const {
// // // // // // //         data: { session },
// // // // // // //       } = await supabase.auth.getSession();
// // // // // // //       if (!session) {
// // // // // // //         throw new Error("Please log in to subscribe");
// // // // // // //       }

// // // // // // //       const userId = session.user.id;

// // // // // // //       const loaded = await loadRazorpayScript();
// // // // // // //       if (!loaded) throw new Error("Failed to load Razorpay");

// // // // // // //       const amountInPaise = plan.price * 100;

// // // // // // //       const { data: order, error: orderError } = await supabase
// // // // // // //         .from("orders")
// // // // // // //         .insert({
// // // // // // //           user_id: userId,
// // // // // // //           amount: amountInPaise,
// // // // // // //           currency: plan.currency,
// // // // // // //           status: "created",
// // // // // // //           payment_method: "razorpay",
// // // // // // //           subscription_plan_id: plan.id,
// // // // // // //         })
// // // // // // //         .select()
// // // // // // //         .single();

// // // // // // //       if (orderError || !order) {
// // // // // // //         throw new Error("Failed to create Razorpay order");
// // // // // // //       }

// // // // // // //       const options = {
// // // // // // //         key: "rzp_test_eK57VjQhXHjIGR", // replace with your real key in production
// // // // // // //         amount: amountInPaise.toString(),
// // // // // // //         currency: plan.currency,
// // // // // // //         name: "TheFutemed",
// // // // // // //         description: `Subscribe to ${plan.name}`,
// // // // // // //         handler: async function (response: any) {
// // // // // // //           try {
// // // // // // //             await supabase
// // // // // // //               .from("orders")
// // // // // // //               .update({
// // // // // // //                 status: "paid",
// // // // // // //                 razorpay_payment_id: response.razorpay_payment_id,
// // // // // // //               })
// // // // // // //               .eq("id", order.id);

// // // // // // //             await supabase.from("provider_subscriptions").insert({
// // // // // // //               provider_id: userId, // You can fetch the provider ID separately
// // // // // // //               plan_id: plan.id,
// // // // // // //               status: "active",
// // // // // // //               payment_status: "paid",
// // // // // // //               start_date: new Date().toISOString(),
// // // // // // //               end_date: null,
// // // // // // //               stripe_customer_id: "razorpay_demo",
// // // // // // //               stripe_subscription_id: `sub_demo_${Date.now()}`,
// // // // // // //             });

// // // // // // //             toast({
// // // // // // //               title: "🎉 Subscription Successful!",
// // // // // // //               description: `You're now subscribed to ${plan.name}`,
// // // // // // //             });
// // // // // // //           } catch (err: any) {
// // // // // // //             toast({
// // // // // // //               title: "Subscription Failed",
// // // // // // //               description: err.message,
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
// // // // // // //           color: "#F59E0B",
// // // // // // //         },
// // // // // // //         modal: {
// // // // // // //           ondismiss: () => {
// // // // // // //             setSubscribing(null);
// // // // // // //             toast({
// // // // // // //               title: "Payment Cancelled",
// // // // // // //               description: "You cancelled the Razorpay flow",
// // // // // // //             });
// // // // // // //           },
// // // // // // //         },
// // // // // // //       };

// // // // // // //       const rzp = new window.Razorpay(options);
// // // // // // //       rzp.on("payment.failed", function (response: any) {
// // // // // // //         toast({
// // // // // // //           title: "Payment Failed",
// // // // // // //           description: response.error.description,
// // // // // // //           variant: "destructive",
// // // // // // //         });
// // // // // // //       });

// // // // // // //       rzp.open();
// // // // // // //     } catch (error: any) {
// // // // // // //       console.error("Subscription error:", error);
// // // // // // //       toast({
// // // // // // //         title: "Payment Error",
// // // // // // //         description: error.message,
// // // // // // //         variant: "destructive",
// // // // // // //       });
// // // // // // //     } finally {
// // // // // // //       setSubscribing(null);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getBillingCycleDisplay = (cycle: string) => {
// // // // // // //     switch (cycle) {
// // // // // // //       case "monthly":
// // // // // // //         return "/month";
// // // // // // //       case "quarterly":
// // // // // // //         return "/3 months";
// // // // // // //       case "annually":
// // // // // // //         return "/year";
// // // // // // //       default:
// // // // // // //         return `/${cycle}`;
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getPlanIcon = (planName: string) => {
// // // // // // //     if (planName.toLowerCase().includes("premium")) {
// // // // // // //       return <Crown className="h-5 w-5 text-yellow-500" />;
// // // // // // //     }
// // // // // // //     return <Zap className="h-5 w-5 text-blue-500" />;
// // // // // // //   };

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="text-center py-8">Loading subscription plans...</div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="space-y-6">
// // // // // // //       <div className="text-center">
// // // // // // //         <h2 className="text-3xl font-bold text-gray-900 mb-4">
// // // // // // //           Choose Your Plan
// // // // // // //         </h2>
// // // // // // //         <p className="text-gray-600 max-w-2xl mx-auto">
// // // // // // //           Subscribe to access job seeker profiles and contact information.
// // // // // // //           Choose the plan that best fits your hiring needs.
// // // // // // //         </p>
// // // // // // //       </div>

// // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // //         {plans.map((plan) => (
// // // // // // //           <Card
// // // // // // //             key={plan.id}
// // // // // // //             className={`relative hover:shadow-lg transition-shadow ${
// // // // // // //               plan.name.toLowerCase().includes("premium")
// // // // // // //                 ? "border-yellow-200 bg-yellow-50"
// // // // // // //                 : ""
// // // // // // //             }`}
// // // // // // //           >
// // // // // // //             {plan.name.toLowerCase().includes("premium") && (
// // // // // // //               <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
// // // // // // //                 Most Popular
// // // // // // //               </Badge>
// // // // // // //             )}

// // // // // // //             <CardHeader className="text-center">
// // // // // // //               <div className="flex justify-center mb-2">
// // // // // // //                 {getPlanIcon(plan.name)}
// // // // // // //               </div>
// // // // // // //               <CardTitle className="text-xl">{plan.name}</CardTitle>
// // // // // // //               <CardDescription>{plan.description}</CardDescription>
// // // // // // //               <div className="mt-4">
// // // // // // //                 <span className="text-3xl font-bold">₹{plan.price}</span>
// // // // // // //                 <span className="text-gray-500">
// // // // // // //                   {getBillingCycleDisplay(plan.billing_cycle)}
// // // // // // //                 </span>
// // // // // // //               </div>
// // // // // // //             </CardHeader>

// // // // // // //             <CardContent>
// // // // // // //               <ul className="space-y-2">
// // // // // // //                 {plan.features.map((feature, index) => (
// // // // // // //                   <li key={index} className="flex items-center gap-2">
// // // // // // //                     <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
// // // // // // //                     <span className="text-sm">{feature}</span>
// // // // // // //                   </li>
// // // // // // //                 ))}
// // // // // // //               </ul>
// // // // // // //             </CardContent>

// // // // // // //             <CardFooter>
// // // // // // //               <Button
// // // // // // //                 className="w-full"
// // // // // // //                 onClick={() => handleSubscribe(plan)}
// // // // // // //                 disabled={subscribing === plan.id}
// // // // // // //               >
// // // // // // //                 {subscribing === plan.id ? (
// // // // // // //                   <>
// // // // // // //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // // // //                     Processing...
// // // // // // //                   </>
// // // // // // //                 ) : (
// // // // // // //                   "Subscribe with Razorpay"
// // // // // // //                 )}
// // // // // // //               </Button>
// // // // // // //             </CardFooter>
// // // // // // //           </Card>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       <div className="text-center text-sm text-gray-500">
// // // // // // //         <p>
// // // // // // //           All plans include access to our secure platform and customer support.
// // // // // // //         </p>
// // // // // // //         <p>You can cancel your subscription at any time.</p>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default SubscriptionPlans;

// // // // // // import { useState, useEffect } from "react";
// // // // // // import {
// // // // // //   Card,
// // // // // //   CardContent,
// // // // // //   CardDescription,
// // // // // //   CardFooter,
// // // // // //   CardHeader,
// // // // // //   CardTitle,
// // // // // // } from "@/components/ui/card";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // import { useToast } from "@/hooks/use-toast";
// // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // import { Check, Crown, Zap, Loader2 } from "lucide-react";

// // // // // // interface SubscriptionPlan {
// // // // // //   id: string;
// // // // // //   name: string;
// // // // // //   description: string;
// // // // // //   price: number;
// // // // // //   currency: string;
// // // // // //   billing_cycle: string;
// // // // // //   features: string[];
// // // // // //   active: boolean;
// // // // // //   created_at: string;
// // // // // // }

// // // // // // declare global {
// // // // // //   interface Window {
// // // // // //     Razorpay: any;
// // // // // //   }
// // // // // // }

// // // // // // export const SubscriptionPlans = () => {
// // // // // //   const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [subscribing, setSubscribing] = useState<string | null>(null);
// // // // // //   const { toast } = useToast();

// // // // // //   useEffect(() => {
// // // // // //     fetchPlans();
// // // // // //   }, []);

// // // // // //   const fetchPlans = async () => {
// // // // // //     try {
// // // // // //       const { data, error } = await supabase
// // // // // //         .from("subscription_plans")
// // // // // //         .select("*")
// // // // // //         .eq("active", true)
// // // // // //         .order("price", { ascending: true });

// // // // // //       if (error) throw error;

// // // // // //       const parsedPlans = (data || []).map((plan) => ({
// // // // // //         ...plan,
// // // // // //         features: Array.isArray(plan.features)
// // // // // //           ? plan.features
// // // // // //           : typeof plan.features === "string"
// // // // // //           ? JSON.parse(plan.features)
// // // // // //           : [],
// // // // // //       })) as SubscriptionPlan[];

// // // // // //       setPlans(parsedPlans);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching plans:", error);
// // // // // //       toast({
// // // // // //         title: "Error",
// // // // // //         description: "Failed to load subscription plans.",
// // // // // //         variant: "destructive",
// // // // // //       });
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const loadRazorpayScript = (): Promise<boolean> => {
// // // // // //     return new Promise((resolve) => {
// // // // // //       if (window.Razorpay) return resolve(true);

// // // // // //       const script = document.createElement("script");
// // // // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // // //       script.onload = () => resolve(true);
// // // // // //       script.onerror = () => resolve(false);
// // // // // //       document.body.appendChild(script);
// // // // // //     });
// // // // // //   };

// // // // // //   const getBillingCycleDisplay = (cycle: string) => {
// // // // // //     switch (cycle) {
// // // // // //       case "monthly":
// // // // // //         return "/month";
// // // // // //       case "quarterly":
// // // // // //         return "/3 months";
// // // // // //       case "annually":
// // // // // //         return "/year";
// // // // // //       default:
// // // // // //         return `/${cycle}`;
// // // // // //     }
// // // // // //   };

// // // // // //   const getPlanIcon = (planName: string) => {
// // // // // //     if (planName.toLowerCase().includes("premium")) {
// // // // // //       return <Crown className="h-5 w-5 text-yellow-500" />;
// // // // // //     }
// // // // // //     return <Zap className="h-5 w-5 text-blue-500" />;
// // // // // //   };

// // // // // //   const calculateEndDate = (startDate: Date, billingCycle: string) => {
// // // // // //     const endDate = new Date(startDate);

// // // // // //     switch (billingCycle) {
// // // // // //       case "monthly":
// // // // // //         endDate.setMonth(endDate.getMonth() + 1);
// // // // // //         break;
// // // // // //       case "quarterly":
// // // // // //         endDate.setMonth(endDate.getMonth() + 3);
// // // // // //         break;
// // // // // //       case "annually":
// // // // // //         endDate.setFullYear(endDate.getFullYear() + 1);
// // // // // //         break;
// // // // // //     }

// // // // // //     return endDate;
// // // // // //   };

// // // // // //   const handleSubscribe = async (plan: SubscriptionPlan) => {
// // // // // //     try {
// // // // // //       setSubscribing(plan.id);

// // // // // //       // Get authenticated user
// // // // // //       const {
// // // // // //         data: { user },
// // // // // //         error: authError,
// // // // // //       } = await supabase.auth.getUser();
// // // // // //       if (!user || authError) {
// // // // // //         toast({
// // // // // //           title: "Authentication Required",
// // // // // //           description: "Please sign in to subscribe to a plan.",
// // // // // //           variant: "destructive",
// // // // // //         });
// // // // // //         return;
// // // // // //       }

// // // // // //       // Check if user has a job provider profile
// // // // // //       const { data: provider, error: providerError } = await supabase
// // // // // //         .from("job_providers")
// // // // // //         .select("id")
// // // // // //         .eq("user_id", user.id)
// // // // // //         .single();
// // // // // //         // .eq("payment_status", "paid")
// // // // // //         // .limit(1)
// // // // // //         // .maybeSingle();

// // // // // //       if (!provider || providerError) {
// // // // // //         toast({
// // // // // //           title: "Profile Required",
// // // // // //           description: "Please create your job provider profile first.",
// // // // // //           variant: "destructive",
// // // // // //         });
// // // // // //         return;
// // // // // //       }

// // // // // //       console.log("Creating subscription for plan:", plan.name);
// // // // // //       console.log("Provider ID:", provider.id);

// // // // // //       // Handle free plan
// // // // // //       if (plan.price === 0) {
// // // // // //         const startDate = new Date();
// // // // // //         const endDate = calculateEndDate(startDate, plan.billing_cycle);

// // // // // //         // Create subscription
// // // // // //         const { error: subError } = await supabase
// // // // // //           .from("provider_subscriptions")
// // // // // //           .insert({
// // // // // //             provider_id: provider.id,
// // // // // //             plan_id: plan.id,
// // // // // //             status: "active",
// // // // // //             payment_status: "free",
// // // // // //             start_date: startDate.toISOString(),
// // // // // //             end_date: endDate.toISOString(),
// // // // // //             stripe_customer_id: `cus_demo_${userId}`,
// // // // // //             stripe_subscription_id: `sub_demo_${Date.now()}`,
// // // // // //           });
// // // // // //           // .select()
// // // // // //       // .single();

// // // // // //         if (subError) throw subError;

// // // // // //         toast({
// // // // // //           title: "Subscription Activated!",
// // // // // //           description: `Your ${plan.name} plan is now active!`,
// // // // // //         });
// // // // // //         return;
// // // // // //       }

// // // // // //       // Load Razorpay script for paid plans
// // // // // //       const razorpayLoaded = await loadRazorpayScript();
// // // // // //       if (!razorpayLoaded) {
// // // // // //         throw new Error("Failed to load payment processor");
// // // // // //       }

// // // // // //       // Create order record
// // // // // //       const { data: order, error: orderError } = await supabase
// // // // // //         .from("orders")
// // // // // //         .insert({
// // // // // //           user_id: user.id,
// // // // // //           plan_id: plan.id,
// // // // // //           amount: plan.price * 100, // Convert to paise
// // // // // //           currency: plan.currency,
// // // // // //           status: "created",
// // // // // //         })
// // // // // //         .select()
// // // // // //         .single();

// // // // // //       if (orderError || !order) {
// // // // // //         throw new Error(orderError?.message || "Failed to create order");
// // // // // //       }

// // // // // //       const options = {
// // // // // //         key: "rzp_test_eK57VjQhXHjIGR",
// // // // // //         amount: (plan.price * 100).toString(),
// // // // // //         currency: plan.currency,
// // // // // //         name: "Job Portal Subscription",
// // // // // //         description: `${plan.name} Plan`,
// // // // // //         // order_id: "", // Will be set from Razorpay API
// // // // // //         handler: async (response: any) => {
// // // // // //           try {
// // // // // //             // Verify payment on server would be better, but for client demo:
// // // // // //             const startDate = new Date();
// // // // // //             const endDate = calculateEndDate(startDate, plan.billing_cycle);

// // // // // //             // Create subscription
// // // // // //             const { error: subError } = await supabase
// // // // // //               .from("provider_subscriptions")
// // // // // //               .insert({
// // // // // //                 provider_id: provider.id,
// // // // // //                 plan_id: plan.id,
// // // // // //                 status: "active",
// // // // // //                 payment_status: "paid",
// // // // // //                 start_date: startDate.toISOString(),
// // // // // //                 end_date: endDate.toISOString(),
// // // // // //                 razorpay_payment_id: response.razorpay_payment_id,
// // // // // //               });

// // // // // //             if (subError) throw subError;

// // // // // //             // Create payment record
// // // // // //             await supabase.from("payments").insert({
// // // // // //               user_id: user.id,
// // // // // //               plan_id: plan.id,
// // // // // //               amount: plan.price,
// // // // // //               currency: plan.currency,
// // // // // //               status: "succeeded",
// // // // // //               razorpay_payment_id: response.razorpay_payment_id,
// // // // //               razorpay_order_id: response.razorpay_order_id,
// // // // //               razorpay_signature: response.razorpay_signature,
// // // // // //             });

// // // // // //             // Update order status
// // // // // //             await supabase
// // // // // //               .from("orders")
// // // // // //               .update({ status: "paid" })
// // // // // //               .eq("id", order.id);

// // // // // //             toast({
// // // // // //               title: "Payment Successful!",
// // // // // //               description: `Your ${plan.name} subscription is now active!`,
// // // // // //             });
// // // // // //           } catch (error: any) {
// // // // // //             console.error("Payment processing error:", error);
// // // // // //             toast({
// // // // // //               title: "Payment Processing Failed",
// // // // // //               description: error.message || "Please contact support",
// // // // // //               variant: "destructive",
// // // // // //             });
// // // // // //           }
// // // // // //         },
// // // // // //         prefill: {
// // // // // //           name: user.user_metadata?.full_name || "User",
// // // // // //           email: user.email || "",
// // // // // //           contact: user.phone || "",
// // // // // //         },
// // // // // //         theme: {
// // // // // //           color: "#2563eb",
// // // // // //         },
// // // // // //         modal: {
// // // // // //           ondismiss: () => {
// // // // // //             toast({
// // // // // //               title: "Payment Cancelled",
// // // // // //               description: "You cancelled the payment process",
// // // // // //             });
// // // // // //             setSubscribing(null);
// // // // // //           },
// // // // // //         },
// // // // // //       };

// // // // // //       // Fetch Razorpay order ID (simulated - in real app, call your backend)
// // // // // //       // This would normally be done through a server-to-server API call
// // // // // //       const razorpayOrder = await new Promise<any>((resolve) => {
// // // // // //         setTimeout(() => {
// // // // // //           resolve({
// // // // // //             id: `order_${Math.random().toString(36).substr(2, 9)}`,
// // // // // //             amount: options.amount,
// // // // // //             currency: options.currency,
// // // // // //           });
// // // // // //         }, 500);
// // // // // //       });

// // // // // //       // options.order_id = razorpayOrder.id;

// // // // // //       const rzp = new window.Razorpay(options);

// // // // // //       rzp.on("payment.failed", (response: any) => {
// // // // // //         toast({
// // // // // //           title: "Payment Failed",
// // // // // //           description: response.error.description,
// // // // // //           variant: "destructive",
// // // // // //         });
// // // // // //       });

// // // // // //       rzp.open();
// // // // // //     } catch (error: any) {
// // // // // //       console.error("Subscription error:", error);
// // // // // //       toast({
// // // // // //         title: "Error",
// // // // // //         description: error.message || "Failed to process subscription",
// // // // // //         variant: "destructive",
// // // // // //       });
// // // // // //     } finally {
// // // // // //       setSubscribing(null);
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="flex justify-center items-center h-64">
// // // // // //         <Loader2 className="h-8 w-8 animate-spin" />
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="space-y-6 max-w-6xl mx-auto p-4">
// // // // // //       <div className="text-center">
// // // // // //         <h2 className="text-3xl font-bold text-gray-900 mb-4">
// // // // // //           Choose Your Plan
// // // // // //         </h2>
// // // // // //         <p className="text-gray-600 max-w-2xl mx-auto">
// // // // // //           Subscribe to access premium features. Choose the plan that best fits
// // // // // //           your needs.
// // // // // //         </p>
// // // // // //       </div>

// // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //         {plans.map((plan) => (
// // // // // //           <Card
// // // // // //             key={plan.id}
// // // // // //             className={`relative hover:shadow-lg transition-shadow ${
// // // // // //               plan.name.toLowerCase().includes("premium")
// // // // // //                 ? "border-yellow-200 bg-yellow-50"
// // // // // //                 : ""
// // // // // //             }`}
// // // // // //           >
// // // // // //             {plan.name.toLowerCase().includes("premium") && (
// // // // // //               <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
// // // // // //                 Most Popular
// // // // // //               </Badge>
// // // // // //             )}

// // // // // //             <CardHeader className="text-center">
// // // // // //               <div className="flex justify-center mb-2">
// // // // // //                 {getPlanIcon(plan.name)}
// // // // // //               </div>
// // // // // //               <CardTitle className="text-xl">{plan.name}</CardTitle>
// // // // // //               <CardDescription>{plan.description}</CardDescription>
// // // // // //               <div className="mt-4">
// // // // // //                 <span className="text-3xl font-bold">
// // // // // //                   {plan.price > 0 ? `₹${plan.price}` : "Free"}
// // // // // //                 </span>
// // // // // //                 <span className="text-gray-500">
// // // // // //                   {plan.price > 0 && getBillingCycleDisplay(plan.billing_cycle)}
// // // // // //                 </span>
// // // // // //               </div>
// // // // // //             </CardHeader>

// // // // // //             <CardContent>
// // // // // //               <ul className="space-y-2">
// // // // // //                 {plan.features.map((feature, index) => (
// // // // // //                   <li key={index} className="flex items-center gap-2">
// // // // // //                     <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
// // // // // //                     <span className="text-sm">{feature}</span>
// // // // // //                   </li>
// // // // // //                 ))}
// // // // // //               </ul>
// // // // // //             </CardContent>

// // // // // //             <CardFooter>
// // // // // //               <Button
// // // // // //                 className="w-full"
// // // // // //                 onClick={() => handleSubscribe(plan)}
// // // // // //                 disabled={subscribing === plan.id}
// // // // // //                 variant={
// // // // // //                   plan.name.toLowerCase().includes("premium")
// // // // // //                     ? "default"
// // // // // //                     : "outline"
// // // // // //                 }
// // // // // //               >
// // // // // //                 {subscribing === plan.id ? (
// // // // // //                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // // //                 ) : null}
// // // // // //                 {subscribing === plan.id
// // // // // //                   ? "Processing..."
// // // // // //                   : plan.price > 0
// // // // // //                   ? "Subscribe Now"
// // // // // //                   : "Activate Free Plan"}
// // // // // //               </Button>
// // // // // //             </CardFooter>
// // // // // //           </Card>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       <div className="text-center text-sm text-gray-500 pt-4 border-t">
// // // // // //         <p>All plans include access to our platform and customer support</p>
// // // // // //         <p>Cancel anytime. 7-day money-back guarantee for paid plans</p>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // import { useState, useEffect } from "react";
// // // // // import {
// // // // //   Card,
// // // // //   CardContent,
// // // // //   CardDescription,
// // // // //   CardFooter,
// // // // //   CardHeader,
// // // // //   CardTitle,
// // // // // } from "@/components/ui/card";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import { useToast } from "@/hooks/use-toast";
// // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // import { Check, Crown, Zap, Loader2 } from "lucide-react";

// // // // // interface SubscriptionPlan {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   description: string;
// // // // //   price: number;
// // // // //   currency: string;
// // // // //   billing_cycle: string;
// // // // //   features: string[];
// // // // //   active: boolean;
// // // // //   created_at: string;
// // // // // }

// // // // // declare global {
// // // // //   interface Window {
// // // // //     Razorpay: any;
// // // // //   }
// // // // // }

// // // // // export const SubscriptionPlans = () => {
// // // // //   const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [subscribing, setSubscribing] = useState<string | null>(null);
// // // // //   const { toast } = useToast();

// // // // //   useEffect(() => {
// // // // //     fetchPlans();
// // // // //   }, []);

// // // // //   const fetchPlans = async () => {
// // // // //     try {
// // // // //       const { data, error } = await supabase
// // // // //         .from("subscription_plans")
// // // // //         .select("*")
// // // // //         .eq("id", id)
// // // // //         .eq("active", true)
// // // // //         .order("price", { ascending: true });

// // // // //       if (error) throw error;

// // // // //       const parsedPlans = (data || []).map((plan) => ({
// // // // //         ...plan,
// // // // //         features: Array.isArray(plan.features)
// // // // //           ? plan.features
// // // // //           : typeof plan.features === "string"
// // // // //           ? JSON.parse(plan.features)
// // // // //           : [],
// // // // //       })) as SubscriptionPlan[];

// // // // //       setPlans(parsedPlans);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching plans:", error);
// // // // //       toast({
// // // // //         title: "Error",
// // // // //         description: "Failed to load subscription plans.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const loadRazorpayScript = (): Promise<boolean> => {
// // // // //     return new Promise((resolve) => {
// // // // //       if (window.Razorpay) return resolve(true);

// // // // //       const script = document.createElement("script");
// // // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // //       script.onload = () => resolve(true);
// // // // //       script.onerror = () => resolve(false);
// // // // //       document.body.appendChild(script);
// // // // //     });
// // // // //   };

// // // // //   const getBillingCycleDisplay = (cycle: string) => {
// // // // //     switch (cycle) {
// // // // //       case "monthly":
// // // // //         return "/month";
// // // // //       case "quarterly":
// // // // //         return "/3 months";
// // // // //       case "annually":
// // // // //         return "/year";
// // // // //       default:
// // // // //         return `/${cycle}`;
// // // // //     }
// // // // //   };

// // // // //   const getPlanIcon = (planName: string) => {
// // // // //     if (planName.toLowerCase().includes("premium")) {
// // // // //       return <Crown className="h-5 w-5 text-yellow-500" />;
// // // // //     }
// // // // //     return <Zap className="h-5 w-5 text-blue-500" />;
// // // // //   };

// // // // //   const calculateEndDate = (startDate: Date, billingCycle: string) => {
// // // // //     const endDate = new Date(startDate);

// // // // //     switch (billingCycle) {
// // // // //       case "monthly":
// // // // //         endDate.setMonth(endDate.getMonth() + 1);
// // // // //         break;
// // // // //       case "quarterly":
// // // // //         endDate.setMonth(endDate.getMonth() + 3);
// // // // //         break;
// // // // //       case "annually":
// // // // //         endDate.setFullYear(endDate.getFullYear() + 1);
// // // // //         break;
// // // // //     }

// // // // //     return endDate;
// // // // //   };

// // // // //   const handleSubscribe = async (plan: SubscriptionPlan) => {
// // // // //     try {
// // // // //       setSubscribing(plan.id);
// // // // //       console.log("ffffffffffffff", supabase.auth.getUser());

// // // // //       // Get authenticated user
// // // // //       const {
// // // // //         data: { user },
// // // // //         error: authError,
// // // // //       } = await supabase.auth.getUser();
// // // // //       console.log("kkkkkkkkkkkkkkkkk", user);

// // // // //       if (!user || authError) {
// // // // //         toast({
// // // // //           title: "Authentication Required",
// // // // //           description: "Please sign in to subscribe to a plan.",
// // // // //           variant: "destructive",
// // // // //         });
// // // // //         return;
// // // // //       }

// // // // //       // Check if user has a job provider profile
// // // // //       const { data: provider, error: providerError } = await supabase
// // // // //         .from("job_providers")
// // // // //         .select("id")
// // // // //         .eq("user_id", user.id)

// // // // //         .single();
// // // // //         console.log("Creating subscription for plan:", plan.name);
// // // // //         console.log("Provider ID:", provider.id);

// // // // //       if (providerError || !provider) {
// // // // //         toast({
// // // // //           title: "Profile Required",
// // // // //           description: "Please create your job provider profile first.",
// // // // //           variant: "destructive",
// // // // //         });
// // // // //         return;
// // // // //       }

// // // // //       // Handle free plan
// // // // //       if (plan.price === 0) {
// // // // //         const startDate = new Date();
// // // // //         const endDate = calculateEndDate(startDate, plan.billing_cycle);

// // // // //         // Create subscription
// // // // //         const { error: subError } = await supabase
// // // // //           .from("provider_subscriptions")
// // // // //           .insert({
// // // // //             provider_id: provider.id,
// // // // //             plan_id: plan.id,
// // // // //             status: "active",
// // // // //             payment_status: "active",
// // // // //             start_date: startDate.toISOString(),
// // // // //             end_date: endDate.toISOString(),
// // // // //           });

// // // // //         if (subError) throw subError;

// // // // //         toast({
// // // // //           title: "Subscription Activated!",
// // // // //           description: `Your ${plan.name} plan is now active!`,
// // // // //         });
// // // // //         return;
// // // // //       }

// // // // //       // Load Razorpay script for paid plans
// // // // //       const razorpayLoaded = await loadRazorpayScript();
// // // // //       if (!razorpayLoaded) {
// // // // //         throw new Error("Failed to load payment processor");
// // // // //       }

// // // // //       // Create order record
// // // // //       const { data: order, error: orderError } = await supabase
// // // // //         .from("orders")
// // // // //         .insert({
// // // // //           user_id: user.id,
// // // // //           plan_id: plan.id,
// // // // //           amount: plan.price * 100, // Convert to paise
// // // // //           currency: plan.currency,
// // // // //           status: "created",
// // // // //         })
// // // // //         .select()
// // // // //         .single();

// // // // //       if (orderError || !order) {
// // // // //         throw new Error(orderError?.message || "Failed to create order");
// // // // //       }

// // // // //       const options = {
// // // // //         key: "rzp_test_eK57VjQhXHjIGR",
// // // // //         amount: (plan.price * 100).toString(),
// // // // //         currency: plan.currency,
// // // // //         name: "Job Portal Subscription",
// // // // //         description: `${plan.name} Plan`,
// // // // //         handler: async (response: any) => {
// // // // //           try {
// // // // //             // Verify payment on server would be better, but for client demo:
// // // // //             const startDate = new Date();
// // // // //             const endDate = calculateEndDate(startDate, plan.billing_cycle);

// // // // //             // Create subscription
// // // // //             const {data: subscription, error: subError } = await supabase
// // // // //               .from("provider_subscriptions")
// // // // //               .insert({
// // // // //                 provider_id: provider.id,
// // // // //                 plan_id: plan.id,
// // // // //                 status: "active",
// // // // //                 payment_status: "paid",
// // // // //                 start_date: startDate.toISOString(),
// // // // //                 end_date: endDate.toISOString(),
// // // // //                 razorpay_payment_id: response.razorpay_payment_id,
// // // // //               });
// // // // //               .select()
// // // // //               .single();

// // // // //             // if (subError) throw subError;
// // // // //             if (subError || !subscription) {
// // // // //               throw subError;
// // // // //             }

// // // // //             // Create payment record
// // // // //             await supabase.from("payments").insert({
// // // // //               user_id: user.id,
// // // // //               plan_id: plan.id,
// // // // //               subscription_id: subscription.id,
// // // // //               amount: plan.price,
// // // // //               currency: plan.currency,
// // // // //               status: "succeeded",
// // // // //               razorpay_payment_id: response.razorpay_payment_id,
// // // //               razorpay_order_id: response.razorpay_order_id,
// // // //               razorpay_signature: response.razorpay_signature,
// // // // //             });

// // // // //             // Update order status
// // // // //             await supabase
// // // // //               .from("orders")
// // // // //               .update({ status: "paid" })
// // // // //               .eq("id", order.id);

// // // // //             toast({
// // // // //               title: "Payment Successful!",
// // // // //               description: `Your ${plan.name} subscription is now active!`,
// // // // //             });
// // // // //           } catch (error: any) {
// // // // //             console.error("Payment processing error:", error);
// // // // //             toast({
// // // // //               title: "Payment Processing Failed",
// // // // //               description: error.message || "Please contact support",
// // // // //               variant: "destructive",
// // // // //             });
// // // // //           }
// // // // //         },
// // // // //         prefill: {
// // // // //           name: user.user_metadata?.full_name || "User",
// // // // //           email: user.email || "",
// // // // //           contact: user.phone || "",
// // // // //         },
// // // // //         theme: {
// // // // //           color: "#2563eb",
// // // // //         },
// // // // //         modal: {
// // // // //           ondismiss: () => {
// // // // //             toast({
// // // // //               title: "Payment Cancelled",
// // // // //               description: "You cancelled the payment process",
// // // // //             });
// // // // //             setSubscribing(null);
// // // // //           },
// // // // //         },
// // // // //       };

// // // // //       const rzp = new window.Razorpay(options);

// // // // //       rzp.on("payment.failed", (response: any) => {
// // // // //         toast({
// // // // //           title: "Payment Failed",
// // // // //           description: response.error.description,
// // // // //           variant: "destructive",
// // // // //         });
// // // // //         setSubscribing(null);
// // // // //       });

// // // // //       rzp.open();
// // // // //     } catch (error: any) {
// // // // //       console.error("Subscription error:", error);
// // // // //       toast({
// // // // //         title: "Error",
// // // // //         description: error.message || "Failed to process subscription",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //       setSubscribing(null);
// // // // //     }
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex justify-center items-center h-64">
// // // // //         <Loader2 className="h-8 w-8 animate-spin" />
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="space-y-6 max-w-6xl mx-auto p-4">
// // // // //       <div className="text-center">
// // // // //         <h2 className="text-3xl font-bold text-gray-900 mb-4">
// // // // //           Choose Your Plan
// // // // //         </h2>
// // // // //         <p className="text-gray-600 max-w-2xl mx-auto">
// // // // //           Subscribe to access premium features. Choose the plan that best fits
// // // // //           your needs.
// // // // //         </p>
// // // // //       </div>

// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //         {plans.map((plan) => (
// // // // //           <Card
// // // // //             key={plan.id}
// // // // //             className={`relative hover:shadow-lg transition-shadow ${
// // // // //               plan.name.toLowerCase().includes("premium")
// // // // //                 ? "border-yellow-200 bg-yellow-50"
// // // // //                 : ""
// // // // //             }`}
// // // // //           >
// // // // //             {plan.name.toLowerCase().includes("premium") && (
// // // // //               <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
// // // // //                 Most Popular
// // // // //               </Badge>
// // // // //             )}

// // // // //             <CardHeader className="text-center">
// // // // //               <div className="flex justify-center mb-2">
// // // // //                 {getPlanIcon(plan.name)}
// // // // //               </div>
// // // // //               <CardTitle className="text-xl">{plan.name}</CardTitle>
// // // // //               <CardDescription>{plan.description}</CardDescription>
// // // // //               <div className="mt-4">
// // // // //                 <span className="text-3xl font-bold">
// // // // //                   {plan.price > 0 ? `₹${plan.price}` : "Free"}
// // // // //                 </span>
// // // // //                 <span className="text-gray-500">
// // // // //                   {plan.price > 0 && getBillingCycleDisplay(plan.billing_cycle)}
// // // // //                 </span>
// // // // //               </div>
// // // // //             </CardHeader>

// // // // //             <CardContent>
// // // // //               <ul className="space-y-2">
// // // // //                 {plan.features.map((feature, index) => (
// // // // //                   <li key={index} className="flex items-center gap-2">
// // // // //                     <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
// // // // //                     <span className="text-sm">{feature}</span>
// // // // //                   </li>
// // // // //                 ))}
// // // // //               </ul>
// // // // //             </CardContent>

// // // // //             <CardFooter>
// // // // //               <Button
// // // // //                 className="w-full"
// // // // //                 onClick={() => handleSubscribe(plan)}
// // // // //                 disabled={subscribing === plan.id}
// // // // //                 variant={
// // // // //                   plan.name.toLowerCase().includes("premium")
// // // // //                     ? "default"
// // // // //                     : "outline"
// // // // //                 }
// // // // //               >
// // // // //                 {subscribing === plan.id ? (
// // // // //                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // // //                 ) : null}
// // // // //                 {subscribing === plan.id
// // // // //                   ? "Processing..."
// // // // //                   : plan.price > 0
// // // // //                   ? "Subscribe Now"
// // // // //                   : "Activate Free Plan"}
// // // // //               </Button>
// // // // //             </CardFooter>
// // // // //           </Card>
// // // // //         ))}
// // // // //       </div>

// // // // //       <div className="text-center text-sm text-gray-500 pt-4 border-t">
// // // // //         <p>All plans include access to our platform and customer support</p>
// // // // //         <p>Cancel anytime. 7-day money-back guarantee for paid plans</p>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // import { useState, useEffect } from "react";
// // // // import {
// // // //   Card,
// // // //   CardContent,
// // // //   CardDescription,
// // // //   CardFooter,
// // // //   CardHeader,
// // // //   CardTitle,
// // // // } from "@/components/ui/card";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import { useToast } from "@/hooks/use-toast";
// // // // import { supabase } from "@/integrations/supabase/client";
// // // // import { Check, Crown, Zap, Loader2 } from "lucide-react";

// // // // interface SubscriptionPlan {
// // // //   id: string;
// // // //   name: string;
// // // //   description: string;
// // // //   price: number;
// // // //   currency: string;
// // // //   billing_cycle: string;
// // // //   features: string[];
// // // //   active: boolean;
// // // //   created_at: string;
// // // // }

// // // // declare global {
// // // //   interface Window {
// // // //     Razorpay: any;
// // // //   }
// // // // }

// // // // export const SubscriptionPlans = () => {
// // // //   const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [subscribing, setSubscribing] = useState<string | null>(null);
// // // //   const { toast } = useToast();

// // // //   useEffect(() => {
// // // //     fetchPlans();
// // // //   }, []);

// // // //   const fetchPlans = async () => {
// // // //     try {
// // // //       const { data, error } = await supabase
// // // //         .from("subscription_plans")
// // // //         .select("*")
// // // //         .eq("active", true)
// // // //         .order("price", { ascending: true });

// // // //       if (error) throw error;

// // // //       const parsedPlans = (data || []).map((plan) => ({
// // // //         ...plan,
// // // //         features: Array.isArray(plan.features)
// // // //           ? plan.features
// // // //           : typeof plan.features === "string"
// // // //           ? JSON.parse(plan.features)
// // // //           : [],
// // // //       })) as SubscriptionPlan[];

// // // //       setPlans(parsedPlans);
// // // //     } catch (error) {
// // // //       console.error("Error fetching plans:", error);
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Failed to load subscription plans.",
// // // //         variant: "destructive",
// // // //       });
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const loadRazorpayScript = (): Promise<boolean> => {
// // // //     return new Promise((resolve) => {
// // // //       if (window.Razorpay) return resolve(true);

// // // //       const script = document.createElement("script");
// // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // //       script.onload = () => resolve(true);
// // // //       script.onerror = () => resolve(false);
// // // //       document.body.appendChild(script);
// // // //     });
// // // //   };

// // // //   const getBillingCycleDisplay = (cycle: string) => {
// // // //     switch (cycle) {
// // // //       case "monthly":
// // // //         return "/month";
// // // //       case "quarterly":
// // // //         return "/3 months";
// // // //       case "annually":
// // // //         return "/year";
// // // //       default:
// // // //         return `/${cycle}`;
// // // //     }
// // // //   };

// // // //   const getPlanIcon = (planName: string) => {
// // // //     if (planName.toLowerCase().includes("premium")) {
// // // //       return <Crown className="h-5 w-5 text-yellow-500" />;
// // // //     }
// // // //     return <Zap className="h-5 w-5 text-blue-500" />;
// // // //   };

// // // //   const calculateEndDate = (startDate: Date, billingCycle: string) => {
// // // //     const endDate = new Date(startDate);
// // // //     switch (billingCycle) {
// // // //       case "monthly":
// // // //         endDate.setMonth(endDate.getMonth() + 1);
// // // //         break;
// // // //       case "quarterly":
// // // //         endDate.setMonth(endDate.getMonth() + 3);
// // // //         break;
// // // //       case "annually":
// // // //         endDate.setFullYear(endDate.getFullYear() + 1);
// // // //         break;
// // // //     }
// // // //     return endDate;
// // // //   };

// // // //   const handleSubscribe = async (plan: SubscriptionPlan) => {
// // // //     try {
// // // //       setSubscribing(plan.id);

// // // //       const {
// // // //         data: { user },
// // // //         error: authError,
// // // //       } = await supabase.auth.getUser();

// // // //       if (!user || authError) {
// // // //         toast({
// // // //           title: "Authentication Required",
// // // //           description: "Please sign in to subscribe to a plan.",
// // // //           variant: "destructive",
// // // //         });
// // // //         setSubscribing(null);
// // // //         return;
// // // //       }

// // // //       const { data: provider, error: providerError } = await supabase
// // // //         .from("job_providers")
// // // //         .select("id")
// // // //         .eq("user_id", user.id)
// // // //         .maybeSingle();

// // // //       if (providerError) {
// // // //         toast({
// // // //           title: "Profile Required",
// // // //           description: "Please create your job provider profile first.",
// // // //           variant: "destructive",
// // // //         });
// // // //         setSubscribing(null);
// // // //         return;
// // // //       }

// // // //       if (plan.price === 0) {
// // // //         const startDate = new Date();
// // // //         const endDate = calculateEndDate(startDate, plan.billing_cycle);

// // // //         const { error: subError } = await supabase
// // // //           .from("provider_subscriptions")
// // // //           .insert({
// // // //             provider_id: provider.id,
// // // //             plan_id: plan.id,
// // // //             status: "active",
// // // //             payment_status: "active",
// // // //             start_date: startDate.toISOString(),
// // // //             end_date: endDate.toISOString(),
// // // //           });

// // // //         if (subError) throw subError;

// // // //         toast({
// // // //           title: "Subscription Activated!",
// // // //           description: `Your ${plan.name} plan is now active!`,
// // // //         });
// // // //         setSubscribing(null);
// // // //         return;
// // // //       }

// // // //       const razorpayLoaded = await loadRazorpayScript();
// // // //       if (!razorpayLoaded) throw new Error("Failed to load payment processor");

// // // //       const { data: order, error: orderError } = await supabase
// // // //         .from("orders")
// // // //         .update({
// // // //           user_id: user.id,
// // // //           course_id: courseId,
// // // //           plan_id: selectedPlanId,
// // // //           amount: plan.price * 100,
// // // //           currency: plan.currency,
// // // //           status: "created",
// // // //         })
// // // //         .select()
// // // //         .maybeSingle();

// // // //       if (orderError || !order) throw new Error("Order creation failed");

// // // //       const options = {
// // // //         key: "rzp_test_eK57VjQhXHjIGR",
// // // //         amount: (plan.price * 100).toString(),
// // // //         currency: plan.currency,
// // // //         name: "Job Portal Subscription",
// // // //         description: `${plan.name} Plan`,
// // // //         handler: async (response: any) => {
// // // //           try {
// // // //             const startDate = new Date();
// // // //             const endDate = calculateEndDate(startDate, plan.billing_cycle);

// // // //             const { data: subscription, error: subError } = await supabase
// // // //               .from("provider_subscriptions")
// // // //               .insert({
// // // //                 provider_id: provider.id,
// // // //                 plan_id: plan.id,
// // // //                 status: "active",
// // // //                 payment_status: "paid",
// // // //                 start_date: startDate.toISOString(),
// // // //                 end_date: endDate.toISOString(),
// // // //                 razorpay_payment_id: response.razorpay_payment_id,
// // // //               })
// // // //               .select()
// // // //               .single();

// // // //             if (subError || !subscription) throw subError;

// // // //             await supabase.from("payments").insert({
// // // //               user_id: user.id,
// // // //               plan_id: plan.id,
// // // //               subscription_id: subscription.id,
// // // //               amount: plan.price,
// // // //               currency: plan.currency,
// // // //               status: "succeeded",
// // // //               razorpay_payment_id: response.razorpay_payment_id,
// // //               razorpay_order_id: response.razorpay_order_id,
// // //               razorpay_signature: response.razorpay_signature,
// // // //             });

// // // //             await supabase
// // // //               .from("orders")
// // // //               .update({ status: "paid" })
// // // //               .eq("id", order.id);

// // // //             toast({
// // // //               title: "Payment Successful!",
// // // //               description: `Your ${plan.name} subscription is now active!`,
// // // //             });
// // // //           } catch (error: any) {
// // // //             console.error("Payment processing error:", error);
// // // //             toast({
// // // //               title: "Payment Failed",
// // // //               description: error.message || "Please contact support",
// // // //               variant: "destructive",
// // // //             });
// // // //           } finally {
// // // //             setSubscribing(null);
// // // //           }
// // // //         },
// // // //         prefill: {
// // // //           name: user.user_metadata?.full_name || "User",
// // // //           email: user.email || "",
// // // //           contact: user.phone || "",
// // // //         },
// // // //         theme: {
// // // //           color: "#2563eb",
// // // //         },
// // // //         modal: {
// // // //           ondismiss: () => {
// // // //             toast({
// // // //               title: "Payment Cancelled",
// // // //               description: "You cancelled the payment process.",
// // // //             });
// // // //             setSubscribing(null);
// // // //           },
// // // //         },
// // // //       };

// // // //       const rzp = new window.Razorpay(options);

// // // //       rzp.on("payment.failed", (response: any) => {
// // // //         toast({
// // // //           title: "Payment Failed",
// // // //           description: response.error.description,
// // // //           variant: "destructive",
// // // //         });
// // // //         setSubscribing(null);
// // // //       });

// // // //       rzp.open();
// // // //     } catch (error: any) {
// // // //       console.error("Subscription error:", error);
// // // //       toast({
// // // //         title: "Error",
// // // //         description: error.message || "Subscription failed",
// // // //         variant: "destructive",
// // // //       });
// // // //       setSubscribing(null);
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-64">
// // // //         <Loader2 className="h-8 w-8 animate-spin" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="space-y-6 max-w-6xl mx-auto p-4">
// // // //       <div className="text-center">
// // // //         <h2 className="text-3xl font-bold text-gray-900 mb-4">
// // // //           Choose Your Plan
// // // //         </h2>
// // // //         <p className="text-gray-600 max-w-2xl mx-auto">
// // // //           Subscribe to access premium features. Choose the plan that best fits
// // // //           your needs.
// // // //         </p>
// // // //       </div>

// // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //         {plans.map((plan) => (
// // // //           <Card
// // // //             key={plan.id}
// // // //             className={`relative hover:shadow-lg transition-shadow ${
// // // //               plan.name.toLowerCase().includes("premium")
// // // //                 ? "border-yellow-200 bg-yellow-50"
// // // //                 : ""
// // // //             }`}
// // // //           >
// // // //             {plan.name.toLowerCase().includes("premium") && (
// // // //               <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
// // // //                 Most Popular
// // // //               </Badge>
// // // //             )}
// // // //             <CardHeader className="text-center">
// // // //               <div className="flex justify-center mb-2">
// // // //                 {getPlanIcon(plan.name)}
// // // //               </div>
// // // //               <CardTitle className="text-xl">{plan.name}</CardTitle>
// // // //               <CardDescription>{plan.description}</CardDescription>
// // // //               <div className="mt-4">
// // // //                 <span className="text-3xl font-bold">
// // // //                   {plan.price > 0 ? `₹${plan.price}` : "Free"}
// // // //                 </span>
// // // //                 <span className="text-gray-500">
// // // //                   {plan.price > 0 && getBillingCycleDisplay(plan.billing_cycle)}
// // // //                 </span>
// // // //               </div>
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <ul className="space-y-2">
// // // //                 {plan.features.map((feature, index) => (
// // // //                   <li key={index} className="flex items-center gap-2">
// // // //                     <Check className="h-4 w-4 text-green-500" />
// // // //                     <span className="text-sm">{feature}</span>
// // // //                   </li>
// // // //                 ))}
// // // //               </ul>
// // // //             </CardContent>
// // // //             <CardFooter>
// // // //               <Button
// // // //                 className="w-full"
// // // //                 onClick={() => handleSubscribe(plan)}
// // // //                 disabled={subscribing === plan.id}
// // // //                 variant={
// // // //                   plan.name.toLowerCase().includes("premium")
// // // //                     ? "default"
// // // //                     : "outline"
// // // //                 }
// // // //               >
// // // //                 {subscribing === plan.id ? (
// // // //                   <>
// // // //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // //                     Processing...
// // // //                   </>
// // // //                 ) : plan.price > 0 ? (
// // // //                   "Subscribe Now"
// // // //                 ) : (
// // // //                   "Activate Free Plan"
// // // //                 )}
// // // //               </Button>
// // // //             </CardFooter>
// // // //           </Card>
// // // //         ))}
// // // //       </div>

// // // //       <div className="text-center text-sm text-gray-500 pt-4 border-t">
// // // //         <p>All plans include access to our platform and customer support</p>
// // // //         <p>Cancel anytime. 7-day money-back guarantee for paid plans</p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // import { useState, useEffect } from "react";
// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardDescription,
// // //   CardFooter,
// // //   CardHeader,
// // //   CardTitle,
// // // } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { supabase } from "@/integrations/supabase/client";
// // // import { Check, Crown, Zap, Loader2 } from "lucide-react";

// // // interface SubscriptionPlan {
// // //   id: string;
// // //   name: string;
// // //   description: string;
// // //   price: number;
// // //   currency: string;
// // //   billing_cycle: string;
// // //   features: string[];
// // //   active: boolean;
// // //   created_at: string;
// // // }

// // // declare global {
// // //   interface Window {
// // //     Razorpay: any;
// // //   }
// // // }

// // // export const SubscriptionPlans = () => {
// // //   const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [subscribing, setSubscribing] = useState<string | null>(null);
// // //   const { toast } = useToast();

// // //   useEffect(() => {
// // //     fetchPlans();
// // //   }, []);

// // //   const fetchPlans = async () => {
// // //     try {
// // //       const { data, error } = await supabase
// // //         .from("subscription_plans")
// // //         .select("*")
// // //         .eq('id', plan.id)
// // //         .eq("active", true)
// // //         .order("price", { ascending: true });
// // //         .single();

// // //       if (error) throw error;

// // //       const parsedPlans = (data || []).map((plan) => ({
// // //         ...plan,
// // //         features: Array.isArray(plan.features)
// // //           ? plan.features
// // //           : typeof plan.features === "string"
// // //           ? JSON.parse(plan.features)
// // //           : [],
// // //       })) as SubscriptionPlan[];

// // //       setPlans(parsedPlans);
// // //     } catch (error) {
// // //       console.error("Error fetching plans:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to load subscription plans.",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const loadRazorpayScript = (): Promise<boolean> => {
// // //     return new Promise((resolve) => {
// // //       if (window.Razorpay) return resolve(true);

// // //       const script = document.createElement("script");
// // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // //       script.onload = () => resolve(true);
// // //       script.onerror = () => resolve(false);
// // //       document.body.appendChild(script);
// // //     });
// // //   };

// // //   const getBillingCycleDisplay = (cycle: string) => {
// // //     switch (cycle) {
// // //       case "monthly":
// // //         return "/month";
// // //       case "quarterly":
// // //         return "/3 months";
// // //       case "annually":
// // //         return "/year";
// // //       default:
// // //         return `/${cycle}`;
// // //     }
// // //   };

// // //   const getPlanIcon = (planName: string) => {
// // //     if (planName.toLowerCase().includes("premium")) {
// // //       return <Crown className="h-5 w-5 text-yellow-500" />;
// // //     }
// // //     return <Zap className="h-5 w-5 text-blue-500" />;
// // //   };

// // //   const calculateEndDate = (startDate: Date, billingCycle: string) => {
// // //     const endDate = new Date(startDate);
// // //     switch (billingCycle) {
// // //       case "monthly":
// // //         endDate.setMonth(endDate.getMonth() + 1);
// // //         break;
// // //       case "quarterly":
// // //         endDate.setMonth(endDate.getMonth() + 3);
// // //         break;
// // //       case "annually":
// // //         endDate.setFullYear(endDate.getFullYear() + 1);
// // //         break;
// // //     }
// // //     return endDate;
// // //   };

// // //   const handleSubscribe = async (plan: SubscriptionPlan) => {
// // //     try {
// // //       setSubscribing(plan.id);

// // //       const {
// // //         data: { user },
// // //         error: authError,
// // //       } = await supabase.auth.getUser();

// // //       if (!user || authError) {
// // //         toast({
// // //           title: "Authentication Required",
// // //           description: "Please sign in to subscribe to a plan.",
// // //           variant: "destructive",
// // //         });
// // //         setSubscribing(null);
// // //         return;
// // //       }

// // //       const { data: provider, error: providerError } = await supabase
// // //         .from("job_providers")
// // //         .select("id")
// // //         .eq("user_id", user.id)
// // //         .eq
// // //         .single();

// // //       if (!provider || providerError) {
// // //         console.log("ggggggggg", provider);
// // //         console.log("hhhhhhhhhhhhhh", providerError);
// // //         toast({
// // //           title: "Profile Required",
// // //           description: "Please create your job provider profile first.",
// // //           variant: "destructive",
// // //         });
// // //         setSubscribing(null);
// // //         return;
// // //       }
// // //       console.log('Creating subscription for plan:', plan.name);
// // //     console.log('Provider ID:', provider.id);

// // //       // Handle free plan
// // //       if (plan.price === 0) {
// // //         const startDate = new Date();
// // //         const endDate = calculateEndDate(startDate, plan.billing_cycle);

// // //         const { error: subError } = await supabase
// // //           .from("provider_subscriptions")
// // //           .insert({
// // //             provider_id: provider.id,
// // //             plan_id: plan.id,
// // //             status: "active",
// // //             payment_status: "active",
// // //             start_date: startDate.toISOString(),
// // //             end_date: endDate.toISOString(),
// // //             stripe_customer_id: `cus_demo_${userId}`,
// // //         stripe_subscription_id: `sub_demo_${Date.now()}`
// // //           });
// // //            .select()
// // //       .single();

// // //         if (subError) throw subError;

// // //         toast({
// // //           title: "Subscription Activated!",
// // //           description: `Your ${plan.name} plan is now active!`,
// // //         });
// // //         setSubscribing(null);
// // //         return;
// // //       }

// // //       // Load Razorpay for paid plans
// // //       const razorpayLoaded = await loadRazorpayScript();
// // //       if (!razorpayLoaded) throw new Error("Failed to load payment processor");

// // //       // Create order record (FIXED: use INSERT instead of UPDATE)
// // //       const { data: order, error: orderError } = await supabase
// // //         .from("orders")
// // //         .insert({
// // //           user_id: user.id,
// // //           plan_id: plan.id, // Fixed: use plan.id directly
// // //           amount: plan.price * 100,
// // //           currency: plan.currency,
// // //           status: "created",
// // //         })
// // //         .select()
// // //         .single();

// // //       if (orderError || !order) {
// // //         throw new Error(orderError?.message || "Failed to create order");
// // //       }

// // //       const options = {
// // //         key: "rzp_test_eK57VjQhXHjIGR",
// // //         amount: (plan.price * 100).toString(),
// // //         currency: plan.currency,
// // //         name: "Job Portal Subscription",
// // //         description: `${plan.name} Plan`,
// // //         order_id: order.id, // Important: pass order ID to Razorpay
// // //         handler: async (response: any) => {
// // //           try {
// // //             const startDate = new Date();
// // //             const endDate = calculateEndDate(startDate, plan.billing_cycle);

// // //             // Create subscription
// // //             const { data: subscription, error: subError } = await supabase
// // //               .from("provider_subscriptions")
// // //               .insert({
// // //                 provider_id: provider.id,
// // //                 plan_id: plan.id,
// // //                 status: "active",
// // //                 payment_status: "paid",
// // //                 start_date: startDate.toISOString(),
// // //                 end_date: endDate.toISOString(),
// // //                 razorpay_payment_id: response.razorpay_payment_id,
// // //               })
// // //               .select()
// // //               .single();

// // //             if (subError || !subscription) throw subError;

// // //             // Create payment record
// // //             await supabase.from("payments").insert({
// // //               user_id: user.id,
// // //               plan_id: plan.id,
// // //               subscription_id: subscription.id,
// // //               amount: plan.price,
// // //               currency: plan.currency,
// // //               status: "succeeded",
// // //                payment_method: 'demo',
// // //               razorpay_payment_id: response.razorpay_payment_id,
// //               razorpay_order_id: response.razorpay_order_id,
// //               razorpay_signature: response.razorpay_signature,
// // //             });

// // //             // Update order status
// // //             await supabase
// // //               .from("orders")
// // //               .update({ status: "paid" })
// // //               .eq("id", order.id);

// // //             toast({
// // //               title: "Payment Successful!",
// // //               description: `Your ${plan.name} subscription is now active!`,
// // //             });
// // //           } catch (error: any) {
// // //             console.error("Payment processing error:", error);
// // //             toast({
// // //               title: "Payment Failed",
// // //               description: error.message || "Please contact support",
// // //               variant: "destructive",
// // //             });
// // //           } finally {
// // //             setSubscribing(null);
// // //           }
// // //         },
// // //         prefill: {
// // //           name: user.user_metadata?.full_name || "User",
// // //           email: user.email || "",
// // //           contact: user.phone || "",
// // //         },
// // //         theme: {
// // //           color: "#2563eb",
// // //         },
// // //         modal: {
// // //           ondismiss: () => {
// // //             toast({
// // //               title: "Payment Cancelled",
// // //               description: "You cancelled the payment process.",
// // //             });
// // //             setSubscribing(null);
// // //           },
// // //         },
// // //       };

// // //       const rzp = new window.Razorpay(options);

// // //       rzp.on("payment.failed", (response: any) => {
// // //         toast({
// // //           title: "Payment Failed",
// // //           description: response.error.description,
// // //           variant: "destructive",
// // //         });
// // //         setSubscribing(null);
// // //       });

// // //       rzp.open();
// // //     } catch (error: any) {
// // //       console.error("Subscription error:", error);
// // //       toast({
// // //         title: "Error",
// // //         description: error.message || "Subscription failed",
// // //         variant: "destructive",
// // //       });
// // //       setSubscribing(null);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-64">
// // //         <Loader2 className="h-8 w-8 animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-6 max-w-6xl mx-auto p-4">
// // //       <div className="text-center">
// // //         <h2 className="text-3xl font-bold text-gray-900 mb-4">
// // //           Choose Your Plan
// // //         </h2>
// // //         <p className="text-gray-600 max-w-2xl mx-auto">
// // //           Subscribe to access premium features. Choose the plan that best fits
// // //           your needs.
// // //         </p>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         {plans.map((plan) => (
// // //           <Card
// // //             key={plan.id}
// // //             className={`relative hover:shadow-lg transition-shadow ${
// // //               plan.name.toLowerCase().includes("premium")
// // //                 ? "border-yellow-200 bg-yellow-50"
// // //                 : ""
// // //             }`}
// // //           >
// // //             {plan.name.toLowerCase().includes("premium") && (
// // //               <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
// // //                 Most Popular
// // //               </Badge>
// // //             )}
// // //             <CardHeader className="text-center">
// // //               <div className="flex justify-center mb-2">
// // //                 {getPlanIcon(plan.name)}
// // //               </div>
// // //               <CardTitle className="text-xl">{plan.name}</CardTitle>
// // //               <CardDescription>{plan.description}</CardDescription>
// // //               <div className="mt-4">
// // //                 <span className="text-3xl font-bold">
// // //                   {plan.price > 0 ? `₹${plan.price}` : "Free"}
// // //                 </span>
// // //                 <span className="text-gray-500">
// // //                   {plan.price > 0 && getBillingCycleDisplay(plan.billing_cycle)}
// // //                 </span>
// // //               </div>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <ul className="space-y-2">
// // //                 {plan.features.map((feature, index) => (
// // //                   <li key={index} className="flex items-center gap-2">
// // //                     <Check className="h-4 w-4 text-green-500" />
// // //                     <span className="text-sm">{feature}</span>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </CardContent>
// // //             <CardFooter>
// // //               <Button
// // //                 className="w-full"
// // //                 onClick={() => handleSubscribe(plan)}
// // //                 disabled={subscribing === plan.id}
// // //                 variant={
// // //                   plan.name.toLowerCase().includes("premium")
// // //                     ? "default"
// // //                     : "outline"
// // //                 }
// // //               >
// // //                 {subscribing === plan.id ? (
// // //                   <>
// // //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // //                     Processing...
// // //                   </>
// // //                 ) : plan.price > 0 ? (
// // //                   "Subscribe Now"
// // //                 ) : (
// // //                   "Activate Free Plan"
// // //                 )}
// // //               </Button>
// // //             </CardFooter>
// // //           </Card>
// // //         ))}
// // //       </div>

// // //       <div className="text-center text-sm text-gray-500 pt-4 border-t">
// // //         <p>All plans include access to our platform and customer support</p>
// // //         <p>Cancel anytime. 7-day money-back guarantee for paid plans</p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // import { useState, useEffect } from "react";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { useToast } from "@/hooks/use-toast";
// // import { supabase } from "@/integrations/supabase/client";
// // import { Check, Crown, Zap, Loader2 } from "lucide-react";

// // interface SubscriptionPlan {
// //   id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   currency: string;
// //   billing_cycle: string;
// //   features: string[];
// //   active: boolean;
// //   created_at: string;
// // }

// // declare global {
// //   interface Window {
// //     Razorpay: any;
// //   }
// // }

// // export const SubscriptionPlans = () => {
// //   const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [subscribing, setSubscribing] = useState<string | null>(null);
// //   const { toast } = useToast();

// //   useEffect(() => {
// //     fetchPlans();
// //   }, []);

// //   const fetchPlans = async () => {
// //     try {
// //       const { data, error } = await supabase
// //         .from("subscription_plans")
// //         .select("*")
// //         .eq("active", true)
// //         .order("price", { ascending: true });

// //       if (error) throw error;

// //       const parsedPlans = (data || []).map((plan) => ({
// //         ...plan,
// //         features: Array.isArray(plan.features)
// //           ? plan.features
// //           : typeof plan.features === "string"
// //           ? JSON.parse(plan.features)
// //           : [],
// //       })) as SubscriptionPlan[];

// //       setPlans(parsedPlans);
// //     } catch (error) {
// //       console.error("Error fetching plans:", error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to load subscription plans.",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

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

// //   const getBillingCycleDisplay = (cycle: string) => {
// //     switch (cycle) {
// //       case "monthly":
// //         return "/month";
// //       case "quarterly":
// //         return "/3 months";
// //       case "annually":
// //         return "/year";
// //       default:
// //         return `/${cycle}`;
// //     }
// //   };

// //   const getPlanIcon = (planName: string) => {
// //     if (planName.toLowerCase().includes("premium")) {
// //       return <Crown className="h-5 w-5 text-yellow-500" />;
// //     }
// //     return <Zap className="h-5 w-5 text-blue-500" />;
// //   };

// //   const calculateEndDate = (startDate: Date, billingCycle: string) => {
// //     const endDate = new Date(startDate);
// //     switch (billingCycle) {
// //       case "monthly":
// //         endDate.setMonth(endDate.getMonth() + 1);
// //         break;
// //       case "quarterly":
// //         endDate.setMonth(endDate.getMonth() + 3);
// //         break;
// //       case "annually":
// //         endDate.setFullYear(endDate.getFullYear() + 1);
// //         break;
// //     }
// //     return endDate;
// //   };

// //   const handleSubscribe = async (plan: SubscriptionPlan) => {
// //     try {
// //       setSubscribing(plan.id);

// //       const {
// //         data: { user },
// //         error: authError,
// //       } = await supabase.auth.getUser();
// //       console.log("kkkkkkkkkkkk",user);
// //       console.log("kkkkkkkkkkkk", authError);

// //       if (!user || authError) {
// //         toast({
// //           title: "Authentication Required",
// //           description: "Please sign in to subscribe to a plan.",
// //           variant: "destructive",
// //         });
// //         setSubscribing(null);
// //         return;
// //       }

// //       const { data: provider, error: providerError } = await supabase
// //         .from("job_providers")
// //         .select("id")
// //         .eq("user_id", user.id)
// //         .maybeSingle();

// //         if (!provider) {
// //           const { data: newProvider, error: createError } = await supabase
// //             .from("job_providers")
// //             .insert({ user_id: user.id })
// //             .select()
// //             .single();

// //           if (createError) {
// //             toast({
// //               title: "Profile Creation Failed",
// //               description: "Unable to create your provider profile.",
// //               variant: "destructive",
// //             });
// //             setSubscribing(null);
// //             return;
// //           }

// //           provider = newProvider; // assign new provider
// //         }

// //       if (!provider || providerError) {
// //         console.log("ggggggggg", provider);
// //         console.log("hhhhhhhhhhhhhh", providerError);
// //         toast({
// //           title: "Profile Required",
// //           description: "Please create your job provider profile first.",
// //           variant: "destructive",
// //         });
// //         setSubscribing(null);
// //         return;
// //       }

// //       console.log("Creating subscription for plan:", plan.name);
// //       console.log("Provider ID:", provider.id);

// //       if (plan.price === 0) {
// //         const startDate = new Date();
// //         const endDate = calculateEndDate(startDate, plan.billing_cycle);

// //         const { error: subError } = await supabase
// //           .from("provider_subscriptions")
// //           .insert({
// //             provider_id: provider.id,
// //             plan_id: plan.id,
// //             status: "active",
// //             payment_status: "active",
// //             start_date: startDate.toISOString(),
// //             end_date: endDate.toISOString(),
// //             stripe_customer_id: `cus_demo_${user.id}`,
// //             stripe_subscription_id: `sub_demo_${Date.now()}`,
// //           })
// //           .select()
// //           .single();

// //         if (subError) throw subError;

// //         toast({
// //           title: "Subscription Activated!",
// //           description: `Your ${plan.name} plan is now active!`,
// //         });
// //         setSubscribing(null);
// //         return;
// //       }

// //       const razorpayLoaded = await loadRazorpayScript();
// //       if (!razorpayLoaded) throw new Error("Failed to load payment processor");

// //       const { data: order, error: orderError } = await supabase
// //         .from("orders")
// //         .insert({
// //           user_id: user.id,
// //           plan_id: plan.id,
// //           amount: plan.price * 100,
// //           currency: plan.currency,
// //           status: "created",
// //         })
// //         .select()
// //         .single();

// //       if (orderError || !order) {
// //         throw new Error(orderError?.message || "Failed to create order");
// //       }

// //       const options = {
// //         key: "rzp_test_eK57VjQhXHjIGR",
// //         amount: (plan.price * 100).toString(),
// //         currency: plan.currency,
// //         name: "Job Portal Subscription",
// //         description: `${plan.name} Plan`,
// //         order_id: order.id,
// //         handler: async (response: any) => {
// //           try {
// //             const startDate = new Date();
// //             const endDate = calculateEndDate(startDate, plan.billing_cycle);

// //             const { data: subscription, error: subError } = await supabase
// //               .from("provider_subscriptions")
// //               .insert({
// //                 provider_id: provider.id,
// //                 plan_id: plan.id,
// //                 status: "active",
// //                 payment_status: "paid",
// //                 start_date: startDate.toISOString(),
// //                 end_date: endDate.toISOString(),
// //                 razorpay_payment_id: response.razorpay_payment_id,
// //               })
// //               .select()
// //               .single();

// //             if (subError || !subscription) throw subError;

// //             await supabase.from("payments").insert({
// //               user_id: user.id,
// //               plan_id: plan.id,
// //               subscription_id: subscription.id,
// //               amount: plan.price,
// //               currency: plan.currency,
// //               status: "succeeded",
// //               payment_method: "demo",
// //               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
// //             });

// //             await supabase
// //               .from("orders")
// //               .update({ status: "paid" })
// //               .eq("id", order.id);

// //             toast({
// //               title: "Payment Successful!",
// //               description: `Your ${plan.name} subscription is now active!`,
// //             });
// //           } catch (error: any) {
// //             console.error("Payment processing error:", error);
// //             toast({
// //               title: "Payment Failed",
// //               description: error.message || "Please contact support",
// //               variant: "destructive",
// //             });
// //           } finally {
// //             setSubscribing(null);
// //           }
// //         },
// //         prefill: {
// //           name: user.user_metadata?.full_name || "User",
// //           email: user.email || "",
// //           contact: user.phone || "",
// //         },
// //         theme: {
// //           color: "#2563eb",
// //         },
// //         modal: {
// //           ondismiss: () => {
// //             toast({
// //               title: "Payment Cancelled",
// //               description: "You cancelled the payment process.",
// //             });
// //             setSubscribing(null);
// //           },
// //         },
// //       };

// //       const rzp = new window.Razorpay(options);

// //       rzp.on("payment.failed", (response: any) => {
// //         toast({
// //           title: "Payment Failed",
// //           description: response.error.description,
// //           variant: "destructive",
// //         });
// //         setSubscribing(null);
// //       });

// //       rzp.open();
// //     } catch (error: any) {
// //       console.error("Subscription error:", error);
// //       toast({
// //         title: "Error",
// //         description: error.message || "Subscription failed",
// //         variant: "destructive",
// //       });
// //       setSubscribing(null);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <Loader2 className="h-8 w-8 animate-spin" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6 max-w-6xl mx-auto p-4">
// //       <div className="text-center">
// //         <h2 className="text-3xl font-bold text-gray-900 mb-4">
// //           Choose Your Plan
// //         </h2>
// //         <p className="text-gray-600 max-w-2xl mx-auto">
// //           Subscribe to access premium features. Choose the plan that best fits
// //           your needs.
// //         </p>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {plans.map((plan) => (
// //           <Card
// //             key={plan.id}
// //             className={`relative hover:shadow-lg transition-shadow ${
// //               plan.name.toLowerCase().includes("premium")
// //                 ? "border-yellow-200 bg-yellow-50"
// //                 : ""
// //             }`}
// //           >
// //             {plan.name.toLowerCase().includes("premium") && (
// //               <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
// //                 Most Popular
// //               </Badge>
// //             )}
// //             <CardHeader className="text-center">
// //               <div className="flex justify-center mb-2">
// //                 {getPlanIcon(plan.name)}
// //               </div>
// //               <CardTitle className="text-xl">{plan.name}</CardTitle>
// //               <CardDescription>{plan.description}</CardDescription>
// //               <div className="mt-4">
// //                 <span className="text-3xl font-bold">
// //                   {plan.price > 0 ? `₹${plan.price}` : "Free"}
// //                 </span>
// //                 <span className="text-gray-500">
// //                   {plan.price > 0 && getBillingCycleDisplay(plan.billing_cycle)}
// //                 </span>
// //               </div>
// //             </CardHeader>
// //             <CardContent>
// //               <ul className="space-y-2">
// //                 {plan.features.map((feature, index) => (
// //                   <li key={index} className="flex items-center gap-2">
// //                     <Check className="h-4 w-4 text-green-500" />
// //                     <span className="text-sm">{feature}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </CardContent>
// //             <CardFooter>
// //               <Button
// //                 className="w-full"
// //                 onClick={() => handleSubscribe(plan)}
// //                 disabled={subscribing === plan.id}
// //                 variant={
// //                   plan.name.toLowerCase().includes("premium")
// //                     ? "default"
// //                     : "outline"
// //                 }
// //               >
// //                 {subscribing === plan.id ? (
// //                   <>
// //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                     Processing...
// //                   </>
// //                 ) : plan.price > 0 ? (
// //                   "Subscribe Now"
// //                 ) : (
// //                   "Activate Free Plan"
// //                 )}
// //               </Button>
// //             </CardFooter>
// //           </Card>
// //         ))}
// //       </div>

// //       <div className="text-center text-sm text-gray-500 pt-4 border-t">
// //         <p>All plans include access to our platform and customer support</p>
// //         <p>Cancel anytime. 7-day money-back guarantee for paid plans</p>
// //       </div>
// //     </div>
// //   );
// // };

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/integrations/supabase/client";
// import { Check, Crown, Zap, Loader2 } from "lucide-react";

// interface SubscriptionPlan {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   currency: string;
//   billing_cycle: string;
//   features: string[];
//   active: boolean;
//   created_at: string;
// }

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export const SubscriptionPlans = () => {
//   const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [subscribing, setSubscribing] = useState<string | null>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("subscription_plans")
//         .select("*")
//         .eq("active", true)
//         .order("price", { ascending: true });

//       if (error) throw error;

//       const parsedPlans = (data || []).map((plan) => ({
//         ...plan,
//         features: Array.isArray(plan.features)
//           ? plan.features
//           : typeof plan.features === "string"
//           ? JSON.parse(plan.features)
//           : [],
//       })) as SubscriptionPlan[];

//       setPlans(parsedPlans);
//     } catch (error) {
//       console.error("Error fetching plans:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load subscription plans.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   const getBillingCycleDisplay = (cycle: string) => {
//     switch (cycle) {
//       case "monthly":
//         return "/month";
//       case "quarterly":
//         return "/3 months";
//       case "annually":
//         return "/year";
//       default:
//         return `/${cycle}`;
//     }
//   };

//   const getPlanIcon = (planName: string) => {
//     if (planName.toLowerCase().includes("premium")) {
//       return <Crown className="h-5 w-5 text-yellow-500" />;
//     }
//     return <Zap className="h-5 w-5 text-blue-500" />;
//   };

//   const calculateEndDate = (startDate: Date, billingCycle: string) => {
//     const endDate = new Date(startDate);
//     switch (billingCycle) {
//       case "monthly":
//         endDate.setMonth(endDate.getMonth() + 1);
//         break;
//       case "quarterly":
//         endDate.setMonth(endDate.getMonth() + 3);
//         break;
//       case "annually":
//         endDate.setFullYear(endDate.getFullYear() + 1);
//         break;
//     }
//     return endDate;
//   };

//   const handleSubscribe = async (plan: SubscriptionPlan) => {
//     try {
//       setSubscribing(plan.id);

//       const {
//         data: { user },
//         error: authError,
//       } = await supabase.auth.getUser();

//       console.log("🔐 Logged in user:", user);
//       console.log("🔐 Auth error:", authError);

//       if (!user || authError) {
//         toast({
//           title: "Authentication Required",
//           description: "Please sign in to subscribe to a plan.",
//           variant: "destructive",
//         });
//         setSubscribing(null);
//         return;
//       }

//       const { data: provider, error: providerError } = await supabase
//         .from("job_providers")
//         .select("id")
//         .eq("user_id", user.id)
//         .maybeSingle();

//       console.log("📦 Job Provider record:", provider);
//       console.log("❌ Provider error:", providerError);

//       if (!provider || providerError) {
//         toast({
//           title: "Profile Required",
//           description: "Please create your job provider profile first.",
//           variant: "destructive",
//         });
//         setSubscribing(null);
//         return;
//       }

//       if (plan.price === 0) {
//         const startDate = new Date();
//         const endDate = calculateEndDate(startDate, plan.billing_cycle);

//         const { error: subError } = await supabase
//           .from("provider_subscriptions")
//           .insert({
//             provider_id: provider.id,
//             plan_id: plan.id,
//             status: "active",
//             payment_status: "active",
//             start_date: startDate.toISOString(),
//             end_date: endDate.toISOString(),
//             stripe_customer_id: `cus_demo_${user.id}`,
//             stripe_subscription_id: `sub_demo_${Date.now()}`,
//           })
//           .select()
//           .single();

//         if (subError) throw subError;

//         toast({
//           title: "Subscription Activated!",
//           description: `Your ${plan.name} plan is now active!`,
//         });
//         setSubscribing(null);
//         return;
//       }

//       const razorpayLoaded = await loadRazorpayScript();
//       if (!razorpayLoaded) throw new Error("Failed to load Razorpay script");

//       const { data: order, error: orderError } = await supabase
//         .from("orders")
//         .insert({
//           user_id: user.id,
//           plan_id: plan.id,
//           amount: plan.price * 100,
//           currency: plan.currency,
//           status: "created",
//         })
//         .select()
//         .single();

//       if (orderError || !order) {
//         throw new Error(orderError?.message || "Failed to create order");
//       }

//       const options = {
//         key: "rzp_test_eK57VjQhXHjIGR",
//         amount: (plan.price * 100).toString(),
//         currency: plan.currency,
//         name: "Job Portal Subscription",
//         description: `${plan.name} Plan`,
//         order_id: order.id,
//         handler: async (response: any) => {
//           try {
//             const startDate = new Date();
//             const endDate = calculateEndDate(startDate, plan.billing_cycle);

//             const { data: subscription, error: subError } = await supabase
//               .from("provider_subscriptions")
//               .insert({
//                 provider_id: provider.id,
//                 plan_id: plan.id,
//                 status: "active",
//                 payment_status: "paid",
//                 start_date: startDate.toISOString(),
//                 end_date: endDate.toISOString(),
//                 razorpay_payment_id: response.razorpay_payment_id,
//               })
//               .select()
//               .single();

//             if (subError || !subscription) throw subError;

//             await supabase.from("payments").insert({
//               user_id: user.id,
//               plan_id: plan.id,
//               subscription_id: subscription.id,
//               amount: plan.price,
//               currency: plan.currency,
//               status: "succeeded",
//               payment_method: "razorpay",
//               razorpay_payment_id: response.razorpay_payment_id,
// razorpay_order_id: response.razorpay_order_id,
// razorpay_signature: response.razorpay_signature,
//             });

//             await supabase
//               .from("orders")
//               .update({ status: "paid" })
//               .eq("id", order.id);

//             toast({
//               title: "Payment Successful!",
//               description: `Your ${plan.name} subscription is now active!`,
//             });
//           } catch (error: any) {
//             console.error("💥 Payment processing error:", error);
//             toast({
//               title: "Payment Failed",
//               description: error.message || "Please contact support.",
//               variant: "destructive",
//             });
//           } finally {
//             setSubscribing(null);
//           }
//         },
//         prefill: {
//           name: user.user_metadata?.full_name || "User",
//           email: user.email || "",
//           contact: user.phone || "",
//         },
//         theme: {
//           color: "#2563eb",
//         },
//         modal: {
//           ondismiss: () => {
//             toast({
//               title: "Payment Cancelled",
//               description: "You cancelled the payment process.",
//             });
//             setSubscribing(null);
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);

//       rzp.on("payment.failed", (response: any) => {
//         toast({
//           title: "Payment Failed",
//           description: response.error.description,
//           variant: "destructive",
//         });
//         setSubscribing(null);
//       });

//       rzp.open();
//     } catch (error: any) {
//       console.error("❌ Subscription error:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Subscription failed",
//         variant: "destructive",
//       });
//       setSubscribing(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 max-w-6xl mx-auto p-4">
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">
//           Choose Your Plan
//         </h2>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Subscribe to access premium features. Choose the plan that best fits
//           your needs.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {plans.map((plan) => (
//           <Card
//             key={plan.id}
//             className={`relative hover:shadow-lg transition-shadow ${
//               plan.name.toLowerCase().includes("premium")
//                 ? "border-yellow-200 bg-yellow-50"
//                 : ""
//             }`}
//           >
//             {plan.name.toLowerCase().includes("premium") && (
//               <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
//                 Most Popular
//               </Badge>
//             )}
//             <CardHeader className="text-center">
//               <div className="flex justify-center mb-2">
//                 {getPlanIcon(plan.name)}
//               </div>
//               <CardTitle className="text-xl">{plan.name}</CardTitle>
//               <CardDescription>{plan.description}</CardDescription>
//               <div className="mt-4">
//                 <span className="text-3xl font-bold">
//                   {plan.price > 0 ? `₹${plan.price}` : "Free"}
//                 </span>
//                 <span className="text-gray-500">
//                   {plan.price > 0 && getBillingCycleDisplay(plan.billing_cycle)}
//                 </span>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-2">
//                 {plan.features.map((feature, index) => (
//                   <li key={index} className="flex items-center gap-2">
//                     <Check className="h-4 w-4 text-green-500" />
//                     <span className="text-sm">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 className="w-full"
//                 onClick={() => handleSubscribe(plan)}
//                 disabled={subscribing === plan.id}
//                 variant={
//                   plan.name.toLowerCase().includes("premium")
//                     ? "default"
//                     : "outline"
//                 }
//               >
//                 {subscribing === plan.id ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing...
//                   </>
//                 ) : plan.price > 0 ? (
//                   "Subscribe Now"
//                 ) : (
//                   "Activate Free Plan"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       <div className="text-center text-sm text-gray-500 pt-4 border-t">
//         <p>All plans include access to our platform and customer support</p>
//         <p>Cancel anytime. 7-day money-back guarantee for paid plans</p>
//       </div>
//     </div>
//   );
// };

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/integrations/supabase/client";
// import { Check, Crown, Zap } from "lucide-react";

// interface SubscriptionPlan {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   currency: string;
//   billing_cycle: string;
//   features: string[];
//   active: boolean;
//   created_at: string;
// }

// export const SubscriptionPlans = () => {
//   const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [subscribing, setSubscribing] = useState<string | null>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('subscription_plans')
//         .select('*')
//         .eq('active', true)
//         .order('price', { ascending: true });

//       if (error) throw error;

//       // Parse features as string array
//       const parsedPlans = (data || []).map(plan => ({
//         ...plan,
//         features: Array.isArray(plan.features) ? plan.features :
//                   typeof plan.features === 'string' ? JSON.parse(plan.features) : []
//       })) as SubscriptionPlan[];

//       setPlans(parsedPlans);
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load subscription plans.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubscribe = async (planId: string) => {
//     try {
//       setSubscribing(planId);

//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) {
//         toast({
//           title: "Authentication Required",
//           description: "Please sign in to subscribe to a plan.",
//           variant: "destructive",
//         });
//         return;
//       }

//       // Call edge function to create subscription
//       const { data, error } = await supabase.functions.invoke('create-subscription', {
//         body: { planId, userId: user.id }
//       });

//       if (error) throw error;

//       if (data.success) {
//         // In a real implementation, redirect to Stripe checkout
//         // For demo, just show success message
//         toast({
//           title: "Subscription Created",
//           description: "Your subscription has been activated successfully!",
//         });

//         // Simulate redirect to payment
//         window.location.href = data.url;
//       }
//     } catch (error) {
//       console.error('Error creating subscription:', error);
//       toast({
//         title: "Error",
//         description: "Failed to create subscription. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setSubscribing(null);
//     }
//   };

//   const getBillingCycleDisplay = (cycle: string) => {
//     switch (cycle) {
//       case 'monthly': return '/month';
//       case 'quarterly': return '/3 months';
//       case 'annually': return '/year';
//       default: return `/${cycle}`;
//     }
//   };

//   const getPlanIcon = (planName: string) => {
//     if (planName.toLowerCase().includes('premium')) {
//       return <Crown className="h-5 w-5 text-yellow-500" />;
//     }
//     return <Zap className="h-5 w-5 text-blue-500" />;
//   };

//   if (loading) {
//     return <div className="text-center py-8">Loading subscription plans...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Subscribe to access job seeker profiles and contact information. Choose the plan that best fits your hiring needs.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {plans.map((plan) => (
//           <Card key={plan.id} className={`relative hover:shadow-lg transition-shadow ${
//             plan.name.toLowerCase().includes('premium') ? 'border-yellow-200 bg-yellow-50' : ''
//           }`}>
//             {plan.name.toLowerCase().includes('premium') && (
//               <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
//                 Most Popular
//               </Badge>
//             )}

//             <CardHeader className="text-center">
//               <div className="flex justify-center mb-2">
//                 {getPlanIcon(plan.name)}
//               </div>
//               <CardTitle className="text-xl">{plan.name}</CardTitle>
//               <CardDescription>{plan.description}</CardDescription>
//               <div className="mt-4">
//                 <span className="text-3xl font-bold">${plan.price}</span>
//                 <span className="text-gray-500">{getBillingCycleDisplay(plan.billing_cycle)}</span>
//               </div>
//             </CardHeader>

//             <CardContent>
//               <ul className="space-y-2">
//                 {plan.features.map((feature, index) => (
//                   <li key={index} className="flex items-center gap-2">
//                     <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
//                     <span className="text-sm">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>

//             <CardFooter>
//               <Button
//                 className="w-full"
//                 onClick={() => handleSubscribe(plan.id)}
//                 disabled={subscribing === plan.id}
//                 variant={plan.name.toLowerCase().includes('premium') ? 'default' : 'outline'}
//               >
//                 {subscribing === plan.id ? 'Processing...' : 'Subscribe Now'}
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       <div className="text-center text-sm text-gray-500">
//         <p>All plans include access to our secure platform and customer support.</p>
//         <p>You can cancel your subscription at any time.</p>
//       </div>
//     </div>
//   );
// };

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/integrations/supabase/client";
// import { Check, Crown, Zap, Loader2 } from "lucide-react";

// interface SubscriptionPlan {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   currency: string;
//   billing_cycle: string;
//   features: string[];
//   active: boolean;
//   created_at: string;
// }

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export const SubscriptionPlans = () => {
//   const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [subscribing, setSubscribing] = useState<string | null>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("subscription_plans")
//         .select("*")
//         .eq("active", true)
//         .order("price", { ascending: true });

//       if (error) throw error;

//       // const parsedPlans = (data || []).map((plan) => ({

//       // Parse features as string array

//       // console.log("Raw subscription plans dataaaaaaaaaaaa:", data);
//       const parsedPlans = (data || []).map(plan => ({

//         ...plan,
//         features: Array.isArray(plan.features)
//           ? plan.features
//           : typeof plan.features === "string"
//           ? JSON.parse(plan.features)
//           : [],
//       })) as SubscriptionPlan[];

//       setPlans(parsedPlans);
//     } catch (error) {
//       console.error("Error fetching plans:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load subscription plans.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   const getBillingCycleDisplay = (cycle: string) => {
//     switch (cycle) {
//       case "monthly":
//         return "/month";
//       case "quarterly":
//         return "/3 months";
//       case "annually":
//         return "/year";
//       default:
//         return `/${cycle}`;
//     }
//   };

//   const getPlanIcon = (planName: string) => {
//     if (planName.toLowerCase().includes("premium")) {
//       return <Crown className="h-5 w-5 text-yellow-500" />;
//     }
//     return <Zap className="h-5 w-5 text-blue-500" />;
//   };

//   const calculateEndDate = (startDate: Date, billingCycle: string) => {
//     const endDate = new Date(startDate);
//     switch (billingCycle) {
//       case "monthly":
//         endDate.setMonth(endDate.getMonth() + 1);
//         break;
//       case "quarterly":
//         endDate.setMonth(endDate.getMonth() + 3);
//         break;
//       case "annually":
//         endDate.setFullYear(endDate.getFullYear() + 1);
//         break;
//     }
//     return endDate;
//   };

//   const handleSubscribe = async (plan: SubscriptionPlan) => {
//     try {
//       setSubscribing(plan.id);

//       const {
//         data: { user },
//         error: authError,
//       } = await supabase.auth.getUser();

//       if (!user || authError) {
//         toast({
//           title: "Authentication Required",
//           description: "Please sign in to subscribe to a plan.",
//           variant: "destructive",
//         });
//         setSubscribing(null);
//         return;
//       }

//       const { data: provider, error: providerError } = await supabase
//         .from("job_providers")
//         .select("id")
//         .eq("user_id", user.id)
//         .maybeSingle();

//       if (!provider || providerError) {
//         toast({
//           title: "Profile Required",
//           description: "Please create your job provider profile first.",
//           variant: "destructive",
//         });
//         setSubscribing(null);
//         return;
//       }

//       if (plan.price === 0) {
//         const startDate = new Date();
//         const endDate = calculateEndDate(startDate, plan.billing_cycle);

//         const { error: subError } = await supabase
//           .from("provider_subscriptions")
//           .insert({
//             provider_id: provider.id,
//             plan_id: plan.id,
//             status: "active",
//             payment_status: "active",
//             start_date: startDate.toISOString(),
//             end_date: endDate.toISOString(),
//             stripe_customer_id: `cus_demo_${user.id}`,
//             stripe_subscription_id: `sub_demo_${Date.now()}`,
//           });

//         if (subError) throw subError;

//         toast({
//           title: "Subscription Activated!",
//           description: `Your ${plan.name} plan is now active!`,
//         });
//         setSubscribing(null);
//         return;
//       }

//       const razorpayLoaded = await loadRazorpayScript();
//       if (!razorpayLoaded) throw new Error("Failed to load Razorpay script");

//       // FIX: Changed column name from 'plan_id' to 'subscription_plan_id'
//       const { data: order, error: orderError } = await supabase
//         .from("orders")
//         .insert({
//           user_id: user.id,
//           // subscription_plan_id: plan.id, // Corrected column name
//           amount: plan.price * 100,
//           currency: plan.currency,
//           status: "created",
//           payment_method: "razorpay",
//         })
//         .select()
//         .single();

//       if (orderError || !order) {
//         throw new Error(orderError?.message || "Failed to create order");
//       }

//       const options = {
//         key: "rzp_test_eK57VjQhXHjIGR", // Replace with your actual Razorpay key
//         amount: (plan.price * 100).toString(),
//         currency: plan.currency,
//         name: "Job Portal Subscription",
//         description: `${plan.name} Plan`,
//         // order_id: order.id,
//         handler: async (response: any) => {
//           try {
//             const startDate = new Date();
//             const endDate = calculateEndDate(startDate, plan.billing_cycle);

//             const { data: subscription, error: subError } = await supabase
//               .from("provider_subscriptions")
//               .insert({
//                 provider_id: provider.id,
//                 plan_id: plan.id,
//                 status: "active",
//                 payment_status: "active",
//                 start_date: startDate.toISOString(),
//                 end_date: endDate.toISOString(),
//                 razorpay_payment_id: response.razorpay_payment_id,
//               })
//               .select()
//               .single();

//             if (subError || !subscription) throw subError;

//             // FIX: Changed column name from 'plan_id' to 'subscription_plan_id'
//             await supabase.from("payments").insert({
//               user_id: user.id,
//               // subscription_plan_id: plan.id, // Corrected column name
//               subscription_id: subscription.id,
//               amount: plan.price,
//               currency: plan.currency,
//               status: "succeeded",
//               payment_method: "razorpay",
//               razorpay_payment_id: response.razorpay_payment_id,
// razorpay_order_id: response.razorpay_order_id,
// razorpay_signature: response.razorpay_signature,
//             });

//             await supabase
//               .from("orders")
//               .update({ status: "paid" ,
//                razorpay_payment_id: response.razorpay_payment_id ,
//  razorpay_signature: response.razorpay_signature})
//               .eq("id", order.id);

//             toast({
//               title: "Payment Successful!",
//               description: `Your ${plan.name} subscription is now active!`,
//             });

//           } catch (error: any) {
//             console.error("Payment processing error:", error);
//             toast({
//               title: "Payment Failed",
//               description: error.message || "Please contact support.",
//               variant: "destructive",
//             });
//           } finally {
//             setSubscribing(null);
//           }
//         },
//         prefill: {
//           name: user.user_metadata?.full_name || "User",
//           email: user.email || "",
//           contact: user.phone || "",
//         },
//         theme: {
//           color: "#2563eb",
//         },
//         modal: {
//           ondismiss: () => {
//             toast({
//               title: "Payment Cancelled",
//               description: "You cancelled the payment process.",
//             });
//             setSubscribing(null);
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);

//       rzp.on("payment.failed", (response: any) => {
//         toast({
//           title: "Payment Failed",
//           description: response.error.description,
//           variant: "destructive",
//         });
//         setSubscribing(null);
//       });

//       rzp.open();
//     } catch (error: any) {
//       console.error("Subscription error:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Subscription failed",
//         variant: "destructive",
//       });
//       setSubscribing(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 max-w-6xl mx-auto p-4">
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">
//           Choose Your Plan
//         </h2>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Subscribe to access premium features. Choose the plan that best fits
//           your needs.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {plans.map((plan) => (
//           <Card
//             key={plan.id}
//             className={`relative hover:shadow-lg transition-shadow ${
//               plan.name.toLowerCase().includes("premium")
//                 ? "border-yellow-200 bg-yellow-50"
//                 : ""
//             }`}
//           >
//             {plan.name.toLowerCase().includes("premium") && (
//               <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
//                 Most Popular
//               </Badge>
//             )}
//             <CardHeader className="text-center">
//               <div className="flex justify-center mb-2">
//                 {getPlanIcon(plan.name)}
//               </div>
//               <CardTitle className="text-xl">{plan.name}</CardTitle>
//               <CardDescription>{plan.description}</CardDescription>
//               <div className="mt-4">
//                 <span className="text-3xl font-bold">
//                   {plan.price > 0 ? `₹${plan.price}` : "Free"}
//                 </span>
//                 <span className="text-gray-500">
//                   {plan.price > 0 && getBillingCycleDisplay(plan.billing_cycle)}
//                 </span>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-2">
//                 {plan.features.map((feature, index) => (
//                   <li key={index} className="flex items-center gap-2">
//                     <Check className="h-4 w-4 text-green-500" />
//                     <span className="text-sm">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 className="w-full"
//                 onClick={() => handleSubscribe(plan)}
//                 disabled={subscribing === plan.id}
//                 variant={
//                   plan.name.toLowerCase().includes("premium")
//                     ? "default"
//                     : "outline"
//                 }
//               >
//                 {subscribing === plan.id ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing...
//                   </>
//                 ) : plan.price > 0 ? (
//                   "Subscribe Now"
//                 ) : (
//                   "Activate Free Plan"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       <div className="text-center text-sm text-gray-500 pt-4 border-t">
//         <p>All plans include access to our platform and customer support</p>
//         <p>Cancel anytime. 7-day money-back guarantee for paid plans</p>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Crown, Zap, Loader2 } from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_cycle: string;
  features: string[];
  active: boolean;
  created_at: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const { toast } = useToast();
  const Key_payment = import.meta.env.VITE_RAZORPAY_KEY_ID;

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*")
        .eq("active", true)
        .order("price", { ascending: true });

      if (error) throw error;

      const parsedPlans = (data || []).map((plan) => ({
        ...plan,
        features: Array.isArray(plan.features)
          ? plan.features
          : typeof plan.features === "string"
          ? JSON.parse(plan.features)
          : [],
        // Force INR currency for all plans
        currency: "INR",
      })) as SubscriptionPlan[];

      setPlans(parsedPlans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast({
        title: "Error",
        description: "Failed to load subscription plans.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) return resolve(true);

      // Check if running in a browser environment
      if (typeof window === "undefined") {
        console.error("Razorpay cannot be loaded in non-browser environment");
        return resolve(false);
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      // Add error handling for script loading
      script.onload = () => {
        if (window.Razorpay) {
          resolve(true);
        } else {
          console.error(
            "Razorpay script loaded but window.Razorpay not available"
          );
          resolve(false);
        }
      };

      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const getBillingCycleDisplay = (cycle: string) => {
    switch (cycle) {
      case "monthly":
        return "/month";
      case "quarterly":
        return "/3 months";
      case "annually":
        return "/year";
      default:
        return `/${cycle}`;
    }
  };

  const getPlanIcon = (planName: string) => {
    if (planName.toLowerCase().includes("premium")) {
      return <Crown className="h-5 w-5 text-yellow-500" />;
    }
    return <Zap className="h-5 w-5 text-blue-500" />;
  };

  const calculateEndDate = (startDate: Date, billingCycle: string) => {
    const endDate = new Date(startDate);
    switch (billingCycle) {
      case "monthly":
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case "quarterly":
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case "annually":
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }
    return endDate;
  };

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    try {
      setSubscribing(plan.id);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to subscribe to a plan.",
          variant: "destructive",
        });
        setSubscribing(null);
        return;
      }

      const { data: provider, error: providerError } = await supabase
        .from("job_providers")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!provider || providerError) {
        toast({
          title: "Profile Required",
          description: "Please create your job provider profile first.",
          variant: "destructive",
        });
        setSubscribing(null);
        return;
      }

      if (plan.price === 0) {
        const startDate = new Date();
        const endDate = calculateEndDate(startDate, plan.billing_cycle);

        const { error: subError } = await supabase
          .from("provider_subscriptions")
          .insert({
            provider_id: provider.id,
            plan_id: plan.id,
            status: "active",
            payment_status: "active",
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            stripe_customer_id: `cus_demo_${user.id}`,
            stripe_subscription_id: `sub_demo_${Date.now()}`,
          });

        if (subError) throw subError;

        toast({
          title: "Subscription Activated!",
          description: `Your ${plan.name} plan is now active!`,
        });
        setSubscribing(null);
        return;
      }

      // Ensure Razorpay is properly loaded
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        throw new Error(
          "Payment service is currently unavailable. Please try again later."
        );
      }

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          amount: plan.price * 100, // Razorpay expects amount in paise
          currency: "INR", // Force INR currency
          status: "created",
          payment_method: "razorpay",
        })
        .select()
        .single();

      if (orderError || !order) {
        throw new Error(orderError?.message || "Failed to create order");
      }

      const options = {
        key: Key_payment, // Use from environment variables
        amount: (plan.price * 100).toString(), // Amount in paise
        currency: "INR", // Explicitly set to INR
        name: "Job Portal Subscription",
        description: `${plan.name} Plan`,
        image: "https://your-logo-url.com/logo.png", // Add your logo
        // order_id: order.id,
        handler: async (response: any) => {
          try {
            const startDate = new Date();
            const endDate = calculateEndDate(startDate, plan.billing_cycle);

            const { data: subscription, error: subError } = await supabase
              .from("provider_subscriptions")
              .insert({
                provider_id: provider.id,
                plan_id: plan.id,
                status: "active",
                payment_status: "active",
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
                razorpay_payment_id: response.razorpay_payment_id,
                // // razorpay_order_id: response.razorpay_order_id,
                // // razorpay_signature: response.razorpay_signature,
              })
              .select()
              .single();

            if (subError || !subscription) throw subError;

            await supabase.from("payments").insert({
              user_id: user.id,
              subscription_id: subscription.id,
              amount: plan.price,
              currency: "INR",
              status: "succeeded",
              payment_method: "razorpay",
              razorpay_payment_id: response.razorpay_payment_id,
              // // razorpay_order_id: response.razorpay_order_id,
              // // razorpay_signature: response.razorpay_signature,
            });

            await supabase
              .from("orders")
              .update({
                status: "paid",
                razorpay_payment_id: response.razorpay_payment_id,
                // // razorpay_order_id: response.razorpay_order_id,
                // // razorpay_signature: response.razorpay_signature,
              })
              .eq("id", order.id);

            toast({
              title: "Payment Successful!",
              description: `Your ${plan.name} subscription is now active!`,
            });
          } catch (error: any) {
            console.error("Payment processing error:", error);
            toast({
              title: "Payment Failed",
              description: error.message || "Please contact support.",
              variant: "destructive",
            });
          } finally {
            setSubscribing(null);
          }
        },
        prefill: {
          name: user.user_metadata?.full_name || "User",
          email: user.email || "",
          contact: user.phone || "",
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: () => {
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process.",
            });
            setSubscribing(null);
          },
        },
        notes: {
          plan: plan.name,
          userId: user.id,
        },
      };

      // Verify Razorpay is available before creating instance
      if (!window.Razorpay) {
        throw new Error(
          "Payment service is not available. Please refresh the page."
        );
      }

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response.error);
        toast({
          title: "Payment Failed",
          description:
            response.error.description || "Payment could not be processed",
          variant: "destructive",
        });
        setSubscribing(null);
      });

      rzp.open();
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: error.message || "Subscription failed",
        variant: "destructive",
      });
      setSubscribing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Subscribe to access premium features. Choose the plan that best fits
          your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative hover:shadow-lg transition-shadow ${
              plan.name.toLowerCase().includes("premium")
                ? "border-yellow-200 bg-yellow-50"
                : ""
            }`}
          >
            {plan.name.toLowerCase().includes("premium") && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
                Most Popular
              </Badge>
            )}
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                {getPlanIcon(plan.name)}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  {plan.price > 0 ? `₹${plan.price}` : "Free"}
                </span>
                <span className="text-gray-500">
                  {plan.price > 0 && getBillingCycleDisplay(plan.billing_cycle)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleSubscribe(plan)}
                disabled={subscribing === plan.id}
                variant={
                  plan.name.toLowerCase().includes("premium")
                    ? "default"
                    : "outline"
                }
              >
                {subscribing === plan.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : plan.price > 0 ? (
                  "Subscribe Now"
                ) : (
                  "Activate Free Plan"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500 pt-4 border-t">
        <p>All plans include access to our platform and customer support</p>
        <p>Cancel anytime. 7-day money-back guarantee for paid plans</p>
      </div>
    </div>
  );
};
