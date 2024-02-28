"use server";

import { db } from "@/lib/db";
import { ServerResponse } from "@/types/ServerResponse";

export async function deleteFileLegacy(
  fileId: number
): Promise<ServerResponse> {
  await db.tbarquivos.delete({ where: { id: fileId } });

  return { success: true, message: "Arquivo deletado com sucesso!" };
}
