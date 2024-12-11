'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts'
import { Camera, BarChart3, Leaf, Package, Clock, AlertTriangle, ArrowUpDown, Search, Download, Share2, Copy, Facebook, Twitter, PlusCircle } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { sendAnalysisResults } from '@/lib/api/helpers'
import { AIChatAssistant } from '@/components/AIChatAssistant'
import { useBasket, BasketItem } from '@/contexts/BasketContext'

import { downloadPDF } from '@/lib/api/download'

const playfair = Playfair_Display({ subsets: ["latin"] })

export interface AnalysisResult {
  id: string
  itemNumber: string|1
  name: string
  direction: string
  freshnessIndex: number
  status: string
  visualColor?: string
  texture?: string
  firmness?: string
  packagingCondition: string
  estimatedShelfLife: string
  recommendation: string
}

const COLORS = ['#FF7F50', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0']

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'fresh':
    case 'very fresh':
      return 'bg-green-500'
    case 'ripe':
      return 'bg-yellow-500'
    default:
      return 'bg-red-500'
  }
}

export default function FreshnessDetectionPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [results, setResults] = useState<AnalysisResult[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { addToBasket } = useBasket()
  const [addedToBasket, setAddedToBasket] = useState<string | null>(null)

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage')
    if (storedImage) {
      setUploadedImage(storedImage)
    }

    const storedResults = localStorage.getItem('analysisResults')
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults)
        setResults(parsedResults)
        
        sendResultsOnLoad(parsedResults);
      } catch (error) {
        console.error('Error parsing results:', error)
      }
    }
  }, [])

  const sendResultsOnLoad = async (results: AnalysisResult[]) => {
    try {
      const result = await sendAnalysisResults(results);
      console.log('Analysis results saved successfully:', result);
    } catch (error) {
      console.error('Failed to save analysis results:', error);
    }
  };

  const sortedAndFilteredResults = results
    .filter(result => result.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => 
      sortOrder === 'asc' 
        ? a.freshnessIndex - b.freshnessIndex 
        : b.freshnessIndex - a.freshnessIndex
    )

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleDownloadPDF = () => {
    downloadPDF("analysis-results")
    console.log("Downloading PDF...")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    console.log("Link copied to clipboard")
  }

  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`)
  }

  const handleAddToBasket = (item: AnalysisResult) => {
    const basketItem: BasketItem = {
      id: item.id,
      name: item.name,
      quantity: 1,
      price: 10, 
      freshnessIndex: item.freshnessIndex,
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
            Freshness Detection Results
          </h1>

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
                  Freshness Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none', borderRadius: '4px' }}
                        labelStyle={{ color: '#fff' }}
                        cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                      />
                      <Bar dataKey="freshnessIndex" name="Freshness Index">
                        {results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

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
                  Sort by Freshness
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
            {sortedAndFilteredResults.map((result) => (
              <Card key={result.id} className="bg-white/10 backdrop-blur-sm border-none text-white overflow-hidden">
                <CardHeader className="bg-white/5">
                  <CardTitle className={cn("text-2xl flex items-center gap-2", playfair.className)}>
                    <Leaf className="w-6 h-6" />
                    {result.name}
                    <Badge className={`ml-auto text-lg px-3 py-1 ${getStatusColor(result.status)}`}>
                      {result.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-[#FF7F50]" />
                        <strong>Freshness Index:</strong> {result.freshnessIndex}/10
                      </p>
                      <p className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-[#FF7F50]" />
                        <strong>Visual Color:</strong> {result.visualColor}
                      </p>
                      <p className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-[#FF7F50]" />
                        <strong>Texture:</strong> {result.texture}
                      </p>
                      <p className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-[#FF7F50]" />
                        <strong>Firmness:</strong> {result.firmness}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#FF7F50]" />
                        <strong>Packaging:</strong> {result.packagingCondition}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#FF7F50]" />
                        <strong>Estimated Shelf Life:</strong> {result.estimatedShelfLife}
                      </p>
                      <p className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-[#FF7F50]" />
                        <strong>Recommendation:</strong> {result.recommendation}
                      </p>
                      <p className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-[#FF7F50]" />
                        <strong>Direction:</strong> {result.direction}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAddToBasket(result)}
                    className="w-full bg-[#FF7F50] hover:bg-[#FF6347] text-white mt-2"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add to Basket
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <AIChatAssistant 
        pageType="freshness"
        data={results}
        onOpenChange={setIsChatOpen}
      />
      {addedToBasket && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded-md">
          Added {addedToBasket} to basket
        </div>
      )}
    </div>
  )
}

