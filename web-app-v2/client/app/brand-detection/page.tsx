'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Camera, BarChart3, Package, ArrowUpDown, Search, Download, Share2, Copy, Facebook, Twitter, ShoppingBag, Coffee, Milk, Cookie, PlusCircle } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { TotalCountDisplay } from '@/components/TotalCountDisplay'
import { AIChatAssistant } from '@/components/AIChatAssistant'
import { useBasket, BasketItem } from '@/contexts/BasketContext'

const playfair = Playfair_Display({ subsets: ["latin"] })
import { sendBrandItems } from '../../lib/api/brand';
import { downloadPDF } from '@/lib/api/download';

interface BrandItem {
  id: string
  name: string
  brand: string
  category?: string
  count: number
  confidence: number
}

const COLORS = ['#FF7F50', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0']

const getItemIcon = (category: string | undefined) => {
  if (!category) return <Package className="w-6 h-6" />

  switch (category.toLowerCase()) {
    case 'snacks':
      return <Cookie className="w-6 h-6" />
    case 'beverages':
      return <Coffee className="w-6 h-6" />
    case 'dairy':
      return <Milk className="w-6 h-6" />
    default:
      return <Package className="w-6 h-6" />
  }
}

export default function BrandDetectionPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [brandItems, setBrandItems] = useState<BrandItem[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [addedToBasket, setAddedToBasket] = useState<string | null>(null)
  const { addToBasket } = useBasket()

  const totalCount = useMemo(() => brandItems.reduce((sum, item) => sum + item.count, 0), [brandItems])

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage')
    if (storedImage) {
      setUploadedImage(storedImage)
    }
   
    const storedResults = localStorage.getItem('brandDetectionResults')
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults)
        const formattedResults = parsedResults.map((item: any, index: number) => ({
          id: index.toString(),
          name: item.name || 'Unknown',
          brand: item.brand || 'Unknown',
          category: item.category,
          count: item.count || 0,
          confidence: item.confidence || 0,
        }));

        setBrandItems(formattedResults);
        sendItemsOnLoad(formattedResults);
        
      } catch (error) {
        console.error('Error parsing results:', error)
        setError('Failed to load brand detection results. Please try again.')
      }
    } else {
      setError('No brand detection results found. Please upload and analyze an image first.')
    }
  }, [])

  const sendItemsOnLoad = async (items: BrandItem[]) => {
    try {
      const result = await sendBrandItems(items);
      console.log('Items saved successfully:', result);
    } catch (error) {
      console.error('Failed to save items:', error);
    }
  };

  const sortedAndFilteredItems = brandItems
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => 
      sortOrder === 'asc' 
        ? a.confidence - b.confidence 
        : b.confidence - a.confidence
    )

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleDownloadPDF = () => {
    downloadPDF("brand-items");
    console.log("Downloading PDF...")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    console.log("Link copied to clipboard")
  }

  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`)
  }

  const handleAddToBasket = (item: BrandItem) => {
    const basketItem: BasketItem = {
      id: item.id,
      name: item.name,
      quantity: 1,
      price: 10, 
      category: item.category,
      brand: item.brand,
    }
    addToBasket(basketItem)
    setAddedToBasket(item.name)
    setTimeout(() => setAddedToBasket(null), 3000)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] flex flex-col">
      {/* <Navbar /> */}
      <div className="absolute inset-0 overflow-hidden">
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
            Brand Detection Results
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-8">
              {error}
            </div>
          )}

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
                  Brand Detection Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={brandItems}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none', borderRadius: '4px' }}
                        labelStyle={{ color: '#fff' }}
                        cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                      />
                      <Bar dataKey="confidence" name="Confidence">
                        {brandItems.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <TotalCountDisplay totalCount={totalCount} />

          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={toggleSortOrder}
                  variant="outline"
                  className="border-white/20 text-white bg-white/10"
                >
                  Sort by Confidence
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
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
            </div>
            {sortedAndFilteredItems.map((item) => (
              <Card key={item.id} className="bg-white/10 backdrop-blur-sm border-none text-white overflow-hidden">
                <CardHeader className="bg-white/5">
                  <CardTitle className={cn("text-2xl flex items-center gap-2", playfair.className)}>
                    {getItemIcon(item.category)}
                    {item.name}
                    <Badge className="ml-auto text-lg px-3 py-1 bg-[#FF7F50]">
                      {item.brand}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-[#FF7F50]" />
                        <strong>Category:</strong> {item.category || 'N/A'}
                      </p>
                      <p className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[#FF7F50]" />
                        <strong>Count:</strong> {item.count}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#FF7F50]" />
                        <strong>Confidence:</strong> {(item.confidence * 100).toFixed(2)}%
                      </p>
                      <Button
                        onClick={() => handleAddToBasket(item)}
                        className="w-full bg-[#FF7F50] hover:bg-[#FF6347] text-white"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add to Basket
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {addedToBasket && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded-md">
              Added {addedToBasket} to basket
            </div>
          )}
        </div>
      </main>
      <AIChatAssistant 
        pageType="brand"
        data={brandItems}
        onOpenChange={setIsChatOpen}
      />
    </div>
  )
}

