import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Orcha - Next Generation Development Platform",
  description: "Your Next-Generation Development Platform",
  generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <div className="bg-gray-900 min-h-screen">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}