"use client"

import { useState } from "react"
import { Clock, DollarSign, ExternalLink, Users, BarChart3, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PreSalePage() {
  const [activeTab, setActiveTab] = useState("active")

  // Mock data for presales
  const presales = {
    active: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      name: `MetaVerse ${i + 1}`,
      symbol: `MVT${i + 1}`,
      raised: Math.floor(Math.random() * 500000),
      goal: 500000,
      participants: Math.floor(Math.random() * 1000),
      endsIn: Math.floor(Math.random() * 30) + 1,
      price: (Math.random() * 0.1).toFixed(4),
    })),
    upcoming: Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      name: `Future Token ${i + 1}`,
      symbol: `FTK${i + 1}`,
      raised: 0,
      goal: 300000,
      participants: 0,
      startsIn: Math.floor(Math.random() * 14) + 1,
      price: (Math.random() * 0.05).toFixed(4),
    })),
    ended: Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      name: `Completed Coin ${i + 1}`,
      symbol: `CCN${i + 1}`,
      raised: 300000,
      goal: 300000,
      participants: Math.floor(Math.random() * 2000) + 500,
      endedAgo: Math.floor(Math.random() * 30) + 1,
      price: (Math.random() * 0.2).toFixed(4),
    })),
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Pre-sale Opportunities</h1>
        <p className="text-gray-400">Discover and participate in cryptocurrency pre-sales</p>
      </div>

      <Tabs defaultValue="active" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="active">Active Pre-sales</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ended">Ended</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {presales.active.map((presale) => (
              <Card key={presale.id} className="border-gray-800 bg-gray-900/50 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center text-xs font-bold">
                        {presale.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{presale.name}</CardTitle>
                        <p className="text-xs text-gray-400">{presale.symbol}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-sm font-medium bg-amber-400/10 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      <span>{presale.endsIn}d left</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Raised</span>
                        <span className="font-medium">
                          ${presale.raised.toLocaleString()} / ${presale.goal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(presale.raised / presale.goal) * 100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                          <Users className="h-3 w-3" />
                          <span>Participants</span>
                        </div>
                        <p className="font-medium">{presale.participants.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                          <DollarSign className="h-3 w-3" />
                          <span>Token Price</span>
                        </div>
                        <p className="font-medium">${presale.price}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Participate in Pre-sale</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {presales.upcoming.map((presale) => (
              <Card key={presale.id} className="border-gray-800 bg-gray-900/50 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-teal-400 flex items-center justify-center text-xs font-bold">
                        {presale.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{presale.name}</CardTitle>
                        <p className="text-xs text-gray-400">{presale.symbol}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      <span>In {presale.startsIn}d</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Target</span>
                        <span className="font-medium">${presale.goal.toLocaleString()}</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                          <BarChart3 className="h-3 w-3" />
                          <span>Allocation</span>
                        </div>
                        <p className="font-medium">10,000,000 tokens</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                          <DollarSign className="h-3 w-3" />
                          <span>Token Price</span>
                        </div>
                        <p className="font-medium">${presale.price}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button className="w-full" variant="outline">
                    Set Reminder
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ended">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {presales.ended.map((presale) => (
              <Card key={presale.id} className="border-gray-800 bg-gray-900/50 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-400 flex items-center justify-center text-xs font-bold">
                        {presale.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{presale.name}</CardTitle>
                        <p className="text-xs text-gray-400">{presale.symbol}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm font-medium bg-gray-400/10 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      <span>{presale.endedAgo}d ago</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Raised</span>
                        <span className="font-medium">
                          ${presale.raised.toLocaleString()} / ${presale.goal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                          <Users className="h-3 w-3" />
                          <span>Participants</span>
                        </div>
                        <p className="font-medium">{presale.participants.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                          <DollarSign className="h-3 w-3" />
                          <span>Final Price</span>
                        </div>
                        <p className="font-medium">${presale.price}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button className="w-full" variant="outline">
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-center gap-2 mt-8">
        <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="bg-gray-800 border-gray-700">
          1
        </Button>
        <Button variant="outline" className="bg-purple-600 border-purple-700">
          2
        </Button>
        <Button variant="outline" className="bg-gray-800 border-gray-700">
          3
        </Button>
        <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
