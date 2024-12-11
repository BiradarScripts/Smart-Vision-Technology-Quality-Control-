'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import { Camera, BarChart3, Package, Download, Share2, Copy, Facebook, Twitter, Apple, Carrot, CroissantIcon as Bread, Egg, PlusCircle } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { sendNutrientInfo } from '@/lib/api/helpers'
import { downloadPDF } from '@/lib/api/download'
import { AIChatAssistant } from '@/components/AIChatAssistant'
import { useBasket, BasketItem } from '@/contexts/BasketContext'

const playfair = Playfair_Display({ subsets: ["latin"] })

export interface NutrientInfo {
  id: string
  name: string
  category: string
  nutrients: string
  ingredients: string
}

const COLORS = ['#FF7F50', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0']

const getItemIcon = (category: string | undefined) => {
  switch (category?.toLowerCase()) {
    case 'fruit':
      return <Apple className="w-6 h-6" />
    case 'vegetable':
      return <Carrot className="w-6 h-6" />
    case 'grain':
      return <Bread className="w-6 h-6" />
    case 'protein':
      return <Egg className="w-6 h-6" />
    default:
      return <Package className="w-6 h-6" />
  }
}

export default function NutrientInfoPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [nutrientInfo, setNutrientInfo] = useState<NutrientInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const router = useRouter()
  const { addToBasket } = useBasket()
  const [addedToBasket, setAddedToBasket] = useState<string | null>(null)
  const [check,setCheck]=useState<string | null>(null)
  

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage')
    if (storedImage) {
      setUploadedImage(storedImage)
    }

    const storedInfo = localStorage.getItem('nutrientInfo')
    if (storedInfo) {
      try {
        const parsedInfo = JSON.parse(storedInfo)
        setNutrientInfo(parsedInfo)
        sendNutrientsOnLoad(parsedInfo);
        // const nutrition=parsedInfo
        setCheck(parsedInfo);
      } catch (error) {
        console.error('Error parsing nutrient info:', error)
        setError('Failed to load nutrient information. Please try again.')
      }
    } else {
      setError('No nutrient information found. Please upload and analyze an image first.')
      router.push('/upload-nutrient-info')
    }
  }, [router])

  const sendNutrientsOnLoad = async (nutrientInfo: NutrientInfo) => {
    try {
      const result = await sendNutrientInfo(nutrientInfo);
      console.log('Nutrient info saved successfully:', result);
    } catch (error) {
      console.error('Failed to save nutrient info:', error);
    }
  };

  const handleDownloadPDF = () => {
    downloadPDF("nutrient-info");
    console.log("Downloading PDF...")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    console.log("Link copied to clipboard")
  }

  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`)
  }

  const handleAddToBasket = (item: NutrientInfo) => {
    const basketItem: BasketItem = {
      id: item.id,
      name: item.name,
      quantity: 1,
      price: 10, // You may want to add a price field to NutrientInfo or use a default value
      category: item.category,
      nutrients: item.nutrients,
    }
    addToBasket(basketItem)
    setAddedToBasket(item.name)
    setTimeout(() => setAddedToBasket(null), 3000)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] flex flex-col">
      {/* <Navbar /> */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-114.5 560.5C80.5 427.5 284.5 755 573.5 755C862.5 755 1100.5 498.5 1309 498.5C1517.5 498.5 1544.5 668 1544.5 668" stroke="#FF7F50" strokeOpacity="0.1" strokeWidth="2"/>
          <path d="M-114.5 300.5C80.5 167.5 284.5 495 573.5 495C862.5 495 1100.5 238.5 1309 238.5C1517.5 238.5 1544.5 408 1544.5 408" stroke="#FF7F50" strokeOpacity="0.1" strokeWidth="2"/>
          <path d="M-114.5 100.5C80.5 -32.5 284.5 295 573.5 295C862.5 295 1100.5 38.5 1309 38.5C1517.5 38.5 1544.5 208 1544.5 208" stroke="#FF7F50" strokeOpacity="0.1" strokeWidth="2"/>
          <circle cx="1300" cy="100" r="20" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="1200" cy="250" r="10" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="100" cy="700" r="50" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="200" cy="500" r="15" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="1200" cy="600" r="30" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="1000" cy="400" r="25" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="400" cy="200" r="40" fill="#FF7F50" fillOpacity="0.05"/>
        </svg>
      </div>

      <main className="relative px-4 py-12 flex-grow">
        <div className="max-w-7xl mx-auto">
          <h1 className={cn("text-4xl font-bold text-white mb-8 text-center", playfair.className)}>
            Nutrient Information
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          {nutrientInfo ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
                  <CardHeader>
                    <CardTitle className={cn("text-2xl flex items-center gap-2", playfair.className)}>
                      <Camera className="w-6 h-6" />
                      Analyzed Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {uploadedImage ? (
                      <div className="relative w-full h-64 rounded-lg overflow-hidden">
                        <Image src={uploadedImage} alt="Analyzed image" layout="fill" objectFit="cover" />
                      </div>
                    ) : (
                      <div className="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                        <p>No image available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
                  <CardHeader>
                    <CardTitle className={cn("text-2xl flex items-center gap-2", playfair.className)}>
                      <BarChart3 className="w-6 h-6" />
                      Nutrient Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Name:</span>
                        <span>{nutrientInfo.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Category:</span>
                        <Badge className="bg-[#FF7F50]">{nutrientInfo.category}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={handleDownloadPDF}
                    variant="outline"
                    className="border-white/20 text-white bg-white/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white bg-white/10"
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-[#0B4D2C] text-white border-none">
                      <DialogHeader>
                        <DialogTitle className={cn("text-xl", playfair.className)}>Share report</DialogTitle>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                          <Button variant="outline" onClick={handleCopyLink} className="text-white border-white/20 bg-white/10">
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 py-4">
                        <Button variant="outline" onClick={() => handleShare("facebook")} className="text-white border-white/20 bg-white/10">
                          <Facebook className="mr-2 h-4 w-4" />
                          Facebook
                        </Button>
                        <Button variant="outline" onClick={() => handleShare("twitter")} className="text-white border-white/20 bg-white/10">
                          <Twitter className="mr-2 h-4 w-4" />
                          Twitter
                        </Button>
                        <Button variant="outline" onClick={() => handleShare("whatsapp")} className="text-white border-white/20 bg-white/10">
                          <Image src="/whatsapp-icon.png" alt="WhatsApp" width={16} height={16} className="mr-2" />
                          WhatsApp
                        </Button>
                        <Button variant="outline" onClick={() => handleShare("linkedin")} className="text-white border-white/20 bg-white/10">
                          <Image src="/linkedin-icon.png" alt="LinkedIn" width={16} height={16} className="mr-2" />
                          LinkedIn
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Card className="bg-white/10 backdrop-blur-sm border-none text-white overflow-hidden">
                  <CardHeader className="bg-white/5">
                    <CardTitle className={cn("text-2xl flex items-center gap-2", playfair.className)}>
                      {getItemIcon(nutrientInfo.category)}
                      {nutrientInfo.name}
                      <Badge className="ml-auto text-lg px-3 py-1 bg-[#FF7F50]">
                        {nutrientInfo.category}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Nutrients</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {nutrientInfo.nutrients.split(',').map((nutrient, index) => (
                            <li key={index} className="text-sm">{nutrient.trim()}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Ingredients</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {nutrientInfo.ingredients.split(',').map((ingredient, index) => (
                            <li key={index} className="text-sm">{ingredient.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAddToBasket(nutrientInfo)}
                      className="w-full bg-[#FF7F50] hover:bg-[#FF6347] text-white mt-2"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add to Basket
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-white text-2xl">Loading nutrient information...</p>
            </div>
          )}
          {addedToBasket && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded-md">
              Added {addedToBasket} to basket
            </div>
          )}
        </div>
      </main>
      <AIChatAssistant 
        pageType="expiry"
        data={check}
        onOpenChange={setIsChatOpen}
      />
    </div>
  )
}

