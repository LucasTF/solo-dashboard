import { DashboardTable } from "./Table";
import { TableConstructor } from "./TableConstructor";
import { ObrasOptions } from "./Obras/Options";
import { ObrasHeader } from "./Obras/Header";
import { UsersHeader } from "./Users/Header";
import { UsersOptions } from "./Users/Options";
import { ObrasManager } from "./Obras/Manager";
import { UsersManager } from "./Users/Manager";
import { HomeHeader } from "./Home/Header";
import { HomeMain } from "./Home/Main";

export const Dashboard = {
  Header: {
    Home: HomeHeader,
    Obras: ObrasHeader,
    Users: UsersHeader,
  },
  Main: {
    Home: HomeMain,
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
