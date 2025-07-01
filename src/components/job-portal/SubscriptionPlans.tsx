
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





import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Crown, Zap } from "lucide-react";

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

export const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('active', true)
        .order('price', { ascending: true });

      if (error) throw error;
      
      // Parse features as string array

      console.log("Raw subscription plans dataaaaaaaaaaaa:", data);
      const parsedPlans = (data || []).map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : 
                  typeof plan.features === 'string' ? JSON.parse(plan.features) : []
      })) as SubscriptionPlan[];
      
      setPlans(parsedPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription plans.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      setSubscribing(planId);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to subscribe to a plan.",
          variant: "destructive",
        });
        return;
      }

      // Call edge function to create subscription
      const { data, error } = await supabase.functions.invoke('create-subscription', {
        body: { planId, userId: user.id }
      });

      if (error) throw error;

      if (data.success) {
        // In a real implementation, redirect to Stripe checkout
        // For demo, just show success message
        toast({
          title: "Subscription Created",
          description: "Your subscription has been activated successfully!",
        });
        
        // Simulate redirect to payment
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Error",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubscribing(null);
    }
  };

  const getBillingCycleDisplay = (cycle: string) => {
    switch (cycle) {
      case 'monthly': return '/month';
      case 'quarterly': return '/3 months';
      case 'annually': return '/year';
      default: return `/${cycle}`;
    }
  };

  const getPlanIcon = (planName: string) => {
    if (planName.toLowerCase().includes('premium')) {
      return <Crown className="h-5 w-5 text-yellow-500" />;
    }
    return <Zap className="h-5 w-5 text-blue-500" />;
  };

  if (loading) {
    return <div className="text-center py-8">Loading subscription plans...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Subscribe to access job seeker profiles and contact information. Choose the plan that best fits your hiring needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative hover:shadow-lg transition-shadow ${
            plan.name.toLowerCase().includes('premium') ? 'border-yellow-200 bg-yellow-50' : ''
          }`}>
            {plan.name.toLowerCase().includes('premium') && (
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
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-500">{getBillingCycleDisplay(plan.billing_cycle)}</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleSubscribe(plan.id)}
                disabled={subscribing === plan.id}
                variant={plan.name.toLowerCase().includes('premium') ? 'default' : 'outline'}
              >
                {subscribing === plan.id ? 'Processing...' : 'Subscribe Now'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>All plans include access to our secure platform and customer support.</p>
        <p>You can cancel your subscription at any time.</p>
      </div>
    </div>
  );
};
