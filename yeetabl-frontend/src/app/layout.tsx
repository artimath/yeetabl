import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import ThemeToggle from '../components/ThemeToggle'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yeetable - Keep Tabs on Your Top Customers",
  description: "Monitor your most valuable customers in real-time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <header className="p-4 flex justify-end">
              <ThemeToggle />
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
