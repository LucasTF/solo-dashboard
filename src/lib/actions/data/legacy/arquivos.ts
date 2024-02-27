"use server";

import { db } from "@/lib/db";
import { ServerResponse } from "@/types/ServerResponse";
import { Obra } from "@/types/data/Obra";
import { Prisma } from "@prisma/client";

export async function createArchivesLegacy(
  obra: Obra,
  data: File[]
): Promise<ServerResponse> {
  const dbData: Prisma.tbarquivosCreateManyInput[] = data.map((file) => {
    const extStart = file.name.lastIndexOf(".");
    const extension = file.name.slice(extStart + 1, file.name.length);
    return {
      obraCod: obra.id,
      nome: file.name,
      formato: extension.toUpperCase(),
    };
  });

  await db.tbarquivos.createMany({
    data: dbData,
  });

  return {
    success: true,
    message: "Arquivo(s) registrados com sucesso!",
  };
}
