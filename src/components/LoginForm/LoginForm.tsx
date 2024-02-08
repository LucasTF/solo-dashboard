"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import {
  EnvelopeIcon,
  KeyIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";

import { LoginSchema } from "@/schemas";
import { useSessionStore } from "@/lib/stores/session";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Button from "../ui/Button";
import Field from "../ui/Field";
import { login } from "@/lib/actions/auth/login";
import { useTransition } from "react";
import { toast, ToastContainer } from "react-toastify";

type LoginCredentials = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const { createSession } = useSessionStore();

  const router = useRouter();

  const loginHandler = (credentials: LoginCredentials) => {
    startTransition(async () => {
      try {
        const response = await login(credentials);
        if (response.success) {
          const { email, name, surname } = response.user;
          createSession({ email, name, surname });
          toast("Login realizado com sucesso! Redirecionando...", {
            type: "success",
            autoClose: 1000,
            onClose: () => router.push(DEFAULT_LOGIN_REDIRECT),
          });
        } else toast(response.message, { type: "error" });
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <header className="bg-slate-300 text-center mb-4 border-b-2 border-solid border-slate-400 px-8 py-4 rounded-t-md">
        <Image
          src="/img/solo-logo.png"
          alt="Solo"
          width="128"
          height="128"
          className="mx-auto my-2"
          priority
        />
        <h3 className="font-bold">Bem-Vindo</h3>
      </header>

      <form
        className="flex flex-col gap-4 px-8 pb-8"
        onSubmit={handleSubmit((credentials) => loginHandler(credentials))}
      >
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="email@host.com"
          icon={<EnvelopeIcon className="w-5 h-5" />}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          disabled={isPending}
          {...register("email")}
        />

        <Field
          label="Senha"
          id="password"
          type="password"
          placeholder="******"
          icon={<KeyIcon className="w-5 h-5" />}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          disabled={isPending}
          {...register("password")}
        />

        <Button disabled={isPending}>
          {isPending ? (
            <>Processando...</>
          ) : (
            <>
              <LockOpenIcon className="w-5 h-5" />
              Entrar
            </>
          )}
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
