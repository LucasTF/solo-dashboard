"use server";

import { db } from "@/lib/db";
import { DataResponse } from "@/types/ServerResponse";
import { Cliente } from "@/types/data/Cliente";

export async function searchClientes(
  searchString: string
): Promise<DataResponse<Cliente[]>> {
  try {
    const clientes: Cliente[] = await db.cliente.findMany({
      select: {
        id: true,
        nome: true,
      },
      where: {
        nome: {
          contains: searchString,
        },
      },
      take: 10,
    });

    return { success: true, data: clientes };
  } catch (error) {
    return {
      success: false,
      error: "Não foi possível recuperar os dados dos clientes.",
    };
  }
}
