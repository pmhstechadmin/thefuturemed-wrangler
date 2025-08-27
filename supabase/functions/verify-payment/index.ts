
// // // // // import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// // // // // import Stripe from "https://esm.sh/stripe@14.21.0";
// // // // // import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// // // // // const corsHeaders = {
// // // // //   "Access-Control-Allow-Origin": "*",
// // // // //   "Access-Control-Allow-Headers": "authorization, x-client-info, content-type",
// // // // //     "Access-Control-Allow-Methods": "POST, OPTIONS",
// // // // // };

// // // // // serve(async (req: Request) => {
// // // // //   if (req.method === "OPTIONS") {
// // // // //     return new Response(null, { headers: corsHeaders });
// // // // //   }

// // // // //   try {
// // // // //     const { sessionId } = await req.json();
    
// // // // //     console.log('Verifying payment for session:', sessionId);
    
// // // // //     // Initialize Stripe
// // // // //     const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
// // // // //       apiVersion: "2023-10-16",
// // // // //     });

// // // // //     // Retrieve session details
// // // // //     const session = await stripe.checkout.sessions.retrieve(sessionId, {
// // // // //       expand: ['payment_intent', 'customer', 'line_items']
// // // // //     });
    
// // // // //     console.log('Session status:', session.payment_status);
    
// // // // //     if (session.payment_status === 'paid') {
// // // // //       // Create Supabase service client
// // // // //       const supabaseService = createClient(
// // // // //         Deno.env.get("SUPABASE_URL") ?? "",
// // // // //         Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
// // // // //         { auth: { persistSession: false } }
// // // // //       );

// // // // //       const courseId = session.metadata?.courseId;
// // // // //       const userId = session.metadata?.userId;
// // // // //       const paymentMethod = session.metadata?.paymentMethod || 'stripe';

// // // // //       if (courseId && userId) {
// // // // //         // Update order status
// // // // //         await supabaseService
// // // // //           .from("orders")
// // // // //           .update({ 
// // // // //             status: "paid",
// // // // //             payment_method: paymentMethod 
// // // // //           })
// // // // //           .eq("stripe_session_id", sessionId);

// // // // //         // Check if enrollment already exists
// // // // //         const { data: existingEnrollment } = await supabaseService
// // // // //           .from("course_enrollments")
// // // // //           .select('*')
// // // // //           .eq("user_id", userId)
// // // // //           .eq("course_id", courseId)
// // // // //           .single();

// // // // //         if (!existingEnrollment) {
// // // // //           // Create enrollment record
// // // // //           await supabaseService
// // // // //             .from("course_enrollments")
// // // // //             .insert({
// // // // //               user_id: userId,
// // // // //               course_id: courseId,
// // // // //               payment_status: "paid",
// // // // //               stripe_session_id: sessionId,
// // // // //               amount: session.amount_total,
// // // // //               currency: session.currency,
// // // // //               payment_method: paymentMethod,
// // // // //             });

// // // // //           console.log('Enrollment created for user:', userId, 'course:', courseId);
// // // // //         }

// // // // //         // Get course modules for progress tracking
// // // // //         const { data: modules } = await supabaseService
// // // // //           .from('course_modules')
// // // // //           .select('id')
// // // // //           .eq('course_id', courseId);

// // // // //         if (modules && modules.length > 0) {
// // // // //           // Initialize module progress for all modules
// // // // //           const progressRecords = modules.map(module => ({
// // // // //             user_id: userId,
// // // // //             course_id: courseId,
// // // // //             module_id: module.id,
// // // // //             completed: false
// // // // //           }));

// // // // //           await supabaseService
// // // // //             .from('user_module_progress')
// // // // //             .upsert(progressRecords, { onConflict: 'user_id,module_id' });
// // // // //         }

// // // // //         // Trigger email confirmation
// // // // //         try {
// // // // //           await supabaseService.functions.invoke('send-enrollment-email', {
// // // // //             body: { userId, courseId, sessionId }
// // // // //           });
// // // // //         } catch (emailError) {
// // // // //           console.error('Email sending failed:', emailError);
// // // // //           // Don't fail the whole process if email fails
// // // // //         }
// // // // //       }
// // // // //     }

