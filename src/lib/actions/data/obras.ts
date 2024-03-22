"use server";

import * as z from "zod";
import { cookies } from "next/headers";

import { SearchFilters } from "@/types/SearchFilters";
import { ServerResponse } from "@/types/ServerResponse";

import { db } from "@/lib/db";
import { formatYYYYMMDD } from "@/lib/utils/dateFormatter";
import { verifyJwt } from "@/lib/jwt";
import { ObraModalSchema } from "@/schemas";
import { EntryObra, TableObra } from "@/types/data/Obra";

export async function getTableObras() {
  try {
    const obras = await db.obra.findMany({
      select: {
        id: true,
        cod_obra: true,
        ano: true,
        tipo_logo: true,
        logradouro: true,
        cidade: true,
        bairro: true,
        uf: true,
        cliente: {
          select: {
            nome: true,
          },
        },
        proprietario: {
          select: {
            nome: true,
          },
        },
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
    const obra: EntryObra | null = await db.obra.findUnique({
      where: { id },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
          },
        },
        proprietario: {
          select: {
            id: true,
            nome: true,
          },
        },
        arquivos: true,
      },
    });

    return obra;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function searchObras(searchFilters: SearchFilters) {
  try {
    const obras: TableObra[] = await db.obra.findMany({
      select: {
        id: true,
        cod_obra: true,
        ano: true,
        tipo_logo: true,
        logradouro: true,
        cidade: true,
        bairro: true,
        uf: true,
        cliente: {
          select: {
            nome: true,
          },
        },
        proprietario: {
          select: {
            nome: true,
          },
        },
      },
      where: {
        [searchFilters.column]: {
          contains: searchFilters.search,
        },
      },
      orderBy: {
        cod_obra: "desc",
      },
    });

    return obras;
  } catch (error) {
    console.log(error);
    return [];
  }
}

type ObraData = z.infer<typeof ObraModalSchema>;

export async function updateObra(
  id: number,
  obra: ObraData
): Promise<ServerResponse> {
  const adminToken = cookies().get("adminJwt");

  if (!adminToken)
    return { success: false, error: "Autorização insuficiente." };
  const isValidAdmin = (await verifyJwt(adminToken.value, true)) !== null;
  if (!isValidAdmin)
    return { success: false, error: "Autorização insuficiente." };

  try {
    // TODO: Change clienteId & proprietarioId to actual values
    // TODO: Update sondagem type with new obra
    const data = {
      cod_obra: obra.cod_obra,
      num_obra: obra.num_obra,
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
      clienteId: 1,
      proprietarioId: 1,
    };

    await db.obra.update({
      data,
      where: {
        id,
      },
    });

    return { success: true, message: "Obra atualizada com sucesso." };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar a obra." };
  }
}

export async function insertNewObra(obra: ObraData): Promise<ServerResponse> {
  try {
    // TODO: Change clienteId & proprietarioId to actual values
    // TODO: Insert sondagem type with new obra
    const data = {
      cod_obra: obra.cod_obra,
      num_obra: obra.num_obra,
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
      clienteId: 1,
      proprietarioId: 1,
    };

    await db.obra.create({
      data,
    });

    return { success: true, message: "Obra criada com sucesso!" };
  } catch (error) {
    return { success: false, error: "Erro ao criar a obra." };
  }
}
