import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Update order status
    const { data: order, error: orderError } = await supabaseService
      .from("orders")
      .update({
        status: "paid",
        razorpay_payment_id,
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .select()
      .single();

    if (orderError || !order) {
      throw new Error(orderError?.message || "Order not found");
    }

    // Create enrollment
    const { error: enrollmentError } = await supabaseService
      .from("course_enrollments")
      .insert({
        user_id: order.user_id,
        course_id: order.course_id,
        payment_status: "paid",
        order_id: order.id,
      });

    if (enrollmentError) {
      throw new Error(enrollmentError.message);
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ 
      message: error.message || "Payment verification failed",
      success: false
    });
  }
}