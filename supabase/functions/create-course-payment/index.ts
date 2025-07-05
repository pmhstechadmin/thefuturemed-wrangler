
// import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// import Stripe from "https://esm.sh/stripe@14.21.0";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
// };

// serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response(null, { headers: corsHeaders });
//   }

//   try {
//     const { courseId, paymentMethod = 'stripe' } = await req.json();
    
//     console.log('Creating payment for course:', courseId, 'with method:', paymentMethod);
    
//     // Create Supabase client
//     const supabaseClient = createClient(
//       Deno.env.get("SUPABASE_URL") ?? "",
//       Deno.env.get("SUPABASE_ANON_KEY") ?? ""
//     );

//     // Get authenticated user
//     const authHeader = req.headers.get("Authorization")!;
//     const token = authHeader.replace("Bearer ", "");
//     const { data } = await supabaseClient.auth.getUser(token);
//     const user = data.user;
//     if (!user?.email) throw new Error("User not authenticated");

//     // Get course details using service role key to bypass RLS
//     const supabaseService = createClient(
//       Deno.env.get("SUPABASE_URL") ?? "",
//       Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
//       { auth: { persistSession: false } }
//     );

//     const { data: course, error: courseError } = await supabaseService
//       .from('courses')
//       .select('*')
//       .eq('id', courseId)
//       .single();

//     if (courseError || !course) {
//       console.error('Course fetch error:', courseError);
//       throw new Error("Course not found");
//     }

//     console.log('Found course:', course.title);

//     // Check if user is already enrolled
//     const { data: existingEnrollment } = await supabaseService
//       .from('course_enrollments')
//       .select('*')
//       .eq('user_id', user.id)
//       .eq('course_id', courseId)
//       .eq('payment_status', 'paid')
//       .single();

//     if (existingEnrollment) {
//       throw new Error("You are already enrolled in this course");
//     }

//     // Check if Stripe secret key is configured
//     const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
//     if (!stripeSecretKey) {
//       throw new Error("Stripe is not configured. Please contact administrator.");
//     }

//     // Initialize Stripe
//     const stripe = new Stripe(stripeSecretKey, {
//       apiVersion: "2023-10-16",
//     });

//     // Check if customer exists
//     const customers = await stripe.customers.list({ email: user.email, limit: 1 });
//     let customerId;
//     if (customers.data.length > 0) {
//       customerId = customers.data[0].id;
//     }

//     // Create checkout session with enhanced security
//     const session = await stripe.checkout.sessions.create({
//       customer: customerId,
//       customer_email: customerId ? undefined : user.email,
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: { 
//               name: course.title,
//               description: course.description || `Enroll in ${course.title}`,
//             },
//             unit_amount: 4999, // $49.99
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${req.headers.get("origin")}/course/${courseId}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${req.headers.get("origin")}/course/${courseId}?payment=canceled`,
//       metadata: {
//         courseId: courseId,
//         userId: user.id,
//         paymentMethod: paymentMethod,
//       },
//       payment_method_types: ['card'],
//       billing_address_collection: 'required',
//       shipping_address_collection: {
//         allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'ES', 'IT', 'NL', 'SE', 'NO', 'DK', 'FI'],
//       },
//       phone_number_collection: {
//         enabled: true,
//       },
//       automatic_tax: {
//         enabled: false,
//       },
//       invoice_creation: {
//         enabled: true,
//         invoice_data: {
//           description: `Enrollment for ${course.title}`,
//           metadata: {
//             courseId: courseId,
//             userId: user.id,
//           },
//         },
//       },
//     });

//     // Create order record
//     await supabaseService.from("orders").insert({
//       user_id: user.id,
//       course_id: courseId,
//       stripe_session_id: session.id,
//       amount: 4999,
//       status: "pending",
//       payment_method: paymentMethod,
//     });

//     console.log('Payment session created successfully:', session.id);

//     return new Response(JSON.stringify({ url: session.url }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//       status: 200,
//     });
//   } catch (error) {
//     console.error('Payment creation error:', error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//       status: 500,
//     });
//   }
// });


// Use Node.js-compatible imports
import { Stripe } from 'stripe';
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from "next";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }

  try {
    const { courseId, paymentMethod = 'stripe' } = req.body;
    
    console.log('Creating payment for course:', courseId, 'with method:', paymentMethod);
    
    // Create Supabase client
    const supabaseClient = createClient(
      process.env.SUPABASE_URL ?? "",
      process.env.SUPABASE_ANON_KEY ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers["authorization"]!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated");

    // Get course details using service role key to bypass RLS
    const supabaseService = createClient(
      process.env.SUPABASE_URL ?? "",
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
      { auth: { persistSession: false } }
    );

    const { data: course, error: courseError } = await supabaseService
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (courseError || !course) {
      console.error('Course fetch error:', courseError);
      throw new Error("Course not found");
    }

    console.log('Found course:', course.title);

    // Check if user is already enrolled
    const { data: existingEnrollment } = await supabaseService
      .from('course_enrollments')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .eq('payment_status', 'paid')
      .single();

    if (existingEnrollment) {
      throw new Error("You are already enrolled in this course");
    }

    // Check if Stripe secret key is configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error("Stripe is not configured. Please contact administrator.");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-06-30.basil",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create checkout session with enhanced security
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: course.title,
              description: course.description || `Enroll in ${course.title}`,
            },
            unit_amount: 4999, // $49.99
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/course/${courseId}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/course/${courseId}?payment=canceled`,
      metadata: {
        courseId: courseId,
        userId: user.id,
        paymentMethod: paymentMethod,
      },
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'ES', 'IT', 'NL', 'SE', 'NO', 'DK', 'FI'],
      },
      phone_number_collection: {
        enabled: true,
      },
      automatic_tax: {
        enabled: false,
      },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Enrollment for ${course.title}`,
          metadata: {
            courseId: courseId,
            userId: user.id,
          },
        },
      },
    });

    // Create order record
    await supabaseService.from("orders").insert({
      user_id: user.id,
      course_id: courseId,
      stripe_session_id: session.id,
      amount: 4999,
      status: "pending",
      payment_method: paymentMethod,
    });

    console.log('Payment session created successfully:', session.id);

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return res.status(500).json({ error: error.message });
  }
}