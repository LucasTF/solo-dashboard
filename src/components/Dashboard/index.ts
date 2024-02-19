import { DashboardTable } from "./Table";
import { Search } from "./Search";
import { Template } from "./Template";
import { TableConstructor } from "./TableConstructor";
import { ObrasOptions } from "./Options/Obras";

export const Dashboard = {
  Template,
  Search,
  TableConstructor: TableConstructor,
  Table: DashboardTable,
  Options: {
    Obras: ObrasOptions,
  },
};
