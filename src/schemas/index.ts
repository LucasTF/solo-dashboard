import * as z from "zod";

import { ObrasSearchOptionsEnum } from "@/enums";

export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha inválida"),
});

export const DashboardTableSearchSchema = z.object({
  search: z.string().min(1),
  column: z.nativeEnum(ObrasSearchOptionsEnum),
});
