import * as z from "zod";
import { ObrasSearchFiltersSchema, UsersSearchFiltersSchema } from "@/schemas";

type ObrasSearchFilters = z.infer<typeof ObrasSearchFiltersSchema>;
type UsersSearchFilters = z.infer<typeof UsersSearchFiltersSchema>;

export type SearchFilters = ObrasSearchFilters | UsersSearchFilters;
