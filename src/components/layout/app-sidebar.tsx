import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import {
  LayoutDashboard,
  BookText,
  LineChart,
  PieChart,
  Shield,
  Settings,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/records", icon: BookText, label: "Farm Records" },
  { href: "/dashboard/yield-prediction", icon: LineChart, label: "Yield Prediction" },
  { href: "/dashboard/analysis", icon: PieChart, label: "Cost Analysis" },
  { href: "/dashboard/admin", icon: Shield, label: "Admin Panel" },
];

export function AppSidebar() {
  // NOTE: This is a simplified active state check.
  // In a real app, you'd use `usePathname` from `next/navigation`
  // which would make this a client component.
  const isActive = (href: string) => typeof window !== 'undefined' && window.location.pathname === href;

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <h2 className="font-headline text-lg font-semibold tracking-tight">
            BayanihanAgri
          </h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                // isActive={isActive(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: "Settings" }}>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: "Support" }}>
              <HelpCircle />
              <span>Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
