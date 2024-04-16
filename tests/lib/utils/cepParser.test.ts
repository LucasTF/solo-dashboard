import { identifyCep } from "@/lib/utils/cepParser";
import { Viacep } from "@/types/data/Viacep";
import { describe, test, expect } from "vitest";

const cepSample: Viacep[] = [
  {
    cep: "02033-010",
    logradouro: "Avenida General Ataliba Leonel",
    complemento: "de 1501 a 2649 - lado ímpar",
    bairro: "Carandiru",
    localidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
    gia: "1004",
    ddd: "11",
    siafi: "7107",
  },
  {
    cep: "02242-001",
    logradouro: "Avenida General Ataliba Leonel",
    complemento: "de 2994/2995 a 3682/3683",
    bairro: "Parada Inglesa",
    localidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
    gia: "1004",
    ddd: "11",
    siafi: "7107",
  },
  {
    cep: "02033-020",
    logradouro: "Avenida General Ataliba Leonel",
    complemento: "de 1502 a 2650 - lado par",
    bairro: "Carandiru",
    localidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
    gia: "1004",
    ddd: "11",
    siafi: "7107",
  },
  {
    cep: "02242-002",
    logradouro: "Avenida General Ataliba Leonel",
    complemento: "de 3684/3685 ao fim",
    bairro: "Parada Inglesa",
    localidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
    gia: "1004",
    ddd: "11",
    siafi: "7107",
  },
  {
    cep: "02088-900",
    logradouro: "Avenida General Ataliba Leonel",
    complemento: "656",
    bairro: "Carandiru",
    localidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
    gia: "1004",
    ddd: "11",
    siafi: "7107",
  },
  {
    cep: "02033-000",
    logradouro: "Avenida General Ataliba Leonel",
    complemento: "até 1499/1500",
    bairro: "Santana",
    localidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
    gia: "1004",
    ddd: "11",
    siafi: "7107",
  },
  {
    cep: "02242-000",
    logradouro: "Avenida General Ataliba Leonel",
    complemento: "de 2651/2652 a 2992/2993",
    bairro: "Parada Inglesa",
    localidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
    gia: "1004",
    ddd: "11",
    siafi: "7107",
  },
];

describe("Identify CEP from multiple samples", () => {
  test("Should identify specific special cep number 656", () => {
    expect(identifyCep(cepSample, 656)).toBe("02088-900");
  });
  test("Should identify cep defined by 'até' keyword", () => {
    expect(identifyCep(cepSample, 1200)).toBe("02033-000");
  });
  test("Should identify cep defined by 'de' keyword with one range", () => {
    expect(identifyCep(cepSample, 1600)).toBe("02033-020");
  });
  test("Should identify cep defined by 'de' keyword with two ranges", () => {
    expect(identifyCep(cepSample, 1200)).toBe("02033-000");
  });
  test("Should identify cep with 'ao fim' keyword with two ranges", () => {
    expect(identifyCep(cepSample, 3684)).toBe("02242-002");
  });
  test.fails("Should fail when using an even number on an odd range.", () => {
    expect(identifyCep(cepSample, 1550)).toBe("02033-010");
  });
});
