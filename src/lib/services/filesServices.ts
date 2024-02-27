import { Prisma } from "@prisma/client";
import { db } from "../db";
import { ServerResponse } from "@/types/ServerResponse";
import { writeFile } from "fs/promises";
import fs from "fs";

const isLegacy = process.env.USE_LEGACY_TABLES === "true";

export async function uploadFilesToServer(
  ano: number,
  files: File[]
): Promise<ServerResponse> {
  try {
    files.forEach(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = `${process.env.UPLOADED_FILES_PATH}/${ano}`;

      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }

      await writeFile(path + `/${file.name}`, buffer);
    });

    return {
      success: true,
      message: "Arquivo salvo no armazenamento com sucesso!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Não foi possível salvar o arquivo no armazenamento.",
    };
  }
}

export async function registerFilesToDatabase(
  obraId: number,
  files: File[]
): Promise<ServerResponse> {
  try {
    if (isLegacy) return registerFilesToDatabaseLegacy(obraId, files);

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

async function registerFilesToDatabaseLegacy(
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

  return {
    success: true,
    message: "Arquivo(s) registrados com sucesso!",
  };
}
