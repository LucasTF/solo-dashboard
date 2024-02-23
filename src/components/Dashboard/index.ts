import { DashboardTable } from "./Table";
import { ObrasSearch } from "./Search/Obras";
import { Template } from "./Template";
import { TableConstructor } from "./TableConstructor";
import { ObrasOptions } from "./Options/Obras";
import { ObrasTableHeader } from "./Header/Obras";
import { DashboardContainer } from "./Container";

export const Dashboard = {
  Template,
  Container: DashboardContainer,
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
