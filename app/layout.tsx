import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SESシミュレーター",
  description: "SES会社員向けの年収・手取り・福利厚生換算・将来資産シミュレーター",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${geist.className} antialiased`}>
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </body>
    </html>
  )
}

