'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function CustomerOnboardingStep3() {
  const router = useRouter()
  const [monthlyBudget, setMonthlyBudget] = useState('')

  const handleNext = () => {
    if (monthlyBudget) {
      localStorage.setItem('monthlyBudget', monthlyBudget)
      router.push('/onboarding/customer/summary')
    }
  }

  const handleBack = () => {
    router.push('/onboarding/customer/2')
  }

  return (
    <div className="w-full max-w-lg animate-fade-in-up">
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className={cn("text-3xl text-center", playfair.className)}>
            What is your estimated monthly grocery budget?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="monthlyBudget">Monthly Budget</Label>
            <Input
              type="number"
              id="monthlyBudget"
              placeholder="Enter amount"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder-white/50"
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
              disabled={!monthlyBudget}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

