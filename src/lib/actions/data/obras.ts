"use server";

import { revalidatePath } from "next/cache";

import { ServerResponse } from "@/types/ServerResponse";
import {
  EntryObra,
  FormObra,
  FullObra,
  InsertionObra,
  TableObra,
} from "@/types/data/Obra";
import {
  Sondagem_Percussao,
  Sondagem_Rotativa,
  Sondagem_Trado,
} from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { db } from "@/lib/db";
import { CodObraSchema, ObraFormSchema } from "@/schemas";

import { getClienteByName } from "./clientes";

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

export async function getObraByCod(cod_obra: string) {
  try {
    CodObraSchema.parse(cod_obra);

    const obra = await db.obra.findUnique({
      where: { cod_obra },
      include: {
        cliente: true,
        proprietario: true,
        arquivos: true,
        sondagem_percussao: true,
        sondagem_trado: true,
        sondagem_rotativa: true,
      },
    });

    return obra as FullObra;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function searchObras(searchString: string) {
  try {
    const obras: TableObra[] =
      await db.$queryRaw`SELECT ob.id, ob.cod_obra, ob.ano, CONCAT_WS(' ', ob.tipo_logo, ob.logradouro, ob.complemento_logo) as endereco, ob.cidade, ob.bairro, ob.uf, cl.nome as cliente, pr.nome as proprietario
    FROM Obra ob
    INNER JOIN Cliente cl
    ON clienteId = cl.id
    LEFT JOIN Cliente pr
    ON proprietarioId = pr.id
    WHERE CONCAT_WS(' ', ob.tipo_logo, ob.logradouro, ob.complemento_logo) LIKE CONCAT('%', ${searchString}, '%') OR ob.cod_obra LIKE CONCAT('%', ${searchString}, '%') OR ob.cidade LIKE CONCAT('%', ${searchString}, '%') OR ob.bairro LIKE CONCAT('%', ${searchString}, '%') OR cl.nome LIKE CONCAT('%', ${searchString}, '%') OR pr.nome LIKE CONCAT('%', ${searchString}, '%')
    ORDER BY ob.ano DESC, ob.cod_obra DESC;`;

    return obras;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updateObra(
  id: number,
  obraEntry: FormObra
): Promise<ServerResponse> {
  try {
    ObraFormSchema.parse(obraEntry);

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

    await db.$transaction(async (db) => {
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

      const data: InsertionObra = {
        cod_obra: obraEntry.cod_obra,
        ano: obraEntry.ano,
        bairro: obraEntry.bairro,
        cidade: obraEntry.cidade,
        tipo_logo: obraEntry.tipo_logo,
        logradouro: obraEntry.logradouro,
        complemento_logo: obraEntry.complemento_logo || null,
        data_inicio: obraEntry.data_inicio,
        data_fim: obraEntry.data_fim,
        cep: obraEntry.cep || null,
        uf: obraEntry.uf,
        num_obra: obraEntry.num_obra,
        lote: obraEntry.lote || null,
        quadra: obraEntry.quadra || null,
        clienteId: clienteId,
        proprietarioId: proprietarioId,
      };

      const updatedObra = await db.obra.update({
        data,
        where: {
          id,
        },
        include: {
          sondagem_percussao: true,
          sondagem_trado: true,
          sondagem_rotativa: true,
        },
      });

      let sonPercussao: Sondagem_Percussao | null = null;
      if (obraEntry.sondagem_percussao) {
        if (updatedObra.sondagem_percussao) {
          if (
            obraEntry.sondagem_percussao.furos !==
              updatedObra.sondagem_percussao.furos ||
            obraEntry.sondagem_percussao.metros !==
              updatedObra.sondagem_percussao.metros
          ) {
            sonPercussao = await db.sondagem_Percussao.update({
              data: {
                furos: obraEntry.sondagem_percussao.furos,
                metros: obraEntry.sondagem_percussao.metros,
              },
              where: {
                id: updatedObra.sondagem_percussao.id,
              },
            });
          }
        } else {
          sonPercussao = await db.sondagem_Percussao.create({
            data: {
              obraId: updatedObra.id,
              metros: obraEntry.sondagem_percussao.metros,
              furos: obraEntry.sondagem_percussao.furos,
            },
          });
        }
      }

      let sonTrado: Sondagem_Trado | null = null;
      if (obraEntry.sondagem_trado) {
        if (updatedObra.sondagem_trado) {
          if (
            obraEntry.sondagem_trado.furos !==
              updatedObra.sondagem_trado.furos ||
            obraEntry.sondagem_trado.metros !==
              updatedObra.sondagem_trado.metros
          ) {
            sonTrado = await db.sondagem_Trado.update({
              data: {
                furos: obraEntry.sondagem_trado.furos,
                metros: obraEntry.sondagem_trado.metros,
              },
              where: {
                id: updatedObra.sondagem_trado.id,
              },
            });
          }
        } else {
          sonTrado = await db.sondagem_Trado.create({
            data: {
              obraId: updatedObra.id,
              metros: obraEntry.sondagem_trado.metros,
              furos: obraEntry.sondagem_trado.furos,
            },
          });
        }
      }

      let sonRotativa: Sondagem_Rotativa | null = null;
      if (obraEntry.sondagem_rotativa) {
        if (updatedObra.sondagem_rotativa) {
          if (
            obraEntry.sondagem_rotativa.furos !==
              updatedObra.sondagem_rotativa.furos ||
            obraEntry.sondagem_rotativa.metros_solo !==
              updatedObra.sondagem_rotativa.metros_solo ||
            obraEntry.sondagem_rotativa.metros_rocha !==
              updatedObra.sondagem_rotativa.metros_rocha
          ) {
            sonRotativa = await db.sondagem_Rotativa.update({
              data: {
                furos: obraEntry.sondagem_rotativa.furos,
                metros_solo: obraEntry.sondagem_rotativa.metros_solo,
                metros_rocha: obraEntry.sondagem_rotativa.metros_rocha,
              },
              where: {
                id: updatedObra.sondagem_rotativa.id,
              },
            });
          }
        } else {
          sonRotativa = await db.sondagem_Rotativa.create({
            data: {
              obraId: updatedObra.id,
              furos: obraEntry.sondagem_rotativa.furos,
              metros_solo: obraEntry.sondagem_rotativa.metros_solo,
              metros_rocha: obraEntry.sondagem_rotativa.metros_rocha,
            },
          });
        }
      }

      return [updatedObra];
    });

    return { success: true, message: "Obra atualizada com sucesso." };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar a obra." };
  }
}

export async function insertNewObra(
  obraEntry: FormObra
): Promise<ServerResponse> {
  try {
    ObraFormSchema.parse(obraEntry);

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

    await db.$transaction(async (db) => {
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

      const data: InsertionObra = {
        cod_obra: obraEntry.cod_obra,
        ano: obraEntry.ano,
        bairro: obraEntry.bairro,
        cidade: obraEntry.cidade,
        tipo_logo: obraEntry.tipo_logo,
        logradouro: obraEntry.logradouro,
        complemento_logo: obraEntry.complemento_logo || null,
        data_inicio: obraEntry.data_inicio,
        data_fim: obraEntry.data_fim,
        cep: obraEntry.cep || null,
        uf: obraEntry.uf,
        num_obra: obraEntry.num_obra,
        lote: obraEntry.lote || null,
        quadra: obraEntry.quadra || null,
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

    revalidatePath("/dashboard");

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
