"use server";

import { db } from "@/lib/db";
import { ServerResponse } from "@/types/ServerResponse";
import { deleteFileLegacy } from "./legacy/arquivos";

const isLegacy = process.env.USE_LEGACY_TABLES === "true";

export async function getArchivesById(obraId: number) {}

export async function deleteFile(fileId: number): Promise<ServerResponse> {
  try {
    if (isLegacy) return await deleteFileLegacy(fileId);

    await db.arquivo.delete({ where: { id: fileId } });

    return { success: true, message: "Arquivo deletado com sucesso!" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Não foi possível deletar o arquivo." };
  }
}
