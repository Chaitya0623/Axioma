"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis,YAxis } from "recharts"

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


// Overperformance
export function Overperformance({ selectedMonth }: { selectedMonth?: Date }) {
  // Default to "Jan" if no month is provided
  const selectedMonthName = selectedMonth ? format(selectedMonth, "MMM") : "Jan";

  // Find the "Article Overperformance" graph data
  const graphData = dataJson.graphs.find(graph => graph.title === "Article Overperformance")?.data;

  // If graphData is undefined or null, handle it gracefully
  if (!graphData) {
    return <div>No data available</div>;
  }

  type AuthorData = {
    [key: string]: number | string; // Generic properties
    fill: string; // Force 'fill' to always be a string
  };

  const monthData = Object.keys(graphData).reduce((acc, author) => {
    const authorData = graphData[author as keyof typeof graphData] as Partial<AuthorData>;

    acc[author] = {
      overperformance: authorData
        ? (authorData[selectedMonthName as keyof typeof authorData] as number) || 0
        : 0,
      fill: authorData?.fill || '', // Default value ensures 'fill' is a string
    };

    return acc;
  }, {} as Record<string, { overperformance: number; fill: string }>);

  // Convert the monthData object into an array for sorting and chart rendering
  const sortedData = Object.entries(monthData)
  .map(([author, { overperformance, fill }]) => ({ author, overperformance, fill })) // Add fill here
  .sort((a, b) => b.overperformance - a.overperformance); // Sort descending by overperformance


  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Author Overperformance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={postchart}>
          <BarChart
            accessibilityLayer
            data={sortedData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="author"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="overperformance" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-text"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        Nancy primarily focuses on Health and Security topics, which resonate strongly with the platform's audience, resulting in consistently higher engagement in the past 3 months as compared to other authors.        </div>
      </CardFooter>
    </Card>
  );
}



const postchart = {
  overperformance: {
    label: "Overperformance",
    // color: "hsl(var(--ring))",
  },
  visitors: {
    label: "Visitors",
  },
  step: {
    label: "Stephen",
    color: "hsl(var(--chart-a1))",
  },
  peter: {
    label: "Peter",
    color: "hsl(var(--chart-a2))",
  },
  charlie: {
    label: "Charlie",
    color: "hsl(var(--chart-a3))",
  },
  nancy: {
    label: "Nancy",
    color: "hsl(var(--chart-a4))",
  },
  steve: {
    label: "Steve",
    color: "hsl(var(--chart-a5))",
  },
} satisfies ChartConfig;

export function Post({ selectedMonth }: { selectedMonth?: Date }) {
  // Default to "Jan" if no month is provided
  const selectedMonthName = selectedMonth ? format(selectedMonth, "MMM") : "Jan";

  // Find the "Total Articles" graph data from the JSON
  const graphData = dataJson.graphs.find(graph => graph.title === "Total Articles")?.data;

  // If graphData is undefined or null, handle it gracefully
  if (!graphData) {
    return <div>No data available</div>;
  }

  // Prepare the article count data for each author based on the selected month
  const monthData = Object.entries(graphData).reduce((acc, [author, monthlyData]) => {
    acc.push({
      author,
      articles: monthlyData[selectedMonthName as keyof typeof monthlyData] || 0,
      fill: monthlyData.fill, // Include the fill color
    });
    return acc;
  }, [] as { author: string; articles: number; fill: string }[]);

  // Sort the data by articles in descending order
  const sortedData = monthData.sort((a, b) => b.articles - a.articles);
  console.log(monthData)

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Numbers of Articles Posted By Authors</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={postchart}>
          <BarChart
            accessibilityLayer
            data={sortedData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="author"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                postchart[value.toLowerCase() as keyof typeof postchart]?.label || value
              }
            />
            <XAxis dataKey="articles" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="articles"
              layout="vertical"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        Steve and Stephen have been consistent in the last few months, publishing articles spanning diverse topics.    </div>
      </CardFooter>
    </Card>
  );
}




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


const chart2Data = [
  { browser: "politics", visitors:  24, fill: "var(--color-politics)" },
  { browser: "arts", visitors: 11, fill: "var(--color-arts)" },
  { browser: "Security", visitors: 33, fill: "var(--color-Security)" },
  { browser: "health", visitors: 46, fill: "var(--color-health)" },
  { browser: "housing", visitors: 17, fill: "var(--color-housing)" },
];


export function PerAuthor() {

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Personalized Content by Author</CardTitle>
        <div className="flex justify-center items-center">
          {/* <DatePickerWithRange/> */}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chart2Data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
          {/* Showing total visitors for the last 6 months */}
          The reason Nancy received better engagement was due to her streamlined focus on Security and Health, thereby prioritizing quality over quantity across multiple topics.        </div>
      </CardFooter>
    </Card>
  );
}








const visitorChartData = [
  { month: "January", desktop: 120 },
  { month: "February", desktop: 140 },
  { month: "March", desktop: 160 },
  { month: "April", desktop: 200 },
  { month: "May", desktop: 180 },
  { month: "June", desktop: 250 },
];


export function VisitorStoryRatio() {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Are Readers Staying Engaged?</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={visitorChartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="hsl(var(--ring))" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-text"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        The total visitors per story show a pattern similar to engaged sessions, with noticeable increases during months with more holidays. Thus it is important to understand which authors are capturing attention.    </div>
      </CardFooter>
    </Card>
  )
}

  type UsersProps = {
    selectedMonth?: Date;
  };
const Authors: React.FC<UsersProps> = ({ selectedMonth }) =>{
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <VisitorStoryRatio/>
        <Post selectedMonth={selectedMonth}/>

        <Overperformance selectedMonth={selectedMonth}/>
        <PerAuthor/>

    </div>
    </>
  )
}

export default Authors