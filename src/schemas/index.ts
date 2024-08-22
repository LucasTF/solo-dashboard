import * as z from "zod";

import { Logradouro } from "@/enums/Logradouro";

import { isValidCep } from "@/lib/validators/cep";

const NUMBER = "Deve ser um número.";
const NOT_NEGATIVE = "Deve ser maior ou igual a 0.";
const GREATER_THAN_0 = "Deve ser maior que 0.";
const CANNOT_BE_EMPTY = "Campo obrigatório.";
const INVALID_DATE = "Data inválida.";
const INVALID_EMAIL = "Email inválido.";
const INVALID_PASSWORD = "Senha inválida.";
const MAX_NUMBER = (maxNum: number) => `Valor deve ser menor que ${maxNum}`;
const MIN_CHARACTERS = (minChar: number) =>
  `Deve conter, no mínimo, ${minChar} caracteres.`;
const MAX_CHARACTERS = (maxChar: number) =>
  `Deve conter, no máximo, ${maxChar} caracteres.`;

export const LoginSchema = z.object({
  email: z.string().email(INVALID_EMAIL),
  password: z.string().min(1, INVALID_PASSWORD),
});

export const CodObraSchema = z
  .string()
  .min(8, MIN_CHARACTERS(8))
  .max(11, MAX_CHARACTERS(11))
  .regex(/^[A-Z]{2,3}\d{3}\/\d{2}$/gm, "Deve estar no formato 'SP000/00'");

export const ObraFormSchema = z.object({
  cod_obra: CodObraSchema,
  num_obra: z.coerce
    .number()
    .int()
    .min(1, GREATER_THAN_0)
    .max(999, MAX_NUMBER(999)),
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
  cidade: z.string().max(40, MAX_CHARACTERS(40)),
  tipo_logo: z.nativeEnum(Logradouro),
  logradouro: z.string().min(1, CANNOT_BE_EMPTY).max(120, MAX_CHARACTERS(120)),
  complemento_logo: z.string().max(120, MAX_CHARACTERS(120)),
  bairro: z.string().min(1, CANNOT_BE_EMPTY).max(40, MAX_CHARACTERS(40)),
  cep: z
    .string()
    .refine((value) => isValidCep(value), "Deve estar no formato '00000-000'"),
  lote: z.string().max(40, MAX_CHARACTERS(40)),
  quadra: z.string().max(40, MAX_CHARACTERS(40)),
  proprietario: z.string().max(60, MAX_CHARACTERS(60)),
  cliente: z.string().min(1, CANNOT_BE_EMPTY).max(120, MAX_CHARACTERS(120)),
  sondagem_percussao: z.optional(
    z.object({
      furos: z.coerce
        .number({ invalid_type_error: NUMBER })
        .int()
        .min(1, GREATER_THAN_0),
      metros: z.coerce
        .number({ invalid_type_error: NUMBER })
        .min(0, NOT_NEGATIVE),
    })
  ),
  sondagem_trado: z.optional(
    z.object({
      furos: z.coerce
        .number({ invalid_type_error: NUMBER })
        .int()
        .min(1, GREATER_THAN_0),
      metros: z.coerce
        .number({ invalid_type_error: NUMBER })
        .min(0, NOT_NEGATIVE),
    })
  ),
  sondagem_rotativa: z.optional(
    z.object({
      furos: z.coerce
        .number({ invalid_type_error: NUMBER })
        .int()
        .min(1, GREATER_THAN_0),
      metros_solo: z.coerce
        .number({ invalid_type_error: NUMBER })
        .min(0, NOT_NEGATIVE),
      metros_rocha: z.coerce
        .number({ invalid_type_error: NUMBER })
        .min(0, NOT_NEGATIVE),
    })
  ),
});

export const SearchSchema = z.string().min(1).max(100);

export const UserModalSchema = z
  .object({
    name: z.string().min(1, CANNOT_BE_EMPTY).max(30, MAX_CHARACTERS(30)),
    email: z.string().email(INVALID_EMAIL).max(40, MAX_CHARACTERS(40)),
    password: z
      .string()
      .min(6, MIN_CHARACTERS(6))
      .max(100, MAX_CHARACTERS(100)),
    confirmPassword: z
      .string()
      .min(6, MIN_CHARACTERS(6))
      .max(100, MAX_CHARACTERS(100)),
    isAdmin: z.boolean(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export const UserEditModalSchema = z.object({
  name: z.string().min(1, CANNOT_BE_EMPTY).max(100, MAX_CHARACTERS(100)),
  email: z.string().email(INVALID_EMAIL).max(40, MAX_CHARACTERS(40)),
  isAdmin: z.boolean(),
});

export const ResetPasswordModalSchema = z
  .object({
    password: z
      .string()
      .min(6, MIN_CHARACTERS(6))
      .max(100, MAX_CHARACTERS(100)),
    confirmPassword: z
      .string()
      .min(6, MIN_CHARACTERS(6))
      .max(100, MAX_CHARACTERS(100)),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });
