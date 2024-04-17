export function isValidLogradouro(logradouro: string): boolean {
  const logRegex = /^[a-zA-Z\u00C0-\u024F\s\-]+$/;

  if (isValidNumberedLogradouro(logradouro)) {
    return true;
  }

  if (logRegex.test(logradouro)) {
    return true;
  }

  return false;
}

export function isValidNumberedLogradouro(logradouro: string): boolean {
  const logNumRegex =
    /^[a-zA-Z\u00C0-\u024F\s\-\p{Nd}]+,\s\d+\s*(?:\s*\/\s*\d+)*$/;

  if (logNumRegex.test(logradouro)) {
    return true;
  }

  return false;
}

export function splitAddress(logradouro: string): [string, number] {
  if (isValidNumberedLogradouro(logradouro)) {
    const splitString = logradouro.split(",");
    let logNumbers = splitString[1];
    logNumbers = logNumbers.trim();
    const logNumbersList = logNumbers.split("/");
    return [splitString[0], Number(logNumbersList[0])];
  }

  throw new Error("Invalid string.");
}
