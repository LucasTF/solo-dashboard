"use server";

import { db } from "@/lib/db";
import { SearchFilters } from "@/types/SearchFilters";
import { User } from "@/types/data/User";

export async function searchUsers(searchFilters: SearchFilters) {
  try {
    const users: User[] = await db.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
      },
      where: {
        [searchFilters.column]: {
          contains: searchFilters.search,
        },
      },
    });

    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getUserById(id: number) {
  try {
    const user: User = await db.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    console.log(error);
    return {} as User;
  }
}
