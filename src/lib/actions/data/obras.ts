"use server";

import * as z from "zod";
import { cookies } from "next/headers";

import { ServerResponse } from "@/types/ServerResponse";
import { EntryObra, TableObra } from "@/types/data/Obra";

import { db } from "@/lib/db";
import { formatYYYYMMDD } from "@/lib/utils/dateFormatter";
import { verifyJwt } from "@/lib/jwt";
import { ObraModalSchema } from "@/schemas";
import { getClienteByName, insertNewCliente } from "./clientes";
import { Obra } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type ObraData = z.infer<typeof ObraModalSchema>;

export async function getTableObras() {
  try {
    const obras = await db.obra.findMany({
      select: {
        id: true,
        cod_obra: true,
        ano: true,
        tipo_logo: true,
        logradouro: true,
        complemento_logo: true,
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

    const formattedObras: TableObra[] = obras.map((obra) => {
      const tipo = obra.tipo_logo || "";
      const complemento = obra.complemento_logo || "";
      const proprietario = obra.proprietario?.nome || "";
      return {
        id: obra.id,
        cod_obra: obra.cod_obra,
        ano: obra.ano,
        endereco: tipo + " " + obra.logradouro + " " + complemento,
        bairro: obra.bairro,
        cidade: obra.cidade,
        uf: obra.uf,
        cliente: obra.cliente.nome,
        proprietario,
      };
    });

    return formattedObras;
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

export async function searchObras(searchString: string) {
  try {
    const obras = await db.obra.findMany({
      select: {
        id: true,
        cod_obra: true,
        ano: true,
        tipo_logo: true,
        logradouro: true,
        complemento_logo: true,
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
        OR: [
          {
            cod_obra: {
              contains: searchString,
            },
          },
          {
            logradouro: {
              contains: searchString,
            },
          },
          {
            complemento_logo: {
              contains: searchString,
            },
          },
          {
            cidade: {
              contains: searchString,
            },
          },
          {
            bairro: {
              contains: searchString,
            },
          },
          {
            cliente: {
              nome: {
                contains: searchString,
              },
            },
          },
          {
            proprietario: {
              nome: {
                contains: searchString,
              },
            },
          },
        ],
      },
      orderBy: [{ ano: "desc" }, { cod_obra: "desc" }],
    });

    const formattedObras: TableObra[] = obras.map((obra) => {
      const tipo = obra.tipo_logo || "";
      const complemento = obra.complemento_logo || "";
      const proprietario = obra.proprietario?.nome || "";
      return {
        id: obra.id,
        cod_obra: obra.cod_obra,
        ano: obra.ano,
        endereco: tipo + " " + obra.logradouro + " " + complemento,
        bairro: obra.bairro,
        cidade: obra.cidade,
        uf: obra.uf,
        cliente: obra.cliente.nome,
        proprietario,
      };
    });

    return formattedObras;
  } catch (error) {
    console.log(error);
    return [];
  }
}

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
      complemento_logo: obra.complemento_logo,
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

export async function insertNewObra(
  obraEntry: ObraData
): Promise<ServerResponse> {
  try {
    ObraModalSchema.parse(obraEntry);

    let clienteId: number | null = null;
    let proprietarioId: number | null | undefined = undefined;
    const cliente = await getClienteByName(obraEntry.cliente);
    if (cliente) clienteId = cliente.id;

    if (obraEntry.proprietario) {
      if (obraEntry.proprietario === obraEntry.cliente)
        proprietarioId = clienteId;
      else {
        const proprietario = await getClienteByName(obraEntry.proprietario);
        if (proprietario) proprietarioId = proprietario.id;
        else proprietarioId = null;
      }
    }

    const [newObra] = await db.$transaction(async (db) => {
      if (clienteId === null) {
        const newCliente = await db.cliente.create({
          data: { nome: obraEntry.cliente },
        });
        clienteId = newCliente.id;
      }

      if (proprietarioId === null) {
        const newProprietario = await db.cliente.create({
          data: { nome: obraEntry.proprietario },
        });
        proprietarioId = newProprietario.id;
      } else if (proprietarioId === undefined) proprietarioId = null;

      const data: Omit<
        ObraData,
        | "cliente"
        | "proprietario"
        | "sondagem_percussao"
        | "sondagem_rotativa"
        | "sondagem_trado"
      > & {
        clienteId: number;
        proprietarioId: number | null;
      } = {
        cod_obra: obraEntry.cod_obra,
        ano: obraEntry.ano,
        bairro: obraEntry.bairro,
        cidade: obraEntry.cidade,
        tipo_logo: obraEntry.tipo_logo,
        logradouro: obraEntry.logradouro,
        complemento_logo: obraEntry.complemento_logo,
        data_inicio: obraEntry.data_inicio,
        data_fim: obraEntry.data_fim,
        uf: obraEntry.uf,
        num_obra: obraEntry.num_obra,
        lote: obraEntry.lote,
        quadra: obraEntry.quadra,
        clienteId: clienteId,
        proprietarioId: proprietarioId,
      };

      const newObra = await db.obra.create({
        data,
      });

      if (obraEntry.sondagem_percussao) {
        await db.sondagem_Percussao.create({
          data: {
            obraId: newObra.id,
            metros: obraEntry.sondagem_percussao.metros,
            furos: obraEntry.sondagem_percussao.furos,
          },
        });
      }

      if (obraEntry.sondagem_trado) {
        await db.sondagem_Trado.create({
          data: {
            obraId: newObra.id,
            metros: obraEntry.sondagem_trado.metros,
            furos: obraEntry.sondagem_trado.furos,
          },
        });
      }

      if (obraEntry.sondagem_rotativa) {
        await db.sondagem_Rotativa.create({
          data: {
            obraId: newObra.id,
            metros_rocha: obraEntry.sondagem_rotativa.metros_rocha,
            metros_solo: obraEntry.sondagem_rotativa.metros_solo,
            furos: obraEntry.sondagem_rotativa.furos,
          },
        });
      }

      return [newObra];
    });

    console.log(newObra);

    return { success: true, message: "Obra criada com sucesso!" };
  } catch (error) {
    let errorMsg = "Erro ao cadastrar obra.";
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        errorMsg = `Erro ao cadastrar obra! Código SP ${obraEntry.num_obra} já está em uso!`;
      }
    }
    return { success: false, error: errorMsg };
  }
}
