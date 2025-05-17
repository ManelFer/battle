"use server"

import { getTopCryptocurrencies, type CoinMarketCapCoinData } from "@/lib/coinmarketcap"

export async function fetchTopCryptos(limit = 100): Promise<{
  success: boolean
  data: CoinMarketCapCoinData[]
  error?: string
}> {
  try {
    const cryptos = await getTopCryptocurrencies(limit)
    return {
      success: true,
      data: cryptos,
    }
  } catch (error) {
    console.error("Error fetching top cryptocurrencies:", error)
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
