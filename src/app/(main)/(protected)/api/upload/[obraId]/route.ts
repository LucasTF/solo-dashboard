import { db } from "@/lib/db";
import {
  registerFilesToDatabase,
  uploadFilesToServer,
} from "@/lib/services/filesServices";
import { DataResponse, ServerResponse } from "@/types/ServerResponse";
import { Arquivo } from "@/types/data/Arquivo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { obraId: string } }
): Promise<NextResponse<DataResponse<Arquivo[]>>> {
  const searchParams = request.nextUrl.searchParams;
  const noWrite = searchParams.get("noWrite");
  const noDb = searchParams.get("noDb");

  const obraId = params.obraId;

  let files: File[];

  if (isNaN(Number(obraId)))
    return NextResponse.json({ success: false, error: "ID inválido." });

  try {
    const data = await request.formData();
    files = data.getAll("obra-file") as unknown as File[];

    if (files.length === 0)
      return NextResponse.json(
        {
          success: false,
          error: "Nenhum arquivo foi enviado!",
        },
        { status: 400 }
      );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Não foi possível processar os arquivos.",
      },
      { status: 400 }
    );
  }

  let ano: number;
  try {
    if (process.env.USE_LEGACY_TABLES === "true") {
      const anoDb = await db.tbobras.findUnique({
        select: { anoobra: true },
        where: { codobra: Number(obraId) },
      });
      ano = anoDb.anoobra;
    } else {
      const anoDb = await db.obra.findUnique({
        select: { ano: true },
        where: { id: Number(obraId) },
      });
      ano = anoDb.ano;
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Obra inválida!" },
      { status: 400 }
    );
  }

  // Uploads files to the static files server
  if (noWrite !== "true") {
    const resultUpload = await uploadFilesToServer(ano, files);
    if (!resultUpload.success)
      return NextResponse.json(resultUpload, { status: 400 });
  }

  // Register uploaded files onto the database
  if (noDb !== "true") {
    const resultRegister = await registerFilesToDatabase(Number(obraId), files);
    if (!resultRegister.success)
      return NextResponse.json(resultRegister, { status: 400 });
  }

  let registeredFiles;
  if (process.env.USE_LEGACY_TABLES === "true") {
    registeredFiles = await db.tbarquivos.findMany({
      where: {
        obraCod: Number(obraId),
      },
    });
  } else {
    registeredFiles = await db.arquivo.findMany({
      where: {
        obraId: Number(obraId),
      },
    });
  }

  return NextResponse.json({
    success: true,
    message: "Arquivo salvo com sucesso!",
    data: registeredFiles,
  });
}
