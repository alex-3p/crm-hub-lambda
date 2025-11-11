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
import type { User, SessionPayload } from '@/lib/definitions'
import { Skeleton } from './ui/skeleton'


function getInitials(name: string) {
  if (!name) return '?'
  const names = name.split(' ')
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function parseCookie(name: string): SessionPayload | null {
  if (typeof window === 'undefined') return null;
  const cookie = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
  if (!cookie) return null;
  
  const value = cookie.split('=')[1];
  try {
    const decodedValue = decodeURIComponent(value);
    const sessionData = JSON.parse(Buffer.from(decodedValue, 'base64').toString('utf-8'));
    return sessionData;
  } catch (e) {
    console.error("Failed to parse user data from cookie", e);
    return null;
  }
}

export function UserNav() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const sessionData = parseCookie('session')
    if (sessionData && sessionData.user) {
      setUser(sessionData.user)
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
            {/* You can add a user avatar image URL here if available */}
            <AvatarImage src="" alt={`@${user.full_name}`} />
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
