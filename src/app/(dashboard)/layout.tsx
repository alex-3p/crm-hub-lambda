import * as React from 'react';
import Link from 'next/link';
import {
  Cuboid,
  LayoutDashboard,
  Settings,
  Users,
  Building,
  ChevronRight,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';

import { UserNav } from '@/components/user-nav';
import { getSession } from '@/lib/session';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" asChild>
                <Link href="/dashboard" className='flex items-center gap-2'>
                  <Cuboid className="text-primary" />
                  <span className="font-semibold text-lg text-sidebar-foreground">
                    CRM Gateway
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/users" asChild>
                <Link href="/users">
                  <Users />
                  User Management
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/organizations" asChild>
                <Link href="/organizations">
                  <Building />
                  Organizations
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/settings" asChild>
                <Link href="/settings">
                  <Settings />
                  CRM Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter/>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="ml-auto flex items-center gap-2">
            {session?.user && <UserNav user={session.user} />}
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
