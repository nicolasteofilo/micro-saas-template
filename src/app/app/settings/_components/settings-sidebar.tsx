'use client'

import {
  AppSidebarMain,
  AppSidebarNav,
  AppSidebarNavLink,
} from '@/components/sidebar'
import { usePathname } from 'next/navigation'

export function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <AppSidebarNav>
      <AppSidebarMain>
        <AppSidebarNavLink
          href="/app/settings"
          active={pathname === '/app/settings'}
          className="mb-2"
        >
          Perfil
        </AppSidebarNavLink>
        <AppSidebarNavLink href="/app/settings/theme" className="mb-2">
          Tema
        </AppSidebarNavLink>
        <AppSidebarNavLink
          href="/app/settings/billing"
          active={pathname === '/app/settings/billing'}
        >
          Plano
        </AppSidebarNavLink>
      </AppSidebarMain>
    </AppSidebarNav>
  )
}
