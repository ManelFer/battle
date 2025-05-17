import { DashboardView } from "@/components/dashboard-view"
import { getTopCryptocurrencies } from "@/lib/coinmarketcap"

export default async function Home() {
  // Fetch crypto data with fallback to mock data if API fails
  const topCryptos = await getTopCryptocurrencies(100)

  return <DashboardView topCryptos={topCryptos} />
}
