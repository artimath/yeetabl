import { Sidebar } from './Sidebar';
import Header from './Header';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* <Sidebar /> */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:pr-14">
        <Header />
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className={`text-sm font-medium ${pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className={`text-sm font-medium ${pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
        {children}
      </div>
    </div>
  );
}
