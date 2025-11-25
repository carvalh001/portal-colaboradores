import { useAuth } from "@/contexts/AuthContext";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import {
  Home,
  Gift,
  User,
  MessageSquare,
  Users,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();

  const menuItems = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/beneficios", icon: Gift, label: "Meus benefícios" },
    { to: "/meus-dados", icon: User, label: "Meus dados" },
    { to: "/mensagens", icon: MessageSquare, label: "Mensagens para RH" },
  ];

  const adminMenuItems: Array<{ to: string; icon: any; label: string }> = [];
  
  if (user?.papel === "GESTOR_RH" || user?.papel === "ADMIN") {
    adminMenuItems.push(
      { to: "/admin/colaboradores", icon: Users, label: "Colaboradores" },
      { to: "/admin/logs", icon: FileText, label: "Logs" }
    );
  }
  
  if (user?.papel === "ADMIN") {
    adminMenuItems.push({
      to: "/admin/usuarios",
      icon: Users,
      label: "Usuários & Papéis",
    });
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between border-b border-sidebar-border p-4 md:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground">
              Menu
            </span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onClose()}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}

            {adminMenuItems.length > 0 && (
              <>
                <div className="my-4 border-t border-sidebar-border" />
                <div className="px-3 py-2 text-xs font-semibold uppercase text-sidebar-foreground/60">
                  Administração
                </div>
                {adminMenuItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => onClose()}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </NavLink>
                ))}
              </>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}
