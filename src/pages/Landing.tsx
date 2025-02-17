"use client"
import React from 'react'
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart"

import dataJson from './data.json';
import { format } from "date-fns";


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  politics: {
    label: "Politics",
    color: "hsl(var(--chart-a1))",
  },
  arts: {
    label: "Art & Culture",
    color: "hsl(var(--chart-a2))",
  },
  Security: {
    label: "Security",
    color: "hsl(var(--chart-a3))",
  },
  health: {
    label: "Health",
    color: "hsl(var(--chart-a4))",
  },
  housing: {
    label: "Housing",
    color: "hsl(var(--chart-a5))",
  },
  desktop: {
    label: "Visitors Per Story",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Top({ selectedMonth }: { selectedMonth?: Date }) {
  // Default to "Jan" if no month is provided
  const selectedMonthName = selectedMonth
    ? format(selectedMonth, "MMM")
    : "Jan";

  // Extract data for the selected month, including 'fill' color
  const categoryData = Object.entries(
    dataJson.graphs.find((graph) => graph.title === "Top Categories (Articles Published)")?.data || {}
  ).map(([category, values]) => {
    return {
      category,
      articles: values[selectedMonthName as keyof typeof values] || 0,
      fill: values.fill, // Include the fill color from the JSON
    };
  });

  // Calculate total articles for the selected month
  const totalArticles = React.useMemo(() => {
    return categoryData.reduce((acc, curr) => acc + curr.articles, 0);
  }, [categoryData]);

  // Determine the most and least popular categories
  // const mostCategory = categoryData.reduce((prev, curr) =>
  //   curr.articles > prev.articles ? curr : prev,
  //   categoryData[0]
  // );

  // const leastCategory = categoryData.reduce((prev, curr) =>
  //   curr.articles < prev.articles ? curr : prev,
  //   categoryData[0]
  // );

  // Prepare chart data for the pie chart
  const chartData = categoryData.map((data) => ({
    browser: data.category, // Use the category name as the browser label
    visitors: data.articles, // Map articles to the 'visitors' field
    fill: data.fill, // Include the fill color
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">What Categories are covered?</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip cursor={false} />
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
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-text text-4xl font-bold"
                        >
                          {totalArticles.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Articles
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        Articles in Politics make up the highest volume, with increasing focus on Health and Security in recent months.        </div>
      </CardFooter>
    </Card>
  );
}


const generateRandomBoxData = () => {
  const boxData = [
    { age: "1", fill: "var(--color-1)", visitors: 429 },
    { age: "2", fill: "var(--color-2)", visitors: 715 },
    { age: "3", fill: "var(--color-3)", visitors: 501 },
    { age: "4", fill: "var(--color-4)", visitors: 833 },
    { age: "5", fill: "var(--color-5)", visitors: 767 },
  ];
  
  // Return the updated array
  return boxData;
  };
  
  // Generate the random box data
  const box1Data = generateRandomBoxData();
  
  const box1Config = {
    visitors: {
      label: "Visitors",
    },
    "1": {
      label: "18-24",
      color: "hsl(var(--chart-1))",
    },
    "2": {
      label: "25-34",
      color: "hsl(var(--chart-2))",
    },
    "3": {
      label: "35-44",
      color: "hsl(var(--chart-3))",
    },
    "4": {
      label: "45-54",
      color: "hsl(var(--chart-4))",
    },
    "5": {
      label: "55-64",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig
  
  // interface Box1Props {
  //   onTotalVisitors: (visitors: number) => void;
  // }
  export function Box1() {
    const totalVisitors = React.useMemo(() => {
      return box1Data.reduce((acc, curr) => acc + curr.visitors, 0);
    }, []);
  
    return (
      <Card className="flex flex-col w-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={box1Config}
            className="mx-auto aspect-square"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={box1Data}
                dataKey="visitors"
                nameKey="age"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-white text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-text"
                          >
                            Visitors
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  }
  
  
  
  
  
  const generateRandomBox2Data = () => {
    const box2Data = [
      { age: "1", fill: "var(--color-1)", visitors: 75 },
      { age: "2", fill: "var(--color-2)", visitors: 66 },
      { age: "3", fill: "var(--color-3)", visitors: 81 },
      { age: "4", fill: "var(--color-4)", visitors: 107 },
      { age: "5", fill: "var(--color-5)", visitors: 93 },
    ];
    
    // Return the updated array
    return box2Data;
  };
  
  // Generate the random box data
  const box2Data = generateRandomBox2Data();
  const box2Config = {
    visitors: {
      label: "Visitors",
    },
    "1": {
      label: "18-24",
      color: "hsl(var(--chart-1))",
    },
    "2": {
      label: "25-34",
      color: "hsl(var(--chart-2))",
    },
    "3": {
      label: "35-44",
      color: "hsl(var(--chart-3))",
    },
    "4": {
      label: "45-54",
      color: "hsl(var(--chart-4))",
    },
    "5": {
      label: "55-64",
      color: "hsl(var(--chart-5))",
    },
    
  } satisfies ChartConfig

// interface Box2Props {
//     onTotalVisitors: (visitors: number) => void;
//   }
  export function Box2() {
    const totalVisitors = React.useMemo(() => {
      return box2Data.reduce((acc, curr) => acc + curr.visitors, 0);
    }, []);
  
  
    return (
      <Card className="flex flex-col w-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>New Users</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={box2Config}
            className="mx-auto aspect-square"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={box2Data}
                dataKey="visitors"
                nameKey="age"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-white text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-text"
                          >
                            Visitors
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  }
  
export function Box() {
    // const [activeVisitors, setActiveVisitors] = React.useState(0);
    // const [newVisitors, setNewVisitors] = React.useState(0);
    return (
      <>
      <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Who are Our Readers?</CardTitle>
      </CardHeader>
      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
      <Box1 />
      <Box2 />
      </div>
      <CardFooter className="flex-col text-center gap-2 text-base">
            <div className="leading-none text-muted-foreground">
              Older audiences make up a large share of Active and New Users. The increase in articles on Health and Security has attracted more older readers, surpassing other age groups in bringing in New Users.            
            </div>
      </CardFooter>
      </Card>
      
      </>
    )}

type TagsProps = {
    selectedMonth?: Date;
  };
const Landing : React.FC<TagsProps> = ({ selectedMonth }) =>{
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Top selectedMonth={selectedMonth}/>
              <Box/>
          </div>
  )
}

export default Landing