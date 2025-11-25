import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UserRole } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";

const Users = () => {
  const { users, updateUserRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleRoleChange = (userId: string, newRole: UserRole, userName: string) => {
    updateUserRole(userId, newRole);
    toast({
      title: "Papel atualizado",
      description: `${userName} agora é ${getRoleName(newRole)}.`,
    });
  };

  const getRoleName = (role: UserRole) => {
    const roleNames = {
      COLABORADOR: "Colaborador",
      GESTOR_RH: "Gestor RH",
      ADMIN: "Admin",
    };
    return roleNames[role];
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    const variants = {
      COLABORADOR: "secondary",
      GESTOR_RH: "default",
      ADMIN: "destructive",
    };
    return variants[role] as "default" | "secondary" | "destructive";
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Usuários e papéis
        </h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          Gerencie quem pode acessar o quê no sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Gestão de usuários
          </CardTitle>
          <CardDescription>
            Altere os papéis dos usuários para controlar suas permissões no sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="Buscar por nome, e-mail ou usuário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="rounded-md border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="p-3 text-left text-sm font-medium text-foreground">
                      Nome
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-foreground">
                      E-mail
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-foreground">
                      Usuário
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-foreground">
                      Papel
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border transition-colors hover:bg-muted/50"
                    >
                      <td className="p-3 text-sm text-foreground">
                        {user.nome}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        @{user.username}
                      </td>
                      <td className="p-3">
                        <Select
                          value={user.papel}
                          onValueChange={(value) =>
                            handleRoleChange(user.id, value as UserRole, user.nome)
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="COLABORADOR">
                              Colaborador
                            </SelectItem>
                            <SelectItem value="GESTOR_RH">
                              Gestor RH
                            </SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={
                            user.status === "ATIVO" ? "default" : "secondary"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Nenhum usuário encontrado com os critérios de busca.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sobre os papéis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant={getRoleBadgeVariant("COLABORADOR")}>
              Colaborador
            </Badge>
            <p className="text-sm text-muted-foreground">
              Acessa benefícios próprios, dados pessoais e mensagens para RH.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant={getRoleBadgeVariant("GESTOR_RH")}>Gestor RH</Badge>
            <p className="text-sm text-muted-foreground">
              Visualiza colaboradores, seus dados, benefícios e logs de eventos.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant={getRoleBadgeVariant("ADMIN")}>Admin</Badge>
            <p className="text-sm text-muted-foreground">
              Gerencia usuários e papéis do sistema (RBAC) + acesso total.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
