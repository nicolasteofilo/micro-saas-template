'use client'
import { useSession } from 'next-auth/react'

import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { Home, LogOut, Rocket, Settings } from 'lucide-react'
import { PropsWithChildren } from 'react'
import { getInitials } from './utils/get-initials'

import { Logo } from '@/components/logo'
import { SignOut } from '@/lib/auth-action'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserDropdown } from './_components/user-dropdown'

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
  const userName = session?.user?.name || ''
  const userEmail = session?.user?.email || ''
  const userImage = session?.user?.image || ''
  const initials = getInitials(userName)

  const pathname = usePathname()
  const currentPageName = data.navMain.filter(
    (item) => item.url === pathname,
  )[0].title

  const currentPageLink = data.navMain.filter(
    (item) => item.url === pathname,
  )[0].url

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
            userImage={userImage}
            userName={userName}
            userEmail={userEmail}
            initials={initials}
            data={dataUserDropdown}
          />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 justify-between w-full">
            <div className="flex items-center">
              <SidebarTrigger className="-ml-1 mr-3" />
              <Separator orientation="vertical" className="-mr-2.5 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <Link href={currentPageLink}>{currentPageName}</Link>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div>Actions</div>
          </div>
        </header>
        <div className="flex flex-1 flex-col pl-[18px]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
