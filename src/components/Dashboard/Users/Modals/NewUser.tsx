"use client";

import User from "@/types/data/User";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import { Field } from "@/components/ui/Fields";
import { UserModalSchema } from "@/schemas";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";
import { useTableStore } from "@/lib/stores/table";

type UserForm = User & { confirmPassword: string };

type NewUserProps = {
  closeModal: Function;
};

const NewUser = ({ closeModal }: NewUserProps) => {
  const [isPending, startTransition] = useTransition();

  const { setTableData } = useTableStore();

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
      // TODO: Use Flask API to create new user
    });
  };

  const formBuilder = () => {
    if (isPending) return <Loading />;
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
        <Field.Checkbox
          label="Administrador"
          type="checkbox"
          {...register("isAdmin")}
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

export default NewUser;
