import { dbWhereMapper } from "@/lib/utils/objectMapper";
import { describe, expect, test } from "vitest";

describe("Db Search String-Object Mapper | Boolean", () => {
  test("Should map string to object with correct keys, with 3 keys", () => {
    expect(dbWhereMapper("clientes.nome.teste", true)).toStrictEqual({
      clientes: {
        nome: {
          teste: true,
        },
      },
    });
  }),
    test("Should map string to object with correct keys, with 1 key", () => {
      expect(dbWhereMapper("clientes", true)).toStrictEqual({
        clientes: true,
      });
    }),
    test("Should map string to object with correct keys, with 5 keys", () => {
      expect(
        dbWhereMapper("clientes.uf.city.neighborhood.street", true)
      ).toStrictEqual({
        clientes: {
          uf: {
            city: {
              neighborhood: {
                street: true,
              },
            },
          },
        },
      });
    });
});

describe("Db Search String-Object Mapper | Object", () => {
  test("Should map string to object with correct keys, with 3 keys", () => {
    expect(
      dbWhereMapper("clientes.nome.teste", { contains: "teste_string" })
    ).toStrictEqual({
      clientes: {
        nome: {
          teste: {
            contains: "teste_string",
          },
        },
      },
    });
  }),
    test("Should map string to object with correct keys, with 1 key", () => {
      expect(
        dbWhereMapper("clientes", { contains: "teste_string" })
      ).toStrictEqual({
        clientes: { contains: "teste_string" },
      });
    }),
    test("Should map string to object with correct keys, with 5 keys", () => {
      expect(
        dbWhereMapper("clientes.uf.city.neighborhood.street", {
          contains: "teste_string",
        })
      ).toStrictEqual({
        clientes: {
          uf: {
            city: {
              neighborhood: {
                street: { contains: "teste_string" },
              },
            },
          },
        },
      });
    });
});
