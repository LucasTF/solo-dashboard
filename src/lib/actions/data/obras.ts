"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { NewObraSchema, SearchFilter } from "@/schemas";
import { Obra } from "@/types/obraType";
import { formatFullYear } from "@/lib/utils/dataFormatter";
import { ServerResponse } from "@/types/serverResponseType";

export async function getObras() {
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
}

export async function getObraById(id: number) {
  const obra: Obra = await db.obra.findUnique({ where: { id } });

  return obra;
}

export async function searchObras(searchFilter: SearchFilter) {
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
}

type ObraData = z.infer<typeof NewObraSchema>;

export async function insertNewObra(obra: ObraData): Promise<ServerResponse> {
  const data = {
    nome: obra.nome,
    num_obra: obra.num_obra,
    sp_sondagem: obra.sp_sondagem,
    metros_sp_sondagem: obra.metros_sp_sondagem,
    STTrado: obra.STTrado,
    STTradoml: obra.STTradoml,
    data_inicio: formatFullYear(obra.data_inicio),
    data_fim: formatFullYear(obra.data_fim),
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

  try {
    await db.obra.create({
      data,
    });

    return { success: true, message: "Obra criada com sucesso!" };
  } catch (error) {
    return { success: false, error: "Erro ao criar a obra." };
  }
}
