"use client"

import { useState } from "react"
import { Heart, TrendingUp, TrendingDown, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CryptoChart } from "@/components/crypto-chart"
import Link from "next/link"
import type { CoinMarketCapCoinData } from "@/lib/coinmarketcap"

interface CryptoRankingsProps {
  cryptos: CoinMarketCapCoinData[]
}

export function CryptoRankings({ cryptos }: CryptoRankingsProps) {
  const [activeTab, setActiveTab] = useState("all-time")
  const [searchTerm, setSearchTerm] = useState("")
  const [votes, setVotes] = useState<Record<number, number>>({})
  const [voted, setVoted] = useState<Record<number, boolean>>({})

  // Initialize random votes for each crypto
  const getVotes = (id: number) => {
    if (votes[id] === undefined) {
      // Generate random votes, with higher ranked coins generally having more votes
      const rank = cryptos.find((c) => c.id === id)?.cmc_rank || 50
      const baseVotes = Math.max(100, 5000 - rank * 50)
      const randomFactor = Math.random() * 0.5 + 0.75 // 0.75 to 1.25
      votes[id] = Math.floor(baseVotes * randomFactor)
    }
    return votes[id]
  }

  const handleVote = (id: number) => {
    setVoted((prev) => {
      const newVoted = { ...prev }
      newVoted[id] = !newVoted[id]
      return newVoted
    })

    setVotes((prev) => {
      const newVotes = { ...prev }
      newVotes[id] = (newVotes[id] || getVotes(id)) + (voted[id] ? -1 : 1)
      return newVotes
    })
  }

  // Sort cryptos by votes (for all-time) or by 24h/7d change
  const getSortedCryptos = () => {
    const filtered = cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return [...filtered].sort((a, b) => {
      if (activeTab === "all-time") {
        return getVotes(b.id) - getVotes(a.id)
      } else if (activeTab === "24h") {
        return (b.quote.USD.percent_change_24h || 0) - (a.quote.USD.percent_change_24h || 0)
      } else {
        // 7d
        return (b.quote.USD.percent_change_7d || 0) - (a.quote.USD.percent_change_7d || 0)
      }
    })
  }

  const sortedCryptos = getSortedCryptos()

  return (
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

        <div className="grid grid-cols-1 gap-4">
          {sortedCryptos.slice(0, 3).map((crypto, index) => {
            const isPositive = (crypto.quote.USD.percent_change_24h || 0) >= 0
            return (
              <div
                key={crypto.id}
                className="flex flex-col md:flex-row items-stretch gap-4 p-4 rounded-lg border border-gray-800 bg-gray-800/30"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      index === 0
                        ? "bg-gradient-to-br from-yellow-500 to-amber-300 text-yellow-900"
                        : index === 1
                          ? "bg-gradient-to-br from-gray-400 to-gray-300 text-gray-800"
                          : "bg-gradient-to-br from-amber-700 to-amber-500 text-amber-100"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">{crypto.name}</h3>
                      <span className="text-sm text-gray-400">{crypto.symbol}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-medium">
                        $
                        {crypto.quote.USD.price < 1
                          ? crypto.quote.USD.price.toFixed(6)
                          : crypto.quote.USD.price.toFixed(2)}
                      </span>
                      <Badge variant={isPositive ? "success" : "destructive"} className="flex items-center gap-1">
                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {(crypto.quote.USD.percent_change_24h || 0).toFixed(2)}%
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                  <div className="w-full md:w-48 h-16">
                    <CryptoChart
                      isPositive={
                        crypto.quote.USD.percent_change_7d ? crypto.quote.USD.percent_change_7d > 0 : isPositive
                      }
                    />
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <div className="flex items-center gap-1 text-red-400">
                      <Heart className={`h-5 w-5 ${voted[crypto.id] ? "fill-red-500" : ""}`} />
                      <span className="text-lg font-bold">{getVotes(crypto.id).toLocaleString()}</span>
                    </div>
                    <span className="text-sm text-gray-400">votes</span>
                  </div>

                  <Button
                    className="w-full md:w-auto bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleVote(crypto.id)}
                  >
                    {voted[crypto.id] ? "Voted" : "Vote Now"}
                  </Button>
                </div>
              </div>
            )
          })}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {sortedCryptos.slice(3, 21).map((crypto, index) => {
              const isPositive = (crypto.quote.USD.percent_change_24h || 0) >= 0
              return (
                <Card key={crypto.id} className="border-gray-800 bg-gray-900/50 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium">
                        {index + 4}
                      </div>
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-xs text-gray-400">{crypto.symbol}</div>
                      </div>
                      <Badge
                        variant={isPositive ? "success" : "destructive"}
                        className="ml-auto flex items-center gap-1"
                      >
                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {(crypto.quote.USD.percent_change_24h || 0).toFixed(2)}%
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold">
                        $
                        {crypto.quote.USD.price < 1
                          ? crypto.quote.USD.price.toFixed(6)
                          : crypto.quote.USD.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 text-red-400">
                        <Heart className={`h-4 w-4 ${voted[crypto.id] ? "fill-red-500" : ""}`} />
                        <span className="font-medium">{getVotes(crypto.id).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="h-16 mb-3">
                      <CryptoChart
                        isPositive={
                          crypto.quote.USD.percent_change_7d ? crypto.quote.USD.percent_change_7d > 0 : isPositive
                        }
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" variant="outline" onClick={() => handleVote(crypto.id)}>
                        {voted[crypto.id] ? "Voted" : "Vote"}
                      </Button>
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={`/crypto/${crypto.id}`}>Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
