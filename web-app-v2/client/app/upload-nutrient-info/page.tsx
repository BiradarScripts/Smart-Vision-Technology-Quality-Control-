'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Camera, Upload, ArrowRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import SnowAnimation from '@/components/SnowAnimation'
import { Navbar } from '@/components/Navbar'

const playfair = Playfair_Display({ subsets: ["latin"] })

interface NutrientInfo {
  id: string
  name: string
  category: string
  nutrients: string
  ingredients: string
}

const parseAnalysis = (analysis: string): Omit<NutrientInfo, 'id'> => {
  const lines = analysis.split('\n').filter(line => line.trim() !== "")
  const result: Partial<NutrientInfo> = {}
  
  lines.forEach(line => {
    const [key, ...valueParts] = line.split(':')
    const value = valueParts.join(':').trim()
    
    switch (key.trim().toLowerCase()) {
      case 'item name':
        result.name = value
        break
      case 'item category':
        result.category = value
        break
      case 'item nutrients':
        result.nutrients = value
        break
      case 'item ingredients':
        result.ingredients = value
        break
    }
  })

  return result as Omit<NutrientInfo, 'id'>
}

function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export default function UploadNutrientInfoPage() {
  const [image, setImage] = useState<string | null>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const router = useRouter()

  const handleImageFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result as string
      setImage(imageData)
      localStorage.setItem('uploadedImage', imageData)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file)
    }
  }

  const startCamera = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setIsCameraOpen(true)
      setError(null)
    } catch (error) {
      console.error('Error accessing camera:', error)
      setError('Failed to access the camera. Please make sure you have given permission and try again.')
    }
  }, [])

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        const capturedImage = canvasRef.current.toDataURL('image/jpeg')
        setImage(capturedImage)
        localStorage.setItem('uploadedImage', capturedImage)
        setIsCameraOpen(false)
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
        }
      }
    }
  }

  const handleContinue = async () => {
    if (image) {
      setIsLoading(true)
      try {
        const formData = new FormData()
        formData.append('file', dataURItoBlob(image))
        formData.append('key', 'Front packet')
        formData.append('another_key', 'dsfgs')

        const response = await fetch('http://127.0.0.1:8000/api/Brand-Content', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Failed to analyze image')
        }

        const result = await response.json()
        const parsedInfo = parseAnalysis(result.analysis)
        console.log(result.analysis)
        const nutrientInfo: NutrientInfo = {
          id: Date.now().toString(),
          ...parsedInfo
        }

        localStorage.setItem('nutrientInfo', JSON.stringify(nutrientInfo))
        router.push('/nutrient-info')
      } catch (error) {
        console.error('Error analyzing image:', error)
        setError('Failed to analyze the image. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (isCameraOpen) {
      startCamera()
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [isCameraOpen, startCamera])

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] flex flex-col">
      {/* <Navbar /> */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className={cn("text-4xl font-bold text-white mb-12", playfair.className)}>
          Nutrient Information
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-8 max-w-md">
            {error}
          </div>
        )}

        {isCameraOpen ? (
          <div className="space-y-6">
            <div className="relative w-[500px] h-[400px] rounded-lg overflow-hidden bg-black">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <Button
              onClick={handleCapture}
              className="w-full bg-[#FF7F50] text-white hover:bg-[#FF6347]"
            >
              Capture
            </Button>
          </div>
        ) : (
          <div className="space-y-6 w-full max-w-[500px]">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/30 rounded-lg aspect-[5/4] flex flex-col items-center justify-center p-8 bg-white/5 hover:border-white transition-colors duration-300 cursor-pointer group"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {image ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={image} 
                    alt="Uploaded image" 
                    layout="fill" 
                    objectFit="contain"
                  />
                </div>
              ) : (
                <>
                  <Camera className="w-16 h-16 text-white/50 mb-4 group-hover:text-white/70 transition-colors" />
                  <p className="text-white/70 text-center group-hover:text-white transition-colors">
                    Click or drag to upload an image
                  </p>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-[#FF7F50] text-white hover:bg-[#FF6347]"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Image(s)
                </Button>
                <Button
                  onClick={() => setIsCameraOpen(true)}
                  className="flex-1 bg-[#FF7F50] text-white hover:bg-[#FF6347]"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Capture
                </Button>
              </div>

              {image && (
                <Button 
                  onClick={handleContinue}
                  className="w-full bg-[#FF7F50] text-white hover:bg-[#FF6347]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Analyzing...' : 'Continue'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>

            <Link 
              href="/docs/nutrient-info"
              className="block w-full"
            >
              <Button 
                variant="ghost" 
                className="w-full text-white hover:bg-white/10"
              >
                Learn More About Nutrient Information
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  )
}

