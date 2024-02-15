"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { NewObraSchema, SearchFilter } from "@/schemas";
import { Obra } from "@/types/obraType";
import { formatYYYYMMDD } from "@/lib/utils/dateFormatter";
import { ServerResponse } from "@/types/serverResponseType";
import {
  getObraByIdLegacy,
  getTableObrasLegacy,
  insertNewObraLegacy,
  searchObrasLegacy,
} from "./legacy/obras";

export async function getTableObras() {
  try {
    if (process.env.USE_LEGACY_TABLES) return await getTableObrasLegacy();

    const obras: Obra[] = await db.obra.findMany({
      select: {
        id: true,
        nome: true,
        ano: true,
        tipo_logo: true,
        logradouro: true,
        cidade: true,
        bairro: true,
        uf: true,
        cliente: true,
        proprietario: true,
      },
    });

    return obras;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getObraById(id: number) {
  try {
    if (process.env.USE_LEGACY_TABLES) return await getObraByIdLegacy(id);

    const obra: Obra = await db.obra.findUnique({ where: { id } });

    return obra;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function searchObras(searchFilter: SearchFilter) {
  try {
    if (process.env.USE_LEGACY_TABLES)
      return await searchObrasLegacy(searchFilter);

    const obras: Obra[] = await db.obra.findMany({
      select: {
        id: true,
        nome: true,
        ano: true,
        tipo_logo: true,
        logradouro: true,
        cidade: true,
        bairro: true,
        uf: true,
        cliente: true,
        proprietario: true,
      },
      where: {
        [searchFilter.column]: {
          contains: searchFilter.search,
        },
      },
    });

    return obras;
  } catch (error) {
    console.log(error);
    return [];
  }
}

type ObraData = z.infer<typeof NewObraSchema>;

export async function insertNewObra(obra: ObraData): Promise<ServerResponse> {
  try {
    if (process.env.USE_LEGACY_TABLES) return await insertNewObraLegacy(obra);

    const data = {
      nome: obra.nome,
      num_obra: obra.num_obra,
      sp_sondagem: obra.sp_sondagem,
      metros_sp_sondagem: obra.metros_sp_sondagem,
      STTrado: obra.STTrado,
      STTradoml: obra.STTradoml,
      data_inicio: formatYYYYMMDD(obra.data_inicio),
      data_fim: formatYYYYMMDD(obra.data_fim),
      ano: obra.ano,
      tipo_logo: obra.tipo_logo,
      cidade: obra.cidade,
      uf: obra.uf,
      logradouro: obra.logradouro,
      complemento_logo: obra.complemento,
      bairro: obra.bairro,
      lote: obra.lote,
      quadra: obra.quadra,
      cliente: obra.cliente,
      proprietario: obra.proprietario,
    };

    await db.obra.create({
      data,
    });

    return { success: true, message: "Obra criada com sucesso!" };
  } catch (error) {
    return { success: false, error: "Erro ao criar a obra." };
  }
}
