// import React from 'react';
// import { Helmet } from 'react-helmet';
// import Footer from "@/footer/Footer";
// import Header from "@/footer/Header";
// const PricingPolicy = () => {
//   return (
//     <>
//     <Header/>
//     <div className="min-h-screen bg-gray-50">
//       <Helmet>
//         <title>Pricing Policy | Our Company</title>
//         <meta name="description" content="View our pricing for e-courses, seminars, and candidate subscriptions" />
//       </Helmet>

//       {/* Navigation Bar */}
//       <nav className="sticky top-0 bg-white shadow-md z-10">
//         <div className="container mx-auto px-4 py-3 flex flex-wrap justify-center">
//           {['ecourses', 'seminars', 'candidate'].map((item) => (
//             <a 
//               key={item}
//               href={`#${item}`} 
//               className="m-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//             >
//               {item === 'ecourses' && 'E-Courses'}
//               {item === 'seminars' && 'Seminars'}
//               {item === 'candidate' && 'Candidate Access'}
//             </a>
//           ))}
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8 max-w-6xl">
//         <header className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">Pricing Policy</h1>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Transparent pricing for all our educational offerings and professional services
//           </p>
//         </header>

//         {/* E-Courses Section */}
//         <Section id="ecourses" title="E-Courses Pricing">
//           <PricingTable
//             headers={['Course', 'Duration', 'Price']}
//             rows={[
//               ['Beginner Programming', '6 weeks', '$149'],
//               ['Advanced Data Science', '10 weeks', '$299'],
//               ['UX Design Fundamentals', '8 weeks', '$199'],
//             ]}
//             footer="* All courses include lifetime access and certificate of completion"
//           />
//         </Section>

//         {/* Seminars & Webinars Section */}
//         <Section id="seminars" title="Seminars & Webinars">
//           <div className="grid md:grid-cols-2 gap-8">
//             <PricingCard
//               title="Live Seminars"
//               price="$49"
//               features={['In-person sessions', 'Q&A with experts', 'Networking opportunities', 'Course materials']}
//             />
//             <PricingCard
//               title="Webinars"
//               price="$29"
//               features={['Live online access', 'Recorded version', 'Digital resources', 'Email support']}
//             />
//           </div>
//         </Section>

//         {/* Candidate Access Section */}
//         <Section id="candidate" title="Candidate Contact Access">
//           <SubscriptionTiers />
//         </Section>

//         {/* Terms & Conditions */}
//         <div className="mt-16 p-6 bg-blue-50 rounded-xl border border-blue-100">
//           <h3 className="text-xl font-semibold mb-4">Terms & Conditions</h3>
//           <ul className="list-disc pl-6 space-y-2 text-gray-700">
//             <li>Prices subject to change without prior notice</li>
//             <li>All sales are final - no refunds after purchase</li>
//             <li>Subscriptions auto-renew monthly until canceled</li>
//             <li>Enterprise plans require annual commitment</li>
//           </ul>
//         </div>
//       </main>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// const Section = ({ id, title, children }) => (
//   <section id={id} className="py-12 scroll-mt-24">
//     <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-blue-200">{title}</h2>
//     {children}
//   </section>
// );

// const PricingTable = ({ headers, rows, footer }) => (
//   <div className="overflow-x-auto">
//     <table className="min-w-full bg-white rounded-lg overflow-hidden">
//       <thead className="bg-gray-100">
//         <tr>
//           {headers.map((header, index) => (
//             <th key={index} className="py-3 px-4 text-left font-semibold text-gray-700">
//               {header}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((row, rowIndex) => (
//           <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//             {row.map((cell, cellIndex) => (
//               <td key={cellIndex} className="py-3 px-4 border-b border-gray-200">
//                 {cell}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// // Pricing Card Component
// const PricingCard = ({ title, price, features }) => (
//   <div className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
//     <h3 className="text-2xl font-bold mb-2">{title}</h3>
//     <p className="text-3xl font-bold text-blue-600 mb-4">{price}</p>
//     <ul className="space-y-3 mb-6">
//       {features.map((feature, index) => (
//         <li key={index} className="flex items-start">
//           <span className="text-green-500 mr-2">✓</span>
//           <span>{feature}</span>
//         </li>
//       ))}
//     </ul>
//     <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//       Register Now
//     </button>
//   </div>
// );

