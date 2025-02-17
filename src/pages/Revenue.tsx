"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  PieChart,
  Pie,
  Label,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import dataJson from "./data.json";
import { format } from "date-fns";
import * as React from "react";

// Random data for chart visualization
const generateRandomData = () => {
  return [
    { browser: "Politics", desktop: 3123, mobile: 4215 },
    { browser: "Art", desktop: 2789, mobile: 1567 },
    { browser: "Security", desktop: 4897, mobile: 2196 },
    { browser: "Health", desktop: 5234, mobile: 6879 },
    { browser: "Housing", desktop: 3421, mobile: 1845 },
  ];
};

const graphchartData = generateRandomData();

export function SubscriberThemes({ }: { selectedMonth?: Date }) {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">What Do Subscribers Want?</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={graphchartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        Older audiences, who make up the majority of subscribers, tend to engage more with topics like Security and Health, while non-subscribers show more interest in a broader range of topics.        </div>
      </CardFooter>
    </Card>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { value } = payload[0];
    return (
      <div style={{ backgroundColor: "#000", padding: "5px", border: "1px solid #ccc", color: "#fff" }}>
        <p>{`Visitors: ${value}`}</p>
      </div>
    );
  }
  return null;
};

const generateRandomData1 = () => {
  return [
    { browser: "18-24", desktop: 273, mobile: 410 }, // Younger group, mobile-heavy
    { browser: "25-34", desktop: 386, mobile: 591 }, // Middle group, balanced
    { browser: "35-44", desktop: 266, mobile: 522 }, // Younger group, balanced
    { browser: "45-54", desktop: 879, mobile: 220 }, // Older group, desktop-heavy
    { browser: "55+", desktop: 919, mobile: 181 },  // Oldest group, strongly desktop-heavy
  ];
};

const graphchartData1 = generateRandomData1();

export function EventCount({ }: {selectedMonth?: Date }) {

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">How Do Subscribers and Non-Subscribers Compare?</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={graphchartData1}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="browser" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<CustomTooltip indicator="dashed"/>} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        Older audiences are more likely to subscribe to the platform, while younger audiences often browse articles that catch their interest, presenting a significant opportunity to engage and convert this untapped market.        </div>
      </CardFooter>
    </Card>
  );
}

const chartConfig: Record<string, { label: string; color: string }> = {
  Politics: { label: "Politics", color: "hsl(var(--chart-a1))" },
  Arts: { label: "Art & Culture", color: "hsl(var(--chart-a2))" },
  Security: { label: "Security", color: "hsl(var(--chart-a3))" },
  Health: { label: "Health", color: "hsl(var(--chart-a4))" },
  Housing: { label: "Housing", color: "hsl(var(--chart-a5))" },
  desktop: { label: "Subscribers", color: "hsl(var(--chart-sub))" },
  mobile: { label: "Non-Subscribers", color: "hsl(var(--chart-nonsub))" },
};

export function RevenueAttribution({ selectedMonth }: { selectedMonth?: Date }) {
  const selectedMonthName = selectedMonth ? format(selectedMonth, "MMM") : "Jan";

  function isChartConfigKey(key: string): key is keyof typeof chartConfig {
    return key in chartConfig;
  }

  const revenueData = Object.entries(
    dataJson.graphs.find((graph) => graph.title === "Revenue per Article Theme (USD)")?.data || {}
  ).map(([theme, revenuePerMonth]) => {
    const revenue = (revenuePerMonth as Record<string, number>)[selectedMonthName] || 0;

    return {
      theme,
      revenue,
      color: isChartConfigKey(theme) ? chartConfig[theme].color : "#ff0",
    };
  });

  const totalRevenue = React.useMemo(() => {
    return revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
  }, [revenueData]);

  const chartData = revenueData.map((data) => ({
    browser: data.theme,
    visitors: data.revenue,
    fill: data.color,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Where Is the Revenue Coming From?</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-text text-4xl font-bold"
                        >$
                          {totalRevenue.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        Security and Politics have generated the most revenue, reflecting both strong subscriber engagement and the potential to expand reach by focusing on topics that appeal to larger audiences.        </div>
      </CardFooter>
    </Card>
  );
}

type RevenueProps = {
  selectedMonth?: Date;
};

const Revenue: React.FC<RevenueProps> = ({ selectedMonth }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <EventCount selectedMonth={selectedMonth} />
        <SubscriberThemes selectedMonth={selectedMonth} />
        <RevenueAttribution selectedMonth={selectedMonth} />
      </div>
    </>
  );
};

export default Revenue;