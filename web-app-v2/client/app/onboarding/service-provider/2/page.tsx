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

export default function ServiceProviderOnboardingStep2() {
  const router = useRouter()
  const [restockFrequency, setRestockFrequency] = useState('')

  const handleNext = () => {
    if (restockFrequency) {
      localStorage.setItem('restockFrequency', restockFrequency)
      router.push('/onboarding/service-provider/3')
    }
  }

  const handleBack = () => {
    router.push('/onboarding/service-provider/1')
  }

  return (
    <div className="w-full max-w-lg animate-fade-in-up">
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className={cn("text-3xl text-center", playfair.className)}>
            How often do you restock your inventory?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="restockFrequency">Select restock frequency</Label>
            <Select value={restockFrequency} onValueChange={setRestockFrequency}>
              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Select restock frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
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
              disabled={!restockFrequency}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

