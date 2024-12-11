'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function CustomerOnboarding() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    healthGoal: '',
    dietaryPreference: '',
    monthlyBudget: '',
    nutrientPriority: '',
    allergies: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  // const handleAllergiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const allergy = e.target.value
  //   setFormData(prevState => ({
  //     ...prevState,
  //     allergies: e.target.checked
  //       ? [...prevState.allergies, allergy]
  //       : prevState.allergies.filter(a => a !== allergy)
  //   }))
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    // For now, we'll just store it in localStorage
    localStorage.setItem('customerProfile', JSON.stringify(formData))
    router.push('/dashboard/customer')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white/10 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className={cn("text-3xl text-center", playfair.className)}>
            Welcome to SmartVision! Let's personalize your experience.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="healthGoal">What is your primary health goal?</Label>
              <Select name="healthGoal" onValueChange={(value) => handleSelectChange("healthGoal", value)}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select a health goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weightLoss">Weight loss</SelectItem>
                  <SelectItem value="muscleGain">Muscle gain</SelectItem>
                  <SelectItem value="maintainingFitness">Maintaining fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietaryPreference">Do you follow any dietary preferences or restrictions?</Label>
              <Select name="dietaryPreference" onValueChange={(value) => handleSelectChange("dietaryPreference", value)}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select a dietary preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="glutenFree">Gluten-free</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyBudget">What is your estimated monthly grocery budget?</Label>
              <Input
                type="number"
                id="monthlyBudget"
                name="monthlyBudget"
                placeholder="Enter amount"
                onChange={handleInputChange}
                className="bg-white/20 border-white/30 text-white placeholder-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nutrientPriority">Do you want to prioritize any specific nutrients in your diet?</Label>
              <RadioGroup name="nutrientPriority" onValueChange={(value) => handleSelectChange("nutrientPriority", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="protein" id="protein" />
                  <Label htmlFor="protein">Protein</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lowCarbs" id="lowCarbs" />
                  <Label htmlFor="lowCarbs">Low Carbs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="highFiber" id="highFiber" />
                  <Label htmlFor="highFiber">High Fiber</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Do you have any allergies or foods to avoid?</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Fish'].map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={allergy}
                      name="allergies"
                      value={allergy}
                      // onChange={handleAllergiesChange}
                      className="form-checkbox h-4 w-4 text-[#FF7F50] transition duration-150 ease-in-out"
                    />
                    <Label htmlFor={allergy}>{allergy}</Label>
                  </div>
                ))}
              </div>
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

