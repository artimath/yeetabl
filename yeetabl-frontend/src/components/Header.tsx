'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PanelLeft, Search } from 'lucide-react';
import { AccountSettingsAvatarMenu } from './AccountSettingsAvatarMenu';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          {/* Mobile navigation menu content */}
        </SheetContent>
      </Sheet>
      {/* <NavBreadCrumbs /> */}
      <div className="relative ml-auto flex-1 md:grow-0"></div>
      <AccountSettingsAvatarMenu />
    </header>
  );
}
