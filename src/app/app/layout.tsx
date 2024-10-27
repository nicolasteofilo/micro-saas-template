'use client'
import { PropsWithChildren } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Home, LogOut, Rocket, Settings } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'

import { UserDropdown } from './_components/user-dropdown'
import { getInitials } from './_utils/get-initials'

import { Logo } from '@/components/logo'
import { SignOut } from '@/lib/auth-action'
import { cn } from '@/lib/utils'

const data = {
  navMain: [
    {
      title: 'Início',
      url: '/app',
      icon: Home,
    },
    {
      title: 'Configurações',
      url: '/app/settings',
      icon: Settings,
    },
  ],
}

const dataUserDropdown = {
  navMain: [
    {
      title: 'Upgrade de plano',
      action: () => {},
      icon: (<Rocket size={16} />) as React.ReactNode,
    },
    {
      title: 'Sair',
      action: SignOut,
      icon: (<LogOut size={16} />) as React.ReactNode,
    },
  ],
}

export default function Layout({ children }: PropsWithChildren) {
  const session = useSession().data
  const initials = getInitials(session?.user?.name || '')

  const pathname = usePathname()

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '20rem',
          '--sidebar-width-mobile': '20rem',
        } as unknown as undefined
      }
    >
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <Separator className="my-3" />
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="mt-3">
              {data.navMain.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(
                    'hover:bg-secondary rounded-md',
                    pathname === item.url && 'bg-secondary',
                  )}
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="text-base">
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Separator className="tex" />
          <UserDropdown
            user={session?.user}
            initials={initials}
            data={dataUserDropdown}
          />
        </SidebarFooter>
      </Sidebar>

      {children}
    </SidebarProvider>
  )
}
