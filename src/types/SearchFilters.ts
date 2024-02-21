import * as z from "zod";
import { ObrasSearchFiltersSchema } from "@/schemas";

type ObrasSearchFilters = z.infer<typeof ObrasSearchFiltersSchema>;

export type SearchFilters = ObrasSearchFilters;
