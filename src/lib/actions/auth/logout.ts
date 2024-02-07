"use server";

import { cookies } from "next/headers";

export async function logout() {
  cookies().delete("jwt");

  return { response: "Logout realizado com sucesso." };
}
