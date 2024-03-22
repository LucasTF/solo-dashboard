"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { User } from "@prisma/client";

import Button from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { UserModalSchema } from "@/schemas";
import { createNewUser } from "@/lib/actions/data/users";
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
      const response = await createNewUser(formData);
      if (response.success) {
        setTableData((prevState) => {
          const newData = {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            isAdmin: response.data.isAdmin,
          };
          prevState.push(newData);
          return prevState;
        });
        reset();
        toast("Usuário criado com sucesso!", { type: "success" });
      } else {
        console.error(response.error);
        toast(response.error, { type: "error" });
      }
      closeModal(true);
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
