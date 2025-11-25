export type UserRole = "COLABORADOR" | "GESTOR_RH" | "ADMIN";

export type UserStatus = "ATIVO" | "INATIVO";

export interface User {
  id: string;
  nome: string;
  email: string;
  username: string;
  senha: string;
  cpf: string;
  papel: UserRole;
  telefone: string;
  status: UserStatus;
  dadosBancarios: {
    banco: string;
    agencia: string;
    conta: string;
  };
}

export type BenefitCategory = "ALIMENTACAO" | "SAUDE" | "OUTROS";

export type BenefitStatus = "ATIVO" | "SUSPENSO";

export interface Benefit {
  id: string;
  userId: string;
  nome: string;
  categoria: BenefitCategory;
  status: BenefitStatus;
  valor: string;
  descricao: string;
}

export type MessageStatus = "PENDENTE" | "EM_ANALISE" | "RESPONDIDA";

export interface Message {
  id: string;
  userId: string;
  titulo: string;
  conteudo: string;
  dataHora: string;
  status: MessageStatus;
}

export type LogEventType =
  | "LOGIN"
  | "LOGOUT"
  | "ATUALIZACAO_DADOS"
  | "NOVO_BENEFICIO"
  | "ALTERACAO_BENEFICIO"
  | "MENSAGEM_ENVIADA";

export interface Log {
  id: string;
  dataHora: string;
  usuario: string;
  userId: string;
  tipoEvento: LogEventType;
  descricao: string;
}
