import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import { Button } from "@/components/ui/button"
import Link from "next/link"

const playfair = Playfair_Display({ subsets: ["latin"] })

export function FeatureCard({
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

