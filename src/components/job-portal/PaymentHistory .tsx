// // import { useToast } from "@/hooks/use-toast";
// // import { CreditCard } from "lucide-react";
// // import { useEffect, useState } from "react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";

// // const PaymentHistory = () => {
// //   const [payments, setPayments] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const { toast } = useToast();

// //   useEffect(() => {
// //     const fetchPayments = async () => {
// //       try {
// //         const {
// //           data: { user },
// //         } = await supabase.auth.getUser();
// //         if (!user) return;

// //         const { data, error } = await supabase
// //           .from("payments")
// //           .select("*")
// //           .eq("user_id", user.id)
// //           .order("created_at", { ascending: false });

// //         if (error) throw error;

// //         setPayments(data || []);
// //       } catch (error) {
// //         console.error("Error fetching payments:", error);
// //         toast({
// //           title: "Error",
// //           description: "Failed to load payment history",
// //           variant: "destructive",
// //         });
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPayments();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center py-8">
// //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   if (payments.length === 0) {
// //     return (
// //       <div className="text-center py-8 text-gray-500">
// //         <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
// //         <p>No payment history available</p>
// //         <p className="text-sm">Payments will appear here once you subscribe</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <Table>
// //       <TableHeader>
// //         <TableRow>
// //           <TableHead>Date</TableHead>
// //           <TableHead>Amount</TableHead>
// //           <TableHead>Status</TableHead>
// //           <TableHead>Method</TableHead>
// //           <TableHead>Transaction ID</TableHead>
// //         </TableRow>
// //       </TableHeader>
// //       <TableBody>
// //         {payments.map((payment) => (
// //           <TableRow key={payment.id}>
// //             <TableCell>
// //               {new Date(payment.created_at).toLocaleDateString()}
// //             </TableCell>
// //             <TableCell>
// //               ₹{payment.amount} {payment.currency}
// //             </TableCell>
// //             <TableCell>
// //               <span
// //                 className={`px-2 py-1 rounded text-xs ${
// //                   payment.status === "succeeded"
// //                     ? "bg-green-100 text-green-800"
// //                     : "bg-yellow-100 text-yellow-800"
// //                 }`}
// //               >
// //                 {payment.status}
// //               </span>
// //             </TableCell>
// //             <TableCell className="capitalize">
// //               {payment.payment_method}
// //             </TableCell>
// //             <TableCell className="font-mono text-xs">
// //               {payment.razorpay_payment_id}
// //             </TableCell>
// //           </TableRow>
// //         ))}
// //       </TableBody>
// //     </Table>
// //   );
// // };

// import { useToast } from "@/hooks/use-toast";
// import { CreditCard, Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { supabase } from "@/integrations/supabase/client"; // Make sure this import exists

// const PaymentHistory = () => {
//   const [payments, setPayments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         setLoading(true);
//         const {
//           data: { user },
//         } = await supabase.auth.getUser();
//         if (!user) {
//           setLoading(false);
//           return;
//         }

//         // First get provider ID from job_providers table
//         const { data: providerData, error: providerError } = await supabase
//           .from("job_providers")
//           .select("id")
//           .eq("user_id", user.id)
//           .maybeSingle();

//         if (providerError || !providerData) {
//           throw providerError || new Error("No provider profile found");
//         }

//         // Then get payments associated with this provider
//         const { data, error } = await supabase
//           .from("payments")
//           .select(
//             `
//             id,
//             created_at,
//             amount,
//             currency,
//             status,
//             payment_method,
//             razorpay_payment_id,
//             provider_subscriptions 
//             `
//           )
//           // .eq("provider_id", providerData.id)
//           .order("created_at", { ascending: false });

//         if (error) throw error;

//         setPayments(data || []);
//       } catch (error: any) {
//         console.error("Error fetching payments:", error);
//         toast({
//           title: "Error",
//           description: error.message || "Failed to load payment history",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center py-8">
//         <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//       </div>
//     );
//   }

// //   if (payments.length === 0) {
// //     return (
// //       <div className="text-center py-8 text-gray-500">
// //         <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
// //         <p>No payment history available</p>
// //         <p className="text-sm">
// //           Payments will appear here once you make a transaction
// //         </p>
// //       </div>
// //     );
// //   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="border rounded-lg overflow-hidden">
//       <Table>
//         <TableHeader className="bg-gray-50">
//           <TableRow>
//             <TableHead>Date</TableHead>
//             <TableHead>Plan</TableHead>
//             <TableHead>Amount</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Method</TableHead>
//             <TableHead>Transaction ID</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {payments.map((payment) => (
//             <TableRow key={payment.id}>
//               <TableCell className="py-3">
//                 {formatDate(payment.created_at)}
//               </TableCell>
//               <TableCell className="py-3">
//                 {payment.provider_subscriptions?.name || "N/A"}
//               </TableCell>
//               <TableCell className="py-3">
//                 ₹{payment.amount} {payment.currency}
//               </TableCell>
//               <TableCell className="py-3">
//                 <span
//                   className={`px-2 py-1 rounded text-xs ${
//                     payment.status === "succeeded"
//                       ? "bg-green-100 text-green-800"
//                       : payment.status === "pending"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {payment.status}
//                 </span>
//               </TableCell>
//               <TableCell className="py-3 capitalize">
//                 {payment.payment_method}
//               </TableCell>
//               <TableCell className="py-3 font-mono text-xs">
//                 {payment.provider_subscriptions?.provider_subscriptions?.name || "N/A"}

//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };
// export default PaymentHistory;

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2,
  CreditCard,
  IndianRupee,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  user_id: string;
//   subscription_plan_id: string;
  subscription_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  razorpay_payment_id?: string;
//   razorpay_order_id?: string;
//   razorpay_signature?: string;
  created_at: string;
}

const PaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError || !user) {
          throw new Error("User not authenticated");
        }

        const { data, error } = await supabase
          .from("payments")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setPayments(data || []);
      } catch (error: any) {
        console.error("Failed to load payment history:", error);
        toast({
          title: "Error",
          description: error.message || "Unable to fetch payment history.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <CreditCard className="h-10 w-10 mx-auto mb-4" />
        <p>No payment history found.</p>
        <p className="text-sm">Subscribe to a plan to see payments here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-md shadow-md border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-600">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Payment Method</th>
            <th className="px-4 py-2">Razorpay ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="border-t border-gray-100 hover:bg-gray-50 text-sm"
            >
              <td className="px-4 py-2">
                {new Date(payment.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-2 font-medium text-blue-600 flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />
                {payment.amount}
              </td>
              <td className="px-4 py-2">
                {payment.status === "succeeded" ? (
                  <span className="flex items-center text-green-600 gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Succeeded
                  </span>
                ) : (
                  <span className="flex items-center text-red-500 gap-1">
                    <XCircle className="h-4 w-4" />
                    Failed
                  </span>
                )}
              </td>
              <td className="px-4 py-2 capitalize">{payment.payment_method}</td>
              <td className="px-4 py-2 break-all text-xs text-gray-600">
                {payment.razorpay_payment_id || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
