"use server";

import { Municipio, UF } from "@/types/data/Ibge";

export async function getUfs(): Promise<UF[]> {
  try {
    const ufData = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
      { cache: "force-cache" }
    );

    const ufJson = await ufData.json();

    return ufJson;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getMunicipios(uf: string): Promise<Municipio[]> {
  try {
    const muniData = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
      { cache: "force-cache" }
    );

    const muniJson = await muniData.json();

    return muniJson;
  } catch (error) {
    console.error(error);
    return [];
  }
}
