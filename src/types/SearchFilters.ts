import * as z from "zod";
import { ObrasSearchFilterSchema } from "@/schemas";

type ObrasSearchFilters = z.infer<typeof ObrasSearchFilterSchema>;

export type SearchFilters = ObrasSearchFilters;
