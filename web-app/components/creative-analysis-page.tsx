'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CreativeAnalysisPageComponent() {
  const [activeTab, setActiveTab] = useState('recognition');
  const [progress, setProgress] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [updated_analysis, setupdated_analysis] = useState({}); // Initialize as an empty object
  const [brandDetails, setBrandDetails] = useState(null);

  let analyses = [];

  if (analysis) {
    const analysisItems = analysis.split('<strong>Item Number:</strong>').filter(item => item.trim() !== '');

    const getTextContentByLabel = (label, item) => {
      const regex = new RegExp(`<strong>${label}</strong>\\s*([^<]+)`, 'i');
      const match = item.match(regex);
      return match ? match[1].trim() : "N/A";
    };

    analyses = analysisItems.map(item => ({
      itemNumber: getTextContentByLabel('Item Number:', item),
      name: getTextContentByLabel('Item Name:', item),
      direction: getTextContentByLabel('Direction:', item),
      freshnessIndex: getTextContentByLabel('Freshness Index:', item),
      color: getTextContentByLabel('Visual Color:', item),
      texture: getTextContentByLabel('Surface Texture:', item),
      firmness: getTextContentByLabel('Firmness Level:', item),
      packagingCondition: getTextContentByLabel('Packaging Condition:', item),
      status: getTextContentByLabel('Status:', item),
      estimatedShelfLife: getTextContentByLabel('Estimated Shelf Life:', item),
      recommendation: getTextContentByLabel('Recommendation:', item)
    }));
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const analysisData = localStorage.getItem('analysis');
      const updated_analysis = JSON.parse(localStorage.getItem('updated_analysis')) || {}; // Ensure it's parsed
      setAnalysis(analysisData);
      setupdated_analysis(updated_analysis);

      const timer = setTimeout(() => setProgress(100), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

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
                  <>
                    {/* TabsContent for "recognition" */}
                    {activeTab === "recognition" && (
                      <TabsContent key={`recognition`} value="recognition">
                        <div>
                          <h2 className="text-xl font-semibold">Recognized Items</h2>
                          <ul>
                            <li className="text-lg">
                              Number of items: {updated_analysis.itemCount || 0} items {/* Fallback to 0 */}
                            </li>
                          </ul>
                        </div>
                      </TabsContent>
                    )}

                    {/* TabsContent for "freshness" */}
                    {activeTab === "freshness" && (
                      <TabsContent key={`freshness`} value="freshness">
                        {analyses.map((analysis, index) => (
                          <div key={index} className="mb-6">
                            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                              Freshness Assessment for Item {index + 1}
                            </h3>
                            <div className="space-y-4">
                              {[
                                { label: "Item Name", value: analysis.name },
                                { label: "Direction", value: analysis.direction },
                                { label: "Freshness Index", value: analysis.freshnessIndex },
                                { label: "Visual Color", value: analysis.color },
                                { label: "Surface Texture", value: analysis.texture },
                                { label: "Firmness Level", value: analysis.firmness },
                                { label: "Packaging Condition", value: analysis.packagingCondition },
                                { label: "Status", value: analysis.status },
                                { label: "Estimated Shelf Life", value: analysis.estimatedShelfLife },
                                { label: "Recommendation", value: analysis.recommendation },
                              ].map((item, itemIndex) => (
                                <div key={itemIndex} className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                                  <strong>{item.label}:</strong> {item.value}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                    )}

                    {/* TabsContent for "label" */}
                    {activeTab === "label" && (
                      <TabsContent key={`label`} value="label">
                        <div>
                          <h2 className="text-xl font-semibold">Labeling Information</h2>
                          <p>Labeling details based on the uploaded image will be displayed here.</p>
                        </div>
                      </TabsContent>
                    )}

                    {/* TabsContent for "details" */}
                    {activeTab === "details" && (
                      <TabsContent key={`details`} value="details">
                        <div>
                          <h2 className="text-xl font-semibold">Detailed Analysis</h2>
                          <p>Detailed analysis information based on the uploaded image will be displayed here.</p>
                        </div>
                      </TabsContent>
                    )}
                  </>
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
