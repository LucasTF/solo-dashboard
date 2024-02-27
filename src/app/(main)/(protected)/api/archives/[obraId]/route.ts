import { registerArchivesToDatabase } from "@/lib/services/archiveServices";
import { ServerResponse } from "@/types/ServerResponse";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { obraId: string } }
): Promise<NextResponse<ServerResponse>> {
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

  const response = await registerArchivesToDatabase(Number(obraId), files);

  if (!response.success) return NextResponse.json(response, { status: 400 });

  return NextResponse.json(response);
}
