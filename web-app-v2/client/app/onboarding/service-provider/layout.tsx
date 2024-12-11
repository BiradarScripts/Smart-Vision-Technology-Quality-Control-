import { ReactNode } from 'react'
import { Progress } from "@/components/ui/progress"

export default function ServiceProviderOnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] flex flex-col">
      <Progress value={33} className="w-full" />
      <main className="flex-grow flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  )
}

