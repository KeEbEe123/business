import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AnalyticsAI - AI-Powered Business Analytics",
  description: "Transform your business data into actionable insights with AI-powered analytics",
}

export default function RootLayout({
  children
}) {
  return (
    (<html lang="en">
      <body className={inter.className}>{children}</body>
    </html>)
  );
}
