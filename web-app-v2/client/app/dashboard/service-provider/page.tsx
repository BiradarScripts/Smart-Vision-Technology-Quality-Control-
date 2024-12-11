'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Package, TrendingUp, AlertTriangle, ShoppingCart, Camera, Leaf, Apple, BarChart3 } from 'lucide-react'
import { useBasket } from '@/contexts/BasketContext'

const playfair = Playfair_Display({ subsets: ["latin"] })

interface ServiceProviderProfile {
  inventorySize: string
  restockFrequency: string
  lowStockNotifications: boolean
  analyzeCustomerTrends: boolean
  sellPerishables: boolean
}

export default function ServiceProviderDashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<ServiceProviderProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [scannedItems, setScannedItems] = useState<any[]>([])
  const { basket } = useBasket()

  useEffect(() => {
    const storedProfile = localStorage.getItem('serviceProviderProfile')
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile))
    } else {
      router.push('/onboarding/service-provider')
    }
    setLoading(false)
  }, [router])

  useEffect(() => {
    const fetchScannedItems = async () => {
      try {
        // In a real application, you would fetch this data from your backend
        const brandItems = JSON.parse(localStorage.getItem('brandDetectionResults') || '[]')
        const expiryItems = JSON.parse(localStorage.getItem('expiryDetectionResults') || '[]')
        const freshnessItems = JSON.parse(localStorage.getItem('analysisResults') || '[]')
        const nutrientItems = JSON.parse(localStorage.getItem('nutrientInfo') || '[]')

        setScannedItems([...brandItems, ...expiryItems, ...freshnessItems, ...nutrientItems])
      } catch (error) {
        console.error("Error fetching scanned items:", error)
        // Handle the error appropriately, e.g., display an error message
      }
    }

    fetchScannedItems()
  }, [basket]) // Add basket as a dependency to re-run on basket changes

  const inventoryData = scannedItems.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { name: item.name, stock: 0, lowStock: 5 }
    }
    acc[item.name].stock += item.count || 1
    return acc
  }, {} as Record<string, { name: string, stock: number, lowStock: number }>)

  const categoryData = scannedItems.reduce((acc, item) => {
    const category = item.category || 'Other'
    if (!acc[category]) acc[category] = 0
    acc[category] += item.count || 1
    return acc
  }, {} as Record<string, number>)

  const expiringItems = scannedItems
    .filter(item => item.expiryDate)
    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
    .slice(0, 5)

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const features = [
    { name: 'Brand Detection', icon: Camera, route: '/upload-brand-detection' },
    { name: 'Expiry Detection', icon: Leaf, route: '/upload-expiry-detection' },
    { name: 'Freshness Detection', icon: Apple, route: '/upload-freshness-detection' },
    { name: 'Nutrient Info', icon: BarChart3, route: '/upload-nutrient-info' },
  ]

  // Mock data for sales trend
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 },
  ]

  if (loading) {
    return <div>Loading...</div>
  }

  if (!profile) {
    return <div>Error loading profile</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] p-8">
      <h1 className={cn("text-4xl font-bold text-white mb-8", playfair.className)}>
        Service Provider Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {features.map((feature) => (
          <Link href={feature.route} key={feature.name}>
            <Card className="bg-white/10 backdrop-blur-sm border-none text-white hover:bg-white/20 transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{feature.name}</span>
                  <feature.icon className="w-6 h-6" />
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2" />
              Inventory Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* {Object.values(inventoryData).map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{item.name}</span>
                  <span>{item.stock} in stock</span>
                </div>
                <Progress 
                  value={(item.stock / (item.stock + item.lowStock)) * 100} 
                  className="h-2"
                />
              </div>
            ))} */}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" />
              Sales Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }} />
                <Legend />
                <Bar dataKey="sales" fill="#FF7F50" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2" />
              Expiring Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {expiringItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <span>{item.name}</span>
                  <span className="float-right">Expires: {item.expiryDate}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2" />
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={Object.entries(categoryData).map(([name, value]) => ({ name, value }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {Object.entries(categoryData).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      
    </div>
  )
}

