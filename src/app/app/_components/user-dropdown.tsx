import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { ChevronsUpDown } from 'lucide-react'

interface UserDropdownProps {
  userImage: string
  userName: string
  userEmail: string
  initials: string

  data: {
    navMain: {
      title: string
      action?: (() => Promise<never>) | (() => void)
      icon: React.ReactNode
    }[]
  }
}

export function UserDropdown({
  userEmail,
  userName,
  userImage,
  initials,
  data,
}: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:bg-secondary">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{userName}</span>
            <span className="truncate text-xs">{userEmail}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-gray-400/10 p-2 z-999"
        side="top"
        align="end"
        sideOffset={4}
      >
        {data.navMain.map((item) => (
          <DropdownMenuItem
            key={item.title}
            onClick={item.action}
            className="flex outline-none cursor-pointer items-center hover:bg-gray-400/20 p-2 rounded-lg"
          >
            {item.icon}
            <span className="text-base ml-2">{item.title}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
