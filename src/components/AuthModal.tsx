import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("testuser@gmail.com");
  const [password, setPassword] = useState("TestUser@123");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Login error:", error);
          toast({
            title: "Login Failed",
            description:
              error.message ||
              "Invalid email or password. Please check your credentials and try again.",
            variant: "destructive",
          });
          return;
        }

        if (data.user) {
          console.log("Login successful:", data.user);
          toast({
            title: "Success",
            description: "Signed in successfully!",
          });
          // Reset form
          setEmail("");
          setPassword("");
          onSuccess();
          onClose();
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          console.error("Signup error:", error);
          if (error.message.includes("User already registered")) {
            toast({
              title: "Account Exists",
              description:
                "An account with this email already exists. Please sign in instead.",
              variant: "destructive",
            });
            setIsLogin(true);
          } else {
            toast({
              title: "Sign Up Failed",
              description: error.message,
              variant: "destructive",
            });
          }
          return;
        }

        if (data.user) {
          console.log(" successful:", data.user);
          toast({
            title: "Success",
            description: "Account created successfully! You can now sign in.",
          });
          // Reset form and switch to login
          setEmail("");
          setPassword("");
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isLogin ? "Sign In" : "Create Account"}</DialogTitle>
          <DialogDescription>
            {isLogin
              ? "Enter your credentials to access your account"
              : "Create a new account to get started"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                isLogin
                  ? "Enter your password"
                  : "Create a password (min 6 characters)"
              }
              required
              minLength={isLogin ? undefined : 6}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !email || !password}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={toggleMode}
            disabled={loading}
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
