import { Obra } from "@/types/data/Obra";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import { ServerResponse } from "@/types/ServerResponse";

const isLegacy = process.env.USE_LEGACY_TABLES === "true";

// TODO: Implement upload to Static Files Server
export async function uploadToServer() {}

export async function registerArchivesToDatabase(
  obraId: number,
  files: File[]
): Promise<ServerResponse> {
  try {
    if (isLegacy) return registerArchivesToDatabaseLegacy(obraId, files);

    const dbData: Prisma.ArquivoCreateManyInput[] = files.map((file) => {
      const extStart = file.name.lastIndexOf(".");
      const extension = file.name.slice(extStart + 1, file.name.length);
      return {
        obraId,
        nome: file.name,
        formato: extension.toUpperCase(),
      };
    });

    await db.arquivo.createMany({
      data: dbData,
    });

    return {
      success: true,
      message: "Arquivo(s) registrados com sucesso!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Não foi possível registrar o(s) arquivo(s).",
    };
  }
}

async function registerArchivesToDatabaseLegacy(
  obraId: number,
  files: File[]
): Promise<ServerResponse> {
  const dbData: Prisma.tbarquivosCreateManyInput[] = files.map((file) => {
    const extStart = file.name.lastIndexOf(".");
    const extension = file.name.slice(extStart + 1, file.name.length);
    return {
      obraCod: obraId,
      nome: file.name,
      formato: extension.toUpperCase(),
    };
  });

  const archives = await db.tbarquivos.createMany({
    data: dbData,
  });

  console.log(archives);

  return {
    success: true,
    message: "Arquivo(s) registrados com sucesso!",
  };
}
