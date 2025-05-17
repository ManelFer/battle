"use client"

import { useState } from "react"
import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTopCryptocurrencies } from "@/lib/coinmarketcap"
import { CryptoRankings } from "@/components/crypto-rankings"

export default async function RankingPage() {
  // Fetch crypto data with fallback to mock data if API fails
  const cryptos = await getTopCryptocurrencies(100)
  const [activeTab, setActiveTab] = useState("all-time")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Crypto Rankings</h1>
        <p className="text-gray-400">Top cryptocurrencies by community votes</p>
      </div>

      <Card className="border-gray-800 bg-gray-900/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-auto md:flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search rankings..."
                className="pl-10 bg-gray-800 border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all-time" onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all-time">All Time</TabsTrigger>
                <TabsTrigger value="24h">24h</TabsTrigger>
                <TabsTrigger value="7d">7 Days</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button variant="outline" className="w-full md:w-auto gap-2 bg-gray-800 border-gray-700">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>

          <CryptoRankings cryptos={filteredCryptos} activeTab={activeTab} />
        </CardContent>
      </Card>
    </div>
  )
}
