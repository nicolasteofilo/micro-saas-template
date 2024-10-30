'use client'
import { PropsWithChildren } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ChevronRight, Home, LogOut, Rocket, Settings2 } from 'lucide-react'
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from '@/components/ui/sidebar'

import { UserDropdown } from './_components/user-dropdown'
import { getInitials } from './_utils/get-initials'

import { Logo } from '@/components/logo'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
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
      icon: Settings2,
      items: [
        {
          title: 'Perfil',
          url: '/app/settings',
        },
        {
          title: 'Planos',
          url: '/app/settings/plans',
          icon: Rocket,
        },
        {
          title: 'Aparência',
          url: '/app/settings/appearance',
          icon: Link,
        },
      ],
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
              {data.navMain.map((item) => {
                const asSubMenus = !!item.items

                if (asSubMenus) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={subItem.url}>
                                    <span
                                      className={cn(
                                        'text-sm',
                                        pathname === subItem.url &&
                                          'font-semibold',
                                      )}
                                    >
                                      {subItem.title}
                                    </span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={cn(
                      'hover:bg-secondary rounded-md',
                      pathname === item.url && 'bg-secondary',
                    )}
                  >
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="text-sm">
                        <item.icon />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
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
