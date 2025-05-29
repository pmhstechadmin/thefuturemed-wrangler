
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, courseId } = await req.json();

    // Create Supabase service client
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get user and course details
    const { data: profile } = await supabaseService
      .from('profiles')
      .select('first_name, last_name, email')
      .eq('id', userId)
      .single();

    const { data: course } = await supabaseService
      .from('courses')
      .select('title, description')
      .eq('id', courseId)
      .single();

    if (!profile?.email || !course) {
      throw new Error("User or course not found");
    }

    const userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Student';

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: "MedPortal <noreply@medportal.com>",
      to: [profile.email],
      subject: `Course Enrollment Confirmation - ${course.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to ${course.title}!</h1>
          
          <p>Dear ${userName},</p>
          
          <p>Congratulations! You have successfully enrolled in <strong>${course.title}</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Course Details:</h3>
            <p><strong>Course:</strong> ${course.title}</p>
            <p><strong>Description:</strong> ${course.description || 'No description available'}</p>
          </div>
          
          <p>You can now access your course materials and begin your learning journey. Log in to your MedPortal account to get started.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '')}/course/${courseId}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Access Your Course
            </a>
          </div>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          
          <p>Happy learning!<br>
          The MedPortal Team</p>
        </div>
      `,
    });

    console.log("Enrollment email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending enrollment email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
