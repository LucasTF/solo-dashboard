import { jwtVerify } from "jose";

export const getJwtSecretKey = (isAdmin: boolean) => {
  let secret;
  if (isAdmin) secret = process.env.JWT_ADMIN_SECRET;
  else secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("JWT Secret não foi inserido!");

  const encodedSecret: Uint8Array = new TextEncoder().encode(secret);
  return encodedSecret;
};

export const verifyJwt = async (tokenString: string, isAdmin: boolean) => {
  if (!tokenString) return null;
  try {
    const decodedToken = await jwtVerify(tokenString, getJwtSecretKey(isAdmin));
    return decodedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
