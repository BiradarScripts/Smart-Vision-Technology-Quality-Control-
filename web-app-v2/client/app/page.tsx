import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowRight, Camera, Calendar, BarChart3, Leaf, Search, Github, Twitter, Linkedin } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import { SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function Page() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] flex flex-col">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-114.5 560.5C80.5 427.5 284.5 755 573.5 755C862.5 755 1100.5 498.5 1309 498.5C1517.5 498.5 1544.5 668 1544.5 668" stroke="#FF7F50" strokeOpacity="0.1" strokeWidth="2"/>
          <path d="M-114.5 300.5C80.5 167.5 284.5 495 573.5 495C862.5 495 1100.5 238.5 1309 238.5C1517.5 238.5 1544.5 408 1544.5 408" stroke="#FF7F50" strokeOpacity="0.1" strokeWidth="2"/>
          <circle cx="1300" cy="100" r="20" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="100" cy="700" r="50" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="1200" cy="600" r="30" fill="#FF7F50" fillOpacity="0.05"/>
        </svg>
      </div>

      {/* Header */}
      

      {/* Main Content */}
      <main className="relative px-8 py-20 flex-grow">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className={cn("text-6xl font-bold text-white leading-tight", playfair.className)}>
            Intelligent Vision Processing
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto p-5">
            Our core philosophy isn't just about detection; we believe in providing accurate, 
            real-time, and reliable vision processing solutions for your business needs.
          </p>
          <Link href="/docs">
          <Button className="rounded-full bg-[#FF7F50] text-white hover:bg-[#FF6347] px-8 py-6 text-lg font-medium transition-colors duration-300">
            Explore Features <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          </Link>

      
        </div>

        {/* Feature Cards */}
        <div className="max-w-6xl mx-auto mt-24 relative">
          {/* Decorative circles */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 border-2 border-[#FF7F50]/10 rounded-full" />
              <div className="absolute inset-8 border-2 border-[#FF7F50]/10 rounded-full" />
              <div className="absolute inset-16 border-2 border-[#FF7F50]/10 rounded-full" />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              title="Brand Detection"
              description="High-speed brand recognition using live camera feed with 95% accuracy and bulk detection capability."
              icon={<Camera className="h-6 w-6" />}
              feature="brand-detection"
            />
            <FeatureCard
              title="Expiry Detection"
              description="98% accurate date extraction supporting multiple formats and variations including 'Best Before' and 'Use By'."
              icon={<Calendar className="h-6 w-6" />}
              feature="expiry-detection"
            />
            <FeatureCard
              title="Nutrient Info"
              description="Detailed nutritional information analysis for food items, including calories, macronutrients, and vitamins."
              icon={<BarChart3 className="h-6 w-6" />}
              feature="nutrient-info"
            />
            <FeatureCard
              title="Freshness Detection"
              description="Multi-factor freshness assessment using real-world training data and comprehensive computational logic."
              icon={<Leaf className="h-6 w-6" />}
              feature="freshness-detection"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative w-full py-12 px-8 bg-[#083D23]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className={cn("text-xl font-semibold text-white", playfair.className)}>SmartVision</h3>
            <p className="text-white/70 text-sm">Intelligent vision processing solutions for your business needs.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Products', 'Features', 'Pricing', 'About Us'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-white/70 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'API Reference', 'Blog', 'Case Studies'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <Link href="https://github.com/smartvision" className="text-white/70 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://twitter.com/smartvision" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="https://linkedin.com/company/smartvision" className="text-white/70 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          © 2024 SmartVision. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  icon,
  feature,
}: {
  title: string
  description: string
  icon: React.ReactNode
  feature: string
}) {
  return (
    <div className="group relative rounded-3xl p-8 transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#FF7F50]/30">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-full bg-[#FF7F50]/20 text-[#FF7F50]">
            {icon}
          </div>
          <h3 className={cn("text-2xl font-semibold text-white", playfair.className)}>{title}</h3>
        </div>
        <p className="text-white/70 text-base leading-relaxed">
          {description}
        </p>
        <Link href={`/upload-${feature}`}>
          <Button 
            className="w-full rounded-full bg-[#FF7F50] text-white hover:bg-[#FF6347] font-medium transition-colors duration-300"
          >
            Try it now
          </Button>
        </Link>
      </div>
    </div>
  )
}