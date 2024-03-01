import { DashboardTable } from "./Table";
import { Template } from "./Template";
import { TableConstructor } from "./TableConstructor";
import { ObrasOptions } from "./Obras/Options";
import { ObrasHeader } from "./Obras/Header";
import { DashboardContainer } from "./Container";

export const Dashboard = {
  Template,
  Container: DashboardContainer,
  Header: {
    Obras: ObrasHeader,
  },
  TableConstructor: TableConstructor,
  Table: DashboardTable,
  Options: {
    Obras: ObrasOptions,
  },
};
