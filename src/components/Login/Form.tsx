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
import Button from "../ui/Button";
import { Field } from "../ui/Fields";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner";
import { useTheme } from "next-themes";

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

  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { createSession } = useSessionStore();

  const router = useRouter();

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const loginHandler = (credentials: LoginCredentials) => {
    startTransition(async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URI + "/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        toast("Não foi possível realizar o login.", { type: "error" });
        return;
      }

      const data = await response.json();

      createSession({
        name: data.name,
        email: data.email,
        isAdmin: data.is_admin,
      });

      toast("Login realizado com sucesso.");
    });
  };

  return (
    <section className="md:w-96 bg-slate-200 dark:bg-zinc-800 rounded-md shadow-xl">
      <header className="bg-slate-300 dark:bg-gray-800 text-center mb-4 border-b-2 border-solid border-slate-400 dark:border-zinc-900 px-8 py-4 rounded-t-md">
        <Image
          src={
            mounted && resolvedTheme === "dark"
              ? "/img/solo-logo-light.png"
              : "/img/solo-logo.png"
          }
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
        <Field.Input
          label="Email"
          id="email"
          type="email"
          placeholder="email@host.com"
          icon={<EnvelopeIcon className="size-5" />}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          disabled={isPending}
          {...register("email")}
        />

        <Field.Input
          label="Senha"
          id="password"
          type="password"
          placeholder="******"
          icon={<KeyIcon className="size-5" />}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          disabled={isPending}
          {...register("password")}
        />

        <Button
          color={mounted && resolvedTheme === "dark" ? "indigo" : "blue"}
          disabled={isPending}
          className="font-semibold"
        >
          {isPending ? (
            <Spinner size="sm" />
          ) : (
            <>
              <LockOpenIcon className="size-5" />
              Entrar
            </>
          )}
        </Button>
      </form>
    </section>
  );
};

export default LoginForm;
