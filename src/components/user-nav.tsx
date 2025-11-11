'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { logout } from '@/lib/actions'
import { LogOut } from 'lucide-react'

export function UserNav() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://picsum.photos/seed/user-avatar/100/100"
                  alt="User Avatar"
                  data-ai-hint="user avatar"
                />
                <AvatarFallback>
                  <LogOut className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cerrar Sesión</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
