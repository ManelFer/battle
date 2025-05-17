import { Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TopVoted() {
  return (
    <Card className="bg-gradient-to-br from-red-900/20 to-red-600/20 border-red-800/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          <span>Top Voted 24h</span>
        </CardTitle>
        <CardDescription>Most voted cryptocurrencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center text-xs font-bold">
                  {i}
                </div>
                <div>
                  <div className="font-medium">Vote Coin {i}</div>
                  <div className="text-xs text-gray-400">VCN</div>
                </div>
              </div>
              <div className="text-red-500 font-medium">{Math.floor(Math.random() * 1000)} votes</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
