'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function ServiceProviderOnboardingStep3() {
  const router = useRouter()
  const [lowStockNotifications, setLowStockNotifications] = useState(false)
  const [analyzeCustomerTrends, setAnalyzeCustomerTrends] = useState(false)
  const [sellPerishables, setSellPerishables] = useState(false)

  const handleNext = () => {
    localStorage.setItem('lowStockNotifications', lowStockNotifications.toString())
    localStorage.setItem('analyzeCustomerTrends', analyzeCustomerTrends.toString())
    localStorage.setItem('sellPerishables', sellPerishables.toString())
    router.push('/onboarding/service-provider/summary')
  }

  const handleBack = () => {
    router.push('/onboarding/service-provider/2')
  }

  return (
    <div className="w-full max-w-lg animate-fade-in-up">
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className={cn("text-3xl text-center", playfair.className)}>
            Additional Services
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="lowStockNotifications">Low stock notifications</Label>
            <Switch
              id="lowStockNotifications"
              checked={lowStockNotifications}
              onCheckedChange={setLowStockNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="analyzeCustomerTrends">Analyze customer trends</Label>
            <Switch
              id="analyzeCustomerTrends"
              checked={analyzeCustomerTrends}
              onCheckedChange={setAnalyzeCustomerTrends}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sellPerishables">Sell perishable items</Label>
            <Switch
              id="sellPerishables"
              checked={sellPerishables}
              onCheckedChange={setSellPerishables}
            />
          </div>
          <div className="flex justify-between">
            <Button 
              onClick={handleBack} 
              variant="outline"
              className="bg-white/10 text-white hover:bg-white/20"
            >
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              className="bg-[#FF7F50] hover:bg-[#FF6347] text-white"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