// // Subscription Tiers Component
// const SubscriptionTiers = () => (
//   <div className="grid md:grid-cols-3 gap-6">
//     {[
//       {
//         tier: 'Basic',
//         price: '$99/month',
//         features: ['50 candidate contacts', 'Basic search filters', 'Email support'],
//         popular: false
//       },
//       {
//         tier: 'Professional',
//         price: '$199/month',
//         features: ['200 candidate contacts', 'Advanced filters', 'Priority support', 'Resume parsing'],
//         popular: true
//       },
//       {
//         tier: 'Enterprise',
//         price: 'Custom',
//         features: ['Unlimited contacts', 'AI matching', 'Dedicated account manager', 'API access'],
//         popular: false
//       }
//     ].map((plan) => (
//       <div 
//         key={plan.tier} 
//         className={`border rounded-xl p-6 relative ${plan.popular ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'}`}
//       >
//         {plan.popular && (
//           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
//             MOST POPULAR
//           </div>
//         )}
//         <h3 className="text-2xl font-bold mb-2">{plan.tier}</h3>
//         <p className="text-3xl font-bold text-blue-600 mb-4">{plan.price}</p>
//         <ul className="space-y-3 mb-6">
//           {plan.features.map((feature, index) => (
//             <li key={index} className="flex items-start">
//               <span className="text-green-500 mr-2">✓</span>
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>
//         <button className={`w-full py-3 rounded-lg ${
//           plan.popular 
//             ? 'bg-blue-600 text-white hover:bg-blue-700' 
//             : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
//         }`}>
//           {plan.tier === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
//         </button>
//       </div>
//     ))}
//   </div>
// );

// export default PricingPolicy;

import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from "@/footer/Footer";
import Header from "@/footer/Header";

const PricingPolicy = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Pricing Policy | Our Company</title>
        <meta name="description" content="View our pricing for e-courses, seminars, and candidate subscriptions" />
      </Helmet>

      {/* Navigation Bar */}
      {/* <nav className="sticky top-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex flex-wrap justify-center">
          {['ecourses', 'seminars', 'candidate', 'payment', 'global'].map((item) => (
            <a 
              key={item}
              href={`#${item}`} 
              className="m-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {item === 'ecourses' && 'E-Courses'}
              {item === 'seminars' && 'Seminars'}
              {item === 'candidate' && 'Candidate Access'}
              {item === 'payment' && 'Payment'}
              {item === 'global' && 'Global'}
            </a>
          ))}
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Pricing Policy</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer transparent, value-driven pricing to support educators, professionals, 
            and organizations in delivering e-learning content, hosting seminars, and 
            accessing job candidates. Whether you're launching a course or hiring top 
            talent, our flexible pricing ensures you only pay for what you need—no 
            hidden fees.
          </p>
        </header>

        {/* E-Courses Section */}
        <section id="ecourses" className="py-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-blue-200">E-Course Sales</h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-700">
            <li>
              <strong>Free E-Course</strong>: No cost to upload and list your courses.
            </li>
            <li>
              <strong>Paid E-Course</strong>: A small commission (25%) is charged per 
              successful sale as platform charges.
            </li>
            <li>
              <strong>Payouts</strong>: Monthly payouts with complete earnings visibility in your 
              dashboard.
            </li>
          </ul>
        </section>

        {/* Seminars & Webinars Section */}
        <section id="seminars" className="py-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-blue-200">Seminars & Webinars</h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-700">
            <li>
              <strong>Free Events</strong>: No fees for free-to-attend seminars.
            </li>
            <li>
              <strong>Paid Events</strong>: A small commission (25%) is charged per paid 
              registrations as platform charges.
            </li>
            <li>
              <strong>Host Payouts</strong>: Monthly payouts with complete earnings visibility in 
              your dashboard.
            </li>
          </ul>
        </section>

        {/* Candidate Contact Access Section */}
        <section id="candidate" className="py-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-blue-200">Candidate Contact Access (for Employers)</h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-700 mb-6">
            <li>
              <strong>Free Job Listings</strong>: Employers can post job openings at no cost.
            </li>
            <li>
              <strong>View Candidate Info</strong>: To access a candidate's full contact details (email, 
              phone), employers must subscribe.
            </li>
            <li>
              <strong>Payouts</strong>: There is no payouts to either employers or candidates.
            </li>
          </ul>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-semibold mb-4">Included Features:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Candidate filtering and search</li>
              <li>Resume previews (without contact info)</li>
              <li>Full access to selected candidate contact details during subscription period</li>
            </ul>
          </div>
        </section>

        {/* Payment & Billing Section */}
        <section id="payment" className="py-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-blue-200">Payment & Billing</h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-700">
            <li>
              <strong>Supported Methods</strong>: Credit/debit cards, UPI, wallets, and bank 
              transfers.
            </li>
            <li>
              <strong>Invoicing</strong>: Downloadable invoices and receipts in the user dashboard.
            </li>
            <li>
              <strong>Refund Policy</strong>: Refunds issued only in case of duplicate charges or 
              platform-side technical failures.
            </li>
          </ul>
        </section>

        {/* Global Pricing Section */}
        <section id="global" className="py-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-blue-200">Global Pricing</h2>
          <p className="text-gray-700">
            Local currency support is enabled where possible. Currency conversion 
            may apply for international payments.
          </p>
        </section>
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default PricingPolicy;