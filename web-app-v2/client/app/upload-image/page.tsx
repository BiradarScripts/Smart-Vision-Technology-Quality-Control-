'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Camera, Upload, ArrowRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function UploadImagePage() {
  const [image, setImage] = useState<string | null>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const router = useRouter()
  const [selectedFeature, setSelectedFeature] = useState<string>('')

  useEffect(() => {
    const feature = localStorage.getItem('selectedFeature')
    if (feature) {
      setSelectedFeature(feature)
    }
  }, [])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target?.result as string
        setImage(imageData)
        storeImageInLocalStorage(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target?.result as string
        setImage(imageData)
        storeImageInLocalStorage(imageData)
      }
      reader.readAsDataURL(file)
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
        storeImageInLocalStorage(capturedImage)
        setIsCameraOpen(false)
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
        }
      }
    }
  }

  const handleContinue = () => {
    if (image) {
      switch (selectedFeature) {
        case 'brand-detection':
          router.push('/brand-detection')
          break
        case 'expiry-detection':
          router.push('/expiry-detection')
          break
        case 'nutrient-info':
          router.push('/nutrient-info')
          break
        case 'freshness-detection':
          router.push('/freshness-detection')
          break
        default:
          router.push('/brand-detection')
      }
    }
  }

  const storeImageInLocalStorage = (imageData: string) => {
    localStorage.setItem('uploadedImage', imageData)
  }

  const getFeatureTitle = () => {
    switch (selectedFeature) {
      case 'brand-detection':
        return 'Brand Detection'
      case 'expiry-detection':
        return 'Expiry Detection'
      case 'nutrient-info':
        return 'Nutrient Information'
      case 'freshness-detection':
        return 'Freshness Detection'
      default:
        return 'Upload Image'
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
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className={cn("text-4xl font-bold text-white mb-12", playfair.className)}>
          {getFeatureTitle()}
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
              className="border-2 border-dashed border-white/30 rounded-lg aspect-[5/4] flex flex-col items-center justify-center p-8 bg-white/5"
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
                  <Camera className="w-16 h-16 text-white/50 mb-4" />
                  <p className="text-white/70 text-center">
                    Click or drag to upload an image
                  </p>
                </>
              )}
            </div>

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
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}

            <Link 
              href={`/docs/${selectedFeature}`}
              className="block w-full"
            >
              <Button 
                variant="ghost" 
                className="w-full text-white hover:bg-white/10"
              >
                Learn More About {getFeatureTitle()}
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
    </div>
  )
}

