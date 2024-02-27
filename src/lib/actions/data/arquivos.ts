"use server";

import { db } from "@/lib/db";
import { ServerResponse } from "@/types/ServerResponse";
import { Obra } from "@/types/data/Obra";
import { Prisma } from "@prisma/client";
import { createArchivesLegacy } from "./legacy/arquivos";

export async function getArchivesById(obraId: number) {}

export async function deleteArchive(id: number) {}
