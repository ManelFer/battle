"use client"

import { useState } from "react"
import {
  Plus,
  Trash2,
  Edit,
  Save,
  Upload,
  Twitter,
  Globe,
  TextIcon as Telegram,
  RefreshCcw,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { registerCryptocurrency } from "../actions/crypto-actions"
import { useFormState } from "react-dom"
import { useFormStatus } from "react-dom"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

type State = {
  success?: boolean
  message?: string
  data?: any
} | null

const initialState: State = null

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={pending}>
      {pending ? (
        <>
          <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
          Registering...
        </>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" />
          Add Cryptocurrency
        </>
      )}
    </Button>
  )
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("add-crypto")
  const [successModal, setSuccessModal] = useState(false)
  const [registeredCrypto, setRegisteredCrypto] = useState<any>(null)
  const { toast } = useToast()

  const [state, formAction] = useFormState(async (prevState: State, formData: FormData) => {
    const result = await registerCryptocurrency(formData)

    if (result.success) {
      setRegisteredCrypto(result.data)
      setSuccessModal(true)
    } else {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: result.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }

    return result
  }, initialState)

  // Mock data for cryptocurrencies
  const cryptos = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Crypto ${i + 1}`,
    symbol: `CRY${i + 1}`,
    contract: `0x${Math.random().toString(16).substring(2, 42)}`,
    dateAdded: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    status: Math.random() > 0.3 ? "Active" : "Pending",
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-400">Manage cryptocurrencies and platform settings</p>
      </div>

      <Tabs defaultValue="add-crypto" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="add-crypto">Add Cryptocurrency</TabsTrigger>
          <TabsTrigger value="manage-cryptos">Manage Listings</TabsTrigger>
          <TabsTrigger value="settings">Platform Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="add-crypto">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Add New Cryptocurrency</CardTitle>
              <CardDescription>Fill in the details to add a new cryptocurrency to the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g. Bitcoin"
                        className="bg-gray-800 border-gray-700"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="symbol">
                        Symbol <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="symbol"
                        name="symbol"
                        placeholder="e.g. BTC"
                        className="bg-gray-800 border-gray-700"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Enter the symbol to automatically fetch data from CoinMarketCap
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contract">Contract Address</Label>
                      <Input
                        id="contract"
                        name="contract"
                        placeholder="0x..."
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter a description of the cryptocurrency"
                        className="min-h-[100px] bg-gray-800 border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Logo</Label>
                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                        <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-400">Drag and drop or click to upload</p>
                        <p className="text-xs text-gray-500">PNG, JPG or SVG (max. 2MB)</p>
                        <Input
                          id="logoUrl"
                          name="logoUrl"
                          type="text"
                          placeholder="Or enter logo URL"
                          className="mt-2 bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Social Links</Label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-gray-500" />
                          <Input name="websiteUrl" placeholder="Website URL" className="bg-gray-800 border-gray-700" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Twitter className="h-5 w-5 text-gray-500" />
                          <Input name="twitterUrl" placeholder="Twitter URL" className="bg-gray-800 border-gray-700" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Telegram className="h-5 w-5 text-gray-500" />
                          <Input
                            name="telegramUrl"
                            placeholder="Telegram URL"
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage-cryptos">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Manage Cryptocurrencies</CardTitle>
              <CardDescription>View, edit, or remove cryptocurrencies from the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-gray-800 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-950">
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="hidden md:table-cell">Contract</TableHead>
                      <TableHead className="hidden md:table-cell">Date Added</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cryptos.map((crypto) => (
                      <TableRow key={crypto.id} className="hover:bg-gray-800/50">
                        <TableCell className="font-medium">{crypto.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center text-xs font-bold">
                              {crypto.symbol.substring(0, 2)}
                            </div>
                            <span>{crypto.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{crypto.symbol}</TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-xs">
                          {crypto.contract.substring(0, 6)}...{crypto.contract.substring(38)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{crypto.dateAdded}</TableCell>
                        <TableCell>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                              crypto.status === "Active"
                                ? "bg-green-500/20 text-green-500"
                                : "bg-yellow-500/20 text-yellow-500"
                            }`}
                          >
                            {crypto.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure API keys and database settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-key">CoinMarketCap API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="api-key"
                      value="80674E9F-85CA-4169-8D36-259EE20C00FC"
                      className="bg-gray-800 border-gray-700 font-mono"
                      readOnly
                    />
                    <Button variant="outline" className="bg-gray-800 border-gray-700">
                      Update
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Used for fetching real-time cryptocurrency data</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="db-type">Database Type</Label>
                  <div className="flex gap-2">
                    <Input id="db-type" value="SQLite" className="bg-gray-800 border-gray-700" readOnly />
                    <Button variant="outline" className="bg-gray-800 border-gray-700">
                      Migrate to PostgreSQL
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Current database configuration</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ads-settings">Advertisement Settings</Label>
                  <Textarea
                    id="ads-settings"
                    placeholder="Configure advertisement settings"
                    className="min-h-[100px] bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Success Dialog */}
      <Dialog open={successModal} onOpenChange={setSuccessModal}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-green-400 flex items-center gap-2">
              <div className="bg-green-500/20 p-2 rounded-full">
                <Save className="h-5 w-5" />
              </div>
              Cryptocurrency Added Successfully
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              The cryptocurrency has been registered on the platform.
            </DialogDescription>
          </DialogHeader>

          {registeredCrypto && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center text-xs font-bold">
                  {registeredCrypto.symbol.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{registeredCrypto.name}</h3>
                  <p className="text-sm text-gray-400">{registeredCrypto.symbol}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                <h4 className="font-medium mb-2">Details:</h4>
                <dl className="space-y-2 text-sm">
                  {registeredCrypto.contractAddress && (
                    <div className="grid grid-cols-3">
                      <dt className="text-gray-400">Contract:</dt>
                      <dd className="col-span-2 font-mono overflow-hidden text-ellipsis">
                        {registeredCrypto.contractAddress}
                      </dd>
                    </div>
                  )}
                  {registeredCrypto.marketData && (
                    <>
                      <div className="grid grid-cols-3">
                        <dt className="text-gray-400">Price:</dt>
                        <dd className="col-span-2">${registeredCrypto.marketData.quote.USD.price.toFixed(6)}</dd>
                      </div>
                      <div className="grid grid-cols-3">
                        <dt className="text-gray-400">24h Change:</dt>
                        <dd
                          className={`col-span-2 ${registeredCrypto.marketData.quote.USD.percent_change_24h > 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {registeredCrypto.marketData.quote.USD.percent_change_24h.toFixed(2)}%
                        </dd>
                      </div>
                      <div className="grid grid-cols-3">
                        <dt className="text-gray-400">Market Cap:</dt>
                        <dd className="col-span-2">
                          ${registeredCrypto.marketData.quote.USD.market_cap.toLocaleString()}
                        </dd>
                      </div>
                    </>
                  )}
                  {!registeredCrypto.marketData && (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <AlertCircle className="h-4 w-4" />
                      <span>No market data available from CoinMarketCap</span>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setSuccessModal(false)} className="bg-gray-800 border-gray-700">
              Close
            </Button>
            <Button
              onClick={() => {
                setSuccessModal(false)
                setActiveTab("manage-cryptos")
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              View All Listings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
