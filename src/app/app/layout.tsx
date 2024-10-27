"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { ChevronsUpDown, Home, LogOut, Settings } from "lucide-react";
import { PropsWithChildren } from "react";
import { getInitials } from "./utils/get-initials";

import { SignOut } from "@/lib/auth-action";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Início",
      url: "/app",
      icon: Home,
    },
    {
      title: "Configurações",
      url: "/app/settings",
      icon: Settings,
    },
  ],
};

export default function Layout({ children }: PropsWithChildren) {
  const session = useSession().data;
  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || "";
  const initials = getInitials(userName);

  const pathname = usePathname();
  const currentPageName = data.navMain.filter(
    (item) => item.url === pathname
  )[0].title;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as unknown as undefined
      }
    >
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(
                    "hover:bg-gray-400/20 rounded-md",
                    pathname === item.url && "bg-gray-400/20"
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:bg-gray-400/20">
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userImage} alt={userName} />
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
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
              <DropdownMenuItem
                onClick={SignOut}
                className="flex outline-none cursor-pointer items-center hover:bg-gray-400/20 p-2 rounded-lg"
              >
                <LogOut size={16} />
                <span className="text-base ml-2">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="-mr-2.5 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/app">{currentPageName}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col pl-[18px]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
