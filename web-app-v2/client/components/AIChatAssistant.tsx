'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, X } from 'lucide-react'
// @ts-ignore
import { GoogleGenerativeAI } from "@google/generative-ai"
// import { NutrientInfo } from '@/app/nutrient-info/page'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AIChatAssistantProps {
  pageType: 'brand' | 'expiry' | 'freshness'
  data: any
  onOpenChange: (isOpen: boolean) => void
}

export function AIChatAssistant({ pageType, data, onOpenChange }: AIChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    onOpenChange(isOpen)
  }, [isOpen, onOpenChange])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const genAI = new GoogleGenerativeAI('AIzaSyBZQJcXPIkBVR0CnTbDc4UqwqHrisaQomE')
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      let prompt = `You are an AI assistant for a ${pageType} detection system. `
      prompt += `Given the following ${pageType} information: \n${JSON.stringify(data, null, 2)}\n`
      prompt += `Please answer the following question: ${input}`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const assistantMessage: Message = { role: 'assistant', content: text }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      const errorMessage: Message = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div ref={chatRef} className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-96 h-[600px] bg-white/10 backdrop-blur-lg border border-white/20 text-white overflow-hidden flex flex-col shadow-lg rounded-lg transition-all duration-300 ease-in-out">
          <CardHeader className="bg-[#FF7F50]/80 py-3 px-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-[#FF6347]/50 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow overflow-hidden p-4">
            <ScrollArea className="flex-grow mb-4 pr-4 overflow-y-auto" ref={scrollAreaRef}>
              {messages.map((message, index) => (
                <div key={index} className={`mb-3 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-[#FF7F50] text-white' 
                      : 'bg-white/20 text-white'
                  } max-w-[80%] break-words`}>
                    {message.content}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="text-left">
                  <span className="inline-block p-3 rounded-lg bg-white/20 text-white">
                    Thinking...
                  </span>
                </div>
              )}
            </ScrollArea>
            <div className="flex mt-auto">
              <Input
                type="text"
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-grow mr-2 bg-white/20 text-white placeholder-white/50 border-white/30 focus:border-[#FF7F50] transition-colors duration-200"
              />
              <Button 
                onClick={handleSend} 
                className="bg-[#FF7F50] hover:bg-[#FF6347] transition-colors duration-200"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          className="rounded-full w-14 h-14 bg-[#FF7F50] hover:bg-[#FF6347] text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}