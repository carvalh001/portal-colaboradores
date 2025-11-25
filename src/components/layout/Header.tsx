import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-16 border-b border-border bg-card shadow-sm">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground md:text-xl">
            Portal de Benefícios
          </h1>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden flex-col items-end md:flex">
              <span className="text-sm font-medium text-foreground">
                {user.nome}
              </span>
              <span className="text-xs">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    user.papel === "ADMIN"
                      ? "bg-destructive/10 text-destructive"
                      : user.papel === "GESTOR_RH"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/50 text-secondary-foreground"
                  }`}
                >
                  {user.papel === "GESTOR_RH"
                    ? "Gestor RH"
                    : user.papel === "ADMIN"
                    ? "Admin"
                    : "Colaborador"}
                </span>
              </span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {getInitials(user.nome)}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
