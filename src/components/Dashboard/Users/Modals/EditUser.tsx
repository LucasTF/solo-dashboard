"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { User } from "@prisma/client";

import Button from "@/components/ui/Button";
import { Field } from "@/components/ui/Fields";
import { UserEditModalSchema } from "@/schemas";
import { updateUser } from "@/lib/actions/data/users";
import Loading from "@/components/ui/Loading";

type UserForm = Omit<User, "id" | "password">;

type EditUserProps = {
  user: User;
  closeModal: Function;
};

const EditUser = ({ user, closeModal }: EditUserProps) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(UserEditModalSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });

  const submitHandler = (formData: UserForm) => {
    startTransition(async () => {
      const response = await updateUser(user.id, formData);
      if (response.success) {
        toast(response.message, { type: "success" });
      } else {
        toast(response.error, { type: "error" });
      }
      closeModal();
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
          {...register("email")}
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
          Atualizar usuário
        </Button>
      </form>
    );
  };

  return formBuilder();
};

export default EditUser;
