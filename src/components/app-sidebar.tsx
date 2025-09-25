import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
 type itemObj={
  title:string,
  url:string,
  icon:string,
 }
// Menu items.
const items:itemObj[]= [
  {
    title: "Profile",
    url: "/settings",
    icon: 'circle-user',
  },
  {
    title: "Security",
    url: "/settings/security",
    icon: 'lock',
  },
  {
    title: "Addresses",
    url: "/settings/address",
    icon: 'location-dot',
  },
  {
    title: "Order History",
    url: "/allorders",
    icon: 'box',
  }
]

export function AppSidebar() {
  return (
    <Sidebar className="pt-[70px]" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-poppins text-xl mb-2">User Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                    <i className={`fa-solid fa-${item.icon} text-xl text-slate-400`}></i>
                      <span className="font-poppins text-md font-bold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}