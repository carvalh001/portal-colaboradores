import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    username: "",
    senha: "",
    confirmSenha: "",
    cpf: "",
    telefone: "",
  });

  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmSenha) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (formData.senha.length < 6) {
      toast({
        title: "Erro no cadastro",
        description: "A senha deve ter no mínimo 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    register({
      nome: formData.nome,
      email: formData.email,
      username: formData.username,
      senha: formData.senha,
      cpf: formData.cpf,
      telefone: formData.telefone,
      dadosBancarios: {
        banco: "",
        agencia: "",
        conta: "",
      },
    });

    toast({
      title: "Cadastro realizado",
      description: "Sua conta foi criada com sucesso!",
    });

    navigate("/home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold md:text-3xl">
            Criar conta
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Cadastre-se para acessar o Portal de Benefícios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-2 rounded-lg bg-info/10 p-3 text-sm text-info">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Novas contas são criadas com perfil de <strong>Colaborador</strong>. Papéis avançados são configurados pelo Admin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Nome completo
              </label>
              <Input
                type="text"
                name="nome"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                E-mail
              </label>
              <Input
                type="email"
                name="email"
                placeholder="seu.email@empresa.com.br"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Nome de usuário
              </label>
              <Input
                type="text"
                name="username"
                placeholder="usuario"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                CPF
              </label>
              <Input
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Telefone
              </label>
              <Input
                type="tel"
                name="telefone"
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Senha
              </label>
              <Input
                type="password"
                name="senha"
                placeholder="Mínimo 6 caracteres"
                value={formData.senha}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Confirmar senha
              </label>
              <Input
                type="password"
                name="confirmSenha"
                placeholder="Digite a senha novamente"
                value={formData.confirmSenha}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Cadastrar
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
