'use client';
import Header from './Header';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      {/* <Sidebar /> */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:pr-14">
        <Header />
        <div className="flex justify-between items-center mb-4">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium ${pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className={`text-sm font-medium ${pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/analytics"
                  className={`text-sm font-medium ${pathname === '/dashboard/analytics' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/api-keys"
                  className={`text-sm font-medium ${pathname === '/dashboard/api-keys' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  API Keys
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
        {children}
      </div>
    </div>
  );
}
