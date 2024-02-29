import { Logradouro } from "@/enums/Logradouro";
import * as z from "zod";

const NUMBER = "Valor deve ser um número.";
const POSITIVE = "Valor deve ser maior ou igual a 0.";
const GREATER_THAN_0 = "Valor deve ser maior que 0.";
const CANNOT_BE_EMPTY = "Campo obrigatório.";
const INVALID_DATE = "Data inválida.";

export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha inválida"),
});

export const ObraModalSchema = z.object({
  sp: z
    .string()
    .min(8, "Deve conter apenas 8 caracteres")
    .max(8, "Deve conter apenas 8 caracteres"),
  num_obra: z.coerce.number().int().min(1, GREATER_THAN_0).max(999),
  sp_sondagem: z.coerce
    .number({ invalid_type_error: NUMBER })
    .int()
    .nonnegative(POSITIVE),
  metros_sp_sondagem: z.coerce
    .number({ invalid_type_error: NUMBER })
    .nonnegative(POSITIVE),
  STTrado: z.coerce
    .number({ invalid_type_error: NUMBER })
    .int()
    .nonnegative(POSITIVE),
  STTradoml: z.coerce
    .number({ invalid_type_error: NUMBER })
    .nonnegative(POSITIVE),
  ano: z.coerce.number().int().positive().min(1980),
  data_inicio: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === "invalid_date" ? INVALID_DATE : defaultError,
    }),
  }),
  data_fim: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === "invalid_date" ? INVALID_DATE : defaultError,
    }),
  }),
  uf: z.string().min(2).max(2),
  cidade: z.string().max(40),
  tipo_logo: z.nativeEnum(Logradouro),
  logradouro: z.string().min(1, CANNOT_BE_EMPTY).max(60),
  complemento: z.string().max(30),
  bairro: z.string().min(1, CANNOT_BE_EMPTY).max(40),
  lote: z.string().max(40),
  quadra: z.string().max(40),
  proprietario: z.string().max(60),
  cliente: z.string().min(1, CANNOT_BE_EMPTY).max(60),
});

export const ObrasSearchFiltersSchema = z.object({
  search: z.string().min(1).max(40),
  column: z.enum([
    "sp",
    "cidade",
    "bairro",
    "logradouro",
    "cliente",
    "proprietario",
  ]),
});
