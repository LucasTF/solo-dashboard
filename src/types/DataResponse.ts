type ErrorDataResponse = {
  success: false;
  message: string;
};

type SuccessDataResponse<T> = {
  success: true;
  data: T[];
};

export type DataResponse<T> = SuccessDataResponse<T> | ErrorDataResponse;
