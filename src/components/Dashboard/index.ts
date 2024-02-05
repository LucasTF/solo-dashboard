import { DashboardOptions } from "./Options";
import { DashboardTable } from "./Table";
import { Search } from "./Search";
import { DashboardContainer } from "./ui/Container";
import { DashboardTitle } from "./ui/Title";

export const Dashboard = {
  Title: DashboardTitle,
  MainContainer: DashboardContainer,
  Search: Search.Form,
  Table: DashboardTable,
  Options: DashboardOptions,
};
