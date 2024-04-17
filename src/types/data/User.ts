import { User } from "@prisma/client";
import * as z from "zod";
import { UserEditModalSchema } from "@/schemas";

export type EntryUser = Omit<User, "password">;

export type FormEditUser = z.infer<typeof UserEditModalSchema>;
