"use server"

import { revalidatePath } from "next/cache"
import { searchCryptocurrency } from "@/lib/coinmarketcap"

type CryptoData = {
  id?: string
  name: string
  symbol: string
  contractAddress?: string
  description?: string
  websiteUrl?: string
  twitterUrl?: string
  telegramUrl?: string
  logoUrl?: string
  isActive?: boolean
  createdAt?: Date
}

// In a real app, this would be using a database like SQLite
const cryptoDB: Record<string, CryptoData> = {}

export async function registerCryptocurrency(
  formData: FormData,
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const name = formData.get("name") as string
    const symbol = formData.get("symbol") as string
    const contractAddress = formData.get("contract") as string
    const description = formData.get("description") as string
    const websiteUrl = formData.get("websiteUrl") as string
    const twitterUrl = formData.get("twitterUrl") as string
    const telegramUrl = formData.get("telegramUrl") as string
    const logoUrl = formData.get("logoUrl") as string

    if (!name || !symbol) {
      return {
        success: false,
        message: "Name and symbol are required fields",
      }
    }

    // Check if we can get data from CoinMarketCap
    let marketData = null
    try {
      marketData = await searchCryptocurrency(symbol)
    } catch (error) {
      console.error("Error fetching market data:", error)
    }

    // Generate a unique ID (in a real app, this would be handled by the DB)
    const id = Date.now().toString()

    // Save to our mock database
    cryptoDB[id] = {
      id,
      name,
      symbol: symbol.toUpperCase(),
      contractAddress,
      description,
      websiteUrl,
      twitterUrl,
      telegramUrl,
      logoUrl,
      isActive: true,
      createdAt: new Date(),
    }

    console.log("Registered cryptocurrency:", cryptoDB[id])

    // Revalidate the paths that might display this data
    revalidatePath("/admin")
    revalidatePath("/listings")

    return {
      success: true,
      message: "Cryptocurrency registered successfully",
      data: {
        ...cryptoDB[id],
        marketData,
      },
    }
  } catch (error) {
    console.error("Error registering cryptocurrency:", error)
    return {
      success: false,
      message: "Failed to register cryptocurrency",
    }
  }
}

export async function getAllCryptocurrencies(): Promise<CryptoData[]> {
  // In a real app, this would fetch from a database
  return Object.values(cryptoDB)
}

export async function getCryptocurrencyById(id: string): Promise<CryptoData | null> {
  return cryptoDB[id] || null
}
