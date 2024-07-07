import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';
import { TooltipProvider } from '@/components/ui/tooltip';
import Analytics from '@/components/analytics';

// const ClientThemeToggle = dynamic(() => import('../components/ClientThemeToggle'), {
//   ssr: false,
// });

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// export const metadata: Metadata = {
//   title: 'Yeetable - Keep Tabs on Your Top Customers',
//   description: 'Monitor your most valuable customers in real-time',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              {children}
              {/* <ClientThemeToggle /> */}
            </TooltipProvider>
          </ThemeProvider>
        </body>
        <Analytics />
      </ClerkProvider>
    </html>
  );
}
