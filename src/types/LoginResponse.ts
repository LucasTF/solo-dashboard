import { User } from "./data/User";

type SuccessLoginResponse = {
  success: true;
  user: Omit<User, "id" | "image" | "password">;
};

type ErrorLoginResponse = {
  success: false;
  message: string;
};

export type LoginResponse = SuccessLoginResponse | ErrorLoginResponse;
