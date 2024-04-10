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

export async function getClienteByName(name: string): Promise<Cliente | null> {
  try {
    const cliente: Cliente | null = await db.cliente.findFirst({
      select: {
        id: true,
        nome: true,
      },
      where: {
        nome: name,
      },
    });

    return cliente;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function insertNewCliente(
  clienteEntry: Omit<Cliente, "id">
): Promise<DataResponse<Cliente>> {
  // TODO: Add zod parsing
  try {
    const newCliente = await db.cliente.create({
      data: clienteEntry,
    });

    return { success: true, data: newCliente };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Não foi possível criar o cliente." };
  }
}
