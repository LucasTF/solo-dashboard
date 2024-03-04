"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { User } from "@/types/data/User";

import Button from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { UserModalSchema } from "@/schemas";
import { createNewUser } from "@/lib/actions/data/users";
import Loading from "@/components/ui/Loading";
import Success from "@/components/ui/Modals/Success";
import { toast } from "react-toastify";

type UserForm = User & { confirmPassword: string };

export const NewUser = () => {
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(UserModalSchema),
  });

  const submitHandler = (formData: UserForm) => {
    startTransition(async () => {
      const response = await createNewUser(formData);
      if (response.success) {
        reset();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        console.error(response.error);
        toast(response.error, { type: "error" });
      }
    });
  };

  const formBuilder = () => {
    if (isPending) return <Loading />;
    if (success) return <Success message="Usuário criado com sucesso!" />;
    return (
      <form
        className="m-4 space-y-4"
        autoComplete="off"
        onSubmit={handleSubmit((formData) => submitHandler(formData))}
      >
        <Field.Input
          label="Nome"
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          placeholder="Nome"
          {...register("name")}
        />
        <Field.Input
          label="Sobrenome"
          isInvalid={!!errors.surname}
          errorMessage={errors.surname?.message}
          placeholder="Sobrenome"
          {...register("surname")}
        />
        <Field.Input
          label="Email"
          type="email"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          placeholder="email@host.com"
          {...register("email")}
        />
        <Field.Input
          label="Senha"
          type="password"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          placeholder="******"
          {...register("password")}
        />
        <Field.Input
          label="Confirmar senha"
          type="password"
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          placeholder="******"
          {...register("confirmPassword")}
        />
        <Button
          type="submit"
          color="green"
          fontStrength="semibold"
          className="mx-auto"
        >
          Registrar usuário
        </Button>
      </form>
    );
  };

  return formBuilder();
};
