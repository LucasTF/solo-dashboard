type SuccessResponse = {
  success: true;
  message: string;
};

type ErrorResponse = {
  success: false;
  error: string;
};

type Data<T> = {
  data: T;
};

export type ServerResponse = SuccessResponse | ErrorResponse;

export type DataResponse<T> =
  | ({ success: true; message?: string } & Data<T>)
  | ErrorResponse;
