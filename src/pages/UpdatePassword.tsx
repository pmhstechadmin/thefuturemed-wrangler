// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { Shield, UserPlus, Menu, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const UpdatePassword = () => {
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       if (!data.session) {
//         alert('Please use the email link to reset your password.');
//         navigate('/');
//       }
//     });
//   }, [navigate]);

//   const handleUpdate = async () => {
//     if (password !== repeatPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     const { error } = await supabase.auth.updateUser({ password });
//     if (error) alert('Failed to update password');
//     else {
//       alert('Password updated!');
//       navigate('/');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-white">
//       {/* NAVBAR */}
//       <nav className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Shield className="h-8 w-8 text-blue-600" />
//               <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1>
//             </div>
//             <div className="hidden md:flex items-center space-x-6">
//               {['products', 'community', 'e-seminar', 'e-learning', 'jobs', 'calendar'].map((route) => (
//                 <Link key={route} to={`/${route}`} className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50 capitalize">
//                   {route.replace('-', ' ')}
//                 </Link>
//               ))}
//               <Button onClick={() => setShowAuthModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
//                 <UserPlus className="mr-2 h-4 w-4" />
//                 Sign In / Register
//               </Button>
//             </div>
//             <div className="md:hidden">
//               <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-blue-50">
//                 {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </Button>
//             </div>
//           </div>

//           {isMenuOpen && (
//             <div className="md:hidden mt-4 pb-4 border-t pt-4 bg-white rounded-lg shadow-sm">
//               <div className="flex flex-col space-y-3">
//                 {['products', 'community', 'e-seminar', 'e-learning', 'jobs', 'calendar'].map((route) => (
//                   <Link key={route} to={`/${route}`} className="text-gray-600 hover:text-blue-600 transition-colors font-medium p-3 rounded-md hover:bg-blue-50 capitalize">
//                     {route.replace('-', ' ')}
//                   </Link>
//                 ))}
//                 <Button onClick={() => setShowAuthModal(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
//                   <UserPlus className="mr-2 h-4 w-4" />
//                   Sign In / Register
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* PASSWORD FORM */}
//       <div className="container mt-5 d-flex justify-content-center">
//         <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
//           <h3 className="text-center mb-4">Set New Password</h3>
//           <div className="mb-3">
//             <label htmlFor="newPassword" className="form-label">New Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="newPassword"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter new password"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="repeatPassword"
//               value={repeatPassword}
//               onChange={(e) => setRepeatPassword(e.target.value)}
//               placeholder="Repeat new password"
//             />
//           </div>
//           <button className="btn btn-primary w-100" onClick={handleUpdate}>Update Password</button>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer className="bg-gray-900 text-white py-12 mt-10">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <Shield className="h-6 w-6" />
//                 <span className="text-xl font-bold">MedPortal</span>
//               </div>
//               <p className="text-gray-400">
//                 Empowering medical professionals through technology and community.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Platform</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
//                 <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
//                 <li><Link to="/e-learning" className="hover:text-white transition-colors">E-Learning</Link></li>
//                 <li><Link to="/e-seminar" className="hover:text-white transition-colors">E-Seminars</Link></li>
//                 <li><Link to="/jobs" className="hover:text-white transition-colors">Jobs</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Support</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">API</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Legal</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
//                 <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
//                 <li><Link to="/data-usage-policy" className="hover:text-white transition-colors">Data Usage Policy</Link></li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 MedPortal. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default UpdatePassword;




import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Shield, UserPlus, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        alert('Please use the email link to reset your password.');
        navigate('/');
      }
    });
  }, [navigate]);

  const handleUpdate = async () => {
    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) alert('Failed to update password');
    else {
      alert('Password updated!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-white">
      {/* NAVBAR */}
      <nav className="bg-white shadow border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedPortal</h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {['products', 'community', 'e-seminar', 'e-learning', 'jobs', 'calendar'].map((route) => (
                <Link key={route} to={`/${route}`} className="text-gray-600 hover:text-blue-600 transition font-medium px-3 py-2 rounded-md hover:bg-blue-50 capitalize">
                  {route.replace('-', ' ')}
                </Link>
              ))}
              <Button onClick={() => setShowAuthModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign In / Register
              </Button>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-blue-50">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4 bg-white rounded shadow-sm">
              <div className="flex flex-col space-y-3">
                {['products', 'community', 'e-seminar', 'e-learning', 'jobs', 'calendar'].map((route) => (
                  <Link key={route} to={`/${route}`} className="text-gray-600 hover:text-blue-600 transition font-medium p-3 rounded-md hover:bg-blue-50 capitalize">
                    {route.replace('-', ' ')}
                  </Link>
                ))}
                <Button onClick={() => setShowAuthModal(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign In / Register
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* PASSWORD FORM */}
      <div className="flex justify-center items-center py-12">
        <div className="w-full max-w-md bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-center mb-6">Set New Password</h3>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              id="newPassword"
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700 mb-1">Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="Repeat new password"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow-md"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">MedPortal</span>
              </div>
              <p className="text-gray-400">
                Empowering medical professionals through technology and community.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/products" className="hover:text-white">Products</Link></li>
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
                <li><Link to="/e-learning" className="hover:text-white">E-Learning</Link></li>
                <li><Link to="/e-seminar" className="hover:text-white">E-Seminars</Link></li>
                <li><Link to="/jobs" className="hover:text-white">Jobs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/data-usage-policy" className="hover:text-white">Data Usage Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MedPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UpdatePassword;