// // // // // // // // // // src/components/PaymentSuccess.js
// // // // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // import { useSearchParams } from "react-router-dom";


// // // // // // // // // const PaymentSuccess = () => {
// // // // // // // // //   const [searchParams] = useSearchParams();
// // // // // // // // //   const [verificationStatus, setVerificationStatus] = useState("verifying");
// // // // // // // // //   const [error, setError] = useState("");
// // // // // // // // //   const [orderDetails, setOrderDetails] = useState(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const verifyPayment = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const sessionId = searchParams.get("session_id");

// // // // // // // // //         if (!sessionId) {
// // // // // // // // //           throw new Error("No session ID found in URL");
// // // // // // // // //         }

// // // // // // // // //         // Call verification endpoint
// // // // // // // // //         const { data, error: verifyError } = await supabase.functions.invoke(
// // // // // // // // //           "verify-payment",
// // // // // // // // //           {
// // // // // // // // //             body: { sessionId },
// // // // // // // // //           }
// // // // // // // // //         );

// // // // // // // // //         if (verifyError) {
// // // // // // // // //           throw new Error(verifyError.message);
// // // // // // // // //         }

// // // // // // // // //         if (data.status === "paid") {
// // // // // // // // //           setVerificationStatus("success");
// // // // // // // // //           setOrderDetails(data);

// // // // // // // // //           // Redirect after delay
// // // // // // // // //           setTimeout(() => {
// // // // // // // // //             if (data.enrolled) {
// // // // // // // // //               window.location.href = "/my-courses";
// // // // // // // // //             } else if (data.seminar_registered) {
// // // // // // // // //               window.location.href = "/my-seminars";
// // // // // // // // //             }
// // // // // // // // //           }, 3000);
// // // // // // // // //         } else {
// // // // // // // // //           setVerificationStatus("failed");
// // // // // // // // //           setError("Payment was not completed successfully");
// // // // // // // // //         }
// // // // // // // // //       } catch (err) {
// // // // // // // // //         setVerificationStatus("error");
// // // // // // // // //         setError(err.message);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     verifyPayment();
// // // // // // // // //   }, [searchParams]);

// // // // // // // // //   return (
// // // // // // // // //     <div className="payment-success">
// // // // // // // // //       <div className="container">
// // // // // // // // //         {verificationStatus === "verifying" && (
// // // // // // // // //           <div className="verifying">
// // // // // // // // //             <h2>Verifying your payment...</h2>
// // // // // // // // //             <div className="spinner"></div>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {verificationStatus === "success" && orderDetails && (
// // // // // // // // //           <div className="success">
// // // // // // // // //             <h2>Payment Successful! 🎉</h2>
// // // // // // // // //             <p>Thank you for your purchase!</p>
// // // // // // // // //             <div className="order-details">
// // // // // // // // //               <p>Amount: ${(orderDetails.amount_total / 100).toFixed(2)}</p>
// // // // // // // // //               <p>Status: {orderDetails.status}</p>
// // // // // // // // //             </div>
// // // // // // // // //             <p>You will be redirected shortly...</p>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {verificationStatus === "failed" && (
// // // // // // // // //           <div className="failed">
// // // // // // // // //             <h2>Payment Failed</h2>
// // // // // // // // //             <p>{error}</p>
// // // // // // // // //             <button onClick={() => (window.location.href = "/")}>
// // // // // // // // //               Try Again
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {verificationStatus === "error" && (
// // // // // // // // //           <div className="error">
// // // // // // // // //             <h2>Error</h2>
// // // // // // // // //             <p>{error}</p>
// // // // // // // // //             <button onClick={() => (window.location.href = "/")}>
// // // // // // // // //               Go Home
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default PaymentSuccess;

// // // // // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import { useSearchParams } from "react-router-dom";

// // // // // // // // const PaymentSuccess = () => {
// // // // // // // //   const [searchParams] = useSearchParams();
// // // // // // // //   const [verificationStatus, setVerificationStatus] = useState("verifying");
// // // // // // // //   const [error, setError] = useState("");
// // // // // // // //   const [orderDetails, setOrderDetails] = useState<any>(null);
// // // // // // // //   const [debugInfo, setDebugInfo] = useState<string>("");

// // // // // // // //   useEffect(() => {
// // // // // // // //     const verifyPayment = async () => {
// // // // // // // //       try {
// // // // // // // //         const sessionId = searchParams.get("session_id");
// // // // // // // //         console.log("Session ID from URL:", sessionId);

// // // // // // // //         if (!sessionId) {
// // // // // // // //           throw new Error("No session ID found in URL");
// // // // // // // //         }

// // // // // // // //         // Get the current session to ensure we have a valid token
// // // // // // // //         const {
// // // // // // // //           data: { session },
// // // // // // // //           error: sessionError,
// // // // // // // //         } = await supabase.auth.getSession();

// // // // // // // //         if (sessionError) {
// // // // // // // //           console.error("Session error:", sessionError);
// // // // // // // //           throw new Error("Authentication error. Please try logging in again.");
// // // // // // // //         }

// // // // // // // //         if (!session) {
// // // // // // // //           throw new Error(
// // // // // // // //             "No active session. Please log in to verify payment."
// // // // // // // //           );
// // // // // // // //         }

// // // // // // // //         console.log("User session found, calling verify-payment function...");

// // // // // // // //         // Call verification endpoint with proper authentication
// // // // // // // //         const { data, error: verifyError } = await supabase.functions.invoke(
// // // // // // // //           "verify-payment",
// // // // // // // //           {
// // // // // // // //             body: { sessionId },
// // // // // // // //             headers: {
// // // // // // // //               Authorization: `Bearer ${session.access_token}`,
// // // // // // // //             },
// // // // // // // //           }
// // // // // // // //         );

// // // // // // // //         console.log("Verify payment response:", { data, error: verifyError });

// // // // // // // //         if (verifyError) {
// // // // // // // //           console.error("Verify payment error:", verifyError);
// // // // // // // //           throw new Error(verifyError.message || "Failed to verify payment");
// // // // // // // //         }

// // // // // // // //         if (data?.status === "paid") {
// // // // // // // //           setVerificationStatus("success");
// // // // // // // //           setOrderDetails(data);

// // // // // // // //           // Redirect after delay
// // // // // // // //           setTimeout(() => {
// // // // // // // //             if (data.enrolled) {
// // // // // // // //               window.location.href = "/my-courses";
// // // // // // // //             } else if (data.seminar_registered) {
// // // // // // // //               window.location.href = "/my-seminars";
// // // // // // // //             } else {
// // // // // // // //               // Default redirect if no specific destination
// // // // // // // //               window.location.href = "/";
// // // // // // // //             }
// // // // // // // //           }, 3000);
// // // // // // // //         } else {
// // // // // // // //           setVerificationStatus("failed");
// // // // // // // //           setError(data?.message || "Payment was not completed successfully");
// // // // // // // //         }
// // // // // // // //       } catch (err: any) {
// // // // // // // //         console.error("Payment verification error:", err);
// // // // // // // //         setVerificationStatus("error");
// // // // // // // //         setError(err.message || "An unexpected error occurred");
// // // // // // // //         setDebugInfo(err.toString());
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     verifyPayment();
// // // // // // // //   }, [searchParams]);

// // // // // // // //   // Add some basic styling
// // // // // // // //   const styles = {
// // // // // // // //     container: {
// // // // // // // //       display: "flex",
// // // // // // // //       justifyContent: "center",
// // // // // // // //       alignItems: "center",
// // // // // // // //       minHeight: "100vh",
// // // // // // // //       padding: "20px",
// // // // // // // //     },
// // // // // // // //     content: {
// // // // // // // //       textAlign: "center" as const,
// // // // // // // //       maxWidth: "500px",
// // // // // // // //       width: "100%",
// // // // // // // //     },
// // // // // // // //     spinner: {
// // // // // // // //       border: "4px solid #f3f3f3",
// // // // // // // //       borderTop: "4px solid #3498db",
// // // // // // // //       borderRadius: "50%",
// // // // // // // //       width: "40px",
// // // // // // // //       height: "40px",
// // // // // // // //       animation: "spin 1s linear infinite",
// // // // // // // //       margin: "20px auto",
// // // // // // // //     },
// // // // // // // //     success: {
// // // // // // // //       color: "green",
// // // // // // // //     },
// // // // // // // //     error: {
// // // // // // // //       color: "red",
// // // // // // // //     },
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={styles.container}>
// // // // // // // //       <div style={styles.content}>
// // // // // // // //         {verificationStatus === "verifying" && (
// // // // // // // //           <div className="verifying">
// // // // // // // //             <h2>Verifying your payment...</h2>
// // // // // // // //             <div style={styles.spinner}></div>
// // // // // // // //             <p>Please wait while we confirm your payment details.</p>
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {verificationStatus === "success" && orderDetails && (
// // // // // // // //           <div style={styles.success}>
// // // // // // // //             <h2>Payment Successful! 🎉</h2>
// // // // // // // //             <p>Thank you for your purchase!</p>
// // // // // // // //             <div className="order-details">
// // // // // // // //               <p>
// // // // // // // //                 <strong>Amount:</strong> $
// // // // // // // //                 {(orderDetails.amount_total / 100).toFixed(2)}
// // // // // // // //               </p>
// // // // // // // //               <p>
// // // // // // // //                 <strong>Status:</strong> {orderDetails.status}
// // // // // // // //               </p>
// // // // // // // //               {orderDetails.product_type && (
// // // // // // // //                 <p>
// // // // // // // //                   <strong>Product:</strong> {orderDetails.product_type}
// // // // // // // //                 </p>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //             <p>You will be redirected shortly...</p>
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {verificationStatus === "failed" && (
// // // // // // // //           <div style={styles.error}>
// // // // // // // //             <h2>Payment Failed</h2>
// // // // // // // //             <p>{error}</p>
// // // // // // // //             <button
// // // // // // // //               onClick={() => (window.location.href = "/")}
// // // // // // // //               style={{
// // // // // // // //                 padding: "10px 20px",
// // // // // // // //                 backgroundColor: "#007bff",
// // // // // // // //                 color: "white",
// // // // // // // //                 border: "none",
// // // // // // // //                 borderRadius: "5px",
// // // // // // // //                 cursor: "pointer",
// // // // // // // //                 marginTop: "20px",
// // // // // // // //               }}
// // // // // // // //             >
// // // // // // // //               Try Again
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {verificationStatus === "error" && (
// // // // // // // //           <div style={styles.error}>
// // // // // // // //             <h2>Error</h2>
// // // // // // // //             <p>{error}</p>
// // // // // // // //             {debugInfo && (
// // // // // // // //               <details style={{ marginTop: "10px", fontSize: "12px" }}>
// // // // // // // //                 <summary>Debug Info</summary>
// // // // // // // //                 {debugInfo}
// // // // // // // //               </details>
// // // // // // // //             )}
// // // // // // // //             <button
// // // // // // // //               onClick={() => (window.location.href = "/")}
// // // // // // // //               style={{
// // // // // // // //                 padding: "10px 20px",
// // // // // // // //                 backgroundColor: "#007bff",
// // // // // // // //                 color: "white",
// // // // // // // //                 border: "none",
// // // // // // // //                 borderRadius: "5px",
// // // // // // // //                 cursor: "pointer",
// // // // // // // //                 marginTop: "20px",
// // // // // // // //               }}
// // // // // // // //             >
// // // // // // // //               Go Home
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {/* Add CSS for spinner animation */}
// // // // // // // //         <style>
// // // // // // // //           {`
// // // // // // // //             @keyframes spin {
// // // // // // // //               0% { transform: rotate(0deg); }
// // // // // // // //               100% { transform: rotate(360deg); }
// // // // // // // //             }
// // // // // // // //             .order-details {
// // // // // // // //               background: #f8f9fa;
// // // // // // // //               padding: 15px;
// // // // // // // //               border-radius: 8px;
// // // // // // // //               margin: 15px 0;
// // // // // // // //             }
// // // // // // // //           `}
// // // // // // // //         </style>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default PaymentSuccess;

// // // // // // // // src/components/PaymentSuccess.jsx
// // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // import { useSearchParams } from 'react-router-dom';
// // // // // // // // import './PaymentSuccess.css';

// // // // // // // const PaymentSuccess = ({ supabase }) => {
// // // // // // //   const [searchParams] = useSearchParams();
// // // // // // //   const [verificationStatus, setVerificationStatus] = useState('verifying');
// // // // // // //   const [error, setError] = useState('');
// // // // // // //   const [orderDetails, setOrderDetails] = useState(null);

// // // // // // //   useEffect(() => {
// // // // // // //     const verifyPayment = async () => {
// // // // // // //       try {
// // // // // // //         const sessionId = searchParams.get('session_id');
        
// // // // // // //         if (!sessionId) {
// // // // // // //           throw new Error('No session ID found in URL');
// // // // // // //         }

// // // // // // //         // Call verification endpoint (you'll need to create this Edge Function)
// // // // // // //         const { data, error: verifyError } = await supabase.functions.invoke('verify-payment', {
// // // // // // //           body: { sessionId }
// // // // // // //         });

// // // // // // //         if (verifyError) {
// // // // // // //           throw new Error(verifyError.message);
// // // // // // //         }

// // // // // // //         if (data.status === 'paid') {
// // // // // // //           setVerificationStatus('success');
// // // // // // //           setOrderDetails(data);
          
// // // // // // //           // Redirect after delay
// // // // // // //           setTimeout(() => {
// // // // // // //             if (data.enrolled) {
// // // // // // //               window.location.href = '/my-courses';
// // // // // // //             } else if (data.seminar_registered) {
// // // // // // //               window.location.href = '/my-seminars';
// // // // // // //             }
// // // // // // //           }, 3000);
// // // // // // //         } else {
// // // // // // //           setVerificationStatus('failed');
// // // // // // //           setError('Payment was not completed successfully');
// // // // // // //         }

// // // // // // //       } catch (err) {
// // // // // // //         setVerificationStatus('error');
// // // // // // //         setError(err.message);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     verifyPayment();
// // // // // // //   }, [searchParams, supabase]);

// // // // // // //   return (
// // // // // // //     <div className="payment-success">
// // // // // // //       <div className="container">
// // // // // // //         {verificationStatus === 'verifying' && (
// // // // // // //           <div className="verifying">
// // // // // // //             <h2>Verifying your payment...</h2>
// // // // // // //             <div className="spinner"></div>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {verificationStatus === 'success' && orderDetails && (
// // // // // // //           <div className="success">
// // // // // // //             <h2>Payment Successful! 🎉</h2>
// // // // // // //             <p>Thank you for your purchase!</p>
// // // // // // //             <div className="order-details">
// // // // // // //               <p>Amount: ${(orderDetails.amount_total / 100).toFixed(2)}</p>
// // // // // // //               <p>Status: {orderDetails.status}</p>
// // // // // // //             </div>
// // // // // // //             <p>You will be redirected shortly...</p>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {verificationStatus === 'failed' && (
// // // // // // //           <div className="failed">
// // // // // // //             <h2>Payment Failed</h2>
// // // // // // //             <p>{error}</p>
// // // // // // //             <button onClick={() => window.location.href = '/'}>
// // // // // // //               Try Again
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {verificationStatus === 'error' && (
// // // // // // //           <div className="error">
// // // // // // //             <h2>Error</h2>
// // // // // // //             <p>{error}</p>
// // // // // // //             <button onClick={() => window.location.href = '/'}>
// // // // // // //               Go Home
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default PaymentSuccess;

// // // // // // // src/components/PaymentSuccess.js
// // // // // // import { supabase } from '@/integrations/supabase/client'
// // // // // // import React, { useEffect, useState } from 'react'
// // // // // // import { useSearchParams } from 'react-router-dom'
// // // // // // // import { supabase } from '../lib/supabase'

// // // // // // const PaymentSuccess = () => {
// // // // // //   const [searchParams] = useSearchParams()
// // // // // //   const [verificationStatus, setVerificationStatus] = useState('verifying')
// // // // // //   const [error, setError] = useState('')
// // // // // //   const [orderDetails, setOrderDetails] = useState(null)

// // // // // //   useEffect(() => {
// // // // // //     const verifyPayment = async () => {
// // // // // //       try {
// // // // // //         const sessionId = searchParams.get('session_id')
        
// // // // // //         if (!sessionId) {
// // // // // //           throw new Error('No session ID found in URL')
// // // // // //         }

// // // // // //         // Call verification endpoint (you'll need to create this Edge Function)
// // // // // //         const { data: verifydata, error: verifyError } =
// // // // // //           await supabase.functions.invoke("verify-payment", {
// // // // // //             body: { sessionId },
// // // // // //           });

// // // // // //         if (verifyError) {
// // // // // //           throw new Error(verifyError.message)
// // // // // //         }

// // // // // //         if (verifydata.status === "paid") {
// // // // // //           setVerificationStatus("success");
// // // // // //           setOrderDetails(verifydata);

// // // // // //           // Redirect after delay
// // // // // //           setTimeout(() => {
// // // // // //             if (verifydata.enrolled) {
// // // // // //               window.location.href = "/my-courses";
// // // // // //             } else if (verifydata.seminar_registered) {
// // // // // //               window.location.href = "/my-seminars";
// // // // // //             }
// // // // // //           }, 3000);
// // // // // //         } else {
// // // // // //           setVerificationStatus("failed");
// // // // // //           setError("Payment was not completed successfully");
// // // // // //         }

// // // // // //       } catch (err) {
// // // // // //         setVerificationStatus('error')
// // // // // //         setError(err.message)
// // // // // //       }
// // // // // //     }

// // // // // //     verifyPayment()
// // // // // //   }, [searchParams])

// // // // // //   return (
// // // // // //     <div className="payment-success">
// // // // // //       <div className="container">
// // // // // //         {verificationStatus === 'verifying' && (
// // // // // //           <div className="verifying">
// // // // // //             <h2>Verifying your payment...</h2>
// // // // // //             <div className="spinner"></div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {verificationStatus === 'success' && orderDetails && (
// // // // // //           <div className="success">
// // // // // //             <h2>Payment Successful! 🎉</h2>
// // // // // //             <p>Thank you for your purchase!</p>
// // // // // //             <div className="order-details">
// // // // // //               <p>Amount: ${(orderDetails.amount_total / 100).toFixed(2)}</p>
// // // // // //               <p>Status: {orderDetails.status}</p>
// // // // // //             </div>
// // // // // //             <p>You will be redirected shortly...</p>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {verificationStatus === 'failed' && (
// // // // // //           <div className="failed">
// // // // // //             <h2>Payment Failed</h2>
// // // // // //             <p>{error}</p>
// // // // // //             <button onClick={() => window.location.href = '/'}>
// // // // // //               Try Again
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {verificationStatus === 'error' && (
// // // // // //           <div className="error">
// // // // // //             <h2>Error</h2>
// // // // // //             <p>{error}</p>
// // // // // //             <button onClick={() => window.location.href = '/'}>
// // // // // //               Go Home
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   )
// // // // // // }

// // // // // // export default PaymentSuccess

// // // // // import { supabase } from "@/integrations/supabase/client";
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { useSearchParams } from "react-router-dom";

// // // // // const PaymentSuccess: React.FC = () => {
// // // // //   const [searchParams] = useSearchParams();
// // // // //   const [verificationStatus, setVerificationStatus] = useState<
// // // // //     "verifying" | "success" | "failed" | "error"
// // // // //   >("verifying");
// // // // //   const [error, setError] = useState<string>("");
// // // // //   const [orderDetails, setOrderDetails] = useState<any>(null);

// // // // //   useEffect(() => {
// // // // //     const verifyPayment = async () => {
// // // // //       try {
// // // // //         const sessionId = searchParams.get("session_id");
// // // // //         if (!sessionId) throw new Error("No session ID found in URL");

// // // // //         // Optionally get auth session for protected endpoints
// // // // //         const {
// // // // //           data: { session },
// // // // //           error: sessionError,
// // // // //         } = await supabase.auth.getSession();
// // // // //         if (sessionError)
// // // // //           throw new Error("Authentication error. Please try logging in again.");
// // // // //         if (!session)
// // // // //           throw new Error(
// // // // //             "No active session. Please log in to verify payment."
// // // // //           );

// // // // //         // Call verification endpoint with authentication
// // // // //         const { data: verifydata, error: verifyError } =
// // // // //           await supabase.functions.invoke("verify-payment", {
// // // // //             body: { sessionId },
// // // // //             headers: {
// // // // //               Authorization: `Bearer ${session.access_token}`,
// // // // //             },
// // // // //           });

// // // // //         if (verifyError)
// // // // //           throw new Error(verifyError.message || "Failed to verify payment");

// // // // //         if (verifydata?.status === "paid") {
// // // // //           setVerificationStatus("success");
// // // // //           setOrderDetails(verifydata);

// // // // //           // Redirect after delay
// // // // //           setTimeout(() => {
// // // // //             if (verifydata.enrolled) {
// // // // //               window.location.href = "/my-courses";
// // // // //             } else if (verifydata.seminar_registered) {
// // // // //               window.location.href = "/my-seminars";
// // // // //             } else {
// // // // //               window.location.href = "/";
// // // // //             }
// // // // //           }, 3000);
// // // // //         } else {
// // // // //           setVerificationStatus("failed");
// // // // //           setError(
// // // // //             verifydata?.message || "Payment was not completed successfully"
// // // // //           );
// // // // //         }
// // // // //       } catch (err: any) {
// // // // //         setVerificationStatus("error");
// // // // //         setError(err.message || "An unexpected error occurred");
// // // // //       }
// // // // //     };

// // // // //     verifyPayment();
// // // // //   }, [searchParams]);

// // // // //   return (
// // // // //     <div className="payment-success">
// // // // //       <div className="container">
// // // // //         {verificationStatus === "verifying" && (
// // // // //           <div className="verifying">
// // // // //             <h2>Verifying your payment...</h2>
// // // // //             <div className="spinner"></div>
// // // // //             <p>Please wait while we confirm your payment details.</p>
// // // // //           </div>
// // // // //         )}

// // // // //         {verificationStatus === "success" && orderDetails && (
// // // // //           <div className="success" style={{ color: "green" }}>
// // // // //             <h2>Payment Successful! 🎉</h2>
// // // // //             <p>Thank you for your purchase!</p>
// // // // //             <div
// // // // //               className="order-details"
// // // // //               style={{
// // // // //                 background: "#f8f9fa",
// // // // //                 padding: "15px",
// // // // //                 borderRadius: "8px",
// // // // //                 margin: "15px 0",
// // // // //               }}
// // // // //             >
// // // // //               <p>
// // // // //                 <strong>Amount:</strong> $
// // // // //                 {((orderDetails.amount_total ?? 0) / 100).toFixed(2)}
// // // // //               </p>
// // // // //               <p>
// // // // //                 <strong>Status:</strong> {orderDetails.status}
// // // // //               </p>
// // // // //               {orderDetails.product_type && (
// // // // //                 <p>
// // // // //                   <strong>Product:</strong> {orderDetails.product_type}
// // // // //                 </p>
// // // // //               )}
// // // // //             </div>
// // // // //             <p>You will be redirected shortly...</p>
// // // // //           </div>
// // // // //         )}

// // // // //         {verificationStatus === "failed" && (
// // // // //           <div className="failed" style={{ color: "red" }}>
// // // // //             <h2>Payment Failed</h2>
// // // // //             <p>{error}</p>
// // // // //             <button
// // // // //               onClick={() => (window.location.href = "/")}
// // // // //               style={{
// // // // //                 padding: "10px 20px",
// // // // //                 backgroundColor: "#007bff",
// // // // //                 color: "white",
// // // // //                 border: "none",
// // // // //                 borderRadius: "5px",
// // // // //                 cursor: "pointer",
// // // // //                 marginTop: "20px",
// // // // //               }}
// // // // //             >
// // // // //               Try Again
// // // // //             </button>
// // // // //           </div>
// // // // //         )}

// // // // //         {verificationStatus === "error" && (
// // // // //           <div className="error" style={{ color: "red" }}>
// // // // //             <h2>Error</h2>
// // // // //             <p>{error}</p>
// // // // //             <button
// // // // //               onClick={() => (window.location.href = "/")}
// // // // //               style={{
// // // // //                 padding: "10px 20px",
// // // // //                 backgroundColor: "#007bff",
// // // // //                 color: "white",
// // // // //                 border: "none",
// // // // //                 borderRadius: "5px",
// // // // //                 cursor: "pointer",
// // // // //                 marginTop: "20px",
// // // // //               }}
// // // // //             >
// // // // //               Go Home
// // // // //             </button>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Spinner animation CSS */}
// // // // //         <style>
// // // // //           {`
// // // // //             @keyframes spin {
// // // // //               0% { transform: rotate(0deg); }
// // // // //               100% { transform: rotate(360deg); }
// // // // //             }
// // // // //             .spinner {
// // // // //               border: 4px solid #f3f3f3;
// // // // //               border-top: 4px solid #3498db;
// // // // //               border-radius: 50%;
// // // // //               width: 40px;
// // // // //               height: 40px;
// // // // //               animation: spin 1s linear infinite;
// // // // //               margin: 20px auto;
// // // // //             }
// // // // //           `}
// // // // //         </style>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PaymentSuccess;

// // // // import React, { useEffect, useState } from "react";
// // // // import { useSearchParams } from "react-router-dom";

// // // // const PaymentSuccess: React.FC = () => {
// // // //   const [searchParams] = useSearchParams();
// // // //   const [orderDetails, setOrderDetails] = useState<any>(null);
// // // //   const [countdown, setCountdown] = useState(5);

// // // //   useEffect(() => {
// // // //     const sessionId = searchParams.get("session_id");
// // // //     const paymentStatus = searchParams.get("payment");
    
// // // //     if (paymentStatus === "success" && sessionId) {
// // // //       // Get product type from URL or localStorage if needed
// // // //       const productType = window.location.pathname.includes('course') ? 'course' : 'seminar';
      
// // // //       setOrderDetails({
// // // //         status: "paid",
// // // //         product_type: productType,
// // // //         // You can add more details here if needed
// // // //       });

// // // //       // Start countdown for redirect
// // // //       const timer = setInterval(() => {
// // // //         setCountdown((prev) => {
// // // //           if (prev <= 1) {
// // // //             clearInterval(timer);
// // // //             // Redirect based on product type
// // // //             if (productType === 'course') {
// // // //               window.location.href = "/my-courses";
// // // //             } else {
// // // //               window.location.href = "/my-seminars";
// // // //             }
// // // //             return 0;
// // // //           }
// // // //           return prev - 1;
// // // //         });
// // // //       }, 1000);

// // // //       return () => clearInterval(timer);
// // // //     } else {
// // // //       // If no success parameters, redirect to home
// // // //       window.location.href = "/";
// // // //     }
// // // //   }, [searchParams]);

// // // //   if (!orderDetails) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// // // //         <div className="text-center">
// // // //           <div className="spinner"></div>
// // // //           <p>Loading...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // // //       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
// // // //         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // // //           <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
// // // //           </svg>
// // // //         </div>
        
// // // //         <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful! 🎉</h2>
// // // //         <p className="text-gray-600 mb-4">Thank you for your purchase!</p>
        
// // // //         <div className="bg-gray-50 p-4 rounded-lg mb-4">
// // // //           <h3 className="font-semibold text-gray-800 mb-2">Order Details:</h3>
// // // //           <p className="text-sm text-gray-600">
// // // //             <span className="font-medium">Status:</span> Completed
// // // //           </p>
// // // //           {orderDetails.product_type && (
// // // //             <p className="text-sm text-gray-600">
// // // //               <span className="font-medium">Product Type:</span> {orderDetails.product_type}
// // // //             </p>
// // // //           )}
// // // //         </div>
        
// // // //         <p className="text-gray-500">
// // // //           You will be redirected to your {orderDetails.product_type === 'course' ? 'courses' : 'seminars'} in {countdown} seconds...
// // // //         </p>

// // // //         <button
// // // //           onClick={() => {
// // // //             if (orderDetails.product_type === 'course') {
// // // //               window.location.href = "/my-courses";
// // // //             } else {
// // // //               window.location.href = "/my-seminars";
// // // //             }
// // // //           }}
// // // //           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
// // // //         >
// // // //           Go to {orderDetails.product_type === 'course' ? 'My Courses' : 'My Seminars'} Now
// // // //         </button>
// // // //       </div>

// // // //       <style>
// // // //         {`
// // // //           @keyframes spin {
// // // //             0% { transform: rotate(0deg); }
// // // //             100% { transform: rotate(360deg); }
// // // //           }
// // // //           .spinner {
// // // //             border: 4px solid #f3f3f3;
// // // //             border-top: 4px solid #3498db;
// // // //             border-radius: 50%;
// // // //             width: 40px;
// // // //             height: 40px;
// // // //             animation: spin 1s linear infinite;
// // // //             margin: 20px auto;
// // // //           }
// // // //         `}
// // // //       </style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PaymentSuccess;

// // // import React, { useEffect, useState } from "react";
// // // import { useSearchParams } from "react-router-dom";

// // // const PaymentSuccess: React.FC = () => {
// // //   const [searchParams] = useSearchParams();
// // //   const [productType, setProductType] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     // If product type is in URL query (optional), capture it
// // //     const type = searchParams.get("productType");
// // //     if (type) setProductType(type);

// // //     // Redirect after 3 seconds
// // //     const redirectTimeout = setTimeout(() => {
// // //       if (type === "course") {
// // //         window.location.href = "/my-courses";
// // //       } else if (type === "seminar") {
// // //         window.location.href = "/my-seminars";
// // //       } else {
// // //         window.location.href = "/";
// // //       }
// // //     }, 3000);

// // //     return () => clearTimeout(redirectTimeout);
// // //   }, [searchParams]);

// // //   return (
// // //     <div className="payment-success">
// // //       <div className="container text-center">
// // //         <h2 style={{ color: "green" }}>🎉 Payment Successful!</h2>
// // //         <p>Thank you for your purchase.</p>

// // //         <div
// // //           className="order-details"
// // //           style={{
// // //             background: "#f8f9fa",
// // //             padding: "15px",
// // //             borderRadius: "8px",
// // //             margin: "15px auto",
// // //             maxWidth: "400px",
// // //           }}
// // //         >
// // //           {productType && (
// // //             <p>
// // //               <strong>Enrolled in:</strong> {productType}
// // //             </p>
// // //           )}
// // //           <p>You will be redirected shortly...</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PaymentSuccess;


// // import { supabase } from "@/integrations/supabase/client";
// // import { CheckCircle } from "lucide-react";
// // import React, { useEffect, useState } from "react";
// // import { useSearchParams } from "react-router-dom";

// // const PaymentSuccess: React.FC = () => {
// //   const [searchParams] = useSearchParams();
// //   const [productType, setProductType] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [orderDetails, setOrderDetails] = useState<any>(null);

// //   useEffect(() => {
// //     const processPayment = async () => {
// //       try {
// //         const sessionId = searchParams.get("session_id");
// //         const paymentIntent = searchParams.get("payment_intent");
// //         const type = searchParams.get("productType");

// //         if (type) setProductType(type);

// //         if (!sessionId && !paymentIntent) {
// //           setError("No payment session ID found");
// //           setLoading(false);
// //           return;
// //         }

// //         // Find the order based on Stripe session ID or payment intent
// //         let orderQuery = supabase.from("orders").select("*");

// //         if (sessionId) {
// //           orderQuery = orderQuery.eq("stripe_session_id", sessionId);
// //         } else if (paymentIntent) {
// //           orderQuery = orderQuery.eq("stripe_payment_intent", paymentIntent);
// //         }

// //         const { data: orders, error: orderError } = await orderQuery;

// //         if (orderError) throw orderError;
// //         if (!orders || orders.length === 0) {
// //           throw new Error("Order not found");
// //         }

// //         const order = orders[0];
// //         setOrderDetails(order);

// //         // Update order status to 'paid' if not already
// //         if (order.status !== "paid") {
// //           const { error: updateError } = await supabase
// //             .from("orders")
// //             .update({
// //               status: "paid",
// //               updated_at: new Date().toISOString(),
// //             })
// //             .eq("id", order.id);

// //           if (updateError) throw updateError;
// //         }

// //         // Handle seminar registration if product is a seminar
// //         if (type === "seminar" && order.seminar_id) {
// //           // Check if registration already exists
// //           const { data: existingRegistration } = await supabase
// //             .from("seminar_registrations")
// //             .select("*")
// //             .eq("seminar_id", order.seminar_id)
// //             .eq("user_id", order.user_id)
// //             .single();

// //           if (!existingRegistration) {
// //             // Create new seminar registration
// //             const { error: registrationError } = await supabase
// //               .from("seminar_registrations")
// //               .insert({
// //                 seminar_id: order.seminar_id,
// //                 user_id: order.user_id,
// //                 registered_at: new Date().toISOString(),
// //                 payment_status: "paid",
// //                 certificate_download: false,
// //                 updated_at: new Date().toISOString(),
// //               });

// //             if (registrationError) throw registrationError;
// //           } else {
// //             // Update existing registration payment status
// //             const { error: updateRegError } = await supabase
// //               .from("seminar_registrations")
// //               .update({
// //                 payment_status: "paid",
// //                 updated_at: new Date().toISOString(),
// //               })
// //               .eq("id", existingRegistration.id);

// //             if (updateRegError) throw updateRegError;
// //           }
// //         }

// //         setLoading(false);

// //         // Redirect after successful processing
// //         // setTimeout(() => {
// //         //   redirectUser(type);
// //         // }, 3000);
// //       } catch (err: any) {
// //         console.error("Payment processing error:", err);
// //         setError(err.message || "An error occurred during payment processing");
// //         setLoading(false);

// //         // Still redirect but show error message
// //         // setTimeout(() => {
// //         //   redirectUser(searchParams.get("productType"));
// //         // }, 5000);
// //       }
// //     };

// //     processPayment();
// //   }, [searchParams]);

// //   const redirectUser = (type: string | null) => {
// //     if (type === "course") {
// //       window.location.href = "/my-courses";
// //     } else if (type === "seminar") {
// //       window.location.href = "/my-seminars";
// //     } else {
// //       window.location.href = "/";
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="payment-processing">
// //         <div className="container text-center">
// //           <h2>Processing your payment...</h2>
// //           <div className="spinner-border text-primary" role="status">
// //             <span className="visually-hidden">Loading...</span>
// //           </div>
// //           <p>Please wait while we confirm your payment.</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="payment-error">
// //         <div className="container text-center">
// //           <h2 style={{ color: "red" }}>⚠️ Payment Processing Issue</h2>
// //           <p>{error}</p>
// //           {/* <p>
// //             You will be redirected shortly. If the issue persists, please
// //             contact support.
// //           </p> */}
// //           <div className="mt-6 flex justify-center gap-4">
// //             <button
// //               onClick={() => redirectUser(productType)}
// //               className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
// //             >
// //               Go Home
// //             </button>
// //             <button
// //               onClick={() => window.location.reload()}
// //               className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
// //             >
// //               Try Again
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     // <div className="payment-success">
// //     //   <div className="container text-center">
// //     //     <h2 style={{ color: "green" }}>🎉 Payment Successful!</h2>
// //     //     <p>Thank you for your purchase.</p>

// //     //     <div
// //     //       className="order-details"
// //     //       style={{
// //     //         background: "#f8f9fa",
// //     //         padding: "15px",
// //     //         borderRadius: "8px",
// //     //         margin: "15px auto",
// //     //         maxWidth: "400px",
// //     //       }}
// //     //     >
// //     //       {orderDetails && (
// //     //         <>
// //     //           <p>
// //     //             <strong>Order ID:</strong> {orderDetails.id.slice(0, 8)}...
// //     //           </p>
// //     //           <p>
// //     //             <strong>Amount:</strong> {orderDetails.amount}{" "}
// //     //             {orderDetails.currency}
// //     //           </p>
// //     //         </>
// //     //       )}
// //     //       {productType && (
// //     //         <p>
// //     //           <strong>Enrolled in:</strong> {productType}
// //     //         </p>
// //     //       )}
// //     //       <p>You will be redirected shortly...</p>
// //     //     </div>
// //     //   </div>
// //     // </div>
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
// //       <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
// //         {/* Success Icon */}
// //         <div className="flex justify-center mb-4">
// //           <CheckCircle className="text-green-500 w-16 h-16" />
// //         </div>

// //         {/* Heading */}
// //         <h2 className="text-2xl font-bold text-green-600 mb-2">
// //           🎉 Payment Successful!
// //         </h2>
// //         <p className="text-gray-600 mb-6">
// //           Thank you for your purchase. Your enrollment is confirmed.
// //         </p>

// //         {/* Order Details Card */}
// //         <div className="bg-gray-50 border rounded-lg p-5 text-left">
// //           {orderDetails && (
// //             <>
// //               <p className="text-gray-800 mb-2">
// //                 <span className="font-semibold">Order ID : </span>{" "}
// //                 {orderDetails.id}
// //                 {/* {orderDetails.id.slice(0, 8)}... */}
// //               </p>
// //               <p className="text-gray-800 mb-2">
// //                 <span className="font-semibold">Amount : </span>{" "}
// //                 {orderDetails.amount/100} {orderDetails.currency.toUpperCase()}
// //               </p>
// //             </>
// //           )}
// //           {productType && (
// //             <p className="text-gray-800 mb-2">
// //               <span className="font-semibold">Enrolled in:</span> {productType}
// //             </p>
// //           )}
// //         </div>

// //         {/* Redirect Note */}
// //         {/* <p className="mt-6 text-gray-500 text-sm">
// //           You will be redirected shortly...
// //         </p> */}
// //         <div className="mt-6 flex justify-center gap-4">
// //           <button
// //             onClick={() => redirectUser(productType)}
// //             className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
// //           >
// //             Go Home
// //           </button>
// //           <button
// //             onClick={() => window.location.reload()}
// //             className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// // export default PaymentSuccess;

// import { supabase } from "@/integrations/supabase/client";
// import { CheckCircle, AlertCircle } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// const PaymentSuccess: React.FC = () => {
//   const [searchParams] = useSearchParams();
//   const [productType, setProductType] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [orderDetails, setOrderDetails] = useState<any>(null);
//   const [debugInfo, setDebugInfo] = useState<string[]>([]);

//   const addDebugInfo = (info: string) => {
//     setDebugInfo((prev) => [
//       ...prev,
//       `${new Date().toLocaleTimeString()}: ${info}`,
//     ]);
//   };

//   // useEffect(() => {
//   //   const processPayment = async () => {
//   //     try {
//   //       addDebugInfo("Starting payment processing");
//   //       const sessionId = searchParams.get("session_id");
//   //       const paymentIntent = searchParams.get("payment_intent");
//   //       const type = searchParams.get("productType");

//   //       addDebugInfo(
//   //         `Session ID: ${sessionId}, Payment Intent: ${paymentIntent}, Type: ${type}`
//   //       );

//   //       if (type) setProductType(type);

//   //       if (!sessionId && !paymentIntent) {
//   //         const errMsg = "No payment session ID found";
//   //         addDebugInfo(errMsg);
//   //         setError(errMsg);
//   //         setLoading(false);
//   //         return;
//   //       }

//   //       // Find the order based on Stripe session ID or payment intent
//   //       let orderQuery = supabase.from("orders").select("*");

//   //       if (sessionId) {
//   //         orderQuery = orderQuery.eq("stripe_session_id", sessionId);
//   //         addDebugInfo(`Searching order with session ID: ${sessionId}`);
//   //       } else if (paymentIntent) {
//   //         orderQuery = orderQuery.eq("stripe_payment_intent", paymentIntent);
//   //         addDebugInfo(`Searching order with payment intent: ${paymentIntent}`);
//   //       }

//   //       const { data: orders, error: orderError } = await orderQuery;
//   //       console.log("orders",orders);

//   //       if (orderError) {
//   //         addDebugInfo(`Order query error: ${orderError.message}`);
//   //         throw orderError;
//   //       }

//   //       addDebugInfo(`Found ${orders?.length || 0} orders`);

//   //       if (!orders || orders.length === 0) {
//   //         const errMsg = "Order not found";
//   //         addDebugInfo(errMsg);
//   //         throw new Error(errMsg);
//   //       }

//   //       const order = orders[0];
//   //       setOrderDetails(order);
//   //       addDebugInfo(
//   //         `Order found: ${order.id}, Status: ${order.status}, Seminar ID: ${order.seminar_id}`
//   //       );

//   //       // Update order status to 'paid' if not already
//   //       if (order.status !== "paid") {
//   //         addDebugInfo("Updating order status to paid");
//   //         const { error: updateError } = await supabase
//   //           .from("orders")
//   //           .update({
//   //             status: "paid",
//   //             updated_at: new Date().toISOString(),
//   //           })
//   //           .eq("id", order.id);

//   //           console.log("updateError",updateError);

//   //         if (updateError) {
//   //           addDebugInfo(`Order update error: ${updateError.message}`);
//   //           throw updateError;
//   //         }
//   //         addDebugInfo("Order status updated successfully");
//   //       } else {
//   //         addDebugInfo("Order status already set to paid");
//   //       }

//   //       // Handle seminar registration if product is a seminar
//   //       if (type === "seminar" && order.seminar_id) {
//   //         addDebugInfo(
//   //           `Processing seminar registration for seminar ID: ${order.seminar_id}`
//   //         );
//   //         console.log("user_id",order.user_id);

//   //         // Check if registration already exists
//   //         const { data: existingRegistration, error: registrationCheckError } =
//   //           await supabase
//   //             .from("seminar_registrations")
//   //             .select("*")
//   //             .eq("seminar_id", order.seminar_id)
//   //             .eq("user_id", order.user_id);

//   //             console.log("data",existingRegistration);

//   //         if (registrationCheckError) {
//   //           addDebugInfo(
//   //             `Registration check error: ${registrationCheckError.message}`
//   //           );
//   //           throw registrationCheckError;
//   //         }

//   //         addDebugInfo(
//   //           `Found ${existingRegistration?.length || 0} existing registrations`
//   //         );

//   //         if (!existingRegistration || existingRegistration.length === 0) {
//   //           // Create new seminar registration
//   //           addDebugInfo("Creating new seminar registration");

//   //           const registrationData = {
//   //             seminar_id: order.seminar_id,
//   //             user_id: order.user_id,
//   //             registered_at: new Date().toISOString(),
//   //             payment_status: "paid",
//   //             certificate_download: false,
//   //             updated_at: new Date().toISOString(),
//   //           };

//   //           addDebugInfo(
//   //             `Registration data: ${JSON.stringify(registrationData)}`
//   //           );

//   //           const { error: registrationError } = await supabase
//   //             .from("seminar_registrations")
//   //             .insert(registrationData);

//   //           if (registrationError) {
//   //             addDebugInfo(
//   //               `Registration insert error: ${registrationError.message}`
//   //             );
//   //             addDebugInfo(
//   //               `Error details: ${JSON.stringify(registrationError)}`
//   //             );
//   //             throw registrationError;
//   //           }

//   //           addDebugInfo("Seminar registration created successfully");
//   //         } else {
//   //           // Update existing registration payment status
//   //           addDebugInfo("Updating existing seminar registration");
//   //           const { error: updateRegError } = await supabase
//   //             .from("seminar_registrations")
//   //             .update({
//   //               payment_status: "paid",
//   //               updated_at: new Date().toISOString(),
//   //             })
//   //             .eq("id", existingRegistration[0].id);

//   //           if (updateRegError) {
//   //             addDebugInfo(
//   //               `Registration update error: ${updateRegError.message}`
//   //             );
//   //             throw updateRegError;
//   //           }

//   //           addDebugInfo("Seminar registration updated successfully");
//   //         }
//   //       } else {
//   //         addDebugInfo(
//   //           `Not a seminar purchase or missing seminar ID. Type: ${type}, Seminar ID: ${order.seminar_id}`
//   //         );
//   //       }

//   //       setLoading(false);
//   //       addDebugInfo("Payment processing completed successfully");
//   //     } catch (err: any) {
//   //       console.error("Payment processing error:", err);
//   //       const errorMsg =
//   //         err.message || "An error occurred during payment processing";
//   //       addDebugInfo(`Error: ${errorMsg}`);
//   //       setError(errorMsg);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   processPayment();
//   // }, [searchParams]);
// useEffect(() => {
//   const processPayment = async () => {
//     try {
//       console.log("🚀 Starting payment processing...");
//       const sessionId = searchParams.get("session_id");
//       const paymentIntent = searchParams.get("payment_intent");
//       const type = searchParams.get("productType");

//       console.log("Session ID:", sessionId);
//       console.log("Payment Intent:", paymentIntent);
//       console.log("Product Type:", type);

//       if (type) setProductType(type);

//       if (!sessionId && !paymentIntent) {
//         console.error("❌ No payment session ID or intent found");
//         setError("No payment session ID found");
//         setLoading(false);
//         return;
//       }

//       // Find the order based on Stripe session ID or payment intent
//       let orderQuery = supabase.from("orders").select("*");

//       if (sessionId) {
//         console.log("🔍 Searching order with session ID:", sessionId);
//         orderQuery = orderQuery.eq("stripe_session_id", sessionId);
//       } else if (paymentIntent) {
//         console.log("🔍 Searching order with payment intent:", paymentIntent);
//         orderQuery = orderQuery.eq("stripe_payment_intent", paymentIntent);
//       }

//       const { data: orders, error: orderError } = await orderQuery;
//       console.log("📦 Orders response:", orders);

//       if (orderError) {
//         console.error("⚠️ Order query error:", orderError.message);
//         throw orderError;
//       }

//       if (!orders || orders.length === 0) {
//         console.error("❌ Order not found");
//         throw new Error("Order not found");
//       }

//       const order = orders[0];
//       setOrderDetails(order);
//       console.log("✅ Order found:", order);

//       // Update order status to 'paid' if not already
//       if (order.status !== "paid") {
//         console.log("⏳ Updating order status to 'paid'");
//         const { error: updateError } = await supabase
//           .from("orders")
//           .update({
//             status: "paid",
//             updated_at: new Date().toISOString(),
//           })
//           .eq("id", order.id);

//         if (updateError) {
//           console.error("⚠️ Order update error:", updateError.message);
//           throw updateError;
//         }
//         console.log("✅ Order status updated to 'paid'");
//       } else {
//         console.log("ℹ️ Order already marked as 'paid'");
//       }
// if (!type && order.seminar_id) {
//   console.log(
//     "⚡ Auto-detecting product type as seminar because seminar_id exists"
//   );
//   setProductType("seminar");
// }
//       // Handle seminar registration if product is a seminar
//       if (type === "seminar" && order.seminar_id) {
//         console.log(
//           "🎓 Seminar purchase detected. Seminar ID:",
//           order.seminar_id
//         );
//         console.log("👤 User ID:", order.user_id);

//         const { data: existingRegistration, error: registrationCheckError } =
//           await supabase
//             .from("seminar_registrations")
//             .select("*")
//             .eq("seminar_id", order.seminar_id)
//             .eq("user_id", order.user_id);

//         if (registrationCheckError) {
//           console.error(
//             "⚠️ Registration check error:",
//             registrationCheckError.message
//           );
//           throw registrationCheckError;
//         }

//         console.log(
//           `ℹ️ Found ${existingRegistration?.length || 0} existing registrations`
//         );

//         if (!existingRegistration || existingRegistration.length === 0) {
//           console.log("🆕 Creating new seminar registration");
//           const registrationData = {
//             seminar_id: order.seminar_id,
//             user_id: order.user_id,
//             registered_at: new Date().toISOString(),
//             payment_status: "paid",
//             certificate_download: false,
//             updated_at: new Date().toISOString(),
//           };
//           console.log("📋 Registration data:", registrationData);

//           const { error: registrationError } = await supabase
//             .from("seminar_registrations")
//             .insert(registrationData);

//           if (registrationError) {
//             console.error(
//               "⚠️ Registration insert error:",
//               registrationError.message
//             );
//             throw registrationError;
//           }
//           console.log("✅ Seminar registration created successfully");
//         } else {
//           console.log("✏️ Updating existing seminar registration");
//           const { error: updateRegError } = await supabase
//             .from("seminar_registrations")
//             .update({
//               payment_status: "paid",
//               updated_at: new Date().toISOString(),
//             })
//             .eq("id", existingRegistration[0].id);

//           if (updateRegError) {
//             console.error(
//               "⚠️ Registration update error:",
//               updateRegError.message
//             );
//             throw updateRegError;
//           }
//           console.log("✅ Seminar registration updated successfully");
//         }
//       } else {
//         console.log(
//           `ℹ️ Not a seminar purchase or seminar ID missing. Type: ${type}, Seminar ID: ${order.seminar_id}`
//         );
//       }

//       setLoading(false);
//       console.log("🎉 Payment processing completed successfully");
//     } catch (err: any) {
//       console.error("❌ Payment processing error:", err);
//       const errorMsg =
//         err.message || "An error occurred during payment processing";
//       setError(errorMsg);
//       setLoading(false);
//     }
//   };

//   processPayment();
// }, [searchParams]);

//   const redirectUser = (type: string | null) => {
//     if (type === "course") {
//       window.location.href = "/my-courses";
//     } else if (type === "seminar") {
//       window.location.href = "/my-seminars";
//     } else {
//       window.location.href = "/";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//         <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">
//             Processing your payment...
//           </h2>
//           <p className="text-gray-600">
//             Please wait while we confirm your payment.
//           </p>

//           {debugInfo.length > 0 && (
//             <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
//               <h3 className="font-medium mb-2">Debug Info:</h3>
//               <div className="text-xs max-h-40 overflow-y-auto">
//                 {debugInfo.map((info, index) => (
//                   <div key={index} className="mb-1">
//                     {info}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//         <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
//           <div className="flex justify-center mb-4">
//             <AlertCircle className="text-red-500 w-16 h-16" />
//           </div>
//           <h2 className="text-2xl font-bold text-red-600 mb-2">
//             Payment Processing Issue
//           </h2>
//           <p className="text-gray-600 mb-4">{error}</p>

//           <div className="mt-6 flex justify-center gap-4">
//             <button
//               onClick={() => redirectUser(productType)}
//               className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//             >
//               Go Home
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
//             >
//               Try Again
//             </button>
//           </div>

//           {debugInfo.length > 0 && (
//             <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
//               <h3 className="font-medium mb-2">Debug Info:</h3>
//               <div className="text-xs max-h-40 overflow-y-auto">
//                 {debugInfo.map((info, index) => (
//                   <div key={index} className="mb-1">
//                     {info}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
//         <div className="flex justify-center mb-4">
//           <CheckCircle className="text-green-500 w-16 h-16" />
//         </div>

//         <h2 className="text-2xl font-bold text-green-600 mb-2">
//           🎉 Payment Successful!
//         </h2>
//         <p className="text-gray-600 mb-6">
//           Thank you for your purchase. Your enrollment is confirmed.
//         </p>

//         <div className="bg-gray-50 border rounded-lg p-5 text-left mb-6">
//           {orderDetails && (
//             <>
//               <p className="text-gray-800 mb-2">
//                 <span className="font-semibold">Order ID:</span>{" "}
//                 {orderDetails.id}
//               </p>
//               <p className="text-gray-800 mb-2">
//                 <span className="font-semibold">Amount:</span>{" "}
//                 {orderDetails.amount / 100}{" "}
//                 {orderDetails.currency.toUpperCase()}
//               </p>
//             </>
//           )}
//           {productType && (
//             <p className="text-gray-800">
//               <span className="font-semibold">Enrolled in:</span> {productType}
//             </p>
//           )}
//         </div>

//         <div className="mt-6 flex justify-center gap-4">
//           <button
//             onClick={() => redirectUser(productType)}
//             className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//           >
//             Go to{" "}
//             {productType === "course"
//               ? "Courses"
//               : productType === "seminar"
//               ? "Seminars"
//               : "Home"}
//           </button>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
//           >
//             Try Another Payment
//           </button>
//         </div>

//         {debugInfo.length > 0 && (
//           <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
//             <h3 className="font-medium mb-2">Debug Info:</h3>
//             <div className="text-xs max-h-40 overflow-y-auto">
//               {debugInfo.map((info, index) => (
//                 <div key={index} className="mb-1">
//                   {info}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;

import Footer from "@/footer/Footer";
import Header from "@/footer/Header";
import { supabase } from "@/integrations/supabase/client";
import { mixpanelInstance } from "@/utils/mixpanel";
import { CheckCircle, AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};


const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [productType, setProductType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebugInfo = (info: string) => {
    setDebugInfo((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${info}`,
    ]);
  };

  useEffect(() => {
    const processPayment = async () => {
      try {
        console.log("🚀 Starting payment processing...");
        const sessionId = searchParams.get("session_id");
        const paymentIntent = searchParams.get("payment_intent");
        const type = searchParams.get("productType");

        console.log("Session ID:", sessionId);
        console.log("Payment Intent:", paymentIntent);
        console.log("Product Type:", type);

        // Set productType from URL parameter if available
        if (type) {
          setProductType(type);
        }

        if (!sessionId && !paymentIntent) {
          console.error("❌ No payment session ID or intent found");
          setError("No payment session ID found");
          setLoading(false);
          return;
        }

        // Find the order based on Stripe session ID or payment intent
        let orderQuery = supabase.from("orders").select("*");

        if (sessionId) {
          console.log("🔍 Searching order with session ID:", sessionId);
          orderQuery = orderQuery.eq("stripe_session_id", sessionId);
        } else if (paymentIntent) {
          console.log("🔍 Searching order with payment intent:", paymentIntent);
          orderQuery = orderQuery.eq("stripe_payment_intent", paymentIntent);
        }

        const { data: orders, error: orderError } = await orderQuery;
        console.log("📦 Orders response:", orders);

        if (orderError) {
          console.error("⚠️ Order query error:", orderError.message);
          throw orderError;
        }

        if (!orders || orders.length === 0) {
          console.error("❌ Order not found");
          throw new Error("Order not found");
        }

        const order = orders[0];
        setOrderDetails(order);
        console.log("✅ Order found:", order);

        // Determine product type from order data if not in URL
        let detectedProductType = type;
        if (!detectedProductType) {
          if (order.seminar_id) {
            detectedProductType = "seminar";
          } else if (order.course_id) {
            detectedProductType = "course";
          }
          setProductType(detectedProductType);
        }

        console.log("📋 Detected product type:", detectedProductType);

        // Update order status to 'paid' if not already
        if (order.status !== "paid") {
          console.log("⏳ Updating order status to 'paid'");
          const { error: updateError } = await supabase
            .from("orders")
            .update({
              status: "paid",
              updated_at: new Date().toISOString(),
            })
            .eq("id", order.id);

          if (updateError) {
            console.error("⚠️ Order update error:", updateError.message);
            throw updateError;
          }
          console.log("✅ Order status updated to 'paid'");
        } else {
          console.log("ℹ️ Order already marked as 'paid'");
        }

        // Handle seminar registration if product is a seminar
        if (detectedProductType === "seminar" && order.seminar_id) {
          console.log(
            "🎓 Seminar purchase detected. Seminar ID:",
            order.seminar_id
          );
          console.log("👤 User ID:", order.user_id);

          const { data: existingRegistration, error: registrationCheckError } =
            await supabase
              .from("seminar_registrations")
              .select("*")
              .eq("seminar_id", order.seminar_id)
              .eq("user_id", order.user_id);

          if (registrationCheckError) {
            console.error(
              "⚠️ Registration check error:",
              registrationCheckError.message
            );
            throw registrationCheckError;
          }

          console.log(
            `ℹ️ Found ${
              existingRegistration?.length || 0
            } existing registrations`
          );

          if (!existingRegistration || existingRegistration.length === 0) {
            console.log("🆕 Creating new seminar registration");
            const registrationData = {
              seminar_id: order.seminar_id,
              user_id: order.user_id,
              registered_at: new Date().toISOString(),
              payment_status: "paid",
              updated_at: new Date().toISOString(),
            };
            console.log("📋 Registration data:", registrationData);

            const { error: registrationError } = await supabase
              .from("seminar_registrations")
              .insert(registrationData);

            if (registrationError) {
              console.error(
                "⚠️ Registration insert error:",
                registrationError.message
              );
              throw registrationError;
            }
            console.log("✅ Seminar registration created successfully");
          } else {
            console.log("✏️ Updating existing seminar registration");
            const { error: updateRegError } = await supabase
              .from("seminar_registrations")
              .update({
                seminar_id: order.seminar_id,
                user_id: order.user_id,
                registered_at: new Date().toISOString(),
                payment_status: "paid",
                updated_at: new Date().toISOString(),
              })
              .eq("id", existingRegistration[0].id);

            if (updateRegError) {
              console.error(
                "⚠️ Registration update error:",
                updateRegError.message
              );
              throw updateRegError;
            }
            console.log("✅ Seminar registration updated successfully");
          }
        } else {
          console.log(
            `ℹ️ Not a seminar purchase. Type: ${detectedProductType}, Seminar ID: ${order.seminar_id}`
          );
        }

        setLoading(false);
        // ✅ Track success
        mixpanelInstance.track("Payment Success", {
          order_id: order.id,
          user_id: order.user_id,
          product_type: detectedProductType,
          amount: order.amount / 100,
          currency: order.currency,
          timestamp: new Date().toISOString(),
        });
        console.log("🎉 Payment processing completed successfully");
      } catch (err: any) {
        console.error("❌ Payment processing error:", err);
        const errorMsg =
          err.message || "An error occurred during payment processing";
        setError(errorMsg);
        setLoading(false);
      }
    };

    processPayment();
  }, [searchParams]);

  // const redirectUser = (type: string | null) => {
  //   if (type === "course") {
  //     window.location.href = `/courses/${createSlug(courseData.title)}/${
  //       orderDetails.course_id
  //     }`;
  //   } else if (type === "seminar") {
  //     window.location.href = `/seminar/${createSlug(seminar.title)}/${
  //       orderDetails.seminar_id
  //     }`;
  //   } else {
  //     window.location.href = "/";
  //   }
  // };
  // Make redirectUser async because we call supabase queries inside
  // const redirectUser = async (type: string | null) => {
  //   if (type === "course" && orderDetails?.course_id) {
  //     const { data: course } = await supabase
  //       .from("courses")
  //       .select("title")
  //       .eq("id", orderDetails.course_id)
  //       .single();

  //     if (course) {
  //       window.location.href = `/courses/${createSlug(course.title)}/${
  //         orderDetails.course_id
  //       }`;
  //       return;
  //     }
  //   }

  //   if (type === "seminar" && orderDetails?.seminar_id) {
  //     const { data: seminar } = await supabase
  //       .from("seminars") // ✅ table should be 'seminars' not 'seminer'
  //       .select("topic")
  //       .eq("id", orderDetails.seminar_id)
  //       .single();

  //     if (seminar) {
  //       window.location.href = `/seminar/${createSlug(seminar.topic)}/${
  //         orderDetails.seminar_id
  //       }`;
  //       return;
  //     }
  //   }

  //   // fallback
  //   window.location.href = "/";
  // };
//   const redirectUser = async (type: string | null) => {
//   if (type === "course" && orderDetails?.course_id) {
//     const courseId = orderDetails.course_id;
//     const { data: course } = await supabase
//       .from("courses")
//       .select("title")
//       .eq("id", courseId)
//       .single();

//     if (course) {
//       window.location.href = `/courses/${createSlug(course.title)}/${courseId}`;
//       return;
//     }
//   }

//   if (type === "seminar" && orderDetails?.seminar_id) {
//     const seminarId = orderDetails.seminar_id;
//     const { data: seminar } = await supabase
//       .from("seminars") // Fixed table name
//       .select("topic")
//       .eq("id", seminarId)
//       .single();

//     if (seminar) {
//       window.location.href = `/seminar/${createSlug(seminar.topic)}/${seminarId}`;
//       return;
//     }
//   }

//   // fallback
//   window.location.href = "/";
// };

// const redirectUser = async (type: string | null) => {
//   if (type === "course" && orderDetails?.course_id) {
//     window.location.href = `/courses/${orderDetails.course_id}`;
//     return;
//   }

//   if (type === "seminar" && orderDetails?.seminar_id) {
//     window.location.href = `/seminar/${orderDetails.seminar_id}`;
//     return;
//   }

//   // fallback
//   window.location.href = "/";
// };
const redirectUser = async (type: string | null) => {
  if (type === "course" && orderDetails?.course_id) {
    const { data: course } = await supabase
      .from("courses")
      .select("title")
      .eq("id", orderDetails.course_id)
      .single();

    if (course) {
      window.location.href = `/course/${createSlug(course.title)}/${
        orderDetails.course_id
      }`;
      return;
    }
  }

  if (type === "seminar" && orderDetails?.seminar_id) {
    const { data: seminar } = await supabase
      .from("seminars")
      .select("topic")
      .eq("id", orderDetails.seminar_id)
      .single();

    if (seminar) {
      window.location.href = `/seminar/${createSlug(seminar.topic)}/${
        orderDetails.seminar_id
      }`;
      return;
    }
  }

  window.location.href = "/";
};


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Processing your payment...
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your payment.
          </p>

          {debugInfo.length > 0 && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
              <h3 className="font-medium mb-2">Debug Info:</h3>
              <div className="text-xs max-h-40 overflow-y-auto">
                {debugInfo.map((info, index) => (
                  <div key={index} className="mb-1">
                    {info}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="text-red-500 w-16 h-16" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Payment Processing Issue
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => redirectUser(productType)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Go Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Try Again
            </button>
          </div>

          {debugInfo.length > 0 && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
              <h3 className="font-medium mb-2">Debug Info:</h3>
              <div className="text-xs max-h-40 overflow-y-auto">
                {debugInfo.map((info, index) => (
                  <div key={index} className="mb-1">
                    {info}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>

        <h2 className="text-2xl font-bold text-green-600 mb-2">
          🎉 Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your enrollment is confirmed.
        </p>

        <div className="bg-gray-50 border rounded-lg p-5 text-left mb-6">
          {orderDetails && (
            <>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Order ID:</span>{" "}
                {orderDetails.id}
              </p>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Amount:</span>{" "}
                {orderDetails.amount / 100}{" "}
                {orderDetails.currency.toUpperCase()}
              </p>
            </>
          )}
          {productType && (
            <p className="text-gray-800">
              <span className="font-semibold">Enrolled in:</span> {productType}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => redirectUser(productType)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Go to{" "}
            {productType === "course"
              ? "Courses"
              : productType === "seminar"
              ? "Seminars"
              : "Home"}
          </button>
          {/* <button
            onClick={() => window.location.reload()}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Try Another Payment
          </button> */}
        </div>

        {debugInfo.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="font-medium mb-2">Debug Info:</h3>
            <div className="text-xs max-h-40 overflow-y-auto">
              {debugInfo.map((info, index) => (
                <div key={index} className="mb-1">
                  {info}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PaymentSuccess;