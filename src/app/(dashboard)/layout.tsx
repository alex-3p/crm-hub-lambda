import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import Image from 'next/image';
import NavLinks from './components/nav-links';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-2">
          <Link href="/dashboard" className='flex items-center gap-2'>
            <Image src="https://lambdaanalytics.co/wp-content/uploads/2024/10/Iso-LAMBDA-Blanco-Lima-Neon.png" width={28} height={28} alt="Lambda Analytics Logo" className="group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 transition-all duration-200 grayscale" />
            <span className="font-semibold text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              Logos Gateway
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <NavLinks />
        </SidebarContent>
        <SidebarFooter className="flex p-2 mt-auto">
          <SidebarTrigger className="hidden md:flex" />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <SidebarTrigger className="md:hidden" />
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
