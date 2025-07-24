// import React from 'react'

// const Confirm = () => {
//   return (
//     <div>
//       api
//     </div>
//   )
// }

// export default Confirm


import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Confirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const confirmEmail = async () => {
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");
      const type = searchParams.get("type");

      if (type === "signup" && accessToken && refreshToken) {
        try {
          // Set the session with the tokens from the URL
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) throw error;

          toast({
            title: "Email Confirmed!",
            description: "Your account has been successfully verified.",
          });
          navigate("/"); // Redirect to home or dashboard
        } catch (error) {
          toast({
            title: "Confirmation Failed",
            description: "Could not verify your email. Please try again.",
            variant: "destructive",
          });
          navigate("/login");
        }
      }
    };

    confirmEmail();
  }, [searchParams, navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
        <p>Please wait while we confirm your email address.</p>
      </div>
    </div>
  );
};

export default Confirm;