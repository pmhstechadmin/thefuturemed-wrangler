import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import Razorpay from "razorpay";

const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { courseId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify user
    const { data: { user }, error: userError } = await supabaseService.auth.getUser(token);
    if (!user || userError) {
      return res.status(401).json({ message: userError?.message || "Invalid or expired token" });
    }

    // Check if already enrolled
    const { data: existingEnrollment, error: enrollmentError } = await supabaseService
      .from("course_enrollments")
      .select("*")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .eq("payment_status", "paid")
      .maybeSingle();

    if (existingEnrollment) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: 4999, // ₹49.99
      currency: "INR",
      receipt: `receipt_${courseId}_${user.id}_${Date.now()}`,
      notes: {
        userId: user.id,
        courseId,
      },
    });

    // Store order in database
    const { error: insertError } = await supabaseService
      .from("orders")
      .insert({
        user_id: user.id,
        course_id: courseId,
        razorpay_order_id: order.id,
        amount: order.amount,
        status: "created",
      });

    if (insertError) {
      throw new Error(insertError.message);
    }

    return res.status(200).json({
      success: true,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      orderId: order.id,
      amount: Number(order.amount),
      currency: order.currency,
      courseTitle: "Course Enrollment", // You might want to fetch the actual course title
    });
  } catch (error: any) {
    console.error("Payment creation error:", error);
    return res.status(500).json({ 
      message: error.message || "Payment creation failed",
      success: false
    });
  }
}