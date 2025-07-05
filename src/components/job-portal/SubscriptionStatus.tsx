
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Crown, AlertCircle, CheckCircle } from "lucide-react";

interface SubscriptionInfo {
  id: string;
  status: string;
  plan: {
    name: string;
    price: number;
    billing_cycle: string;
  };
  start_date: string;
  end_date: string | null;
}

export const SubscriptionStatus = () => {
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      // Check if user has a job provider profile
      const { data: providerData } = await supabase
        .from('job_providers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!providerData) return;

      // Get subscription info
      const { data: subData, error } = await supabase
        .from('provider_subscriptions')
        .select(`
          id,
          status,
          start_date,
          end_date,
          subscription_plans (
            name,
            price,
            billing_cycle
          )
        `)
        .eq('provider_id', providerData.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (subData) {
        setSubscription({
          id: subData.id,
          status: subData.status,
          plan: subData.subscription_plans as any,
          start_date: subData.start_date,
          end_date: subData.end_date
        });
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    } finally {
      
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'past_due':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Past Due</Badge>;
      case 'cancelled':
        return <Badge variant="outline"><AlertCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (loading) {
    return <div>Checking subscription status...</div>;
  }

  if (!subscription) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <Crown className="h-5 w-5" />
            No Active Subscription
          </CardTitle>
          <CardDescription className="text-amber-700">
            Subscribe to access job seeker profiles and premium features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-amber-600 hover:bg-amber-700">
            View Subscription Plans
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          Your Subscription
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">{subscription.plan.name}</span>
          {getStatusBadge(subscription.status)}
        </div>
        
        <div className="text-2xl font-bold text-blue-600">
          ${subscription.plan.price}/{subscription.plan.billing_cycle === 'monthly' ? 'mo' : subscription.plan.billing_cycle === 'quarterly' ? '3mo' : 'year'}
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p>Started: {new Date(subscription.start_date).toLocaleDateString()}</p>
          {subscription.end_date && (
            <p>Ends: {new Date(subscription.end_date).toLocaleDateString()}</p>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Manage Subscription
          </Button>
          <Button variant="ghost" size="sm">
            View Invoices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
