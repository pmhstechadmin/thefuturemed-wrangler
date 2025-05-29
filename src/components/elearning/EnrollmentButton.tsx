
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CreditCard } from "lucide-react";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface EnrollmentButtonProps {
  courseId: string;
  isEnrolled: boolean;
  onEnrollmentChange: () => void;
}

export const EnrollmentButton = ({ courseId, isEnrolled, onEnrollmentChange }: EnrollmentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const { toast } = useToast();

  const handlePaymentMethodSelect = async (paymentMethod: string) => {
    try {
      setIsLoading(true);

      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to enroll in this course.",
          variant: "destructive",
        });
        return;
      }

      if (paymentMethod === 'stripe') {
        // Create Stripe payment session
        const { data, error } = await supabase.functions.invoke('create-course-payment', {
          body: { courseId, paymentMethod },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (error) throw error;

        if (data?.url) {
          // Open Stripe checkout in a new tab
          window.open(data.url, '_blank');
          
          toast({
            title: "Payment Processing",
            description: "Complete your payment in the new tab to enroll in the course.",
          });
        }
      } else if (paymentMethod === 'paypal') {
        // PayPal integration (placeholder)
        toast({
          title: "PayPal Integration",
          description: "PayPal payment integration coming soon! Please use card payment for now.",
          variant: "destructive",
        });
      } else if (paymentMethod === 'bank') {
        // Bank transfer integration (placeholder)
        toast({
          title: "Bank Transfer",
          description: "Bank transfer option coming soon! Please use card payment for now.",
          variant: "destructive",
        });
      }
      
      setShowPaymentMethods(false);
    } catch (error: any) {
      console.error('Enrollment error:', error);
      toast({
        title: "Enrollment Failed",
        description: error.message || "Failed to start enrollment process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEnrolled) {
    return (
      <Button className="w-full" variant="secondary" disabled>
        Already Enrolled
      </Button>
    );
  }

  return (
    <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
      <DialogTrigger asChild>
        <Button 
          className="w-full" 
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Enroll for $49.99
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
        </DialogHeader>
        <PaymentMethodSelector 
          onPaymentMethodSelect={handlePaymentMethodSelect}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
