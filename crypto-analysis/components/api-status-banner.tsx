"use client"

import { useState, useEffect } from "react"
import { AlertCircle, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ApiStatusBannerProps {
  usingMockData: boolean
}

export function ApiStatusBanner({ usingMockData }: ApiStatusBannerProps) {
  const [visible, setVisible] = useState(true)

  // Hide the banner after 10 seconds
  useEffect(() => {
    if (usingMockData) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [usingMockData])

  if (!usingMockData || !visible) return null

  return (
    <Alert variant="warning" className="mb-6 bg-amber-900/20 border-amber-800 text-amber-400">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>API Connection Issue</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>Unable to connect to CoinMarketCap API. Displaying mock data for demonstration purposes.</span>
        <button onClick={() => setVisible(false)} className="p-1 hover:bg-amber-800/20 rounded">
          <X className="h-4 w-4" />
        </button>
      </AlertDescription>
    </Alert>
  )
}
