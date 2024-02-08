import { DashboardTable } from "./Table";
import { Search } from "./Search";
import { DashboardContainer } from "./ui/Container";
import { DashboardTitle } from "./ui/Title";
import { TableConstructor } from "./TableConstructor";
import { ObrasOptions } from "./Options/Obras";

export const Dashboard = {
  Title: DashboardTitle,
  MainContainer: DashboardContainer,
  Search: Search.Form,
  TableConstructor: TableConstructor,
  Table: DashboardTable,
  Options: {
    Obras: ObrasOptions,
  },
};
