"use server";

import * as z from "zod";

import { LegacyDbObra, adaptToObra } from "@/lib/adapters/obraAdapter";
import { SearchFilters } from "@/types/SearchFilters";
import { db } from "@/lib/db";
import { formatYYYYMMDD } from "@/lib/utils/dateFormatter";
import { ObraModalSchema } from "@/schemas";
import { ServerResponse } from "@/types/ServerResponse";

export async function getTableObrasLegacy() {
  const obras: LegacyDbObra[] = await db.tbobras.findMany({
    select: {
      codobra: true,
      nomeobra: true,
      anoobra: true,
      tipologobra: true,
      logradouroobra: true,
      cidadeobra: true,
      bairroobra: true,
      ufobra: true,
      cliente: true,
      proprietario: true,
    },
  });

  const treatedObras = obras.map((obra) => adaptToObra(obra));

  return treatedObras;
}

export async function getObraByIdLegacy(id: number) {
  const obra: LegacyDbObra = await db.tbobras.findUnique({
    where: { codobra: id },
  });

  return adaptToObra(obra);
}

export async function searchObrasLegacy(searchFilters: SearchFilters) {
  let column;

  switch (searchFilters.column) {
    case "sp":
      column = "nomeobra";
      break;
    case "cidade":
      column = "cidadeobra";
      break;
    case "bairro":
      column = "bairroobra";
      break;
    case "logradouro":
      column = "logradouroobra";
      break;
    case "cliente":
      column = "cliente";
      break;
    case "proprietario":
      column = "proprietario";
      break;
    default:
      column = "nomeobra";
  }

  const obras: LegacyDbObra[] = await db.tbobras.findMany({
    select: {
      codobra: true,
      nomeobra: true,
      anoobra: true,
      tipologobra: true,
      logradouroobra: true,
      cidadeobra: true,
      bairroobra: true,
      ufobra: true,
      cliente: true,
      proprietario: true,
    },
    where: {
      [column]: {
        contains: searchFilters.search,
      },
    },
  });

  const treatedObras = obras.map((obra) => adaptToObra(obra));

  return treatedObras;
}

type ObraData = z.infer<typeof ObraModalSchema>;

export async function updateObraLegacy(
  id: number,
  obra: ObraData
): Promise<ServerResponse> {
  const data = {
    nomeobra: obra.sp,
    numobra: obra.num_obra,
    SPSondagem: obra.sp_sondagem,
    MetrosSPSondagem: obra.metros_sp_sondagem,
    STTrado: obra.STTrado,
    STTradoml: obra.STTradoml,
    datainiobra: formatYYYYMMDD(obra.data_inicio),
    datafimobra: formatYYYYMMDD(obra.data_fim),
    anoobra: obra.ano,
    tipologobra: obra.tipo_logo,
    cidadeobra: obra.cidade,
    ufobra: obra.uf,
    logradouroobra: obra.logradouro,
    complelogobra: obra.complemento,
    bairroobra: obra.bairro,
    loteobra: obra.lote,
    quadraobra: obra.quadra,
    cliente: obra.cliente,
    proprietario: obra.proprietario,
  };

  await db.tbobras.update({
    data,
    where: {
      codobra: id,
    },
  });

  return { success: true, message: "Obra criada com sucesso!" };
}

export async function insertNewObraLegacy(
  obra: ObraData
): Promise<ServerResponse> {
  const data = {
    nomeobra: obra.sp,
    numobra: obra.num_obra,
    SPSondagem: obra.sp_sondagem,
    MetrosSPSondagem: obra.metros_sp_sondagem,
    STTrado: obra.STTrado,
    STTradoml: obra.STTradoml,
    datainiobra: formatYYYYMMDD(obra.data_inicio),
    datafimobra: formatYYYYMMDD(obra.data_fim),
    anoobra: obra.ano,
    tipologobra: obra.tipo_logo,
    cidadeobra: obra.cidade,
    ufobra: obra.uf,
    logradouroobra: obra.logradouro,
    complelogobra: obra.complemento,
    bairroobra: obra.bairro,
    loteobra: obra.lote,
    quadraobra: obra.quadra,
    cliente: obra.cliente,
    proprietario: obra.proprietario,
  };

  await db.tbobras.create({
    data,
  });

  return { success: true, message: "Obra criada com sucesso!" };
}