// // // // //     return new Response(JSON.stringify({ 
// // // // //       status: session.payment_status,
// // // // //       enrolled: session.payment_status === 'paid',
// // // // //       customer_details: session.customer_details,
// // // // //       payment_intent: session.payment_intent
// // // // //     }), {
// // // // //       headers: { ...corsHeaders, "Content-Type": "application/json" },
// // // // //       status: 200,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error('Payment verification error:', error);
// // // // //     return new Response(JSON.stringify({ error: error.message }), {
// // // // //       headers: { ...corsHeaders, "Content-Type": "application/json" },
// // // // //       status: 500,
// // // // //     });
// // // // //   }
// // // // // });


// // // // // // import { Stripe } from 'stripe';
// // // // // // import { createClient } from '@supabase/supabase-js';
// // // // // // import type { NextApiRequest, NextApiResponse } from 'next';

// // // // // // const corsHeaders = {
// // // // // //   "Access-Control-Allow-Origin": "*",
// // // // // //   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
// // // // // // };

// // // // // // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// // // // // //   if (req.method === "OPTIONS") {
// // // // // //     return res.status(200).json({});
// // // // // //   }

// // // // // //   try {
// // // // // //     const { sessionId } = req.body;
    
// // // // // //     console.log('Verifying payment for session:', sessionId);
    
// // // // // //     // Initialize Stripe
// // // // // //     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
// // // // // //       apiVersion: "2025-06-30.basil",
// // // // // //     });

// // // // // //     // Retrieve session details
// // // // // //     const session = await stripe.checkout.sessions.retrieve(sessionId, {
// // // // // //       expand: ['payment_intent', 'customer', 'line_items']
// // // // // //     });
    
// // // // // //     console.log('Session status:', session.payment_status);
    
// // // // // //     if (session.payment_status === 'paid') {
// // // // // //       // Create Supabase service client
// // // // // //       const supabaseService = createClient(
// // // // // //         process.env.SUPABASE_URL ?? "",
// // // // // //         process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
// // // // // //         { auth: { persistSession: false } }
// // // // // //       );

// // // // // //       const courseId = session.metadata?.courseId;
// // // // // //       const userId = session.metadata?.userId;
// // // // // //       const paymentMethod = session.metadata?.paymentMethod || 'stripe';

// // // // // //       if (courseId && userId) {
// // // // // //         // Update order status
// // // // // //         await supabaseService
// // // // // //           .from("orders")
// // // // // //           .update({ 
// // // // // //             status: "paid",
// // // // // //             payment_method: paymentMethod 
// // // // // //           })
// // // // // //           .eq("stripe_session_id", sessionId);

// // // // // //         // Check if enrollment already exists
// // // // // //         const { data: existingEnrollment } = await supabaseService
// // // // // //           .from("course_enrollments")
// // // // // //           .select('*')
// // // // // //           .eq("user_id", userId)
// // // // // //           .eq("course_id", courseId)
// // // // // //           .single();
          

// // // // // //         if (!existingEnrollment) {
// // // // // //           // Create enrollment record
// // // // // //           await supabaseService
// // // // // //             .from("course_enrollments")
// // // // // //             .insert({
// // // // // //               user_id: userId,
// // // // // //               course_id: courseId,
// // // // // //               payment_status: "paid",
// // // // // //               stripe_session_id: sessionId,
// // // // // //               amount: session.amount_total,
// // // // // //               currency: session.currency,
// // // // // //               payment_method: paymentMethod,
// // // // // //             });

// // // // // //           console.log('Enrollment created for user:', userId, 'course:', courseId);
// // // // // //         }

// // // // // //         // Get course modules for progress tracking
// // // // // //         const { data: modules } = await supabaseService
// // // // // //           .from('course_modules')
// // // // // //           .select('id')
// // // // // //           .eq('course_id', courseId);

// // // // // //         if (modules && modules.length > 0) {
// // // // // //           // Initialize module progress for all modules
// // // // // //           const progressRecords = modules.map(module => ({
// // // // // //             user_id: userId,
// // // // // //             course_id: courseId,
// // // // // //             module_id: module.id,
// // // // // //             completed: false
// // // // // //           }));

// // // // // //           await supabaseService
// // // // // //             .from('user_module_progress')
// // // // // //             .upsert(progressRecords, { onConflict: 'user_id,module_id' });
// // // // // //         }

