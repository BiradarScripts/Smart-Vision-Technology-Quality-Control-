'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ShoppingBasket, TrendingUp, DollarSign, Zap, Camera, Leaf, Apple, BarChart3 } from 'lucide-react'
import { useBasket } from '@/contexts/BasketContext'

const playfair = Playfair_Display({ subsets: ["latin"] })

interface CustomerProfile {
  healthGoal: string
  dietaryPreference: string
  monthlyBudget: string
  nutrientPriority: string
  allergies: string[]
}

export default function CustomerDashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<CustomerProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const { basket } = useBasket()

  useEffect(() => {
    const storedProfile = localStorage.getItem('customerProfile')
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile))
    } else {
      router.push('/onboarding/customer')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!profile) {
    return <div>Error loading profile</div>
  }

  // Mock data for demonstration
  //const basketItems = [
  //  { name: 'Apples', quantity: 5, price: 2.5 },
  //  { name: 'Chicken Breast', quantity: 2, price: 8 },
  //  { name: 'Brown Rice', quantity: 1, price: 3 },
  //  { name: 'Spinach', quantity: 1, price: 2 },
  //]

  const basketItems = basket

  const totalSpent = basket.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const budgetRemaining = parseFloat(profile.monthlyBudget) - totalSpent

  const nutrientData = basket.reduce((acc, item) => {
    if (item.nutrients) {
      const nutrients = item.nutrients.split(',')
      nutrients.forEach(nutrient => {
        const [name, amount] = nutrient.split(':')
        if (!acc[name]) acc[name] = 0
        acc[name] += parseFloat(amount) * item.quantity
      })
    }
    return acc
  }, {} as Record<string, number>)

  const nutrientChartData = Object.entries(nutrientData).map(([name, amount]) => ({
    name,
    amount,
    goal: 100 // You may want to set different goals for different nutrients
  }))


  const calorieData = [
    { name: 'Mon', calories: 2100 },
    { name: 'Tue', calories: 2300 },
    { name: 'Wed', calories: 2000 },
    { name: 'Thu', calories: 2200 },
    { name: 'Fri', calories: 2400 },
    { name: 'Sat', calories: 2600 },
    { name: 'Sun', calories: 2500 },
  ]


  const features = [
    { name: 'Brand Detection', icon: Camera, route: '/upload-brand-detection' },
    { name: 'Expiry Detection', icon: Leaf, route: '/upload-expiry-detection' },
    { name: 'Freshness Detection', icon: Apple, route: '/upload-freshness-detection' },
    { name: 'Nutrient Info', icon: BarChart3, route: '/upload-nutrient-info' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] p-8">
      <h1 className={cn("text-4xl font-bold text-white mb-8", playfair.className)}>
        Welcome to Your Dashboard
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
              <ShoppingBasket className="mr-2" />
              Current Basket
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {basketItems.map((item) => (
                <li key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>${totalSpent.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" />
              Nutrient Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nutrientChartData.map((nutrient, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{nutrient.name}</span>
                  <span>{nutrient.amount.toFixed(2)}/{nutrient.goal}g</span>
                </div>
                <Progress value={(nutrient.amount / nutrient.goal) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2" />
              Budget Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Monthly Budget:</span>
                <span>${profile.monthlyBudget}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Spent:</span>
                <span>${totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Remaining:</span>
                <span>${budgetRemaining.toFixed(2)}</span>
              </div>
            </div>
            <Progress value={(totalSpent / parseFloat(profile.monthlyBudget)) * 100} className="h-2" />
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2" />
              Calorie Intake
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={calorieData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }} />
                <Legend />
                <Bar dataKey="calories" fill="#FF7F50" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      
    </div>
  )
}

