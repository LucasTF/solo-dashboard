"use server";

import { db } from "@/lib/db";
import { DataResponse } from "@/types/ServerResponse";

type HomeData = {
  totalObras: number;
  totalFiles: number;
  obrasPerYear: {
    ano: number;
    total: string;
  }[];
};

const isLegacy = process.env.USE_LEGACY_TABLES === "true";

export async function getHomeData(): Promise<DataResponse<HomeData>> {
  try {
    let numObras, numFiles, numObrasPerYear;

    if (isLegacy) {
      numObras = db.tbobras.count();
      numFiles = db.tbarquivos.count();
      numObrasPerYear = db.$queryRaw`SELECT tb.anoobra as 'ano', CAST(COUNT(tb.anoobra) AS CHAR CHARACTER SET utf8) as 'total' FROM tbobras as tb WHERE tb.anoobra >= ${
        new Date().getFullYear() - 10
      } GROUP BY tb.anoobra;`;
    } else {
      numObras = db.obra.count();
      numFiles = db.arquivo.count();
      numObrasPerYear = db.$queryRaw`SELECT tb.ano as 'ano', CAST(COUNT(tb.anoobra) AS CHAR CHARACTER SET utf8) as 'total' FROM Obras as tb WHERE tb.ano >= ${
        new Date().getFullYear() - 10
      } GROUP BY tb.ano;`;
    }

    const [totalObras, totalFiles, obrasPerYear] = await Promise.all([
      numObras,
      numFiles,
      numObrasPerYear,
    ]);

    return {
      success: true,
      data: {
        totalObras,
        totalFiles,
        obrasPerYear,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao recuperar dados." };
  }
}
