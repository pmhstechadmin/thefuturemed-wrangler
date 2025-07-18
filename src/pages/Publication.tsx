
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, FileText, Upload, Eye, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CaseStudyForm from '@/components/publication/CaseStudyForm';
import MyPublications from '@/components/publication/MyPublications';
import logo from "@/image/thefuturemed_logo (1).jpg";
import Footer from '@/footer/Footer';

const Publication = () => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/products');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleBackNavigation}
                className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              {/* <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">MedPortal</h1>
              </Link> */}
              <div className="flex items-center space-x-2">
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-10 w-100 mr-2" />
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/products">
                <Button
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                >
                  All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative pt-16 pb-8">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <FileText className="h-16 w-16 text-purple-400 mr-4" />
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              Medical Publications
            </h2>
          </motion.div>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Submit and share your medical case studies, research findings, and
            clinical observations with the global medical community.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="submit" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-black/40 border border-white/20">
              <TabsTrigger
                value="submit"
                className="text-white data-[state=active]:bg-purple-600"
              >
                <Upload className="mr-2 h-4 w-4" />
                Submit Case Study
              </TabsTrigger>
              <TabsTrigger
                value="my-publications"
                className="text-white data-[state=active]:bg-purple-600"
              >
                <Eye className="mr-2 h-4 w-4" />
                My Publications
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="submit">
                <CaseStudyForm />
              </TabsContent>

              <TabsContent value="my-publications">
                <MyPublications />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FileText className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Case Studies</h3>
              <p className="text-gray-300">
                Share detailed case studies with comprehensive analysis and
                outcomes
              </p>
            </motion.div>
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Upload className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Submission</h3>
              <p className="text-gray-300">
                Simple form-based submission with PDF upload support
              </p>
            </motion.div>
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Eye className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Preview & Edit</h3>
              <p className="text-gray-300">
                Preview your submission and make edits before final submission
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Publication;
