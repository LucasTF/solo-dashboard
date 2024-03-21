import { expect, describe, test, vi } from "vitest";
import { User } from "@prisma/client";
import { db } from "@/lib/__mocks__/db";

import { createNewUser } from "@/lib/actions/data/users";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

vi.mock("@/lib/db");

const adminUser: Omit<User, "id"> = {
  name: "Admin",
  surname: "User",
  email: "admin@test.com",
  password: "unhashed_password",
  isAdmin: true,
};

const user: Omit<User, "id"> = {
  name: "Normal",
  surname: "User",
  email: "email@test.com",
  password: "unhashed_password",
  isAdmin: false,
};

describe("User CRUD Operations", () => {
  test("Should create a new user", async () => {
    db.user.create.mockImplementation((arg) => {
      const data: User = {
        ...arg.data,
        id: 1,
      };
      return data as any;
    });
    const result = await createNewUser(adminUser);
    expect(result).toHaveProperty("success", true);
    if (result.success) {
      expect(result.data).toHaveProperty("id", 1);
      expect(result.data.password).not.toEqual(adminUser.password);
    }
  });

  test("Should fail to create a user with the same email", async () => {
    db.user.create.mockImplementation((arg) => {
      throw new PrismaClientKnownRequestError("Erro ao criar o usuário", {
        code: "P2002",
      } as any);
    });
    const result = await createNewUser(adminUser);
    expect(result).toHaveProperty("success", false);
    if (!result.success) {
      expect(result.error).toEqual("O email inserido já está cadastrado.");
    }
  });
});
