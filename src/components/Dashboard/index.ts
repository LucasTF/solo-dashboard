import { DashboardTable } from "./Table";
import { TableConstructor } from "./TableConstructor";
import { ObrasOptions } from "./Obras/Options";
import { ObrasHeader } from "./Obras/Header";
import { UsersHeader } from "./Users/Header";
import { UsersOptions } from "./Users/Options";
import { ObrasManager } from "./Obras/Manager";
import { UsersManager } from "./Users/Manager";

export const Dashboard = {
  Header: {
    Obras: ObrasHeader,
    Users: UsersHeader,
  },
  Manager: {
    Obras: ObrasManager,
    Users: UsersManager,
  },
  TableConstructor: TableConstructor,
  Table: DashboardTable,
  Options: {
    Obras: ObrasOptions,
    Users: UsersOptions,
  },
};