// // // // // //         // Trigger email confirmation
// // // // // //         try {
// // // // // //           await supabaseService.functions.invoke('send-enrollment-email', {
// // // // // //             body: { userId, courseId, sessionId }
// // // // // //           });
// // // // // //         } catch (emailError) {
// // // // // //           console.error('Email sending failed:', emailError);
// // // // // //           // Don't fail the whole process if email fails
// // // // // //         }
// // // // // //       }
// // // // // //     }

// // // // // //     return res.status(200).json({ 
// // // // // //       status: session.payment_status,
// // // // // //       enrolled: session.payment_status === 'paid',
// // // // // //       customer_details: session.customer_details,
// // // // // //       payment_intent: session.payment_intent
// // // // // //     });
// // // // // //   } catch (error: any) {
// // // // // //     console.error('Payment verification error:', error);
// // // // // //     return res.status(500).json({ error: error.message });
// // // // // //   }
// // // // // // }

// // // // import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
// // // // import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// // // // import Stripe from 'https://esm.sh/stripe@12.0.0'

// // // // const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
// // // //   apiVersion: '2023-10-16',
// // // // })

// // // // const corsHeaders = {
// // // //   'Access-Control-Allow-Origin': '*',
// // // //   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// // // // }

// // // // serve(async (req) => {
// // // //   // Handle CORS preflight requests
// // // //   if (req.method === 'OPTIONS') {
// // // //     return new Response('ok', { headers: corsHeaders })
// // // //   }

// // // //   try {
// // // //     const { sessionId } = await req.json()

// // // //     if (!sessionId) {
// // // //       return new Response(
// // // //         JSON.stringify({ error: 'Session ID is required' }),
// // // //         {
// // // //           status: 400,
// // // //           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // // //         }
// // // //       )
// // // //     }

// // // //     // Verify the Stripe session
// // // //     const session = await stripe.checkout.sessions.retrieve(sessionId, {
// // // //       expand: ['line_items', 'payment_intent'],
// // // //     })

// // // //     console.log('Stripe session:', JSON.stringify(session, null, 2))

// // // //     // Check if payment was successful
// // // //     if (session.payment_status !== 'paid') {
// // // //       return new Response(
// // // //         JSON.stringify({ 
// // // //           status: session.payment_status,
// // // //           message: 'Payment not completed' 
// // // //         }),
// // // //         {
// // // //           status: 400,
// // // //           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // // //         }
// // // //       )
// // // //     }

// // // //     // Initialize Supabase client
// // // //     const supabaseClient = createClient(
// // // //       Deno.env.get('SUPABASE_URL') || '',
// // // //       Deno.env.get('SUPABASE_ANON_KEY') || '',
// // // //       {
// // // //         global: {
// // // //           headers: { Authorization: req.headers.get('Authorization')! },
// // // //         },
// // // //       }
// // // //     )

// // // //     // Get the product details from session metadata
// // // //     const productType = session.metadata?.productType
// // // //     const productId = session.metadata?.productId
// // // //     const userId = session.metadata?.userId

// // // //     console.log('Product details:', { productType, productId, userId })

// // // //     if (!productType || !productId || !userId) {
// // // //       return new Response(
// // // //         JSON.stringify({ error: 'Missing product information in session metadata' }),
// // // //         {
// // // //           status: 400,
// // // //           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // // //         }
// // // //       )
// // // //     }

// // // //     let enrollmentResult

// // // //     // Handle different product types
// // // //     if (productType === 'seminar') {
// // // //       // Check if already enrolled
// // // //       const { data: existingEnrollment } = await supabaseClient
// // // //         .from('seminer')
// // // //         .select('*')
// // // //         .eq('user_id', userId)
// // // //         .eq('seminer_id', productId)
// // // //         .single()

// // // //       if (existingEnrollment) {
// // // //         return new Response(
// // // //           JSON.stringify({ 
// // // //             status: 'paid', 
// // // //             message: 'Already enrolled',
// // // //             enrolled: true 
// // // //           }),
// // // //           {
// // // //             status: 200,
// // // //             headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // // //           }
// // // //         )
// // // //       }

