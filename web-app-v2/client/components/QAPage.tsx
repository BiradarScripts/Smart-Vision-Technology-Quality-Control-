"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const playfair = Playfair_Display({ subsets: ["latin"] })

interface Question {
  question: string
  answer: string
}

interface QAPageProps {
  questions: Question[]
  pageTitle: string
}

export function QAPage({ questions, pageTitle }: QAPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => 
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    )
  }

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className={cn("text-4xl font-bold text-white mb-8 text-center", playfair.className)}>
          {pageTitle}
        </h1>
        <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
          <CardHeader>
            <CardTitle className={cn("text-2xl", playfair.className)}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl font-semibold">{currentQuestion.question}</p>
            <p className="text-lg">{currentQuestion.answer}</p>
          </CardContent>
        </Card>
        <div className="flex justify-between mt-8">
          <Button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="bg-[#FF7F50] hover:bg-[#FF6347] text-white"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className="bg-[#FF7F50] hover:bg-[#FF6347] text-white"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

