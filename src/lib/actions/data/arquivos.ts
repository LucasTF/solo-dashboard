"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { ServerResponse } from "@/types/ServerResponse";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

export async function deleteFile(fileId: number): Promise<ServerResponse> {
  const adminToken = cookies().get("adminJwt");

  if (!adminToken)
    return { success: false, error: "Autorização insuficiente." };
  const isValidAdmin = (await verifyJwt(adminToken.value, true)) !== null;
  if (!isValidAdmin)
    return { success: false, error: "Autorização insuficiente." };

  try {
    await db.arquivo.delete({ where: { id: fileId } });

    revalidatePath("/dashboard");

    return { success: true, message: "Arquivo deletado com sucesso!" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Não foi possível deletar o arquivo." };
  }
}
