import { ArrowUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { CoinMarketCapCoinData } from "@/lib/coinmarketcap"
import Link from "next/link"

interface TopGainersProps {
  cryptos?: CoinMarketCapCoinData[]
}

export function TopGainers({ cryptos = [] }: TopGainersProps) {
  // Sort by percent change 24h (descending)
  const topGainers = [...cryptos]
    .sort((a, b) => (b.quote.USD.percent_change_24h || 0) - (a.quote.USD.percent_change_24h || 0))
    .slice(0, 5)

  return (
    <Card className="bg-gradient-to-br from-green-900/20 to-green-600/20 border-green-800/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <ArrowUp className="h-5 w-5 text-green-500" />
          <span>Top Gainers 24h</span>
        </CardTitle>
        <CardDescription>Highest performing cryptocurrencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topGainers.length > 0
            ? topGainers.map((crypto, index) => (
                <Link
                  key={crypto.id}
                  href={`/crypto/${crypto.id}`}
                  className="flex items-center justify-between hover:bg-green-500/10 p-2 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-xs text-gray-400">{crypto.symbol}</div>
                    </div>
                  </div>
                  <div className="text-green-500 font-medium">
                    +{(crypto.quote.USD.percent_change_24h || 0).toFixed(2)}%
                  </div>
                </Link>
              ))
            : // Fallback to mock data if no real data is available
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-medium">Gain Coin {i + 1}</div>
                      <div className="text-xs text-gray-400">GCN</div>
                    </div>
                  </div>
                  <div className="text-green-500 font-medium">+{(Math.random() * 20).toFixed(2)}%</div>
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  )
}
