'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Camera, Tag, Apple, Clock, Zap, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CreativeAnalysisPageComponent() {
  const [activeTab, setActiveTab] = useState('recognition')
  const [progress, setProgress] = useState(0)
  const [isImageHovered, setIsImageHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])

  const analysisData = {
    recognition: {
      items: ['Apple', 'Banana', 'Orange'],
      confidence: 0.95,
    },
    label: {
      calories: '52 kcal',
      protein: '0.3g',
      carbs: '14g',
      fat: '0.2g',
    },
    details: {
      vitamins: ['Vitamin C', 'Vitamin B6', 'Folate'],
      minerals: ['Potassium', 'Magnesium'],
      benefits: ['Supports heart health', 'Aids digestion', 'Boosts immune system'],
    },
    freshness: {
      status: 'Fresh',
      daysLeft: 5,
      tips: ['Store in a cool, dry place', 'Keep away from direct sunlight'],
    },
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
                <img  className="w-full h-64 object-cover" />
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
                  <TabsContent value="recognition">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600">Recognized Items</h3>
                    <ul className="space-y-2">
                      {analysisData.recognition.items.map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <span className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <p className="mb-2">Confidence Level</p>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysisData.recognition.confidence * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative h-2 rounded-full bg-gray-200"
                      >
                        <div 
                          className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full" 
                          style={{ width: `${analysisData.recognition.confidence * 100}%` }}
                        ></div>
                      </motion.div>
                      <p className="text-sm text-blue-600 mt-1">
                        {(analysisData.recognition.confidence * 100).toFixed(0)}% confident
                      </p>
                    </div>
                  </TabsContent>


                  <TabsContent value="label">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600">Nutritional Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(analysisData.label).map(([key, value], index) => (
                        <motion.div 
                          key={key} 
                          className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <p className="text-sm text-blue-600">{key}</p>
                          <p className="text-lg font-semibold">{value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="details">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600">Food Details</h3>
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="font-semibold mb-2">Vitamins</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.details.vitamins.map((vitamin, index) => (
                            <motion.span 
                              key={index} 
                              className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              {vitamin}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <h4 className="font-semibold mb-2">Minerals</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.details.minerals.map((mineral, index) => (
                            <motion.span 
                              key={index} 
                              className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              {mineral}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <h4 className="font-semibold mb-2">Health Benefits</h4>
                        <ul className="list-disc list-inside space-y-2">
                          {analysisData.details.benefits.map((benefit, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              {benefit}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </TabsContent>

                  <TabsContent value="freshness">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600">Freshness Assessment</h3>
                    <div className="space-y-6">
                      <motion.div 
                        className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm text-blue-600">Status</p>
                        <p className="text-3xl font-bold text-green-500">{analysisData.freshness.status}</p>
                      </motion.div>
                      <motion.div 
                        className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <p className="text-sm text-blue-600">Estimated Days Left</p>
                        <p className="text-3xl font-bold">{analysisData.freshness.daysLeft} days</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <h4 className="font-semibold mb-2">Storage Tips</h4>
                        <ul className="list-disc list-inside space-y-2">
                          {analysisData.freshness.tips.map((tip, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              {tip}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>
      </main>

      <footer className="bg-blue-600 text-white py-8 px-4 mt-12 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <p>&copy; 2023 Flipkart QualiBot. Empowering smart shopping decisions.</p>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 w-full  h-1 bg-yellow-400"
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
  )
}