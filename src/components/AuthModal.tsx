// // import { useState } from "react";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogDescription,
// // } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { supabase } from "@/integrations/supabase/client";
// // import { useToast } from "@/hooks/use-toast";

// // interface AuthModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSuccess: () => void;
// // }

// // const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
// //   const { toast } = useToast();
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [email, setEmail] = useState("testuser@gmail.com");
// //   const [password, setPassword] = useState("TestUser@123");

// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       if (isLogin) {
// //         const { data, error } = await supabase.auth.signInWithPassword({
// //           email,
// //           password,
// //         });

// //         if (error) {
// //           console.error("Login error:", error);
// //           toast({
// //             title: "Login Failed",
// //             description:
// //               error.message ||
// //               "Invalid email or password. Please check your credentials and try again.",
// //             variant: "destructive",
// //           });
// //           return;
// //         }

// //         if (data.user) {
// //           console.log("Login successful:", data.user);
// //           toast({
// //             title: "Success",
// //             description: "Signed in successfully!",
// //           });
// //           // Reset form
// //           setEmail("");
// //           setPassword("");
// //           onSuccess();
// //           onClose();
// //         }
// //       } else {
// //         const { data, error } = await supabase.auth.signUp({
// //           email,
// //           password,
// //         });

// //         if (error) {
// //           console.error("Signup error:", error);
// //           if (error.message.includes("User already registered")) {
// //             toast({
// //               title: "Account Exists",
// //               description:
// //                 "An account with this email already exists. Please sign in instead.",
// //               variant: "destructive",
// //             });
// //             setIsLogin(true);
// //           } else {
// //             toast({
// //               title: "Sign Up Failed",
// //               description: error.message,
// //               variant: "destructive",
// //             });
// //           }
// //           return;
// //         }

// //         if (data.user) {
// //           console.log(" successful:", data.user);
// //           toast({
// //             title: "Success",
// //             description: "Account created successfully! You can now sign in.",
// //           });
// //           // Reset form and switch to login
// //           setEmail("");
// //           setPassword("");
// //           setIsLogin(true);
// //         }
// //       }
// //     } catch (error: any) {
// //       console.error("Auth error:", error);
// //       toast({
// //         title: "Error",
// //         description: "An unexpected error occurred. Please try again.",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const resetForm = () => {
// //     setEmail("");
// //     setPassword("");
// //   };

// //   const toggleMode = () => {
// //     setIsLogin(!isLogin);
// //     resetForm();
// //   };

// //   const handleClose = () => {
// //     resetForm();
// //     onClose();
// //   };

// //   return (
// //     <Dialog open={isOpen} onOpenChange={handleClose}>
// //       <DialogContent>
// //         <DialogHeader>
// //           <DialogTitle>{isLogin ? "Sign In" : "Create Account"}</DialogTitle>
// //           <DialogDescription>
// //             {isLogin
// //               ? "Enter your credentials to access your account"
// //               : "Create a new account to get started"}
// //           </DialogDescription>
// //         </DialogHeader>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <Label htmlFor="email">Email</Label>
// //             <Input
// //               id="email"
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               placeholder="Enter your email address"
// //               required
// //               disabled={loading}
// //             />
// //           </div>

