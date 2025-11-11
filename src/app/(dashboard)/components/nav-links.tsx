'use client'

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Users,
  Building,
  Settings,
  Route,
  ClipboardList
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const links = [
    { href: '/dashboard', label: 'Panel', icon: LayoutDashboard },
    { href: '/users', label: 'Gestión de Usuarios', icon: Users },
    { href: '/perfil', label: 'Mi Perfil', icon: ClipboardList },
    { href: '/organizations', label: 'Organizaciones', icon: Building },
    { href: '/domus-endpoints', label: 'Endpoints Domus', icon: Route },
    { href: '/settings', label: 'Ajustes de CRM', icon: Settings },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <SidebarMenu className="p-2">
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href} className="w-full">
            <SidebarMenuButton
              isActive={pathname.startsWith(link.href) && (link.href === '/dashboard' ? pathname === link.href : true)}
              tooltip={link.label}
              className="justify-start"
            >
              <link.icon className="size-5" />
              <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
