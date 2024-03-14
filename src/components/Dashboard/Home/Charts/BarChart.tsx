"use client";

import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const BarChart = () => {
  const { resolvedTheme } = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    colors: resolvedTheme === "dark" ? ["#4338ca"] : ["#0284c7"],
    title: {
      text: "Obras - 2024",
      style: {
        color: resolvedTheme === "dark" ? "white" : "black",
        fontWeight: "bold",
      },
    },
    series: [
      {
        name: "Obras",
        data: [5, 3, 4, 8, 9, 3, 5, 5, 7, 12, 1, 6],
      },
    ],
    xaxis: {
      categories: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Maio",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      labels: {
        style: {
          colors: resolvedTheme === "dark" ? "white" : "black",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: resolvedTheme === "dark" ? "white" : "black",
        },
      },
    },
    grid: {
      show: false,
    },
  };

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartOptions.series}
      type="bar"
      width="100%"
      height="350"
    />
  );
};
