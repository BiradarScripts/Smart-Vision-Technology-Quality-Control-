'use client'

import { useState,useEffect} from 'react'
import { ArrowLeft, ShoppingCart, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CreativeAnalysisPageComponent() {
  const [activeTab, setActiveTab] = useState('recognition')
  const [progress, setProgress] = useState(0)
  const [isImageHovered, setIsImageHovered] = useState(false)

  // Take analyses from local storage
  const storedAnalyses = localStorage.getItem('analysis');
  console.log(storedAnalyses);
  
  let analyses = [];
  
  if (storedAnalyses) {
    // Use DOMParser to extract information from the HTML
    const parser = new DOMParser();

    // Split the stored analyses into separate items
    const analysisItems = storedAnalyses.split('|').filter(item => item.trim() !== '');

    // Function to get text content based on label
    const getTextContentByLabel = (label, analysisDoc) => {
      const strongElements = analysisDoc.querySelectorAll('strong');
      for (const strong of strongElements) {
        if (strong.textContent.includes(label)) {
          return strong.nextSibling?.textContent?.trim() ?? "N/A";
        }
      }
      return "N/A"; // Default value if label is not found
    };

    analyses = analysisItems.map(item => {
      const analysisDoc = parser.parseFromString(item, 'text/html'); // Parse each item

      return {
        itemNumber: getTextContentByLabel("Item Number:", analysisDoc),
        name: getTextContentByLabel("Item Name:", analysisDoc),
        direction: getTextContentByLabel("Direction:", analysisDoc),
        freshnessIndex: getTextContentByLabel("Freshness Index:", analysisDoc),
        color: getTextContentByLabel("Visual Color:", analysisDoc),
        texture: getTextContentByLabel("Surface Texture:", analysisDoc),
        firmness: getTextContentByLabel("Firmness Level:", analysisDoc),
        packagingCondition: getTextContentByLabel("Packaging Condition:", analysisDoc),
        status: getTextContentByLabel("Status:", analysisDoc),
        estimatedShelfLife: getTextContentByLabel("Estimated Shelf Life:", analysisDoc),
        recommendation: getTextContentByLabel("Recommendation:", analysisDoc),
      };
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (analyses.length === 0) {
    return <p>Loading analysis data...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-blue-900">
      <header className="py-6 px-4 bg-blue-600 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <ShoppingCart className="mr-2" />
            Flipkart's QualiBot
          </h1>
          <Button variant="ghost" className="text-white hover:text-yellow-300 transition duration-300" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Upload
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <motion.h1 
          className="text-5xl font-bold text-blue-600 mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Decoding Your Food's Secrets
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-white border-yellow-400 border-4 overflow-hidden shadow-lg max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-blue-600 text-center">Uploaded Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="relative overflow-hidden rounded-lg"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                {/* Uncomment and adjust if you want to display an image */}
                {/* <img src={analyses.imageSrc} alt="Uploaded" className="w-full h-64 object-cover" /> */}
                <motion.div 
                  className="absolute inset-0 bg-blue-600 opacity-0"
                  animate={{ opacity: isImageHovered ? 0.2 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                {isImageHovered && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full border-4 border-yellow-400 border-dashed absolute"></div>
                    <Zap className="text-yellow-400 w-16 h-16" />
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-blue-50">
              <TabsTrigger value="recognition" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Recognition</TabsTrigger>
              <TabsTrigger value="label" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Label</TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Details</TabsTrigger>
              <TabsTrigger value="freshness" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Freshness</TabsTrigger>
            </TabsList>
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {analyses.map((analysis, index) => (
                    <TabsContent key={index} value="freshness">
                      <h3 className="text-2xl font-semibold mb-4 text-blue-600">Freshness Assessment for Item {index + 1}</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-sm text-blue-600">Item Number:</p>
                          <p className="text-lg font-semibold">{analysis.itemNumber}</p>
                        </div>
                
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-sm text-blue-600">Item Name:</p>
                          <p className="text-lg font-semibold">{analysis.name}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-sm text-blue-600">Direction:</p>
                          <p className="text-lg font-semibold">{analysis.direction}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-sm text-blue-600">Freshness Index:</p>
                          <p className="text-lg font-semibold">{analysis.freshnessIndex}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-sm text-blue-600">Visual Color:</p>
                          <p className="text-lg font-semibold">{analysis.color}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-sm text-blue-600">Surface Texture:</p>
                          <p className="text-lg font-semibold">{analysis.texture}</p>

                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-sm text-blue-600">Firmness Level:</p>
                          <p className="text-lg font-semibold">{analysis.firmness}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-sm text-blue-600">Packaging Condition:</p>
                          <p className="text-lg font-semibold">{analysis.packagingCondition}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-sm text-blue-600">Status:</p>
                          <p className="text-lg font-semibold">{analysis.status}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-sm text-blue-600">Estimated Shelf Life:</p>
                          <p className="text-lg font-semibold">{analysis.estimatedShelfLife}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-sm text-blue-600">Recommendation:</p>
                          <p className="text-lg font-semibold">{analysis.recommendation}</p>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