// //           <div>
// //             <Label htmlFor="password">Password</Label>
// //             <Input
// //               id="password"
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               placeholder={
// //                 isLogin
// //                   ? "Enter your password"
// //                   : "Create a password (min 6 characters)"
// //               }
// //               required
// //               minLength={isLogin ? undefined : 6}
// //               disabled={loading}
// //             />
// //           </div>

// //           <Button
// //             type="submit"
// //             className="w-full"
// //             disabled={loading || !email || !password}
// //           >
// //             {loading
// //               ? "Please wait..."
// //               : isLogin
// //               ? "Sign In"
// //               : "Create Account"}
// //           </Button>

// //           <Button
// //             type="button"
// //             variant="ghost"
// //             className="w-full"
// //             onClick={toggleMode}
// //             disabled={loading}
// //           >
// //             {isLogin
// //               ? "Need an account? Sign up"
// //               : "Already have an account? Sign in"}
// //           </Button>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default AuthModal;

// // import { useState } from "react";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogDescription,
// // } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { supabase } from "@/integrations/supabase/client";
// // import { useToast } from "@/hooks/use-toast";

// // interface AuthModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSuccess: () => void;
// // }

// // const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
// //   const { toast } = useToast();
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [email, setEmail] = useState("testuser@gmail.com");
// //   const [password, setPassword] = useState("TestUser@123");
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       if (isLogin) {
// //         const { data, error } = await supabase.auth.signInWithPassword({
// //           email,
// //           password,
// //         });

// //         if (error) {
// //           toast({
// //             title: "Login Failed",
// //             description:
// //               error.message ||
// //               "Invalid email or password. Please check your credentials and try again.",
// //             variant: "destructive",
// //           });
// //           return;
// //         }

// //         if (data.user) {
// //           toast({
// //             title: "Success",
// //             description: "Signed in successfully!",
// //           });
// //           resetForm();
// //           onSuccess();
// //           onClose();
// //         }
// //       } else {
// //         const { data, error } = await supabase.auth.signUp({
// //           email,
// //           password,
// //         });

// //         if (error) {
// //           if (error.message.includes("User already registered")) {
// //             toast({
// //               title: "Account Exists",
// //               description:
// //                 "An account with this email already exists. Please sign in instead.",
// //               variant: "destructive",
// //             });
// //             setIsLogin(true);
// //           } else {
// //             toast({
// //               title: "Sign Up Failed",
// //               description: error.message,
// //               variant: "destructive",
// //             });
// //           }
// //           return;
// //         }

// //         if (data.user) {
// //           toast({
// //             title: "Success",
// //             description: "Account created successfully! You can now sign in.",
// //           });
// //           resetForm();
// //           setIsLogin(true);
// //         }
// //       }
// //     } catch (error: any) {
// //       toast({
// //         title: "Error",
// //         description: "An unexpected error occurred. Please try again.",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handlePasswordReset = async () => {
// //     console.log("Resetting password for:", email);
// //     setLoading(true);
// //     const { error } = await supabase.auth.resetPasswordForEmail(email, {
// //       redirectTo: 'http://localhost:8080/update-password',
// //     });

// //     if (error) {
// //       console.error("Reset password error:", error);
// //       toast({
// //         title: 'Reset Failed',
// //         description: error.message,
// //         variant: 'destructive',
// //       });
// //     } else {
// //       console.log("Password reset email sent successfully");
// //       toast({
// //         title: 'Reset Email Sent',
// //         description: 'Check your inbox to reset your password.',
// //       });
// //       setIsLogin(true);
// //       resetForm();
// //     }

// //     setLoading(false);
// //   };

// //   const resetForm = () => {
// //     setEmail("");
// //     setPassword("");
// //   };

// //   const toggleMode = () => {
// //     setIsLogin(!isLogin);
// //     resetForm();
// //   };

// //   const handleClose = () => {
// //     resetForm();
// //     onClose();
// //   };

// //   return (
// //     <Dialog open={isOpen} onOpenChange={handleClose}>
// //       <DialogContent>
// //         <DialogHeader>
// //           <DialogTitle>{isLogin ? "Sign In" : "Create Account"}</DialogTitle>
// //           <DialogDescription>
// //             {isLogin
// //               ? "Enter your credentials to access your account"
// //               : "Create a new account to get started"}
// //           </DialogDescription>
// //         </DialogHeader>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <Label htmlFor="email">Email</Label>
// //             <Input
// //               id="email"
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               placeholder="Enter your email address"
// //               required
// //               disabled={loading}
// //             />
// //           </div>

// //           <div>
// //             <Label htmlFor="password">Password</Label>
// //             <Input
// //               id="password"
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               placeholder={
// //                 isLogin ? "Enter your password" : "Create a password (min 6 characters)"
// //               }
// //               required
// //               minLength={isLogin ? undefined : 6}
// //               disabled={loading}
// //             />
// //           </div>

// //           <Button
// //             type="submit"
// //             className="w-full"
// //             disabled={loading || !email || !password}
// //           >
// //             {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
// //           </Button>

// //           {isLogin && (
// //             <Button
// //               type="button"
// //               variant="ghost"
// //               className="w-full text-blue-600 hover:underline"
// //               onClick={handlePasswordReset}
// //               disabled={loading}
// //             >
// //               Forgot Password?
// //             </Button>
// //           )}

// //           <Button
// //             type="button"
// //             variant="ghost"
// //             className="w-full text-blue-600 hover:underline"
// //             onClick={toggleMode}
// //             disabled={loading}
// //           >
// //             {isLogin
// //               ? "Need an account? Sign up"
// //               : "Already have an account? Sign in"}
// //           </Button>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default AuthModal;

// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import { useNavigate } from "react-router-dom";
// import mixpanel, { setMixpanelSessionId, trackLoginFailure, trackLoginSuccess, trackSignup } from "@/utils/mixpanel";
// import { v4 as uuidv4 } from "uuid";
// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// type AuthMode = "login" | "signup" | "forgot";

// const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
//   const { toast } = useToast();
//   const [mode, setMode] = useState<AuthMode>("login");
//   const [email, setEmail] = useState("testuser@gmail.com");
//   const [password, setPassword] = useState("TestUser@123");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const resetForm = () => {
//     setEmail("");
//     setPassword("");
//   };

//   const handleClose = () => {
//     resetForm();
//     setMode("login");
//     onClose();
//   };
//   useEffect(() => {
//     const sessionId = `auth_${uuidv4()}`;
//     setMixpanelSessionId(sessionId);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (mode === "login") {
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });

//         if (error) {
//           trackLoginFailure(error);
//           toast({
//             title: "Login Failed",
//             description: error.message,
//             variant: "destructive",
//           });
//           return;
//         }

//         if (data.user) {
//            const userData = {
//              id: data.user.id,
//              first_name: data.user.user_metadata?.first_name || "",
//              last_name: data.user.user_metadata?.last_name || "",
//              email: data.user.email || "",
//            };
//            trackLoginSuccess(data.user.id, userData);
//           toast({
//             title: "Success",
//             description: "Signed in successfully!",
//           });
//           resetForm();
//           onSuccess();
//           onClose();
//         }
//       } else if (mode === "signup") {
//         const { data, error } = await supabase.auth.signUp({ email, password, options: {
//           data: {
//             first_name: '', // You might want to collect these during signup
//             last_name: ''
//           }
//         }});

//         if (error) {
//           trackLoginFailure(error);
//           toast({
//             title: "Sign Up Failed",
//             description: error.message,
//             variant: "destructive",
//           });
//           return;
//         }

//         if (data.user) {
//            trackSignup(data.user.id, {
//           first_name: data.user.user_metadata?.first_name || '',
//           last_name: data.user.user_metadata?.last_name || '',
//           email: data.user.email || ''
//         });
//           toast({
//             title: "Success",
//             description: "Account created! Check your email to confirm.",
//           });
//           resetForm();
//           setMode("login");
//         }
//       }
//     } catch (error: any) {
//       trackLoginFailure(error);
//       toast({
//         title: "Error",
//         description: "Something went wrong. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePasswordReset = async () => {
//     setLoading(true);
//     const { error } = await supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: "http://localhost:8080/update-password",
//     });

//     if (error) {
//       toast({
//         title: "Reset Failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     } else {
//       toast({
//         title: "Email Sent",
//         description: "Check your inbox to reset your password.",
//       });
//       resetForm();
//       setMode("login");
//     }

//     setLoading(false);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             {mode === "login"
//               ? "Sign In"
//               : mode === "signup"
//               ? "Create Account"
//               : "Forgot Password"}
//           </DialogTitle>
//           <DialogDescription>
//             {mode === "login" && "Enter your credentials to sign in"}
//             {mode === "signup" && "Create a new account to get started"}
//             {mode === "forgot" && "We'll send you a password reset link"}
//           </DialogDescription>
//         </DialogHeader>

//         {mode === "forgot" ? (
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handlePasswordReset();
//             }}
//             className="space-y-4"
//           >
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email address"
//                 required
//                 disabled={loading}
//               />
//             </div>
//             <Button
//               type="submit"
//               className="w-full"
//               disabled={loading || !email}
//             >
//               {loading ? "Sending..." : "Send Reset Link"}
//             </Button>
//             <Button
//               type="button"
//               variant="ghost"
//               className="w-full text-blue-600 hover:underline"
//               onClick={() => setMode("login")}
//             >
//               Back to Sign In
//             </Button>
//           </form>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email address"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder={
//                   mode === "login"
//                     ? "Enter your password"
//                     : "Create a password (min 6 characters)"
//                 }
//                 required
//                 minLength={mode === "signup" ? 6 : undefined}
//                 disabled={loading}
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full"
//               disabled={loading || !email || !password}
//               onClick={() => {
//     // Track the submit action
//     mixpanel.track(mode === "login" ? "Login Attempt" : "Signup Attempt", {
//       email: email,
//       session_id: mixpanel.get_property("session_id"),
//       timestamp: new Date().toISOString(),
//     });
//   }}
//             >
//               {loading
//                 ? "Please wait..."
//                 : mode === "login"
//                 ? "Sign In"
//                 : "Create Account"}
//             </Button>

//             {mode === "login" && (
//               <Button
//                 type="button"
//                 variant="ghost"
//                 className="w-full text-blue-600 hover:underline"
//                 // onClick={() => setMode("forgot")}
//                 onClick={() => {
//       // Track forgot password click
//       mixpanel.track("Forgot Password Click", {
//         email: email,
//         session_id: mixpanel.get_property("session_id"),
//         timestamp: new Date().toISOString(),
//       });
//       setMode("forgot");
//     }}
//                 disabled={loading}
//               >
//                 Forgot Password?
//               </Button>
//             )}

//             <Button
//               type="button"
//               variant="ghost"
//               className="w-full text-blue-600 hover:underline"
//               // onClick={() => setMode(mode === "login" ? "signup" : "login")}
//               // onClick={() => {
//               //   onClose(); // Close the modal
//               //   navigate("/register"); // Navigate to register page
//               // }}
//               onClick={() => {
//     // Track navigation action
//     mixpanel.track(
//       mode === "login" ? "Navigate to Signup" : "Navigate to Login",
//       {
//         from: "auth modal",
//         session_id: mixpanel.get_property("session_id"),
//         timestamp: new Date().toISOString(),
//       }
//     );
//     onClose();
//     navigate("/register");
//   }}
//               disabled={loading}
//             >
//               {mode === "login"
//                 ? "Need an account? Sign up"
//                 : "Already have an account? Sign in"}
//             </Button>
//           </form>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AuthModal;

import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import mixpanel, {
  mixpanelInstance,
  setMixpanelSessionId,
  trackLoginFailure,
  trackLoginSuccess,
  trackSignup,
} from "@/utils/mixpanel";
import { v4 as uuidv4 } from "uuid";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type AuthMode = "login" | "signup" | "forgot";

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleClose = () => {
    resetForm();
    setMode("login");
    onClose();
  };

  useEffect(() => {
    const sessionId = `auth_${uuidv4()}`;
    setMixpanelSessionId(sessionId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    // Validate inputs
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (mode !== "forgot" && !validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          trackLoginFailure(error);
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Login Failed",
              description: "Incorrect email or password",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login Failed",
              description: error.message,
              variant: "destructive",
            });
          }
          return;
        }

        if (data.user) {
          const userData = {
            id: data.user.id,
            first_name: data.user.user_metadata?.first_name || "",
            last_name: data.user.user_metadata?.last_name || "",
            email: data.user.email || "",
          };
          trackLoginSuccess(data.user.id, userData);
          toast({
            title: "Success",
            description: "Signed in successfully!",
          });
          resetForm();
          onSuccess();
          onClose();
        }
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            data: {
              first_name: "", // You might want to collect these during signup
              last_name: "",
              // confirmationURL: `${window.location.origin}/confirm-email`, // For email confirmation
            },
            emailRedirectTo: `https://pro-portal-register.vercel.app/`,
            // For email confirmation
          },
        });

        if (error) {
          trackLoginFailure(error);
          if (error.message.includes("User already registered")) {
            toast({
              title: "Sign Up Failed",
              description: "An account with this email already exists",
              variant: "destructive",
            });
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
          trackSignup(data.user.id, {
            first_name: data.user.user_metadata?.first_name || "",
            last_name: data.user.user_metadata?.last_name || "",
            email: data.user.email || "",
          });
          toast({
            title: "Success",
            description: "Account created! Check your email to confirm.",
          });
          resetForm();
          setMode("login");
        }
      }
    } catch (error: any) {
      trackLoginFailure(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `https://www.thefuturemed.com/update-password`,
      // redirectTo: `https://pro-portal-register.vercel.app/update-password`,
      // redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      toast({
        title: "Reset Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email Sent",
        description: "Check your inbox to reset your password.",
      });
      resetForm();
      setMode("login");
    }

    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "login"
              ? "Sign In"
              : mode === "signup"
              ? "Create Account"
              : "Forgot Password"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login" && "Enter your credentials to sign in"}
            {mode === "signup" && "Create a new account to get started"}
            {mode === "forgot" && "We'll send you a password reset link"}
          </DialogDescription>
        </DialogHeader>

        {mode === "forgot" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordReset();
            }}
            className="space-y-4"
          >
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
              {emailError && (
                <p className="text-sm text-red-500 mt-1">{emailError}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !email}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full text-blue-600 hover:underline"
              onClick={() => setMode("login")}
            >
              Back to Sign In
            </Button>
          </form>
        ) : (
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
              {emailError && (
                <p className="text-sm text-red-500 mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  mode === "login"
                    ? "Enter your password"
                    : "Create a password (min 6 characters)"
                }
                required
                minLength={mode === "signup" ? 6 : undefined}
                disabled={loading}
              />
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !email || !password}
              onClick={() => {
                mixpanel.track(
                  mode === "login" ? "Login Attempt" : "Signup Attempt",
                  {
                    email: email,
                    session_id: mixpanel.get_property("session_id"),
                    timestamp: new Date().toISOString(),
                  }
                );
              }}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </Button>

            {mode === "login" && (
              <Button
                type="button"
                variant="ghost"
                className="w-full text-blue-600 hover:underline"
                onClick={() => {
                  mixpanelInstance.track("Forgot Password Click", {
                    email: email,
                    session_id: mixpanelInstance.get_property("session_id"),
                    timestamp: new Date().toISOString(),
                  });
                  setMode("forgot");
                }}
                disabled={loading}
              >
                Forgot Password?
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              className="w-full text-blue-600 hover:underline"
              onClick={() => {
                mixpanel.track(
                  mode === "login" ? "Navigate to Signup" : "Navigate to Login",
                  {
                    from: "auth modal",
                    session_id: mixpanel.get_property("session_id"),
                    timestamp: new Date().toISOString(),
                  }
                );
                onClose();
                navigate("/register");
              }}
              disabled={loading}
            >
              {mode === "login"
                ? "Need an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