// // // //       // Create enrollment
// // // //       const { data: enrollment, error: enrollmentError } = await supabaseClient
// // // //         .from('seminer')
// // // //         .insert({
// // // //           user_id: userId,
// // // //           seminer_id: productId,
// // // //           payment_status: 'paid',
// // // //           amount: session.amount_total ? session.amount_total / 100 : 0,
// // // //           currency: session.currency?.toUpperCase() || 'INR',
// // // //           payment_method: 'stripe',
// // // //           stripe_session_id: sessionId,
// // // //           enrolled_at: new Date().toISOString(),
// // // //         })
// // // //         .select()
// // // //         .single()

// // // //       if (enrollmentError) {
// // // //         console.error('Enrollment error:', enrollmentError)
// // // //         throw new Error(`Failed to create enrollment: ${enrollmentError.message}`)
// // // //       }

// // // //       enrollmentResult = {
// // // //         enrolled: true,
// // // //         seminar_registered: true,
// // // //         enrollment_id: enrollment.id
// // // //       }

// // // //     } else if (productType === 'course') {
// // // //       // Handle course enrollment (similar to seminar)
// // // //       const { data: existingEnrollment } = await supabaseClient
// // // //         .from('course_enrollments')
// // // //         .select('*')
// // // //         .eq('user_id', userId)
// // // //         .eq('course_id', productId)
// // // //         .single()

// // // //       if (existingEnrollment) {
// // // //         return new Response(
// // // //           JSON.stringify({ 
// // // //             status: 'paid', 
// // // //             message: 'Already enrolled',
// // // //             enrolled: true 
// // // //           }),
// // // //           {
// // // //             status: 200,
// // // //             headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // // //           }
// // // //         )
// // // //       }

// // // //       const { data: enrollment, error: enrollmentError } = await supabaseClient
// // // //         .from('course_enrollments')
// // // //         .insert({
// // // //           user_id: userId,
// // // //           course_id: productId,
// // // //           payment_status: 'paid',
// // // //           amount: session.amount_total ? session.amount_total / 100 : 0,
// // // //           currency: session.currency?.toUpperCase() || 'INR',
// // // //           payment_method: 'stripe',
// // // //           stripe_session_id: sessionId,
// // // //           enrolled_at: new Date().toISOString(),
// // // //         })
// // // //         .select()
// // // //         .single()

// // // //       if (enrollmentError) {
// // // //         console.error('Enrollment error:', enrollmentError)
// // // //         throw new Error(`Failed to create enrollment: ${enrollmentError.message}`)
// // // //       }

// // // //       enrollmentResult = {
// // // //         enrolled: true,
// // // //         course_enrolled: true,
// // // //         enrollment_id: enrollment.id
// // // //       }

// // // //     } else {
// // // //       return new Response(
// // // //         JSON.stringify({ error: 'Invalid product type' }),
// // // //         {
// // // //           status: 400,
// // // //           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // // //         }
// // // //       )
// // // //     }

// // // //     // Return success response
// // // //     return new Response(
// // // //       JSON.stringify({
// // // //         status: 'paid',
// // // //         amount_total: session.amount_total,
// // // //         currency: session.currency,
// // // //         payment_intent: session.payment_intent,
// // // //         ...enrollmentResult
// // // //       }),
// // // //       {
// // // //         status: 200,
// // // //         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // // //       }
// // // //     )

// // // //   } catch (error) {
// // // //     console.error('Error verifying payment:', error)

// // // //     return new Response(
// // // //       JSON.stringify({ 
// // // //         error: error.message || 'Internal server error',
// // // //         details: error.toString() 
// // // //       }),
// // // //       {
// // // //         status: 500,
// // // //         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // // //       }
// // // //     )
// // // //   }
// // // // })

// // // import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
// // // import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// // // import Stripe from 'https://esm.sh/stripe@12.0.0'

// // // const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
// // //   apiVersion: '2023-10-16',
// // // })

// // // const corsHeaders = {
// // //   'Access-Control-Allow-Origin': '*',
// // //   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// // // }

// // // serve(async (req) => {
// // //   if (req.method === 'OPTIONS') {
// // //     return new Response('ok', { headers: corsHeaders })
// // //   }

// // //   try {
// // //     const { sessionId } = await req.json()

