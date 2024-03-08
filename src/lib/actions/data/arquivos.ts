"use server";

import { db } from "@/lib/db";
import { ServerResponse } from "@/types/ServerResponse";
import { deleteFileLegacy } from "./legacy/arquivos";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

const isLegacy = process.env.USE_LEGACY_TABLES === "true";

export async function getArchivesById(obraId: number) {}

export async function deleteFile(fileId: number): Promise<ServerResponse> {
  const adminToken = cookies().get("adminJwt");

  if (!adminToken)
    return { success: false, error: "Autorização insuficiente." };
  const isValidAdmin = (await verifyJwt(adminToken.value, true)) !== null;
  if (!isValidAdmin)
    return { success: false, error: "Autorização insuficiente." };

  try {
    if (isLegacy) return await deleteFileLegacy(fileId);

    await db.arquivo.delete({ where: { id: fileId } });

    return { success: true, message: "Arquivo deletado com sucesso!" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Não foi possível deletar o arquivo." };
  }
}
