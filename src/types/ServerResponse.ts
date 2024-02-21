type SuccessResponse = {
  success: true;
  message: string;
};

type ErrorResponse = {
  success: false;
  error: string;
};

export type ServerResponse = SuccessResponse | ErrorResponse;
