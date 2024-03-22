import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";

import { Arquivo } from "@prisma/client";
import { DataResponse } from "@/types/ServerResponse";

import {
  registerFilesToDatabase,
  uploadFilesToServer,
} from "@/lib/services/filesServices";

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
    const anoDb = await db.obra.findUnique({
      select: { ano: true },
      where: { id: Number(obraId) },
    });
    if (anoDb === null)
      return NextResponse.json(
        { success: false, error: "Código de obra não encontrado!" },
        { status: 400 }
      );
    ano = anoDb.ano;
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

  const registeredFiles = await db.arquivo.findMany({
    where: {
      obraId: Number(obraId),
    },
  });

  return NextResponse.json({
    success: true,
    message: "Arquivo salvo com sucesso!",
    data: registeredFiles,
  });
}
