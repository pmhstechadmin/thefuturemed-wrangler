import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@12.6.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') as string,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
)

serve(async (req) => {
  try {
    const { sessionId } = await req.json()

    // Verify the payment with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed')
    }

    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('course_enrollments')
      .select('id')
      .eq('user_id', session.metadata.user_id)
      .eq('course_id', session.metadata.course_id)
      .maybeSingle()

    if (existingEnrollment) {
      return new Response(JSON.stringify({ enrolled: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Create enrollment
    const { error } = await supabase.from('course_enrollments').insert({
      user_id: session.metadata.user_id,
      course_id: session.metadata.course_id,
      payment_status: 'paid',
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      payment_method: 'stripe',
      payment_id: session.payment_intent,
      enrolled_at: new Date().toISOString(),
    })

    if (error) throw error

    return new Response(JSON.stringify({ enrolled: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})