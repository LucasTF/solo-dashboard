import { Logradouro } from "@/enums/Logradouro";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha inválida"),
});

export const NewObraSchema = z.object({
  nome: z.string().max(8),
  num_obra: z.number().int().positive(),
  ano: z.number().int().positive().min(1980),
  data_inicio: z.date(),
  data_fim: z.date(),
  uf: z.string().min(2).max(2),
  cidade: z.string().min(1).max(40),
  tipo_logo: z.nativeEnum(Logradouro),
  logradouro: z.string().min(1).max(40),
  complemento: z.string().min(1).max(30),
  bairro: z.string().min(1).max(40),
  lote: z.string().max(40),
  quadra: z.string().max(40),
  proprietario: z.string().min(1).max(40),
  cliente: z.string().min(1).max(40),
});

export const DashboardTableSearchSchema = z.object({
  search: z.string().min(1),
  column: z.string(),
});

export type SearchFilter = z.infer<typeof DashboardTableSearchSchema>;

export const ObrasSearchFilterSchema = z.object({
  search: z.string().min(1),
  column: z.enum(["nome", "bairro", "cidade", "cliente", "proprietario"]),
});
