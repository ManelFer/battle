"use client"

import { useState } from "react"
import { Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CryptoCard } from "@/components/crypto-card"
import { TopGainers } from "@/components/top-gainers"
import { TopVoted } from "@/components/top-voted"
import { Carousel } from "@/components/carousel"
import type { CoinMarketCapCoinData } from "@/lib/coinmarketcap"

interface DashboardViewProps {
  topCryptos: CoinMarketCapCoinData[]
}

export function DashboardView({ topCryptos = [] }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-400">Welcome to CryptoAnalysis - your hub for crypto insights and voting</p>
      </div>

      <Carousel />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TopGainers cryptos={topCryptos} />
        <TopVoted />
        <Card className="bg-gradient-to-br from-amber-900/20 to-amber-600/20 border-amber-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <span>Top Fame</span>
            </CardTitle>
            <CardDescription>Most popular cryptocurrencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center text-xs font-bold">
                      {i}
                    </div>
                    <div>
                      <div className="font-medium">Fame Coin {i}</div>
                      <div className="text-xs text-gray-400">FCN</div>
                    </div>
                  </div>
                  <div className="text-amber-400 font-medium">{Math.floor(Math.random() * 10000)} fans</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-gray-800">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
            className={activeTab === "overview" ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "trending" ? "default" : "ghost"}
            onClick={() => setActiveTab("trending")}
            className={activeTab === "trending" ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            Trending
          </Button>
          <Button
            variant={activeTab === "new" ? "default" : "ghost"}
            onClick={() => setActiveTab("new")}
            className={activeTab === "new" ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            New Listings
          </Button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCryptos.slice(0, 6).map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
