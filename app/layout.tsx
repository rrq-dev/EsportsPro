import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
