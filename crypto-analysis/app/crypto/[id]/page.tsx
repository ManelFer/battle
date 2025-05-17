import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Twitter, TrendingUp, TrendingDown, Globe, Clock, Coins, Users, BarChart3 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CryptoDetailChart } from "@/components/crypto-detail-chart"
import { CryptoVoteButton } from "@/components/crypto-vote-button"
import { getTopCryptocurrencies, generateMockCryptoData } from "@/lib/coinmarketcap"

export default async function CryptoDetailPage({ params }: { params: { id: string } }) {
  // Try to fetch real data, but fall back to mock data if needed
  const cryptos = await getTopCryptocurrencies(100)
  let crypto = cryptos.find((c) => c.id.toString() === params.id)

  // If not found in the API data, generate a specific mock crypto
  if (!crypto) {
    const mockCryptos = generateMockCryptoData(100)
    crypto = mockCryptos.find((c) => c.id.toString() === params.id) || mockCryptos[0]
  }

  const isPositive = (crypto.quote.USD.percent_change_24h || 0) >= 0

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center text-2xl font-bold">
              {crypto.symbol.substring(0, 2)}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{crypto.name}</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="font-medium">{crypto.symbol}</span>
                <Badge variant="outline" className="font-mono text-xs">
                  Rank #{crypto.cmc_rank}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <CryptoVoteButton id={crypto.id} initialVotes={Math.floor(Math.random() * 1000) + 100} />
            <Button variant="outline" className="gap-2 bg-gray-800 border-gray-700">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    $
                    {crypto.quote.USD.price < 1 ? crypto.quote.USD.price.toFixed(6) : crypto.quote.USD.price.toFixed(2)}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Badge variant={isPositive ? "success" : "destructive"} className="flex items-center gap-1">
                      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {(crypto.quote.USD.percent_change_24h || 0).toFixed(2)}%
                    </Badge>
                    <span className="text-gray-400">24h</span>
                  </CardDescription>
                </div>

                <Tabs defaultValue="1D" className="w-auto">
                  <TabsList className="bg-gray-800">
                    <TabsTrigger value="1D">1D</TabsTrigger>
                    <TabsTrigger value="7D">7D</TabsTrigger>
                    <TabsTrigger value="1M">1M</TabsTrigger>
                    <TabsTrigger value="1Y">1Y</TabsTrigger>
                    <TabsTrigger value="ALL">ALL</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <CryptoDetailChart isPositive={isPositive} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>About {crypto.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-gray-300">
                {crypto.name} ({crypto.symbol}) is a cryptocurrency with a current price of $
                {crypto.quote.USD.price < 1 ? crypto.quote.USD.price.toFixed(6) : crypto.quote.USD.price.toFixed(2)}. It
                has a market cap of $
                {crypto.quote.USD.market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 })} and a 24-hour
                trading volume of ${crypto.quote.USD.volume_24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                .
              </div>

              <div>
                <h3 className="mb-3 font-medium">Links</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="gap-2 bg-gray-800 border-gray-700" asChild>
                    <a
                      href={`https://coinmarketcap.com/currencies/${crypto.slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="h-4 w-4" />
                      <span>CoinMarketCap</span>
                    </a>
                  </Button>

                  <Button variant="outline" size="sm" className="gap-2 bg-gray-800 border-gray-700" asChild>
                    <a
                      href={`https://twitter.com/search?q=%24${crypto.symbol}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Market Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <BarChart3 className="h-4 w-4" />
                    <span>Market Cap</span>
                  </div>
                  <span className="font-medium">
                    ${crypto.quote.USD.market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <BarChart3 className="h-4 w-4" />
                    <span>24h Volume</span>
                  </div>
                  <span className="font-medium">
                    ${crypto.quote.USD.volume_24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Coins className="h-4 w-4" />
                    <span>Circulating Supply</span>
                  </div>
                  <span className="font-medium">
                    {crypto.circulating_supply.toLocaleString(undefined, { maximumFractionDigits: 0 })} {crypto.symbol}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Coins className="h-4 w-4" />
                    <span>Max Supply</span>
                  </div>
                  <span className="font-medium">
                    {crypto.max_supply
                      ? crypto.max_supply.toLocaleString(undefined, { maximumFractionDigits: 0 })
                      : "∞"}{" "}
                    {crypto.symbol}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Added</span>
                  </div>
                  <span className="font-medium">
                    {crypto.date_added ? new Date(crypto.date_added).toLocaleDateString() : "Unknown"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Price Change</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>1h</span>
                  </div>
                  <span
                    className={`font-medium ${(crypto.quote.USD.percent_change_1h || 0) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {(crypto.quote.USD.percent_change_1h || 0).toFixed(2)}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>24h</span>
                  </div>
                  <span
                    className={`font-medium ${(crypto.quote.USD.percent_change_24h || 0) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {(crypto.quote.USD.percent_change_24h || 0).toFixed(2)}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>7d</span>
                  </div>
                  <span
                    className={`font-medium ${(crypto.quote.USD.percent_change_7d || 0) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {(crypto.quote.USD.percent_change_7d || 0).toFixed(2)}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>30d</span>
                  </div>
                  <span
                    className={`font-medium ${(crypto.quote.USD.percent_change_30d || 0) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {(crypto.quote.USD.percent_change_30d || 0).toFixed(2)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Heart className="h-4 w-4" />
                    <span>Total Votes</span>
                  </div>
                  <span className="font-medium">{Math.floor(Math.random() * 1000) + 100}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>Watchlists</span>
                  </div>
                  <span className="font-medium">{Math.floor(Math.random() * 5000) + 500}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>Rank</span>
                  </div>
                  <span className="font-medium">#{crypto.cmc_rank}</span>
                </div>
              </div>

              <CryptoVoteButton id={crypto.id} initialVotes={Math.floor(Math.random() * 1000) + 100} fullWidth />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
