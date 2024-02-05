export type DashboardSearchOptions<T extends string> = {
  name: string;
  value: T;
};

export type DashboardSearchParameters<T extends string> = {
  searchString: string;
  column: T;
};
