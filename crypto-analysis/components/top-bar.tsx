"use client"

import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useState, useEffect } from "react"

export function TopBar() {
  const [adIndex, setAdIndex] = useState(0)

  const ads = [
    "🔥 New Token Launch: CryptoX - Join the presale now!",
    "💰 Earn 10% APY on your crypto with StakeMax",
    "🚀 BitRocket exchange - 0% fees for new users",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % ads.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [ads.length])

  return (
    <div className="border-b border-gray-800 bg-black/50 backdrop-blur-md p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-gray-400 hover:text-white" />
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search cryptocurrencies..."
            className="pl-8 bg-gray-900 border-gray-800 focus-visible:ring-purple-500"
          />
        </div>
      </div>

      <div className="hidden md:block flex-1 max-w-2xl mx-4">
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-md p-2 text-center text-sm font-medium text-gray-200 border border-gray-800">
          {ads[adIndex]}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
