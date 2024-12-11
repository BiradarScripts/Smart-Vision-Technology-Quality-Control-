'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Camera, BarChart3, Clock, Leaf, Upload, Brain, FileText, ShoppingCart, Search, BarChart, Truck } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'


const playfair = Playfair_Display({ subsets: ["latin"] })
import { Navbar } from "@/components/Navbar"

interface FeatureDoc {
  title: string
  description: string
  icon: React.ReactNode
  benefits: string[]
  howItWorks: {
    title: string
    description: string
    icon: React.ReactNode
  }[]
  useCases: {
    title: string
    description: string
    icon: React.ReactNode
  }[]
}

const featureDocs: Record<string, FeatureDoc> = {
  'brand-detection': {
    title: 'Brand Detection',
    description: 'Our advanced brand detection system uses state-of-the-art computer vision to identify and analyze product brands in real-time.',
    icon: <Camera className="w-12 h-12" />,
    benefits: [
      'Instant brand recognition with 95% accuracy',
      'Support for multiple brands in a single image',
      'Real-time analysis and reporting',
      'Integration with inventory management systems'
    ],
    howItWorks: [
      {
        title: 'Image Capture',
        description: 'Upload or capture an image of the product using our intuitive interface.',
        icon: <Upload className="w-12 h-12" />
      },
      {
        title: 'AI Processing',
        description: 'Our AI analyzes the image using deep learning models trained on millions of product images.',
        icon: <Brain className="w-12 h-12" />
      },
      {
        title: 'Results Analysis',
        description: 'Get detailed information about detected brands, including confidence scores and related data.',
        icon: <FileText className="w-12 h-12" />
      }
    ],
    useCases: [
      {
        title: 'Retail Inventory',
        description: 'Quickly catalog and organize products by brand',
        icon: <ShoppingCart className="w-8 h-8" />
      },
      {
        title: 'Market Research',
        description: 'Analyze brand presence and placement in retail environments',
        icon: <Search className="w-8 h-8" />
      },
      {
        title: 'Asset Management',
        description: 'Track branded assets across multiple locations',
        icon: <BarChart className="w-8 h-8" />
      }
    ]
  },
  'expiry-detection': {
    title: 'Expiry Detection',
    description: 'Automatically detect and track expiration dates on products with our advanced computer vision system.',
    icon: <Clock className="w-12 h-12" />,
    benefits: [
      'Accurate date extraction with 98% accuracy',
      'Support for multiple date formats',
      'Early warning system for approaching expiry dates',
      'Automated inventory management'
    ],
    howItWorks: [
      {
        title: 'Date Capture',
        description: 'Upload or capture an image of the product expiry date.',
        icon: <Upload className="w-12 h-12" />
      },
      {
        title: 'OCR Processing',
        description: 'Our system uses advanced OCR to extract and interpret date information.',
        icon: <Brain className="w-12 h-12" />
      },
      {
        title: 'Date Analysis',
        description: 'Get organized expiry information and recommendations.',
        icon: <FileText className="w-12 h-12" />
      }
    ],
    useCases: [
      {
        title: 'Inventory Management',
        description: 'Track product expiration dates in real-time',
        icon: <ShoppingCart className="w-8 h-8" />
      },
      {
        title: 'Quality Control',
        description: 'Ensure products are within their shelf life',
        icon: <Search className="w-8 h-8" />
      },
      {
        title: 'Waste Reduction',
        description: 'Minimize waste by managing product rotation effectively',
        icon: <Truck className="w-8 h-8" />
      }
    ]
  },
  'nutrient-info': {
    title: 'Nutrient Information',
    description: 'Extract and analyze nutritional information from product labels using advanced image recognition.',
    icon: <BarChart3 className="w-12 h-12" />,
    benefits: [
      'Detailed nutritional analysis',
      'Support for multiple label formats',
      'Allergen identification',
      'Dietary recommendation integration'
    ],
    howItWorks: [
      {
        title: 'Label Capture',
        description: 'Upload or capture an image of the nutrition label.',
        icon: <Upload className="w-12 h-12" />
      },
      {
        title: 'Data Extraction',
        description: 'Our AI extracts detailed nutritional information from the label.',
        icon: <Brain className="w-12 h-12" />
      },
      {
        title: 'Analysis',
        description: 'Get comprehensive nutritional analysis and recommendations.',
        icon: <FileText className="w-12 h-12" />
      }
    ],
    useCases: [
      {
        title: 'Personal Health',
        description: 'Track nutritional intake and maintain dietary goals',
        icon: <BarChart className="w-8 h-8" />
      },
      {
        title: 'Food Service',
        description: 'Quickly analyze ingredients and nutritional content',
        icon: <ShoppingCart className="w-8 h-8" />
      },
      {
        title: 'Research',
        description: 'Collect and analyze nutritional data at scale',
        icon: <Search className="w-8 h-8" />
      }
    ]
  },
  'freshness-detection': {
    title: 'Freshness Detection',
    description: 'Analyze and determine product freshness using advanced visual recognition and AI technology.',
    icon: <Leaf className="w-12 h-12" />,
    benefits: [
      'Real-time freshness analysis',
      'Multi-factor assessment',
      'Early detection of quality issues',
      'Integration with inventory systems'
    ],
    howItWorks: [
      {
        title: 'Visual Analysis',
        description: 'Upload or capture an image of the product for freshness assessment.',
        icon: <Upload className="w-12 h-12" />
      },
      {
        title: 'AI Processing',
        description: 'Our AI analyzes multiple visual indicators of freshness.',
        icon: <Brain className="w-12 h-12" />
      },
      {
        title: 'Results',
        description: 'Get detailed freshness analysis and recommendations.',
        icon: <FileText className="w-12 h-12" />
      }
    ],
    useCases: [
      {
        title: 'Quality Control',
        description: 'Monitor product freshness in real-time',
        icon: <Search className="w-8 h-8" />
      },
      {
        title: 'Inventory Management',
        description: 'Optimize stock rotation based on freshness',
        icon: <ShoppingCart className="w-8 h-8" />
      },
      {
        title: 'Consumer Protection',
        description: 'Ensure product quality before purchase',
        icon: <Truck className="w-8 h-8" />
      }
    ]
  }
}

