
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Crown, Star } from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  features: string[];
}

export const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
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
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription plans",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      setProcessing(planId);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to subscribe",
          variant: "destructive",
        });
        return;
      }

      // Call edge function to create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-subscription', {
        body: { planId, userId: user.id }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Error",
        description: "Failed to process subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  const getPlanIcon = (name: string) => {
    if (name.toLowerCase().includes('premium')) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (name.toLowerCase().includes('basic')) return <Star className="h-5 w-5 text-blue-500" />;
    return null;
  };

  const formatPrice = (price: number, cycle: string) => {
    return `$${price}/${cycle === 'monthly' ? 'mo' : cycle === 'quarterly' ? '3mo' : 'year'}`;
  };

  if (loading) {
    return <div className="text-center">Loading subscription plans...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Subscription Plan</h2>
        <p className="text-gray-600 text-lg">
          Get access to job seeker and provider profiles with our flexible subscription plans
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.name.toLowerCase().includes('premium') ? 'border-yellow-400 shadow-lg' : ''}`}>
            {plan.name.toLowerCase().includes('premium') && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getPlanIcon(plan.name)}
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="text-3xl font-bold text-blue-600">
                {formatPrice(plan.price, plan.billing_cycle)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleSubscribe(plan.id)}
                disabled={processing === plan.id}
                className={`w-full ${plan.name.toLowerCase().includes('premium') ? 'bg-yellow-600 hover:bg-yellow-700' : ''}`}
              >
                {processing === plan.id ? "Processing..." : "Subscribe Now"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
