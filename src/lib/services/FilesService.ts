import fs from "fs";

import { Prisma } from "@prisma/client";
import { db } from "../db";
import { ServerResponse } from "@/types/ServerResponse";
import { writeFile } from "fs/promises";
import { FileCategory } from "@/enums/FileCategory";
import { generateFilePath, generateFileURI } from "../utils/pathParser";

export async function uploadFilesToServer(
  ano: number,
  codObra: string,
  files: File[],
  categories: FileCategory[]
): Promise<ServerResponse> {
  try {
    for (let i = 0; i < files.length; i++) {
      const bytes = await files[i].arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadPath = generateFileURI(codObra, ano, categories[i]);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      await writeFile(uploadPath + `/${files[i].name}`, buffer);
    }

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
  ano: number,
  codObra: string,
  files: File[],
  categories: FileCategory[]
): Promise<ServerResponse> {
  try {
    const dbData: Prisma.ArquivoCreateManyInput[] = files.map((file, index) => {
      const extStart = file.name.lastIndexOf(".");
      const extension = file.name.slice(extStart + 1, file.name.length);
      return {
        obraId,
        nome: file.name,
        tipo: categories[index],
        formato: extension.toUpperCase(),
        caminho: generateFilePath(codObra, ano, categories[index]),
        criado_em: new Date(),
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
