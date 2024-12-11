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

export default function CustomerOnboardingStep1() {
  const router = useRouter()
  const [healthGoal, setHealthGoal] = useState('')

  const handleNext = () => {
    if (healthGoal) {
      localStorage.setItem('healthGoal', healthGoal)
      router.push('/onboarding/customer/2')
    }
  }

  return (
    <div className="w-full max-w-lg animate-fade-in-up">
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className={cn("text-3xl text-center", playfair.className)}>
            What is your primary health goal?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="healthGoal">Select your goal</Label>
            <Select value={healthGoal} onValueChange={setHealthGoal}>
              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Select a health goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weightLoss">Weight loss</SelectItem>
                <SelectItem value="muscleGain">Muscle gain</SelectItem>
                <SelectItem value="maintainingFitness">Maintaining fitness</SelectItem>
                <SelectItem value="generalHealth">General health improvement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleNext} 
            className="w-full bg-[#FF7F50] hover:bg-[#FF6347] text-white"
            disabled={!healthGoal}
          >
            Next
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

