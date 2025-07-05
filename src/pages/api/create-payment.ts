// // import Razorpay from 'razorpay';
// // import { createClient } from '@supabase/supabase-js';
// // import type { NextApiRequest, NextApiResponse } from "next";

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method === "OPTIONS") {
// //     return res.status(200).json({});
// //   }

// //   try {
// //     const { courseId, paymentMethod = 'razorpay' } = req.body;
    
// //     console.log('Creating payment for course:', courseId, 'with method:', paymentMethod);

// //     const supabaseClient = createClient(
// //       process.env.SUPABASE_URL ?? "",
// //       process.env.SUPABASE_ANON_KEY ?? ""
// //     );

// //     const authHeader = req.headers["authorization"]!;
// //     const token = authHeader.replace("Bearer ", "");
// //     const { data } = await supabaseClient.auth.getUser(token);
// //     const user = data.user;
// //     if (!user?.email) throw new Error("User not authenticated");

// //     const supabaseService = createClient(
// //       process.env.SUPABASE_URL ?? "",
// //       process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
// //       { auth: { persistSession: false } }
// //     );

// //     const { data: course, error: courseError } = await supabaseService
// //       .from('courses')
// //       .select('*')
// //       .eq('id', courseId)
// //       .single();

// //     if (courseError || !course) {
// //       console.error('Course fetch error:', courseError);
// //       throw new Error("Course not found");
// //     }

// //     console.log('Found course:', course.title);

// //     const { data: existingEnrollment } = await supabaseService
// //       .from('course_enrollments')
// //       .select('*')
// //       .eq('user_id', user.id)
// //       .eq('course_id', courseId)
// //       .eq('payment_status', 'paid')
// //       .single();

// //     if (existingEnrollment) {
// //       throw new Error("You are already enrolled in this course");
// //     }

// //     const razorpayKey = process.env.RAZORPAY_KEY_ID;
// //     const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
// //     if (!razorpayKey || !razorpaySecret) {
// //       throw new Error("Razorpay is not configured. Please contact administrator.");
// //     }

// //     const razorpay = new Razorpay({
// //       key_id: razorpayKey,
// //       key_secret: razorpaySecret,
// //     });

// //     const orderOptions = {
// //       amount: 4999 * 100, // ₹49.99 in paisa
// //       currency: 'INR',
// //       receipt: `receipt_course_${courseId}_${user.id}`,
// //       notes: {
// //         userId: user.id,
// //         courseId: courseId,
// //         email: user.email,
// //       },
// //     };

// //     const razorpayOrder = await razorpay.orders.create(orderOptions);

// //     // Save order in Supabase
// //     await supabaseService.from("orders").insert({
// //       user_id: user.id,
// //       course_id: courseId,
// //       razorpay_order_id: razorpayOrder.id,
// //       amount: 4999,
// //       status: "created",
// //       payment_method: paymentMethod,
// //     });

// //     console.log('Razorpay order created:', razorpayOrder.id);

// //     return res.status(200).json({
// //       orderId: razorpayOrder.id,
// //       amount: razorpayOrder.amount,
// //       currency: razorpayOrder.currency,
// //       courseTitle: course.title,
// //       userEmail: user.email,
// //       key: razorpayKey,
// //     });
// //   } catch (error: any) {
// //     console.error('Payment creation error:', error);
// //     // return res.status(500).json({ error: error.message });
// //     return res.status(500).json({
// //         success: false,
// //         error: {
// //           message: error?.message || "Something went wrong while creating payment order",
// //           type: error?.type || null,
// //           stack: process.env.NODE_ENV === "development" ? error.stack : undefined
// //         }
// //       });
// //   }
// // }


// import type { NextApiRequest, NextApiResponse } from "next";
// import Razorpay from "razorpay";
// import { createClient } from "@supabase/supabase-js";

// // Supabase setup
// const supabaseService = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") return res.status(405).end();

//   try {
//     const { courseId } = req.body;
//     const token = req.headers.authorization?.replace("Bearer ", "");
//     if (!token) throw new Error("Missing auth token");

//     // Verify user session
//     const { data: { user } } = await supabaseService.auth.getUser(token);
//     if (!user) throw new Error("Invalid or expired session");

//     // Fetch course
//     const { data: course, error } = await supabaseService
//       .from("courses").select("id, title").eq("id", courseId).single();
//     if (error || !course) throw new Error("Course not found");

//     // Prevent duplicate enrollment
//     const { data: existing } = await supabaseService
//       .from("orders").select("id")
//       .eq("user_id", user.id)
//       .eq("course_id", courseId)
//       .eq("status", "paid")
//       .limit(1).single();
//     if (existing) throw new Error("Already enrolled");

//     // Razorpay init
//     const razorpay = new Razorpay({
//       key_id: "rzp_test_eK57VjQhXHjIGR",
//       key_secret: "MJpdeMCa9LPE7IAzYhchp8AF"
//     });

//     // Create payment order
//     const order = await razorpay.orders.create({
//       amount: 4999, // ₹49.99
//       currency: "INR",
//       receipt: `rcpt_${courseId}_${user.id}`,
//       notes: { userId: user.id, courseId }
//     });

//     // Save order in DB
//     await supabaseService.from("orders").insert({
//       user_id: user.id,
//       course_id: courseId,
//       razorpay_order_id: order.id,
//       amount: 4999,
//       status: "created"
//     });

//     return res.status(200).json({
//       success: true,
//       key: process.env.RAZORPAY_KEY_ID,
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       courseTitle: course.title
//     });
//   } catch (e: any) {
//     console.error("create-payment error:", e);
//     return res.status(400).json({ success: false, error: e.message });
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase (service role)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: "rzp_test_eK57VjQhXHjIGR",
  key_secret:"MJpdeMCa9LPE7IAzYhchp8AF",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { courseId } = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Missing token" });
    }

    // Validate user session
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (!user || userError) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Fetch course info
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id, title")
      .eq("id", courseId)
      .single();

    if (courseError || !course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if user already paid
    const { data: existingEnrollment } = await supabase
      .from("orders")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .eq("status", "paid")
      .maybeSingle();

    if (existingEnrollment) {
      return res.status(400).json({ error: "You have already enrolled in this course." });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: 4999, // in paise = ₹49.99
      currency: "INR",
      receipt: `receipt_${courseId}_${user.id}_${Date.now()}`,
      notes: {
        userId: user.id,
        courseId,
      },
    });

    // Insert order record into Supabase
    const { error: insertError } = await supabase.from("orders").insert([
      {
        user_id: user.id,
        course_id: courseId,
        razorpay_order_id: order.id,
        amount: order.amount,
        status: "created",
      },
    ]);

    if (insertError) {
      console.error("Supabase Insert Error:", insertError);
      return res.status(500).json({ error: "Failed to store order info" });
    }

    return res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseTitle: course.title,
    });
  } catch (error: any) {
    console.error("Payment API Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
