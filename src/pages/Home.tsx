import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBenefits } from "@/mock/benefits";
import { mockMessages } from "@/mock/messages";
import { mockLogs } from "@/mock/logs";
import { mockUsers } from "@/mock/users";
import { Gift, MessageSquare, Calendar, Users, FileText } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Home = () => {
  const { user } = useAuth();

  if (!user) return null;

  const userBenefits = mockBenefits.filter((b) => b.userId === user.id && b.status === "ATIVO");
  const userMessages = mockMessages.filter((m) => m.userId === user.id);
  const recentLogs = mockLogs.slice(0, 3);
  const activeEmployees = mockUsers.filter((u) => u.status === "ATIVO");

  const lastAccess = "25/01/2024 às 14:30";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Olá, {user.nome.split(" ")[0]}!
        </h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          {user.papel === "ADMIN"
            ? "Administre usuários, papéis e acompanhe eventos críticos."
            : user.papel === "GESTOR_RH"
            ? "Visualize colaboradores, benefícios e eventos do portal."
            : "Aqui você acompanha seus benefícios, dados e mensagens com o RH."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Benefícios Ativos
            </CardTitle>
            <Gift className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBenefits.length}</div>
            <p className="text-xs text-muted-foreground">
              {user.papel === "GESTOR_RH" ? "Seu portfólio" : "Atualmente vinculados"}
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mensagens
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userMessages.length}</div>
            <p className="text-xs text-muted-foreground">
              Total de mensagens trocadas
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Último Acesso
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">{lastAccess}</div>
            <p className="text-xs text-muted-foreground">
              Data e horário
            </p>
          </CardContent>
        </Card>

{(user.papel === "GESTOR_RH" || user.papel === "ADMIN") && (
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Colaboradores Ativos
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeEmployees.length}</div>
              <p className="text-xs text-muted-foreground">
                Na empresa atualmente
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {user.papel === "GESTOR_RH" ? "Eventos Recentes" : "Últimas Atividades"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.papel === "GESTOR_RH" || user.papel === "ADMIN" ? (
            <div className="space-y-4">
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {log.usuario}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {log.tipoEvento.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {log.descricao}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(log.dataHora), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {userMessages.slice(0, 3).map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {msg.titulo}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          msg.status === "RESPONDIDA"
                            ? "bg-success/10 text-success"
                            : msg.status === "EM_ANALISE"
                            ? "bg-warning/10 text-warning"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {msg.status === "RESPONDIDA"
                          ? "Respondida"
                          : msg.status === "EM_ANALISE"
                          ? "Em análise"
                          : "Pendente"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(msg.dataHora), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
