"use server";

import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import { SearchFilters } from "@/types/SearchFilters";
import { ServerResponse } from "@/types/ServerResponse";
import { User } from "@/types/data/User";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export async function searchUsers(searchFilters: SearchFilters) {
  try {
    const users: User[] = await db.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
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

export async function getUserById(id: number) {
  try {
    const user: User = await db.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    console.log(error);
    return {} as User;
  }
}

export async function createNewUser(user: User): Promise<ServerResponse> {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const data = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: hashedPassword,
    };

    await db.user.create({ data });

    return { success: true, message: "Usuário criado com sucesso!" };
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
    return { success: false, error: "Erro ao criar o usuário." };
  }
}
