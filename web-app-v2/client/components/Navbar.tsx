"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Playfair_Display } from 'next/font/google'
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown } from 'lucide-react'
import NavLink from "./NavLink"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const playfair = Playfair_Display({ subsets: ["latin"] })

export function Navbar() {
  const [userType, setUserType] = useState<'customer' | 'service-provider' | null>(null)

  useEffect(() => {
    const customerProfile = localStorage.getItem('customerProfile')
    const serviceProviderProfile = localStorage.getItem('serviceProviderProfile')
    if (customerProfile) {
      setUserType('customer')
    } else if (serviceProviderProfile) {
      setUserType('service-provider')
    }
  }, [])

  const features = [
    { name: 'Brand Detection', href: '/upload-brand-detection' },
    { name: 'Expiry Detection', href: '/upload-expiry-detection' },
    { name: 'Freshness Detection', href: '/upload-freshness-detection' },
    { name: 'Nutrient Info', href: '/upload-nutrient-info' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full py-4 px-4 bg-gradient-to-r from-emerald-800 to-green-600 shadow-lg">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link href="/" className={cn("text-2xl font-bold text-white hover:text-amber-300 transition-colors duration-300 whitespace-nowrap", playfair.className)}>
          SmartVision    
        </Link>
        <nav className="hidden lg:flex items-center space-x-4">
          {features.map((feature) => (
            <NavLink 
              key={feature.name} 
              href={feature.href} 
              name={feature.name}
            />
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="text-white hover:text-amber-300 transition-colors duration-300 h-10 px-2">
                Dashboard <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white rounded-md shadow-lg">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/customer" className="text-emerald-800 hover:bg-emerald-100 transition-colors duration-200 rounded-sm">
                  Customer Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/service-provider" className="text-emerald-800 hover:bg-emerald-100 transition-colors duration-200 rounded-sm">
                  Service Provider Dashboard
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex space-x-3">
            <Link href="/onboarding/customer/1">
              <Button variant="secondary" className="rounded-full text-emerald-800 bg-white hover:bg-amber-300 hover:text-white font-medium px-6 py-2 h-10 text-sm transition-all duration-300 transform hover:scale-105 shadow-md whitespace-nowrap">
                Customer Onboarding
              </Button>
            </Link>
            <Link href="/onboarding/service-provider/1">
              <Button variant="secondary" className="rounded-full text-emerald-800 bg-white hover:bg-amber-300 hover:text-white font-medium px-6 py-2 h-10 text-sm transition-all duration-300 transform hover:scale-105 shadow-md whitespace-nowrap">
                Service Provider Onboarding
              </Button>
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-700 lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-70 bg-white rounded-md shadow-lg">
              {features.map((feature) => (
                <DropdownMenuItem key={feature.name} asChild>
                  <Link href={feature.href} className="text-emerald-800 hover:bg-emerald-100 transition-colors duration-200 rounded-sm">{feature.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/dashboard/customer" className="text-emerald-800 hover:bg-emerald-100 transition-colors duration-200 rounded-sm">Customer Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/service-provider" className="text-emerald-800 hover:bg-emerald-100 transition-colors duration-200 rounded-sm">Service Provider Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/onboarding/customer/1" className="text-emerald-800 hover:bg-emerald-100 transition-colors duration-200 rounded-sm">Customer Onboarding</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/onboarding/service-provider/1" className="text-emerald-800 hover:bg-emerald-100 transition-colors duration-200 rounded-sm">Service Provider Onboarding</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

