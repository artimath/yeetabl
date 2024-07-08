import { Sidebar } from './Sidebar';
import Header from './Header';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* <Sidebar /> */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:pr-14">
        <Header />
        {children}
      </div>
    </div>
  );
}
