import type { Metadata } from "next"
import { Inter } from "next/font/google"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Three Square History",
  description: "The AI Powered History Trivia Game",
  openGraph: {
    title: "Three Square History",
    description: "The AI Powered History Trivia Game",
    url: "https://three-square-history.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://three-square-history.vercel.app/logo.png",
        width: 800,
        height: 800,
        alt: "Three Square History Logo",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
