
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CreditCard, CheckCircle } from "lucide-react";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  courseId: string;
  isEnrolled: boolean;
  isPaid: boolean;
  price?: number; // Add price prop
  onEnrollmentChange: () => void;
}

type PaymentMethod = "razorpay" | "free" | "upi" | "card" | "netbanking";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const EnrollmentButton = ({
  courseId,
  isEnrolled,
  isPaid,
  price = 4999, // Default price in paise (₹49.99)
  onEnrollmentChange,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { toast } = useToast();
  const Key_payment = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const enrollUser = async (
    paymentMethod: PaymentMethod,
    amount: number = 0
  ) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("Please log in to enroll");

    const { error } = await supabase.from("course_enrollments").insert({
      user_id: session.user.id,
      course_id: courseId,
      payment_status: paymentMethod === "free" ? "free" : "paid",
      amount,
      currency: "INR",
      payment_method: paymentMethod,
      enrolled_at: new Date().toISOString(),
    });

    if (error) throw new Error(`Failed to enroll: ${error.message}`);
  };

  const handleFreeEnrollment = async () => {
    setIsLoading(true);
    try {
      await enrollUser("free");
      toast({
        title: "🎉 Enrollment Successful!",
        description: "You've been enrolled in this free course!",
      });
      setPaymentSuccess(true);
      onEnrollmentChange();
    } catch (error: any) {
      toast({
        title: "Enrollment Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaidEnrollment = async (method: PaymentMethod) => {
    setIsLoading(true);
    try {
      // Check if user is logged in
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Please log in to enroll");

      // Check for existing enrollment
      const { data: existingEnrollment } = await supabase
        .from("course_enrollments")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("course_id", courseId)
        .or("payment_status.eq.paid,payment_status.eq.free")
        .limit(1)
        .maybeSingle();

      if (existingEnrollment) {
        throw new Error("You are already enrolled in this course");
      }

      if (method !== "razorpay") {
        toast({
          title: "Coming Soon",
          description: `${method} is not available yet.`,
          variant: "destructive",
        });
        return;
      }

      // Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Failed to load payment processor");

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: session.user.id,
          course_id: courseId,
          amount: price,
          currency: "INR",
          status: "created",
          payment_method: "razorpay",
        })
        .select()
        .single();

      if (orderError || !order) {
        throw new Error(orderError?.message || "Failed to create order");
      }

      const options = {
        key: Key_payment,
        // key: "rzp_test_eK57VjQhXHjIGR",
        amount: price.toString(),
        currency: "INR",
        name: "TheFutemed",
        description: `Payment for course enrollment`,
        handler: async function (response: any) {
          try {
            // Verify payment
            const { error: verifyError } = await supabase
              .from("orders")
              .update({
                status: "paid",
                razorpay_payment_id: response.razorpay_payment_id,
              })
              .eq("id", order.id);

            if (verifyError) throw new Error("Payment verification failed");

            // Create enrollment
            await enrollUser("razorpay", price);

            toast({
              title: "🎉 Enrollment Successful!",
              description: "You've been enrolled in the course!",
            });
            setPaymentSuccess(true);
            onEnrollmentChange();
          } catch (error: any) {
            toast({
              title: "Payment Verification Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: session.user.user_metadata?.full_name || "User",
          email: session.user.email || "",
          contact: session.user.phone || "",
        },
        theme: {
          color: "#528FF0",
        },
        modal: {
          ondismiss: () => {
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process",
            });
            setIsLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        toast({
          title: "Payment Failed",
          description: response.error.description,
          variant: "destructive",
        });
      });
      rzp.open();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowPaymentMethods(false);
    }
  };

  if (isEnrolled) {
    return (
      <Button className="w-full" variant="secondary" disabled>
        <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
        Already Enrolled
      </Button>
    );
  }

  return (
    <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full"
          disabled={isLoading || paymentSuccess}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : paymentSuccess ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Enrolled
            </>
          ) : isPaid ? (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              {`Enroll for ₹${(price / 100).toFixed(2)}`}
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Enroll for Free
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isPaid ? "Complete Your Enrollment" : "Confirm Free Enrollment"}
          </DialogTitle>
          <DialogDescription>
            {isPaid
              ? `Please pay ₹${(price / 100).toFixed(
                  2
                )} to enroll in this course`
              : "You're about to enroll in this free course"}
          </DialogDescription>
        </DialogHeader>
        {isPaid ? (
          <PaymentMethodSelector
            onPaymentMethodSelect={handlePaidEnrollment}
            isLoading={isLoading}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800">
                Free Enrollment Confirmation
              </h4>
              <p className="text-sm text-green-600 mt-1">
                You will get immediate access to all course materials.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPaymentMethods(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleFreeEnrollment}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Free Enrollment"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentButton;
