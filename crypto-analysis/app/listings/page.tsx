import { getTopCryptocurrencies } from "@/lib/coinmarketcap"
import { CryptoListingsTable } from "@/components/crypto-listings-table"

export default async function ListingsPage() {
  // Fetch crypto data with fallback to mock data if API fails
  const cryptos = await getTopCryptocurrencies(100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Crypto Listings</h1>
        <p className="text-gray-400">Browse and vote for your favorite cryptocurrencies</p>
      </div>

      <CryptoListingsTable cryptos={cryptos} />
    </div>
  )
}
