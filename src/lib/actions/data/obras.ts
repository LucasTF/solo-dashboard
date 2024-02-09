"use server";

import { db } from "@/lib/db";
import { SearchFilter } from "@/schemas";
import { Obra } from "@/types/obraType";

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
