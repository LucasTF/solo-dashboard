"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import { Field } from "@/components/ui/Fields";
import { ResetPasswordModalSchema } from "@/schemas";
import { resetUserPassword } from "@/lib/actions/data/users";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";

type ResetPasswordForm = { password: string; confirmPassword: string };

type EditUserProps = {
  userId: number;
  closeModal: Function;
};

const ResetPassword = ({ userId, closeModal }: EditUserProps) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordModalSchema),
  });

  const submitHandler = (formData: ResetPasswordForm) => {
    startTransition(async () => {
      const response = await resetUserPassword(userId, formData.password);
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
          label="Nova senha"
          type="password"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          placeholder="******"
          {...register("password")}
        />
        <Field.Input
          label="Confirmar nova senha"
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
          Atualizar senha
        </Button>
      </form>
    );
  };

  return formBuilder();
};

export default ResetPassword;
