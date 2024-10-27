import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'

interface AppPageProps {
  title: string
  path: string
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function AppPage({
  title,
  children,
  path,
  actions,
  className,
}: AppPageProps) {
  return (
    <SidebarInset className={cn(className)}>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 justify-between w-full">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1 mr-3" />
            <Separator orientation="vertical" className="-mr-2.5 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <Link href={path}>
                    <p>{title}</p>
                  </Link>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div>{actions}</div>
        </div>
      </header>
      <div className="flex flex-1 flex-col pl-[18px]">{children}</div>
    </SidebarInset>
  )
}
