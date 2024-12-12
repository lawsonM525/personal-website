import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Playfair_Display, Caveat } from "next/font/google"
import "./globals.css"
import { CommandMenu } from "@/components/command-menu"
import { EmailPopup } from "@/components/email-popup"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif" 
})
const caveat = Caveat({ 
  subsets: ["latin"],
  variable: "--font-handwriting" 
})

export const metadata: Metadata = {
  title: "Personal Website",
  description: "A modern, minimalist personal website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${playfair.variable} ${caveat.variable}`}>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <CommandMenu />
        {children}
        <EmailPopup />
        <Toaster />
      </body>
    </html>
  )
}

