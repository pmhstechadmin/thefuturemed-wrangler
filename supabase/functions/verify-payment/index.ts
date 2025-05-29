
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve session details
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      // Create Supabase service client
      const supabaseService = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      const courseId = session.metadata?.courseId;
      const userId = session.metadata?.userId;
      const paymentMethod = session.metadata?.paymentMethod || 'stripe';

      if (courseId && userId) {
        // Update order status
        await supabaseService
          .from("orders")
          .update({ 
            status: "paid",
            payment_method: paymentMethod 
          })
          .eq("stripe_session_id", sessionId);

        // Create enrollment record
        await supabaseService
          .from("course_enrollments")
          .insert({
            user_id: userId,
            course_id: courseId,
            payment_status: "paid",
            stripe_session_id: sessionId,
            amount: session.amount_total,
            currency: session.currency,
            payment_method: paymentMethod,
          });

        // Trigger email confirmation
        await supabaseService.functions.invoke('send-enrollment-email', {
          body: { userId, courseId, sessionId }
        });
      }
    }

    return new Response(JSON.stringify({ 
      status: session.payment_status,
      enrolled: session.payment_status === 'paid'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