export default function FeatureDocPage({ params }: { params: { feature: string } }) {
  const feature = featureDocs[params.feature]



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] text-white relative">
           <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-114.5 560.5C80.5 427.5 284.5 755 573.5 755C862.5 755 1100.5 498.5 1309 498.5C1517.5 498.5 1544.5 668 1544.5 668" stroke="#FF7F50" strokeOpacity="0.1" strokeWidth="2"/>
          <path d="M-114.5 300.5C80.5 167.5 284.5 495 573.5 495C862.5 495 1100.5 238.5 1309 238.5C1517.5 238.5 1544.5 408 1544.5 408" stroke="#FF7F50" strokeOpacity="0.1" strokeWidth="2"/>
          <circle cx="1300" cy="100" r="20" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="100" cy="700" r="50" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="1200" cy="600" r="30" fill="#FF7F50" fillOpacity="0.05"/>
        </svg>
      </div>
      {/* <Navbar/> */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        

          <div className="space-y-24">
            {/* Hero Section */}
            <div className="text-center space-y-8">
              <div className="inline-flex items-center justify-center p-2 rounded-full bg-[#FF7F50]/20">
                <div className="p-4 rounded-full bg-[#FF7F50]/40 text-[#FF7F50]">
                  {feature.icon}
                </div>
              </div>
              <h1 className={cn("text-5xl md:text-6xl font-bold", playfair.className)}>
                {feature.title}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {feature.description}
              </p>
            </div>

            {/* Benefits Section */}
            <section className="space-y-8">
              <h2 className={cn("text-3xl font-bold text-center", playfair.className)}>
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feature.benefits.map((benefit, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 transition-colors">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="text-[#FF7F50] mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-lg">{benefit}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* How It Works Section */}
            <section className="space-y-12">
              <h2 className={cn("text-3xl font-bold text-center", playfair.className)}>
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {feature.howItWorks.map((step, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="p-4 rounded-full bg-[#FF7F50]/20 text-[#FF7F50]">
                        {step.icon}
                      </div>
                      <h3 className={cn("text-xl font-bold", playfair.className)}>
                        {step.title}
                      </h3>
                      <p className="text-white/80">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Use Cases Section */}
            <section className="space-y-12">
              <h2 className={cn("text-3xl font-bold text-center", playfair.className)}>
                Use Cases
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {feature.useCases.map((useCase, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-full bg-[#FF7F50]/20 text-[#FF7F50]">
                        {useCase.icon}
                      </div>
                      <h3 className={cn("text-xl font-bold", playfair.className)}>
                        {useCase.title}
                      </h3>
                      <p className="text-white/80">
                        {useCase.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            
          </div>
        </div>
      </div>
    </div>
  )
}

