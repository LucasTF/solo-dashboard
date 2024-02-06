"use server";

import { db } from "@/lib/db";
import { SearchFilter } from "@/schemas";

// TODO: Create Type for Obras

export async function getObras() {
  const obras: object[] = await db.obra.findMany({
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

export async function searchObras(searchFilter: SearchFilter) {
  const obras: object[] = await db.obra.findMany({
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
      [searchFilter.column]: searchFilter.search,
    },
  });

  return obras;
}
