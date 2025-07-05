import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// Supabase setup
const supabaseService = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      throw new Error("Invalid signature");
    }

    // Retrieve order record
    const { data: order } = await supabaseService
      .from("orders").select("*")
      .eq("razorpay_order_id", razorpay_order_id).single();
    if (!order) throw new Error("Order not found");

    // Update order and enroll user
    await supabaseService.from("orders").update({
      status: "paid",
      razorpay_payment_id
    }).eq("id", order.id);

    await supabaseService.from("course_enrollments").insert({
      user_id: order.user_id,
      course_id: order.course_id,
      payment_status: "paid"
    });

    return res.status(200).json({ success: true });
  } catch (e: any) {
    console.error("verify-payment error:", e);
    return res.status(400).json({ success: false, error: e.message });
  }
}
