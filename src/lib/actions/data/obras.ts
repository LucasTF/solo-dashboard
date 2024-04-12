"use server";

import { cookies } from "next/headers";

import { ServerResponse } from "@/types/ServerResponse";
import {
  EntryObra,
  FormObra,
  FullObra,
  InsertionObra,
  TableObra,
} from "@/types/data/Obra";

import { db } from "@/lib/db";
import { formatYYYYMMDD } from "@/lib/utils/dateFormatter";
import { verifyJwt } from "@/lib/jwt";
import { CodObraSchema, ObraFormSchema } from "@/schemas";
import { getClienteByName } from "./clientes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  Sondagem_Percussao,
  Sondagem_Rotativa,
  Sondagem_Trado,
} from "@prisma/client";

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

    const [updatedObra] = await db.$transaction(async (db) => {
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

      const data: InsertionObra = {
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
