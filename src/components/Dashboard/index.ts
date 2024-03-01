import { DashboardTable } from "./Table";
import { Template } from "./Template";
import { TableConstructor } from "./TableConstructor";
import { ObrasOptions } from "./Obras/Options";
import { ObrasHeader } from "./Obras/Header";
import { DashboardContainer } from "./Container";
import { UsersHeader } from "./Users/Header";
import { UsersOptions } from "./Users/Options";

export const Dashboard = {
  Template,
  Container: DashboardContainer,
  Header: {
    Obras: ObrasHeader,
    Users: UsersHeader,
  },
  TableConstructor: TableConstructor,
  Table: DashboardTable,
  Options: {
    Obras: ObrasOptions,
    Users: UsersOptions,
  },
};
