import { fetchTopCryptos } from "../actions/fetch-cryptos"
import { CryptoList } from "@/components/crypto-list"

export default async function MarketPage() {
  const { success, data: cryptos, error } = await fetchTopCryptos(100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Cryptocurrency Market</h1>
        <p className="text-gray-400">Top cryptocurrencies by market capitalization</p>
      </div>

      {!success && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400">
          <p>Error loading cryptocurrencies: {error}</p>
        </div>
      )}

      <CryptoList cryptos={cryptos} />
    </div>
  )
}
