'use client'; // Marking the component as a client component

import { useState, useEffect } from 'react';
// import { Upload, Zap, ShoppingCart, Loader } from 'lucide-react'; // Import Loader icon
import { Upload, Camera, Tag, Apple, Clock, ShoppingCart, Search, Zap } from 'lucide-react'
import { motion,AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FruitAnalysis {
  number: string;
  name: string;
  direction: string;
  freshnessIndex: number;
  status: string;
  color: string;
  texture: string;
  firmness: string;
  packagingCondition: string;
  estimatedShelfLife: string;
  recommendation: string;
}

export function CreativeHomePageComponent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFloating, setIsFloating] = useState(false);
  const [analyses, setAnalyses] = useState<string>(''); 
  const [loading, setLoading] = useState(false); // Loader state
  const router = useRouter();

  // Floating effect
  useEffect(() => {
    const floatInterval = setInterval(() => {
      setIsFloating((prev) => !prev);
    }, 1500);
    return () => clearInterval(floatInterval);
  }, []);

  // Handle image file selection
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Analyze image function with loader
  const analyzeImage = async () => {
    if (!selectedImage) {
      router.push('/analysis');
      return;
    }

    const formData = new FormData();
    const blob = await fetch(selectedImage).then((res) => res.blob());
    formData.append('file', blob, 'uploaded-image.jpg');

    try {
      setLoading(true); // Show loader
      const apiResponse = await fetch('http://localhost:8000/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error(`Error analyzing image: ${apiResponse.statusText}`);
      }

      const result = await apiResponse.json();
      const analysis = result.analysis;

      // Parse the analysis result
      const parsedAnalysis = parseAnalysis(analysis);
      setAnalyses(parsedAnalysis);

      // Store analysis in local storage
      localStorage.setItem('analysis', parsedAnalysis);
      // console.log(localStorage.getItem('analyses'))
      // Navigate to /analysis
      router.push('/analysis');
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setLoading(false); // Hide loader after response
    }
  };

  // Parsing the analysis result
  function parseAnalysis(analysis: string): string {
    const items = analysis.split('\n').filter(line => line.trim() !== "");
    let formattedResult = '';
    items.forEach(item => {
      const [key, ...valueParts] = item.split(':');
      const value = valueParts.join(':');
      if (key && value) {
        formattedResult += `<strong>${key.trim()}:</strong> ${value.trim()}<br>`;
      }
    });
    return formattedResult;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-blue-900">
      {/* Header Section */}
      <header className="py-6 px-4 bg-blue-600 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <ShoppingCart className="mr-2" />
            Flipkart's QualiBot
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-white hover:text-yellow-300 transition duration-300">Home</a></li>
              <li><a href="#" className="text-white hover:text-yellow-300 transition duration-300">About</a></li>
              <li><a href="#" className="text-white hover:text-yellow-300 transition duration-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto py-12 px-4">
        {/* Introduction Section */}
        <section className="text-center mb-12">
          <motion.h2
            className="text-5xl font-bold text-blue-600 mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Your Food's Secrets
          </motion.h2>
          <motion.p
            className="text-xl text-blue-800"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Upload an image and let QualiBot unveil the hidden details!
          </motion.p>
        </section>

        {/* Image Upload Section */}
        <section className="mb-12 relative">
          <motion.div
            className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden border-4 border-yellow-400"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-6">
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-400 transition duration-300 relative overflow-hidden group">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Uploaded" className="max-w-full h-auto mx-auto" />
                    ) : (
                      <div>
                        <Upload className="mx-auto h-16 w-16 text-blue-400 group-hover:text-yellow-400 transition-colors duration-300" />
                        <p className="mt-2 text-lg text-blue-600 group-hover:text-yellow-400 transition-colors duration-300">Click to upload or drag and drop</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                  </div>
                </label>
              </div>

              {/* Show loader while analyzing */}
              {loading ? (
                <div className="flex justify-center items-center py-4">
                  <Loader className="animate-spin h-8 w-8 text-blue-600" />
                  <p className="ml-2 text-blue-600">Analyzing Image...</p>
                </div>
              ) : (
                <Button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold text-lg py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                  onClick={analyzeImage}
                >
                  <Zap className="mr-2" />
                  Analyze with QualiBot
                </Button>
              )}

            </div>
          </motion.div>
          <motion.div
            className="absolute -top-12 -left-12 text-9xl text-yellow-400 opacity-10 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ⚡
          </motion.div>
          <motion.div
            className="absolute -bottom-12 -right-12 text-9xl text-blue-400 opacity-10 pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            🔍
          </motion.div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <FeatureCard
            icon={<Camera className="h-10 w-10" />}
            title="Smart Image Recognition"
            description="Our AI precisely identifies and categorizes food items in your images with cutting-edge accuracy."
          />
          <FeatureCard
            icon={<Tag className="h-10 w-10" />}
            title="Intelligent Label Analysis"
            description="We extract and decode information from food labels, making sense of complex nutritional data."
          />
          <FeatureCard
            icon={<Apple className="h-10 w-10" />}
            title="Comprehensive Food Insights"
            description="Uncover detailed information about nutritional content, ingredients, and potential allergens."
          />
          <FeatureCard
            icon={<Clock className="h-10 w-10" />}
            title="Advanced Freshness Detection"
            description="Our AI assesses the freshness of produce, helping you make informed decisions about food quality."
          />
        </section>

        
      </main>
      <footer className="bg-blue-600 text-white py-8 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <p>&copy; 2023 Flipkart QualiBot. Empowering smart shopping decisions.</p>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
          animate={{
            scaleX: [0, 1, 1, 0],
            originX: ["0%", "0%", "100%", "100%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className="bg-white border-blue-200 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-blue-600">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <span className="text-xl">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-800">{description}</p>
      </CardContent>
    </Card>
  )
}
