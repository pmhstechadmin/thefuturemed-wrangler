import React from 'react'
import { Link } from 'react-router-dom';
import logo from "@/image/thefuturemed_logo (1).jpg";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {/* <Shield className="h-6 w-6" />
                            <span className="text-xl font-bold">MedPortal</span> */}
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
              <p className="text-gray-400">
                Empowering medical professionals through technology and
                community.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/products"
                    className="hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/community"
                    className="hover:text-white transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    to="/e-learning"
                    className="hover:text-white transition-colors"
                  >
                    E-Learning
                  </Link>
                </li>
                <li>
                  <Link
                    to="/e-seminar"
                    className="hover:text-white transition-colors"
                  >
                    E-Seminars
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-white transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                {/* <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li> */}
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/monetization"
                    className="hover:text-white transition-colors"
                  >
                    Monetization
                  </a>
                </li>
                {/* <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li> */}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/terms-of-service"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/data-usage-policy"
                    className="hover:text-white transition-colors"
                  >
                    Data Usage Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund-policy"
                    className="hover:text-white transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing-policy"
                    className="hover:text-white transition-colors"
                  >
                    Pricing Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 TheFutureMed. All rights reserved. Site Designed and
              Maintained by
              <a
                href="https://pmhstechsolutions.com/"
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                PMHS Tech Solutions
              </a>
            </p>
            {/* <p>&copy; 2024 MedPortal. All rights reserved.</p> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer
