"use client"

import { useState } from "react"
import { Heart, ExternalLink, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CryptoChart } from "@/components/crypto-chart"
import Link from "next/link"
import type { CoinMarketCapCoinData } from "@/lib/coinmarketcap"

interface CryptoCardProps {
  id?: number
  crypto?: CoinMarketCapCoinData
}

export function CryptoCard({ id, crypto }: CryptoCardProps) {
  const [liked, setLiked] = useState(false)
  const [votes, setVotes] = useState(Math.floor(Math.random() * 1000))

  // If we have a crypto object, use its data, otherwise use mock data
  const cryptoId = crypto?.id || id || 1
  const name = crypto?.name || `Crypto ${id}`
  const symbol = crypto?.symbol || `CRY${id}`
  const price = crypto?.quote.USD.price.toFixed(crypto.quote.USD.price < 1 ? 6 : 2) || (Math.random() * 1000).toFixed(2)
  const percentChange = crypto?.quote.USD.percent_change_24h?.toFixed(2) || (Math.random() * 10).toFixed(2)
  const isPositive = crypto ? (crypto.quote.USD.percent_change_24h || 0) >= 0 : Math.random() > 0.5

  const handleVote = () => {
    if (!liked) {
      setVotes(votes + 1)
    } else {
      setVotes(votes - 1)
    }
    setLiked(!liked)
  }

  return (
    <Card className="overflow-hidden border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center text-xs font-bold">
              {symbol.substring(0, 2)}
            </div>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-xs text-gray-400">{symbol}</div>
            </div>
          </div>
          <Badge variant={isPositive ? "success" : "destructive"} className="flex items-center gap-1">
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {percentChange}%
          </Badge>
        </div>

        <div className="text-2xl font-bold mb-2">${price}</div>

        <div className="h-24 mb-2">
          <CryptoChart isPositive={isPositive} />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4 bg-gray-950/50 border-t border-gray-800">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={handleVote}>
          <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          <span>{votes}</span>
        </Button>

        <Button variant="outline" size="sm" className="gap-1" asChild>
          <Link href={`/crypto/${cryptoId}`}>
            <span>Details</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
