import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import { Package } from 'lucide-react'

const playfair = Playfair_Display({ subsets: ["latin"] })

interface TotalCountDisplayProps {
  totalCount: number
}

export function TotalCountDisplay({ totalCount }: TotalCountDisplayProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-none text-white mb-8 overflow-hidden">
      <CardHeader className="bg-[#FF7F50]/10">
        <CardTitle className={cn("text-2xl flex items-center gap-2", playfair.className)}>
          <Package className="w-6 h-6" />
          Total Item Count
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="text-8xl font-bold text-[#FF7F50] animate-pulse">
            {totalCount}
          </div>
        </div>
        <div className="mt-4 text-center text-lg">
          Total number of items detected across all brands
        </div>
      </CardContent>
    </Card>
  )
}

