"use client"

import { useState } from "react"
import { ArrowUpDown, Heart, Search, TrendingUp, TrendingDown, ExternalLink, Filter, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CryptoChart } from "@/components/crypto-chart"
import Link from "next/link"
import type { CoinMarketCapCoinData } from "@/lib/coinmarketcap"

interface CryptoListingsTableProps {
  cryptos: CoinMarketCapCoinData[]
}

export function CryptoListingsTable({ cryptos }: CryptoListingsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<keyof CoinMarketCapCoinData | "percent_change_24h" | "market_cap" | "price">(
    "cmc_rank",
  )
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [favorites, setFavorites] = useState<Record<number, boolean>>({})

  const handleSort = (column: keyof CoinMarketCapCoinData | "percent_change_24h" | "market_cap" | "price") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedCryptos = [...filteredCryptos].sort((a, b) => {
    let valueA, valueB

    if (sortBy === "percent_change_24h") {
      valueA = a.quote.USD.percent_change_24h || 0
      valueB = b.quote.USD.percent_change_24h || 0
    } else if (sortBy === "market_cap") {
      valueA = a.quote.USD.market_cap
      valueB = b.quote.USD.market_cap
    } else if (sortBy === "price") {
      valueA = a.quote.USD.price
      valueB = b.quote.USD.price
    } else {
      valueA = a[sortBy as keyof CoinMarketCapCoinData]
      valueB = b[sortBy as keyof CoinMarketCapCoinData]
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    return sortOrder === "asc" ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA)
  })

  const [votes, setVotes] = useState<Record<number, number>>({})

  const handleVote = (id: number) => {
    setVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || Math.floor(Math.random() * 1000)) + 1,
    }))
  }

  const getVotes = (id: number) => {
    if (votes[id] === undefined) {
      votes[id] = Math.floor(Math.random() * 1000)
    }
    return votes[id]
  }

  if (cryptos.length === 0) {
    return (
      <Card className="border-gray-800 bg-gray-900/50">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">No cryptocurrencies found. Please check your API connection.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
          <div className="relative w-full md:w-auto md:flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name or symbol..."
              className="pl-10 bg-gray-800 border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button variant="outline" className="w-full md:w-auto gap-2 bg-gray-800 border-gray-700">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        <div className="rounded-md border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-950">
                <TableRow>
                  <TableHead className="w-12" onClick={() => handleSort("cmc_rank")}>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>#</span>
                      {sortBy === "cmc_rank" && <ArrowUpDown className="h-3 w-3" />}
                    </div>
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                  <TableHead onClick={() => handleSort("name")}>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>Name</span>
                      {sortBy === "name" && <ArrowUpDown className="h-3 w-3" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-right" onClick={() => handleSort("price")}>
                    <div className="flex items-center gap-1 justify-end cursor-pointer">
                      <span>Price</span>
                      {sortBy === "price" && <ArrowUpDown className="h-3 w-3" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-right" onClick={() => handleSort("percent_change_24h")}>
                    <div className="flex items-center gap-1 justify-end cursor-pointer">
                      <span>24h %</span>
                      {sortBy === "percent_change_24h" && <ArrowUpDown className="h-3 w-3" />}
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-right" onClick={() => handleSort("market_cap")}>
                    <div className="flex items-center gap-1 justify-end cursor-pointer">
                      <span>Market Cap</span>
                      {sortBy === "market_cap" && <ArrowUpDown className="h-3 w-3" />}
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-right">Volume (24h)</TableHead>
                  <TableHead className="text-center">Votes</TableHead>
                  <TableHead className="w-16 text-right">Chart</TableHead>
                  <TableHead className="w-16 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCryptos.map((crypto) => {
                  const percentChange24h = crypto.quote.USD.percent_change_24h || 0
                  const isPositive = percentChange24h >= 0

                  return (
                    <TableRow key={crypto.id} className="hover:bg-gray-800/50">
                      <TableCell className="font-medium">{crypto.cmc_rank}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-6 w-6 ${favorites[crypto.id] ? "text-yellow-400" : "text-gray-500"}`}
                          onClick={() => toggleFavorite(crypto.id)}
                        >
                          <Star className={`h-4 w-4 ${favorites[crypto.id] ? "fill-yellow-400" : ""}`} />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/crypto/${crypto.id}`}
                          className="flex items-center gap-2 hover:text-purple-400 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center text-xs font-bold">
                            {crypto.symbol.substring(0, 2)}
                          </div>
                          <div>
                            <div className="font-medium">{crypto.name}</div>
                            <div className="text-xs text-gray-400">{crypto.symbol}</div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        $
                        {crypto.quote.USD.price < 1
                          ? crypto.quote.USD.price.toFixed(6)
                          : crypto.quote.USD.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={isPositive ? "success" : "destructive"}
                          className="flex items-center gap-1 justify-center"
                        >
                          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {percentChange24h.toFixed(2)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-right">
                        ${crypto.quote.USD.market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-right">
                        ${crypto.quote.USD.volume_24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                          onClick={() => handleVote(crypto.id)}
                        >
                          <Heart className="h-4 w-4 mr-1 hover:text-red-500" />
                          <span>{getVotes(crypto.id)}</span>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="h-10 w-16">
                          <CryptoChart
                            isPositive={
                              crypto.quote.USD.percent_change_7d ? crypto.quote.USD.percent_change_7d > 0 : isPositive
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" asChild>
                          <Link href={`/crypto/${crypto.id}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
