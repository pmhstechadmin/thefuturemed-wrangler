import Footer from "@/footer/Footer";
import Header from "@/footer/Header";
import React from "react";

const EarningPage = () => {
  const earnings = [
    {
      title: "Host Seminars with a Registration Fee",
      description:
        "Create live or recorded seminars for a targeted medical audience. Set your price, engage attendees with live Q&A, and expand your professional reach. Recordings can also be sold later for ongoing income.",
      image:
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",

      // "https://images.pexels.com/photos/612904/pexels-photo-612904.jpeg?auto=compress&cs=tinysrgb&w=800",
      examples: [
        "A cardiologist in Singapore runs $25 webinars, attracting 300+ attendees monthly.",
        "A public health expert in the UK hosts quarterly $10 policy update sessions, earning $1,500+ each time.",
      ],
    },
    {
      title: "Run E-Courses with an Enrollment Fee",
      description:
        "Build self-paced or instructor-led courses. Upload lectures, documents, and quizzes, while earning from each enrollment. Provide certificates for learners to showcase on their CVs.",
      image:
        "https://images.pexels.com/photos/4226216/pexels-photo-4226216.jpeg?auto=compress&cs=tinysrgb&w=800",
      examples: [
        "A dermatologist in India sells a ₹2,000 course to 500+ students in 6 months.",
        "A surgical nurse in Canada earns $10,000/year from a $49 post-op care course.",
      ],
    },
    {
      title: "Publish Research Papers as Digital Products",
      description:
        "Monetize your research by selling papers, whitepapers, and guides. Choose between one-time purchases or subscription access. Protect your work with digital rights management.",
      image:
        "https://images.pexels.com/photos/5726801/pexels-photo-5726801.jpeg?auto=compress&cs=tinysrgb&w=800",
      examples: [
        "A biotech researcher in Germany earns €1,000/month selling niche reports.",
        "A medical policy analyst sells premium review papers for $29 to consulting firms.",
      ],
    },
  ];

  const extraRevenue = [
    {
      title: "Sponsorship Deals",
      description:
        "Partner with medical brands for event sponsorships and product mentions.",
    },
    {
      title: "Affiliate Sales",
      description:
        "Earn commissions by recommending relevant tools, software, or books.",
    },
    {
      title: "Upselling Consulting Services",
      description:
        "Offer private mentoring or specialized institutional training after your main sale.",
    },
    {
      title: "Licensing Content",
      description:
        "Sell your course or research for exclusive use by hospitals or universities.",
    },
    {
      title: "Cross-Selling Bundles",
      description:
        "Combine seminars, courses, and papers into premium packages.",
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-gray-50">
        {/* Header */}
        {/* <header className="bg-medical-primary text-white py-12 px-6 text-center">
          <h1 className="text-4xl font-bold">Earn with thefuturemed.com</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Transform your expertise into multiple income streams. Host
            seminars, run e-courses, and publish research papers — all on one
            platform designed for medical professionals.
          </p>
        </header> */}
        <header
          className="relative bg-center bg-cover bg-no-repeat text-white py-12 px-6 text-center"
          style={{
            backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')
    `,
          }}
        >
          <h1 className="text-4xl font-bold">Earn with thefuturemed.com</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Transform your expertise into multiple income streams. Host
            seminars, run e-courses, and publish research papers — all on one
            platform designed for medical professionals.
          </p>
        </header>

        {/* Earnings Sections */}
        <section className="max-w-7xl mx-auto py-16 px-6 space-y-20">
          {earnings.map((item, idx) => (
            <div
              key={idx}
              className={`grid md:grid-cols-2 gap-10 items-center ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.title}
                </h2>
                <p className="mt-4 text-gray-600">{item.description}</p>
                <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600">
                  {item.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Additional Revenue Opportunities */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Additional Revenue Opportunities
            </h2>
            <p className="mt-4 text-gray-600 text-center max-w-3xl mx-auto">
              Aside from direct seminar, course, and paper sales, our platform
              enables you to generate extra revenue through partnerships,
              upsells, and bundled offerings.
            </p>
            <div className="mt-10 grid md:grid-cols-3 gap-8">
              {extraRevenue.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        {/* <section className="bg-medical-primary text-white py-16 px-6 text-center">
          <h2 className="text-3xl font-bold">
            Start Your Earning Journey Today
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Join thousands of medical professionals already monetizing their
            expertise.
          </p>
          <a href="/register">
            <button className="mt-6 bg-white text-medical-primary px-8 py-3 rounded-full shadow hover:bg-gray-100 font-medium text-lg">
              Sign Up Now
            </button>
          </a>
        </section> */}
        <section className="bg-[#005f73] text-white py-16 px-6 text-center">
          <h2 className="text-3xl font-bold">
            Start Your Earning Journey Today
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Join thousands of medical professionals already monetizing their
            expertise.
          </p>
          <a href="/register">
            <button className="mt-6 bg-white text-[#005f73] px-8 py-3 rounded-full shadow hover:bg-gray-100 font-medium text-lg transition duration-300">
              Sign Up Now
            </button>
          </a>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default EarningPage;
