'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function CustomerOnboardingSummary() {
  const router = useRouter()
  const [profile, setProfile] = useState({
    healthGoal: '',
    dietaryPreference: '',
    monthlyBudget: '',
  })

  useEffect(() => {
    setProfile({
      healthGoal: localStorage.getItem('healthGoal') || '',
      dietaryPreference: localStorage.getItem('dietaryPreference') || '',
      monthlyBudget: localStorage.getItem('monthlyBudget') || '',
    })
  }, [])

  const handleComplete = () => {
    // Here you would typically send the data to your backend
    console.log(profile)
    // For now, we'll just store it in localStorage
    localStorage.setItem('customerProfile', JSON.stringify(profile))
    router.push('/dashboard/customer')
  }

  const handleBack = () => {
    router.push('/onboarding/customer/3')
  }

  return (
    <div className="w-full max-w-lg animate-fade-in-up">
      <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className={cn("text-3xl text-center", playfair.className)}>
            Summary of Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p><strong>Health Goal:</strong> {profile.healthGoal}</p>
            <p><strong>Dietary Preference:</strong> {profile.dietaryPreference}</p>
            <p><strong>Monthly Budget:</strong> ${profile.monthlyBudget}</p>
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
              onClick={handleComplete} 
              className="bg-[#FF7F50] hover:bg-[#FF6347] text-white"
            >
              Complete Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

