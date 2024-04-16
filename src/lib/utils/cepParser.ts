import { Viacep } from "@/types/data/Viacep";

export function identifyCep(vceps: Viacep[], numEndereco: number): string {
  if (vceps.length === 1) return vceps[0].cep;

  let returnCep;
  for (let i = 0; i < vceps.length; i++) {
    const vcep = vceps[i];
    const cepNum = Number(vcep.complemento);
    if (!isNaN(cepNum) && cepNum === numEndereco) return vcep.cep;

    if (
      vcep.complemento.startsWith("até") &&
      withinStartRange(vcep, numEndereco)
    )
      returnCep = vcep.cep;
    else if (
      vcep.complemento.startsWith("de") &&
      withinRange(vcep, numEndereco)
    )
      return (returnCep = vcep.cep);
  }

  return returnCep || "";
}

function withinStartRange(vcep: Viacep, numEndereco: number): boolean {
  if (!isEvenOdd(vcep, numEndereco)) return false;
  const upperRange = vcep.complemento.substring(4);
  let upperLimit: number;

  if (isNaN(Number(upperRange))) {
    const ranges = upperRange.split("/");
    upperLimit = Number(ranges[1]);
  } else {
    upperLimit = Number(upperRange);
  }

  if (numEndereco <= upperLimit || numEndereco <= upperLimit) {
    return true;
  }
  return false;
}

function withinRange(vcep: Viacep, numEndereco: number): boolean {
  if (!isEvenOdd(vcep, numEndereco)) return false;
  const numbers = getNumbers(vcep.complemento);
  let lowerRange;
  let upperRange: number | null = null;

  if (numbers.length === 2 && !vcep.complemento.endsWith("ao fim"))
    upperRange = numbers[1];
  else if (numbers.length === 4) upperRange = numbers[3];

  lowerRange = numbers[0];

  if (upperRange) {
    if (lowerRange && numEndereco >= lowerRange && numEndereco <= upperRange)
      return true;
  } else {
    if (lowerRange && numEndereco >= lowerRange) return true;
  }

  return false;
}

// Helper Functions

function isEvenOdd(vcep: Viacep, numEndereco: number): boolean {
  if (vcep.complemento.endsWith("lado ímpar") && numEndereco % 2 === 0)
    return false;
  if (vcep.complemento.endsWith("lado par") && numEndereco % 2 !== 0)
    return false;

  return true;
}

function getNumbers(sampleString: string): number[] {
  const regexPattern = /\d+/g;

  let numbers: any = sampleString.match(regexPattern);

  if (numbers) {
    numbers = numbers.map(Number);
  } else {
    numbers = [];
  }

  return numbers;
}

// de X a Y - COMPLETED
// de X/Y a W/Z - COMPLETED
// de X/Y ao fim
// X - COMPLETED
// até X/Y - COMPLETED
// Vazio - COMPLETED
// lado impar/par - COMPLETED
