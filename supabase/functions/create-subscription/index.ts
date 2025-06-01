
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { planId, userId } = await req.json();

    if (!planId || !userId) {
      throw new Error('Missing required parameters');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the subscription plan
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError || !plan) {
      throw new Error('Subscription plan not found');
    }

    // Check if user has a job provider profile
    const { data: provider, error: providerError } = await supabase
      .from('job_providers')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (providerError || !provider) {
      throw new Error('Job provider profile not found. Please create your profile first.');
    }

    // For now, we'll simulate a successful payment and create an active subscription
    // In production, you would integrate with Stripe here
    console.log('Creating subscription for plan:', plan.name);
    console.log('Provider ID:', provider.id);

    // Calculate end date based on billing cycle
    const startDate = new Date();
    const endDate = new Date();
    
    switch (plan.billing_cycle) {
      case 'monthly':
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case 'quarterly':
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case 'annually':
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }

    // Create subscription record
    const { data: subscription, error: subError } = await supabase
      .from('provider_subscriptions')
      .insert({
        provider_id: provider.id,
        plan_id: planId,
        status: 'active',
        payment_status: 'active',
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        stripe_customer_id: `cus_demo_${userId}`,
        stripe_subscription_id: `sub_demo_${Date.now()}`
      })
      .select()
      .single();

    if (subError) {
      throw new Error('Failed to create subscription');
    }

    // Create payment record
    await supabase
      .from('payments')
      .insert({
        user_id: userId,
        subscription_id: subscription.id,
        amount: plan.price,
        currency: plan.currency,
        status: 'succeeded',
        payment_method: 'demo',
        stripe_payment_intent_id: `pi_demo_${Date.now()}`
      });

    // In a real implementation, you would return the Stripe checkout URL
    // For demo purposes, we'll return a success URL
    return new Response(
      JSON.stringify({ 
        success: true,
        url: `${req.headers.get('origin')}/job-portal?subscription=success`,
        subscription_id: subscription.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error creating subscription:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