// // //     if (!sessionId) {
// // //       return new Response(JSON.stringify({ error: 'Session ID is required' }), {
// // //         status: 400,
// // //         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // //       })
// // //     }

// // //     // ✅ Verify Stripe session
// // //     const session = await stripe.checkout.sessions.retrieve(sessionId, {
// // //       expand: ['line_items', 'payment_intent'],
// // //     })

// // //     if (session.payment_status !== 'paid') {
// // //       return new Response(
// // //         JSON.stringify({ status: session.payment_status, message: 'Payment not completed' }),
// // //         { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
// // //       )
// // //     }

// // //     // ✅ Use service role key (not anon)
// // //     const supabaseClient = createClient(
// // //       Deno.env.get('SUPABASE_URL') || '',
// // //       Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
// // //     )

// // //     const productType = session.metadata?.productType
// // //     const productId = session.metadata?.productId
// // //     const userId = session.metadata?.userId

// // //     if (!productType || !productId || !userId) {
// // //       return new Response(JSON.stringify({ error: 'Missing product info in session metadata' }), {
// // //         status: 400,
// // //         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // //       })
// // //     }

// // //     let enrollmentResult

// // //     if (productType === 'seminar') {
// // //       // ✅ Fix table name
// // //       const { data: existingEnrollment } = await supabaseClient
// // //         .from('seminar_registrations')
// // //         .select('*')
// // //         .eq('user_id', userId)
// // //         .eq('seminar_id', productId)
// // //         .maybeSingle()

// // //       if (existingEnrollment) {
// // //         return new Response(
// // //           JSON.stringify({ status: 'paid', message: 'Already enrolled', enrolled: true }),
// // //           { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
// // //         )
// // //       }

// // //       const { data: enrollment, error: enrollmentError } = await supabaseClient
// // //         .from('seminar_registrations')
// // //         .insert({
// // //           user_id: userId,
// // //           seminar_id: productId,
// // //           payment_status: 'paid',
// // //           amount: session.amount_total ? session.amount_total / 100 : 0,
// // //           currency: session.currency?.toUpperCase() || 'INR',
// // //           payment_method: 'stripe',
// // //           stripe_session_id: sessionId,
// // //           enrolled_at: new Date().toISOString(),
// // //         })
// // //         .select()
// // //         .single()

// // //       if (enrollmentError) throw new Error(enrollmentError.message)

// // //       enrollmentResult = { enrolled: true, seminar_registered: true, enrollment_id: enrollment.id }

// // //     } else if (productType === 'course') {
// // //       const { data: existingEnrollment } = await supabaseClient
// // //         .from('course_enrollments')
// // //         .select('*')
// // //         .eq('user_id', userId)
// // //         .eq('course_id', productId)
// // //         .maybeSingle()

// // //       if (existingEnrollment) {
// // //         return new Response(
// // //           JSON.stringify({ status: 'paid', message: 'Already enrolled', enrolled: true }),
// // //           { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
// // //         )
// // //       }

// // //       const { data: enrollment, error: enrollmentError } = await supabaseClient
// // //         .from('course_enrollments')
// // //         .insert({
// // //           user_id: userId,
// // //           course_id: productId,
// // //           payment_status: 'paid',
// // //           amount: session.amount_total ? session.amount_total / 100 : 0,
// // //           currency: session.currency?.toUpperCase() || 'INR',
// // //           payment_method: 'stripe',
// // //           stripe_session_id: sessionId,
// // //           enrolled_at: new Date().toISOString(),
// // //         })
// // //         .select()
// // //         .single()

// // //       if (enrollmentError) throw new Error(enrollmentError.message)

// // //       enrollmentResult = { enrolled: true, course_enrolled: true, enrollment_id: enrollment.id }
// // //     } else {
// // //       return new Response(JSON.stringify({ error: 'Invalid product type' }), {
// // //         status: 400,
// // //         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // //       })
// // //     }

// // //     return new Response(
// // //       JSON.stringify({
// // //         status: 'paid',
// // //         amount_total: session.amount_total,
// // //         currency: session.currency,
// // //         payment_intent: session.payment_intent,
// // //         ...enrollmentResult,
// // //       }),
// // //       { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
// // //     )
// // //   } catch (error) {
// // //     console.error('Error verifying payment:', error)
// // //     return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
// // //       status: 500,
// // //       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// // //     })
// // //   }
// // // })

