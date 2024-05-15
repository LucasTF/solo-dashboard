import * as z from "zod";
import { UserEditModalSchema } from "@/schemas";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type EntryUser = Omit<User, "password">;

export type FormEditUser = z.infer<typeof UserEditModalSchema>;

export default User;
