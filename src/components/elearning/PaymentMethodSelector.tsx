// // import { useState } from "react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import { Label } from "@/components/ui/label";
// // import { CreditCard, Wallet, Building2 } from "lucide-react";

// // interface PaymentMethodSelectorProps {
// //   onPaymentMethodSelect: (method: string) => void;
// //   isLoading: boolean;
// // }

// // export const PaymentMethodSelector = ({ onPaymentMethodSelect, isLoading }: PaymentMethodSelectorProps) => {
// //   const [selectedMethod, setSelectedMethod] = useState("stripe");

// //   const paymentMethods = [
// //     { id: "stripe", name: "Credit/Debit Card", icon: CreditCard, description: "Pay with Visa, Mastercard, etc." },
// //     { id: "paypal", name: "PayPal", icon: Wallet, description: "Pay with your PayPal account" },
// //     { id: "bank", name: "Bank Transfer", icon: Building2, description: "Direct bank transfer" },
// //   ];

// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle>Choose Payment Method</CardTitle>
// //       </CardHeader>
// //       <CardContent className="space-y-4">
// //         <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
// //           {paymentMethods.map((method) => (
// //             <div key={method.id} className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50">
// //               <RadioGroupItem value={method.id} id={method.id} />
// //               <Label htmlFor={method.id} className="flex-1 cursor-pointer">
// //                 <div className="flex items-center space-x-3">
// //                   <method.icon className="h-5 w-5" />
// //                   <div>
// //                     <div className="font-medium">{method.name}</div>
// //                     <div className="text-sm text-gray-500">{method.description}</div>
// //                   </div>
// //                 </div>
// //               </Label>
// //             </div>
// //           ))}
// //         </RadioGroup>

// //         <Button
// //           className="w-full"
// //           onClick={() => onPaymentMethodSelect(selectedMethod)}
// //           disabled={isLoading}
// //         >
// //           {isLoading ? "Processing..." : "Continue to Payment"}
// //         </Button>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { CreditCard, Wallet, Building2 } from "lucide-react";
// import { mixpanelInstance } from "@/utils/mixpanel";

// interface PaymentMethodSelectorProps {
//   onPaymentMethodSelect: (method: string) => void;
//   isLoading: boolean;
//    price: number; 
// }

// export const PaymentMethodSelector = ({
//   onPaymentMethodSelect,
//   isLoading,
//   price,
// }: PaymentMethodSelectorProps) => {
//   const [selectedMethod, setSelectedMethod] = useState("razorpay");

//   const paymentMethods = [
//     {
//       id: "razorpay",
//       name: "Credit/Debit Card - Razorpay",
//       icon: CreditCard,
//       description: "Pay with Visa, Mastercard, UPI, NetBanking, etc.",
//     },
//     // {
//     //   id: "paypal",
//     //   name: "PayPal",
//     //   icon: Wallet,
//     //   description: "Pay with your PayPal account",
//     // },
//     // {
//     //   id: "bank",
//     //   name: "Bank Transfer",
//     //   icon: Building2,
//     //   description: "Direct bank transfer",
//     // },
//   ];

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Choose Payment Method</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
//           {paymentMethods.map((method) => (
//             <div
//               key={method.id}
//               className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50"
//             >
//               <RadioGroupItem value={method.id} id={method.id} />
//               <Label htmlFor={method.id} className="flex-1 cursor-pointer">
//                 <div className="flex items-center space-x-3">
//                   <method.icon className="h-5 w-5" />
//                   <div>
//                     <div className="font-medium">{method.name}</div>
//                     <div className="text-sm text-gray-500">
//                       {method.description}
//                     </div>
//                   </div>
//                 </div>
//               </Label>
//             </div>
//           ))}
//         </RadioGroup>

//         <Button
//           className="w-full"
//            onClick={() => {
//                                           mixpanelInstance.track(
//                                             " Continue to Payment view elearning Button Clicked",
//                                             {
//                                               timestamp: new Date().toISOString(),
//                                             }
//                                           );
//           onPaymentMethodSelect(selectedMethod);
//                                         }}
//           // onClick={() => onPaymentMethodSelect(selectedMethod)}
//           disabled={isLoading}
//         >
//           {isLoading ? "Processing..." : "Continue to Payment"}
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";
import { mixpanelInstance } from "@/utils/mixpanel";

interface PaymentMethodSelectorProps {
  onPaymentMethodSelect: (method: string) => void;
  isLoading: boolean;
  price: number;
}

export const PaymentMethodSelector = ({
  onPaymentMethodSelect,
  isLoading,
  price,
}: PaymentMethodSelectorProps) => {
  const [selectedMethod, setSelectedMethod] = useState("stripe");

  const paymentMethods = [
    {
      id: "stripe",
      name: "Credit/Debit Card - Stripe",
      icon: CreditCard,
      description: "Pay securely with Visa, Mastercard, Amex, etc.",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50"
            >
              <RadioGroupItem value={method.id} id={method.id} />
              <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <method.icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-500">
                      {method.description}
                    </div>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Button
          className="w-full"
          onClick={() => {
            mixpanelInstance.track(
              "Continue to Payment (Stripe) seminar Enrolled Secondary Button Clicked",
              {
                timestamp: new Date().toISOString(),
              }
            );
            onPaymentMethodSelect(selectedMethod);
          }}
          disabled={isLoading}
        >
          {isLoading
            ? "Processing..."
            : `Continue to Payment (₹${price.toFixed(2)})`}
        </Button>
      </CardContent>
    </Card>
  );
};