// // import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
// // import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// // import Stripe from 'https://esm.sh/stripe@12.0.0'

// // const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
// //   apiVersion: '2023-10-16',
// // })

// // const corsHeaders = {
// //   'Access-Control-Allow-Origin': '*',
// //   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// // }

// // serve(async (req) => {
// //   if (req.method === 'OPTIONS') {
// //     return new Response('ok', { headers: corsHeaders })
// //   }

// //   try {
// //     const { sessionId } = await req.json()
// //     if (!sessionId) {
// //       return new Response(JSON.stringify({ error: 'Session ID is required' }), {
// //         status: 400,
// //         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// //       })
// //     }

// //     // Verify Stripe session
// //     const session = await stripe.checkout.sessions.retrieve(sessionId, {
// //       expand: ['line_items', 'payment_intent'],
// //     })

// //     if (session.payment_status !== 'paid') {
// //       return new Response(
// //         JSON.stringify({ status: session.payment_status, message: 'Payment not completed' }),
// //         { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
// //       )
// //     }

// //     // Supabase client (service role key)
// //     const supabaseClient = createClient(
// //       Deno.env.get('SUPABASE_URL') || '',
// //       Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
// //     )

// //     const productType = session.metadata?.productType
// //     const productId = session.metadata?.productId
// //     const userId = session.metadata?.userId

// //     if (!productType || !productId || !userId) {
// //       return new Response(JSON.stringify({ error: 'Missing product info in session metadata' }), {
// //         status: 400,
// //         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// //       })
// //     }

// //     let enrollmentResult

// //     // ✅ Enroll user
// //     if (productType === 'seminar') {
// //       const { data: existingEnrollment } = await supabaseClient
// //         .from('seminar_registrations')
// //         .select('*')
// //         .eq('user_id', userId)
// //         .eq('seminar_id', productId)
// //         .maybeSingle()

// //       if (!existingEnrollment) {
// //         const { data: enrollment, error: enrollmentError } = await supabaseClient
// //           .from('seminar_registrations')
// //           .insert({
// //             user_id: userId,
// //             seminar_id: productId,
// //             payment_status: 'paid',
// //             amount: session.amount_total ? session.amount_total / 100 : 0,
// //             currency: session.currency?.toUpperCase() || 'INR',
// //             payment_method: 'stripe',
// //             stripe_session_id: sessionId,
// //             enrolled_at: new Date().toISOString(),
// //           })
// //           .select()
// //           .single()

// //         if (enrollmentError) throw new Error(enrollmentError.message)

// //         enrollmentResult = { enrolled: true, seminar_registered: true, enrollment_id: enrollment.id }
// //       } else {
// //         enrollmentResult = { enrolled: true, seminar_registered: true }
// //       }
// //     } else if (productType === 'course') {
// //       const { data: existingEnrollment } = await supabaseClient
// //         .from('course_enrollments')
// //         .select('*')
// //         .eq('user_id', userId)
// //         .eq('course_id', productId)
// //         .maybeSingle()

// //       if (!existingEnrollment) {
// //         const { data: enrollment, error: enrollmentError } = await supabaseClient
// //           .from('course_enrollments')
// //           .insert({
// //             user_id: userId,
// //             course_id: productId,
// //             payment_status: 'paid',
// //             amount: session.amount_total ? session.amount_total / 100 : 0,
// //             currency: session.currency?.toUpperCase() || 'INR',
// //             payment_method: 'stripe',
// //             stripe_session_id: sessionId,
// //             enrolled_at: new Date().toISOString(),
// //           })
// //           .select()
// //           .single()

// //         if (enrollmentError) throw new Error(enrollmentError.message)

// //         enrollmentResult = { enrolled: true, course_enrolled: true, enrollment_id: enrollment.id }
// //       } else {
// //         enrollmentResult = { enrolled: true, course_enrolled: true }
// //       }
// //     } else {
// //       return new Response(JSON.stringify({ error: 'Invalid product type' }), {
// //         status: 400,
// //         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// //       })
// //     }

