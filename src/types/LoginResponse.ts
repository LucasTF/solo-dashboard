type SuccessLoginResponse = {
  success: true;
  user: { name: string; surname: string; email: string };
};

type ErrorLoginResponse = {
  success: false;
  message: string;
};

export type LoginResponse = SuccessLoginResponse | ErrorLoginResponse;
