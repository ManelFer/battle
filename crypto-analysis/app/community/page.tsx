import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Zap, ExternalLink, TextIcon as Telegram } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-gray-400">Join our vibrant crypto community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-800 bg-gradient-to-br from-blue-900/30 to-blue-600/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Telegram className="h-6 w-6 text-blue-400" />
              <span>Telegram Group</span>
            </CardTitle>
            <CardDescription>Join our official Telegram group</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span>10,500+ members</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                <span>Active discussions</span>
              </div>
            </div>

            <p className="text-gray-300">
              Connect with crypto enthusiasts, discuss market trends, and get real-time updates on new listings and
              platform features.
            </p>

            <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
              <Telegram className="h-5 w-5" />
              <span>Join Telegram Group</span>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gradient-to-br from-purple-900/30 to-purple-600/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-purple-400" />
              <span>Discord Server</span>
            </CardTitle>
            <CardDescription>Join our Discord community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                <span>8,200+ members</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-400" />
                <span>Multiple channels</span>
              </div>
            </div>

            <p className="text-gray-300">
              Join our Discord server for in-depth discussions, technical analysis, and direct access to our development
              team.
            </p>

            <Button className="w-full gap-2 bg-purple-600 hover:bg-purple-700">
              <Zap className="h-5 w-5" />
              <span>Join Discord Server</span>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader>
          <CardTitle>Community Guidelines</CardTitle>
          <CardDescription>Please follow these guidelines when participating in our community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Respect All Members</h3>
            <p className="text-gray-400">
              Treat all community members with respect. Harassment, hate speech, or discrimination of any kind will not
              be tolerated.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">No Spam or Self-Promotion</h3>
            <p className="text-gray-400">
              Do not spam the chat with repetitive messages or promote unrelated projects without permission.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">No Financial Advice</h3>
            <p className="text-gray-400">
              Discussions about cryptocurrencies are welcome, but do not provide financial advice. All investment
              decisions are your own responsibility.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Report Issues</h3>
            <p className="text-gray-400">
              If you encounter any issues or have concerns, please report them to the moderators or administrators.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
