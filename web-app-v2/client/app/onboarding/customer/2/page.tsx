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

export default function CustomerOnboardingStep2() {
  const router = useRouter()
  const [dietaryPreference, setDietaryPreference] = useState('')

  const handleNext = () => {
    if (dietaryPreference) {
      localStorage.setItem('dietaryPreference', dietaryPreference)
      router.push('/onboarding/customer/3')
    }
  }

  const handleBack = () => {
    router.push('/onboarding/customer/1')
  }

  return (
    <div className="w-full max-w-lg animate-fade-in-up">
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className={cn("text-3xl text-center", playfair.className)}>
            Do you follow any dietary preferences?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dietaryPreference">Select your preference</Label>
            <Select value={dietaryPreference} onValueChange={setDietaryPreference}>
              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Select a dietary preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="paleo">Paleo</SelectItem>
                <SelectItem value="glutenFree">Gluten-free</SelectItem>
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
              disabled={!dietaryPreference}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

