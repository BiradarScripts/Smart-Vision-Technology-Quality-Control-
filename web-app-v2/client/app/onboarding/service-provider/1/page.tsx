'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function ServiceProviderOnboardingStep1() {
  const router = useRouter()
  const [inventorySize, setInventorySize] = useState('')

  const handleNext = () => {
    if (inventorySize) {
      localStorage.setItem('inventorySize', inventorySize)
      router.push('/onboarding/service-provider/2')
    }
  }

  return (
    <div className="w-full max-w-lg animate-fade-in-up">
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className={cn("text-3xl text-center", playfair.className)}>
            What is the size of your inventory?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="inventorySize">Select inventory size</Label>
            <Select value={inventorySize} onValueChange={setInventorySize}>
              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Select inventory size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (Less than 1000 items)</SelectItem>
                <SelectItem value="medium">Medium (1000 - 10,000 items)</SelectItem>
                <SelectItem value="large">Large (10,000 - 100,000 items)</SelectItem>
                <SelectItem value="enterprise">Enterprise (Over 100,000 items)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleNext} 
            className="w-full bg-[#FF7F50] hover:bg-[#FF6347] text-white"
            disabled={!inventorySize}
          >
            Next
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

