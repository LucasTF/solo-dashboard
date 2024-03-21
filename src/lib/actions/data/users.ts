"use server";

import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import { SearchFilters } from "@/types/SearchFilters";
import { ServerResponse } from "@/types/ServerResponse";
import { User, UserNopass } from "@/types/data/User";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { z } from "zod";
import { UserEditModalSchema } from "@/schemas";
import { DataResponse } from "@/types/ServerResponse";

type UserUpdateData = z.infer<typeof UserEditModalSchema>;

export async function getAllUsers() {
  try {
    const users: UserNopass[] = await db.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        isAdmin: true,
      },
    });

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function searchUsers(searchFilters: SearchFilters) {
  try {
    const users: UserNopass[] = await db.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        isAdmin: true,
      },
      where: {
        [searchFilters.column]: {
          contains: searchFilters.search,
        },
      },
    });

    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateUser(
  id: number,
  userUpdateData: UserUpdateData
): Promise<ServerResponse> {
  try {
    await db.user.update({
      data: userUpdateData,
      where: {
        id,
      },
    });

    return { success: true, message: "Usuário atualizado com sucesso!" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao atualizar dados do usuário." };
  }
}

export async function getUserById(id: number) {
  try {
    const user = await db.user.findUnique({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        isAdmin: true,
      },
      where: { id },
    });

    return user;
  } catch (error) {
    console.log(error);
    return {} as User;
  }
}

export async function createNewUser(
  user: Omit<User, "id">
): Promise<DataResponse<User>> {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const data = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: hashedPassword,
      isAdmin: user.isAdmin,
    };

    const newUser = await db.user.create({ data });

    if (newUser === null)
      return { success: false, error: "Não foi possível cadastrar o usuário." };

    return { success: true, data: newUser };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          error: "O email inserido já está cadastrado.",
        };
      }
    }
    console.error(error);
    return { success: false, error: "Não foi possível cadastrar o usuário." };
  }
}

export async function deleteUser(id: number): Promise<ServerResponse> {
  try {
    await db.user.delete({ where: { id } });
    return { success: true, message: "Usuário deletado com sucesso." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Não foi possível deletar o usuário." };
  }
}

export async function resetUserPassword(
  id: number,
  password: string
): Promise<ServerResponse> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id,
      },
    });

    return { success: true, message: "Senha atualizada com sucesso!" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Não foi possível atualizar a senha." };
  }
}
