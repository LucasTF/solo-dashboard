import { DashboardTable } from "./Table";
import { TableConstructor } from "./TableConstructor";
import { ObrasOptions } from "./Obras/Options";
import { ObrasHeader } from "./Obras/Header";
import { UsersHeader } from "./Users/Header";
import { UsersOptions } from "./Users/Options";
import { UsersManager } from "./Users/Manager";
import { HomeHeader } from "./Home/Header";
import { HomeMain } from "./Home/Main";
import { BaseHeader } from "./BaseHeader";
import { ObrasManager } from "./Obras/Manager";

export const Dashboard = {
  Header: {
    Base: BaseHeader,
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
