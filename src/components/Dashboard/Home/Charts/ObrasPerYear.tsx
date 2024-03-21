"use client";

import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartProps = {
  data: {
    ano: number;
    total: string;
  }[];
};

export const ObrasPerYearChart = ({ data }: ChartProps) => {
  const { resolvedTheme } = useTheme();

  const series: ApexAxisChartSeries = [
    {
      name: "Obras",
      data: data.map((year) => Number(year.total)),
    },
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    colors: resolvedTheme === "dark" ? ["#4338ca"] : ["#0284c7"],
    title: {
      text: "Obras por ano",
      style: {
        color: resolvedTheme === "dark" ? "white" : "black",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: data.map((year) => year.ano),
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
    <div className="h-[20rem] w-full">
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="bar"
        width="100%"
        height="320"
      />
    </div>
  );
};
