type ErrorDataResponse = {
  success: false;
  error: string;
};

type SuccessDataResponse<T> = {
  success: true;
  data: T;
};

export type DataResponse<T> = SuccessDataResponse<T> | ErrorDataResponse;
