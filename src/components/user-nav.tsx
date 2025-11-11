'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/lib/actions'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { User } from '@/lib/definitions'
import { Skeleton } from './ui/skeleton'


function getInitials(name: string) {
  if (!name) return '?'
  const names = name.split(' ')
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}


function parseCookie(name: string) {
  if (typeof window === 'undefined') return null;
  const cookie = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
  if (!cookie) return null;
  const value = cookie.split('=')[1];
  try {
    const sessionData = JSON.parse(decodeURIComponent(value));
    return sessionData.user;
  } catch (e) {
    console.error("Failed to parse user data from cookie", e);
    return null;
  }
}

export function UserNav() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = parseCookie('session')
    if (userData) {
      setUser(userData)
    }
  }, [])

  if (!user) {
    return (
       <Skeleton className="h-9 w-9 rounded-full" />
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt={`@${user.full_name}`} />
            <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/perfil">
            <DropdownMenuItem>
                Perfil
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
             <DropdownMenuItem>
                Ajustes
             </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form action={logout}>
            <button type="submit" className="w-full">
                <DropdownMenuItem>
                    Cerrar Sesión
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
