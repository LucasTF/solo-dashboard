import { DashboardTable } from "./Table";
import { ObrasSearch } from "./Search/Obras";
import { Template } from "./Template";
import { TableConstructor } from "./TableConstructor";
import { ObrasOptions } from "./Options/Obras";
import { ObrasTableHeader } from "./Header/Obras";

export const Dashboard = {
  Template,
  Search: {
    Obras: ObrasSearch,
  },
  Header: {
    Obras: ObrasTableHeader,
  },
  TableConstructor: TableConstructor,
  Table: DashboardTable,
  Options: {
    Obras: ObrasOptions,
  },
};
