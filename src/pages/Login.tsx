import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login, loginAsPreset } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(usernameOrEmail, senha);
    if (success) {
      navigate("/home");
    } else {
      toast({
        title: "Erro ao entrar",
        description: "Usuário ou senha inválidos.",
        variant: "destructive",
      });
    }
  };

  const handleQuickLogin = (userId: string, name: string) => {
    loginAsPreset(userId);
    toast({
      title: "Login realizado",
      description: `Bem-vindo(a), ${name}!`,
    });
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold md:text-3xl">
            Portal de Benefícios do Colaborador
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Acesse seus benefícios e informações pessoais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-2 rounded-lg bg-info/10 p-3 text-sm text-info">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              <strong>Ambiente de demonstração</strong> - Use suas credenciais ou login rápido com dados fictícios.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Usuário ou E-mail
              </label>
              <Input
                type="text"
                placeholder="Digite seu usuário ou e-mail"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Senha
              </label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Entrar
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Ou login rápido (demo)
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => handleQuickLogin("1", "Maria Santos")}
            >
              <User className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Maria Santos</div>
                <div className="text-xs text-muted-foreground">Colaboradora</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => handleQuickLogin("2", "João Silva")}
            >
              <User className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">João Silva</div>
                <div className="text-xs text-muted-foreground">Gestor RH</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => handleQuickLogin("3", "Ana Admin")}
            >
              <User className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Ana Admin</div>
                <div className="text-xs text-muted-foreground">Admin</div>
              </div>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Não tem cadastro?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Criar conta
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Ambiente de demonstração com dados fictícios
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
