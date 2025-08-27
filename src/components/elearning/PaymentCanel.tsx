import React from "react";
import { XCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Header from "@/footer/Header";
import Footer from "@/footer/Footer";

const PaymentCancel: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productType = searchParams.get("productType");

  const redirectUser = (type: string | null) => {
    if (type === "course") {
      window.location.href = "/courses";
    } else if (type === "seminar") {
      window.location.href = "/seminars";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-4">
          <XCircle className="text-red-500 w-16 h-16" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          ❌ Payment Cancelled
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. Don’t worry, you can try again anytime.
        </p>

        {/* Product info */}
        {productType && (
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Product:</span> {productType}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => redirectUser(productType)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Back to {productType ? productType : "Home"}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Retry Payment
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PaymentCancel;
