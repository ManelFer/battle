"use client"

import { BarChart3, LogIn, Rocket, List, MessageCircle, Home, TrendingUp } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Market",
      icon: TrendingUp,
      href: "/market",
    },
    {
      title: "Ranking",
      icon: BarChart3,
      href: "/ranking",
    },
    {
      title: "Login",
      icon: LogIn,
      href: "/login",
    },
    {
      title: "Pre-sale",
      icon: Rocket,
      href: "/pre-sale",
    },
    {
      title: "Listings",
      icon: List,
      href: "/listings",
    },
    {
      title: "Community",
      icon: MessageCircle,
      href: "/community",
    },
  ]

  return (
    <Sidebar className="border-r border-gray-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-blue-400">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">CA</span>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              CryptoAnalysis
            </h1>
            <p className="text-xs text-gray-400">Analyze • Vote • Profit</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-center text-gray-500">
          <p>© 2025 CryptoAnalysis</p>
          <p>Powered by CoinMarketCap</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
