import Link from 'next/link'

import { cn } from '@/lib/utils'

export type AppSidebarGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export function AppSidebar({ className, children }: AppSidebarGenericProps) {
  return (
    <aside
      className={cn([
        'border-r border-border flex flex-col space-y-6 bg-secondary/5',
        className,
      ])}
    >
      {children}
    </aside>
  )
}

export function AppSidebarHeader({
  className,
  children,
}: AppSidebarGenericProps) {
  return (
    <header
      className={cn([
        'px-6 h-12 flex items-center border-b border-border',
        className,
      ])}
    >
      {children}
    </header>
  )
}

export function AppSidebarHeaderTitle({
  className,
  children,
}: AppSidebarGenericProps) {
  return <h2 className={cn(['', className])}>{children}</h2>
}

export function AppSidebarMain({
  className,
  children,
}: AppSidebarGenericProps) {
  return <main className={cn(['px-3', className])}>{children}</main>
}

export function AppSidebarNav({ className, children }: AppSidebarGenericProps) {
  return <nav className={cn(['', className])}>{children}</nav>
}

export function AppSidebarNavHeader({
  className,
  children,
}: AppSidebarGenericProps) {
  return <header className={cn(['', className])}>{children}</header>
}

export function AppSidebarNavHeaderTitle({
  className,
  children,
}: AppSidebarGenericProps) {
  return (
    <div
      className={cn([
        'text-[0.6rem] uppercase text-muted-foreground ml-3',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export function AppSidebarNavMain({
  className,
  children,
}: AppSidebarGenericProps) {
  return <main className={cn(['flex flex-col', className])}>{children}</main>
}

type AppSidebarNavLinkProps = {
  href: string
  active?: boolean
}

export function AppSidebarNavLink({
  className,
  children,
  href,
  active,
}: AppSidebarGenericProps<AppSidebarNavLinkProps>) {
  return (
    <Link
      href={href}
      className={cn([
        'flex items-center text-xs p-2 rounded-md hover:bg-secondary',
        active && 'bg-secondary',
        className,
      ])}
    >
      <span className="text-[14px]">{children}</span>
    </Link>
  )
}

export function AppSidebarFooter({
  className,
  children,
}: AppSidebarGenericProps) {
  return (
    <footer className={cn(['p-6 mt-auto border-t border-border', className])}>
      {children}
    </footer>
  )
}
