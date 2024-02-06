import { obrasStructure } from "@/lib/structures/dashboard/structures";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha inválida"),
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
