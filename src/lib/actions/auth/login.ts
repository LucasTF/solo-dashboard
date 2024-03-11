"use server";

import bcrypt from "bcrypt";
import { SignJWT } from "jose";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

import { User } from "@/types/data/User";
import { LoginResponse } from "@/types/LoginResponse";

import { cookies } from "next/headers";
import { getJwtSecretKey } from "../../jwt";

const ERROR_MESSAGE = "Email ou senha inválidos.";

export async function login(
  credentials: z.infer<typeof LoginSchema>
): Promise<LoginResponse> {
  const result = LoginSchema.safeParse(credentials);

  if (result.success) {
    const { email, password } = credentials;
    const user: User = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return { success: false, message: ERROR_MESSAGE };

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) return { success: false, message: ERROR_MESSAGE };

    try {
      if (user.isAdmin) {
        const adminToken = await new SignJWT({ id: user.id })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("30 days")
          .sign(getJwtSecretKey(true));

        cookies().set("adminJwt", adminToken, {
          httpOnly: true,
          secure: !process.env.DISABLE_HTTPS,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30, // 30 Days
        });
      }
      const token = await new SignJWT({ id: user.id })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30 days")
        .sign(getJwtSecretKey(false));

      cookies().set("jwt", token, {
        httpOnly: true,
        secure: !process.env.DISABLE_HTTPS,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 Days
      });

      return {
        success: true,
        user: {
          name: user.name,
          surname: user.surname,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      };
    } catch (error) {
      return { success: false, message: "Algo de errado ocorreu!" };
    }
  }

  return { success: false, message: ERROR_MESSAGE };
}
