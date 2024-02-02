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

import { Form } from "@/components/Form";

import { LoginSchema } from "@/schemas";
import { useSessionStore } from "@/lib/stores/session";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { createSession } = useSessionStore();

  const router = useRouter();

  const submitHandler = (credentials: any) => {
    createSession(credentials);
    router.push(DEFAULT_LOGIN_REDIRECT);
  };

  return (
    <>
      <Form.Head>
        <Image
          src="/img/solo-logo.png"
          alt="Solo"
          width="128"
          height="128"
          className="mx-auto my-2"
          priority
        />
        <h3 className="font-bold">Bem-Vindo</h3>
      </Form.Head>

      <Form.Base onSubmit={handleSubmit((onValid) => submitHandler(onValid))}>
        <Form.Field
          label="Email"
          name="email"
          type="email"
          placeholder="email@host.com"
          icon={<EnvelopeIcon className="w-5 h-5" />}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          validation={register("email")}
        />

        <Form.Field
          label="Senha"
          name="password"
          type="password"
          placeholder="******"
          icon={<KeyIcon className="w-5 h-5" />}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          validation={register("password")}
        />

        <Form.Button
          icon={<LockOpenIcon className="w-5 h-5" />}
          label="Entrar"
        />
      </Form.Base>
    </>
  );
};

export default LoginForm;
