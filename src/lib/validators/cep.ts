export function isValidCep(cep: string): boolean {
  if (cep.length === 0) return true;

  const regex = /^\d{5}-\d{3}$/;

  if (regex.test(cep)) return true;

  return false;
}
