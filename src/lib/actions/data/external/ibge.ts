"use server";

import { DataResponse } from "@/types/ServerResponse";
import { Municipio, UF } from "@/types/data/Ibge";

export async function getUfs(): Promise<DataResponse<UF[]>> {
  try {
    const ufData = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
      { cache: "force-cache" }
    );

    const ufJson = await ufData.json();

    return { success: true, data: ufJson };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Não foi possível recuperar os dados de estados.",
    };
  }
}

export async function getMunicipios(
  uf: string
): Promise<DataResponse<Municipio[]>> {
  try {
    const muniData = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
      { cache: "force-cache" }
    );

    const muniJson = await muniData.json();

    return { success: true, data: muniJson };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Não foi possível recuperar os dados de Municípios.",
    };
  }
}