// //     // ✅ Log payment in payments table
// //     const { error: paymentError } = await supabaseClient.from('payments').insert({
// //       user_id: userId,
// //       subscription_id: null, // you can use if subscription flow exists
// //       stripe_payment_intent_id: session.payment_intent?.toString() || null,
// //       amount: session.amount_total ? session.amount_total / 100 : 0,
// //       currency: session.currency?.toUpperCase() || 'INR',
// //       status: 'paid',
// //       payment_method: 'stripe',
// //       created_at: new Date().toISOString(),
// //     })

// //     if (paymentError) {
// //       console.error('Error logging payment:', paymentError)
// //     }

// //     return new Response(
// //       JSON.stringify({
// //         status: 'paid',
// //         amount_total: session.amount_total,
// //         currency: session.currency,
// //         payment_intent: session.payment_intent,
// //         ...enrollmentResult,
// //       }),
// //       { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
// //     )
// //   } catch (error) {
// //     console.error('Error verifying payment:', error)
// //     return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
// //       status: 500,
// //       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
// //     })
// //   }
// // })

// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// import Stripe from "https://esm.sh/stripe@12.0.0";

// const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
//   apiVersion: "2023-10-16",
// });

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, content-type",
// };

// serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   try {
//     const { sessionId } = await req.json();
//     if (!sessionId) {
//       return new Response(
//         JSON.stringify({ error: "Session ID is required" }),
//         {
//           status: 400,
//           headers: { ...corsHeaders, "Content-Type": "application/json" },
//         }
//       );
//     }

//     // ✅ Verify Stripe session
//     const session = await stripe.checkout.sessions.retrieve(sessionId, {
//       expand: ["line_items", "payment_intent"],
//     });

//     if (session.payment_status === "processing") {
//       return new Response(JSON.stringify({ status: "processing" }), {
//         status: 202,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     if (session.payment_status !== "paid") {
//       return new Response(
//         JSON.stringify({
//           status: session.payment_status,
//           message: "Payment not completed",
//         }),
//         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
//       );
//     }

//     const supabaseClient = createClient(
//       Deno.env.get("SUPABASE_URL") || "",
//       Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
//     );

//     const productType = session.metadata?.productType;
//     const productId = session.metadata?.productId;
//     const userId = session.metadata?.userId;

//     if (!productType || !productId || !userId) {
//       return new Response(
//         JSON.stringify({ error: "Missing product info in session metadata" }),
//         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
//       );
//     }

//     // ✅ Respond immediately, do DB work async
//     queueMicrotask(async () => {
//       try {
//         if (productType === "seminar") {
//           await supabaseClient
//             .from("seminar_registrations")
//             .upsert({
//               user_id: userId,
//               seminar_id: productId,
//               payment_status: "paid",
//               amount: session.amount_total ? session.amount_total / 100 : 0,
//               currency: session.currency?.toUpperCase() || "INR",
//               payment_method: "stripe",
//               stripe_session_id: sessionId,
//               enrolled_at: new Date().toISOString(),
//             });
//         } else if (productType === "course") {
//           await supabaseClient
//             .from("course_enrollments")
//             .upsert({
//               user_id: userId,
//               course_id: productId,
//               payment_status: "paid",
//               amount: session.amount_total ? session.amount_total / 100 : 0,
//               currency: session.currency?.toUpperCase() || "INR",
//               payment_method: "stripe",
//               stripe_session_id: sessionId,
//               enrolled_at: new Date().toISOString(),
//             });
//         }

//         await supabaseClient.from("payments").insert({
//           user_id: userId,
//           stripe_payment_intent_id: session.payment_intent?.toString() || null,
//           amount: session.amount_total ? session.amount_total / 100 : 0,
//           currency: session.currency?.toUpperCase() || "INR",
//           status: "paid",
//           payment_method: "stripe",
//           created_at: new Date().toISOString(),
//         });
//       } catch (err) {
//         console.error("Async DB error:", err);
//       }
//     });

//     return new Response(
//       JSON.stringify({
//         status: "paid",
//         amount_total: session.amount_total,
//         currency: session.currency,
//         product_type: productType,
//       }),
//       { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
//     );
//   } catch (error: any) {
//     console.error("Error verifying payment:", error);
//     return new Response(
//       JSON.stringify({ error: error.message || "Internal server error" }),
//       {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   }
// });

