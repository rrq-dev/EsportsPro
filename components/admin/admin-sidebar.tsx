"use client"

import { Trophy, Users, User, ListChecks, Home, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export function AdminSidebar() {
  return (
    <Sidebar variant="inset" className="border-r border-slate-200 bg-slate-100">
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-white">
            <Settings className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold text-slate-800">Admin Panel</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin/tim">
                <Users className="h-5 w-5" />
                <span>Manajemen Tim</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin/pemain">
                <User className="h-5 w-5" />
                <span>Manajemen Pemain</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin/turnamen">
                <Trophy className="h-5 w-5" />
                <span>Manajemen Turnamen</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin/skor">
                <ListChecks className="h-5 w-5" />
                <span>Manajemen Skor</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <div className="mt-auto p-4">
        <ModeToggle />
      </div>
      <SidebarRail />
    </Sidebar>
  )
}
