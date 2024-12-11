'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function ServiceProviderOnboarding() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    inventorySize: '',
    restockFrequency: '',
    lowStockNotifications: false,
    analyzeCustomerTrends: false,
    sellPerishables: false,
  })

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    // For now, we'll just store it in localStorage
    localStorage.setItem('serviceProviderProfile', JSON.stringify(formData))
    router.push('/dashboard/service-provider')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className={cn("text-3xl text-center", playfair.className)}>
            Welcome to SmartVision! Let's set up your service provider profile.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="inventorySize">What is the size of your inventory?</Label>
              <Select name="inventorySize" onValueChange={(value) => handleInputChange("inventorySize", value)}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select inventory size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="restockFrequency">How often do you restock your inventory?</Label>
              <Select name="restockFrequency" onValueChange={(value) => handleInputChange("restockFrequency", value)}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select restock frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="lowStockNotifications"
                checked={formData.lowStockNotifications}
                onCheckedChange={(checked) => handleInputChange("lowStockNotifications", checked)}
              />
              <Label htmlFor="lowStockNotifications">Do you need notifications for low stock or expiring items?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="analyzeCustomerTrends"
                checked={formData.analyzeCustomerTrends}
                onCheckedChange={(checked) => handleInputChange("analyzeCustomerTrends", checked)}
              />
              <Label htmlFor="analyzeCustomerTrends">Would you like to analyze customer trends and preferences?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="sellPerishables"
                checked={formData.sellPerishables}
                onCheckedChange={(checked) => handleInputChange("sellPerishables", checked)}
              />
              <Label htmlFor="sellPerishables">Do you sell perishable items that require freshness monitoring?</Label>
            </div>

            <Button type="submit" className="w-full bg-[#FF7F50] hover:bg-[#FF6347] text-white">
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

