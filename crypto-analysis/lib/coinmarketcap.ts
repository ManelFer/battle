// CoinMarketCap API service

export type CoinMarketCapListResponse = {
  status: {
    timestamp: string
    error_code: number
    error_message: string | null
    elapsed: number
    credit_count: number
    notice: string | null
  }
  data: CoinMarketCapCoinData[]
}

export type CoinMarketCapResponse = {
  status: {
    error_code: number
    error_message: string | null
  }
  data: Record<string, CoinMarketCapCoinData>
}

export type CoinMarketCapCoinData = {
  id: number
  name: string
  symbol: string
  slug: string
  cmc_rank?: number
  num_market_pairs?: number
  circulating_supply: number
  total_supply: number
  max_supply: number | null
  infinite_supply?: boolean
  last_updated?: string
  date_added?: string
  tags?: string[]
  platform?: any
  self_reported_circulating_supply?: number
  self_reported_market_cap?: number
  quote: {
    USD: {
      price: number
      volume_24h: number
      volume_change_24h?: number
      percent_change_1h?: number
      percent_change_24h?: number
      percent_change_7d?: number
      percent_change_30d?: number
      market_cap: number
      market_cap_dominance?: number
      fully_diluted_market_cap?: number
      last_updated?: string
    }
  }
  is_active?: number
}

// Generate mock data for when the API fails
export function generateMockCryptoData(count = 100): CoinMarketCapCoinData[] {
  const cryptoNames = [
    "Bitcoin",
    "Ethereum",
    "Tether",
    "BNB",
    "XRP",
    "USDC",
    "Solana",
    "Cardano",
    "Dogecoin",
    "Polygon",
    "Polkadot",
    "Litecoin",
    "Shiba Inu",
    "TRON",
    "Dai",
    "Avalanche",
    "Chainlink",
    "Uniswap",
    "Cosmos",
    "Monero",
    "Stellar",
    "Ethereum Classic",
    "Bitcoin Cash",
    "Filecoin",
    "Hedera",
    "Quant",
    "Cronos",
    "NEAR Protocol",
    "VeChain",
    "ApeCoin",
    "Algorand",
    "Internet Computer",
    "EOS",
    "Tezos",
    "The Graph",
    "Theta Network",
    "Fantom",
    "Axie Infinity",
    "Decentraland",
    "Aave",
    "Maker",
    "Bitcoin SV",
    "Elrond",
    "Zcash",
    "Theta Fuel",
    "Gala",
    "Kusama",
    "Basic Attention",
    "Loopring",
    "Dash",
    "Nexo",
    "Arweave",
    "Compound",
    "Waves",
    "Enjin Coin",
    "Zilliqa",
    "Celo",
    "Stacks",
    "1inch",
    "Harmony",
    "Holo",
    "NEM",
    "Amp",
    "Decred",
    "IOTA",
    "OMG Network",
    "Gnosis",
    "Qtum",
    "Flow",
    "Synthetix",
    "Curve DAO",
    "ICON",
    "Kava",
    "Siacoin",
    "Storj",
    "Bancor",
    "Ontology",
    "Audius",
    "Nano",
    "Horizen",
    "Golem",
    "Kyber Network",
    "Nervos Network",
    "Augur",
    "Status",
    "Numeraire",
    "Lisk",
    "Ren",
    "Ankr",
    "Voyager Token",
    "Orchid",
    "Reserve Rights",
    "Cartesi",
    "Civic",
    "Fetch.ai",
    "Origin Protocol",
    "Reef",
    "Wax",
    "Verge",
    "Syscoin",
  ]

  return Array.from({ length: count }, (_, i) => {
    const price = Math.random() * (i < 10 ? 50000 : i < 30 ? 1000 : 100)
    const percentChange24h = Math.random() * 20 - 10 // -10% to +10%
    const percentChange7d = Math.random() * 40 - 20 // -20% to +20%
    const marketCap = price * (Math.random() * 1000000000 + 10000000)
    const volume24h = marketCap * (Math.random() * 0.2 + 0.05)

    return {
      id: i + 1,
      name: cryptoNames[i % cryptoNames.length],
      symbol: cryptoNames[i % cryptoNames.length].substring(0, 3).toUpperCase(),
      slug: cryptoNames[i % cryptoNames.length].toLowerCase().replace(/\s/g, "-"),
      cmc_rank: i + 1,
      circulating_supply: Math.floor(Math.random() * 1000000000) + 1000000,
      total_supply: Math.floor(Math.random() * 1000000000) + 1000000,
      max_supply: Math.random() > 0.3 ? Math.floor(Math.random() * 1000000000) + 1000000 : null,
      date_added: new Date(Date.now() - Math.random() * 3 * 365 * 24 * 60 * 60 * 1000).toISOString(),
      quote: {
        USD: {
          price: price,
          volume_24h: volume24h,
          percent_change_1h: Math.random() * 5 - 2.5,
          percent_change_24h: percentChange24h,
          percent_change_7d: percentChange7d,
          percent_change_30d: Math.random() * 60 - 30,
          market_cap: marketCap,
        },
      },
    }
  })
}

export async function searchCryptocurrency(query: string) {
  if (!query) return null

  try {
    // Check if API key is available
    const apiKey = process.env.COINMARKETCAP_API_KEY
    if (!apiKey) {
      console.warn("CoinMarketCap API key not found. Using mock data.")
      const mockData = generateMockCryptoData(100)
      const matchedCrypto = mockData.find(
        (crypto) =>
          crypto.symbol.toLowerCase() === query.toLowerCase() || crypto.name.toLowerCase() === query.toLowerCase(),
      )
      return matchedCrypto || null
    }

    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${query}`, {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
        Accept: "application/json",
      },
      cache: "no-store", // Disable caching to ensure fresh data
    })

    if (!response.ok) {
      console.error(`Error fetching data: ${response.status} ${response.statusText}`)
      throw new Error(`Error fetching data: ${response.status}`)
    }

    const data: CoinMarketCapResponse = await response.json()

    if (data.status.error_code !== 0) {
      throw new Error(data.status.error_message || "Unknown error")
    }

    return Object.values(data.data)[0]
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error)
    // Return mock data for the requested symbol
    const mockData = generateMockCryptoData(100)
    const matchedCrypto = mockData.find(
      (crypto) =>
        crypto.symbol.toLowerCase() === query.toLowerCase() || crypto.name.toLowerCase() === query.toLowerCase(),
    )
    return matchedCrypto || null
  }
}

export async function getTopCryptocurrencies(limit = 100) {
  try {
    // Check if API key is available
    const apiKey = process.env.COINMARKETCAP_API_KEY
    if (!apiKey) {
      console.warn("CoinMarketCap API key not found. Using mock data.")
      return generateMockCryptoData(limit)
    }

    console.log("Fetching data with API key:", apiKey.substring(0, 5) + "...")

    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${limit}&convert=USD`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
          Accept: "application/json",
        },
        cache: "no-store", // Disable caching to ensure fresh data
      },
    )

    if (!response.ok) {
      console.error(`Error fetching data: ${response.status} ${response.statusText}`)
      throw new Error(`Error fetching data: ${response.status}`)
    }

    const data: CoinMarketCapListResponse = await response.json()

    if (data.status.error_code !== 0) {
      throw new Error(data.status.error_message || "Unknown error")
    }

    return data.data
  } catch (error) {
    console.error("Error fetching top cryptocurrencies:", error)
    // Return mock data when the API call fails
    return generateMockCryptoData(limit)
  }
}
