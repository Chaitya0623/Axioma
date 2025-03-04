"use client"

import * as React from "react"

import { Area, AreaChart, CartesianGrid, XAxis,Bar, BarChart} from "recharts"
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../components/ui/chart"

import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import {
    PieChart,
    Pie,
    Label,
  } from "recharts";

import dataJson from './data.json';



// Engaged Session
const generateRandomChartData = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return months.map((month, index) => {
    // Holiday adjustments based on month
    const isHolidayPeak = ["July", "November", "December"].includes(month);
    const isEasterSeason = month === "April";
  
    return {
      month,
      "18-24": isHolidayPeak
        ? 300 + index * 10
        : isEasterSeason
        ? 220 + index * 8
        : 180 + index * 6,
      "25-34": isHolidayPeak
        ? 350 + index * 12
        : isEasterSeason
        ? 260 + index * 10
        : 200 + index * 8,
      "35-44": isHolidayPeak
        ? 280 + index * 10
        : isEasterSeason
        ? 240 + index * 8
        : 180 + index * 6,
      "45-54": isHolidayPeak
        ? 200 + index * 8
        : isEasterSeason
        ? 170 + index * 6
        : 140 + index * 5,
      "55-64": isHolidayPeak
        ? 150 + index * 6
        : isEasterSeason
        ? 130 + index * 4
        : 100 + index * 3,
      "65+": isHolidayPeak
        ? 120 + index * 5
        : isEasterSeason
        ? 100 + index * 3
        : 80 + index * 2,
    };
  });  
};
const charData =generateRandomChartData();
  

const charConfig = {
  "18-24": {
    label: "18-24",
    color: "hsl(var(--chart-1))",
  },
  "25-34": {
    label: "25-34",
    color: "hsl(var(--chart-2))",
  },
  "35-44": {
    label: "35-44",
    color: "hsl(var(--chart-3))",
  },
  "45-54": {
    label: "45-54",
    color: "hsl(var(--chart-4))",
  },
  "55-64": {
    label: "55-64",
    color: "hsl(var(--chart-5))",
  },
  
} satisfies ChartConfig;




type AgeGroup = "18-24" | "25-34" | "35-44" | "45-54" | "55-64" ;

export function EngagedSession() {
 

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Engaged Sessions</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={charConfig}>
          <AreaChart
            accessibilityLayer
            data={charData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fill18-24" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-18-24)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-18-24)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fill25-34" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-25-34)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-25-34)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fill35-44" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-35-44)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-35-44)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fill45-54" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-45-54)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-45-54)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fill55-64" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-55-64)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-55-64)" stopOpacity={0.1} />
              </linearGradient>
          
            </defs>
            <Area
              dataKey="18-24"
              type="natural"
              fill="url(#fill18-24)"
              fillOpacity={0.4}
              stroke="var(--color-18-24)"
              stackId="a"
            />
            <Area
              dataKey="25-34"
              type="natural"
              fill="url(#fill25-34)"
              fillOpacity={0.4}
              stroke="var(--color-25-34)"
              stackId="a"
            />
            <Area
              dataKey="35-44"
              type="natural"
              fill="url(#fill35-44)"
              fillOpacity={0.4}
              stroke="var(--color-35-44)"
              stackId="a"
            />
            <Area
              dataKey="45-54"
              type="natural"
              fill="url(#fill45-54)"
              fillOpacity={0.4}
              stroke="var(--color-45-54)"
              stackId="a"
            />
            <Area
              dataKey="55-64"
              type="natural"
              fill="url(#fill55-64)"
              fillOpacity={0.4}
              stroke="var(--color-55-64)"
              stackId="a"
            />
         
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full text-center gap-2 text-base">
          <div className="grid gap-2">
            <div className="leading-none text-muted-foreground">
            Engagement peaks in November and December with holiday interest in Travel and Food across all age groups. In April, older audiences engage more with family-related topics like Housing and Health, while in July, younger audiences focus more on lighter content such as Arts and Movies.
              {/* January - December 2024 */}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function Trending() {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Predicted Trending Articles For Next 7 Days</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Article</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Predicted Unique Visitors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">The Future of Cybersecurity: AI & Threats</TableCell>
              <TableCell className="text-muted-foreground">Security</TableCell>
              <TableCell className="text-right text-muted-foreground">9,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Mental Wellness Apps: Do They Really Work?</TableCell>
              <TableCell className="text-muted-foreground">Health</TableCell>
              <TableCell className="text-right text-muted-foreground">7,600</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Urban Housing Crisis: What’s the Solution?</TableCell>
              <TableCell className="text-muted-foreground">Housing</TableCell>
              <TableCell className="text-right text-muted-foreground">6,200</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Election Year: How Policies Impact Healthcare</TableCell>
              <TableCell className="text-muted-foreground">Politics</TableCell>
              <TableCell className="text-right text-muted-foreground">5,700</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Digital Art & AI: The Next Creative Revolution</TableCell>
              <TableCell className="text-muted-foreground">Arts</TableCell>
              <TableCell className="text-right text-muted-foreground">4,900</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
          Cybersecurity and mental health are expected to lead engagement, while housing and digital art topics are gaining traction among younger audiences.
        </div>
      </CardFooter>
    </Card>
  );
}


export function NextClick() {

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Where will the User Click Next?</CardTitle>
      </CardHeader>
      <CardContent>
      <Table>
        {/* <TableCaption>Trending articles by number of unique visitors in the past 7 days.</TableCaption> */}
        <TableHeader>
            <TableRow>
            <TableHead>Article</TableHead>
            <TableHead className="text-right">Category</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow>
          <TableCell className="text-muted-foreground">AI-Powered Cybersecurity: The Next Big Shift</TableCell>
          <TableCell className="text-right text-muted-foreground">Security</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-muted-foreground">The Future of Mental Health Tech</TableCell>
          <TableCell className="text-right text-muted-foreground">Health</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-muted-foreground">Cybersecurity Trends in 2025</TableCell>
          <TableCell className="text-right text-muted-foreground">Security</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-muted-foreground">How Politics Shapes Healthcare Policies</TableCell>
          <TableCell className="text-right text-muted-foreground">Politics</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-muted-foreground">The Role of Art in Community Healing</TableCell>
          <TableCell className="text-right text-muted-foreground">Arts</TableCell>
        </TableRow>
        </TableBody>
        </Table>

      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        Current content effectively targets and retains older audiences. To attract younger audiences, consider publishing topics like Housing and Arts that are more trending on platforms like Instagram.
        </div>
      </CardFooter>
    </Card>
  );
}

const ageConfig = {
  housing: {
    label: "Housing",
    color: "hsl(var(--chart-a5))",
  },
  politics: {
    label: "Politics",
    color: "hsl(var(--chart-a1))",
  },
  arts: { label: "Art & Culture", color: "hsl(var(--chart-a2))" },
  security: { label: "Security", color: "hsl(var(--chart-a3))" },
  health: { label: "Health", color: "hsl(var(--chart-a4))" },
} satisfies ChartConfig

const age = [
  { day: 1, housing: 12, politics: 13, arts: 15, security: 9, health: 11 },
  { day: 2, housing: 25, politics: 18, arts: 40, security: 14, health: 20 },
  { day: 3, housing: 20, politics: 12, arts: 30, security: 13, health: 18 },
  { day: 4, housing: 10, politics: 15, arts: 35, security: 12, health: 17 },
  { day: 5, housing: 15, politics: 9, arts: 20, security: 10, health: 14 },
  { day: 6, housing: 13, politics: 7, arts: 18, security: 8, health: 13 },
  { day: 7, housing: 16, politics: 11, arts: 22, security: 11, health: 15 },
];


export function AgeGroup() {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">User Interests in Last 7 Days</CardTitle>
        <div className="flex justify-center items-center">
          
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={ageConfig}>
          <BarChart data={age}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="housing"
              stackId="a"
              fill="var(--color-housing)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="politics"
              stackId="a"
              fill="var(--color-politics)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="arts"
              stackId="a"
              fill="var(--color-arts)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="security"
              stackId="a"
              fill="var(--color-security)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="health"
              stackId="a"
              fill="var(--color-health)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
          While the older audiences show a stronger preference for Health and Security, younger audiences are more engaged with Housing, Politics and Arts.
        </div>
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

export function PredictedCategories({ selectedMonth }: { selectedMonth?: Date }) {
  const selectedMonthName = selectedMonth ? format(selectedMonth, "MMM") : "Jan";

  function isChartConfigKey(key: string): key is keyof typeof chartConfig {
    return key in chartConfig;
  }

  const revenueData = Object.entries(
    dataJson.graphs.find((graph) => graph.title === "Predicted User Interests")?.data || {}
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
        <CardTitle className="font-bold text-lg">Predicted User Interest Per Article Category</CardTitle>
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
                        >
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
        Security and Politics are expected to dominate engagement, while Arts and Housing show lower predicted interest, indicating a focus on critical global and societal issues.</div>      </CardFooter>
    </Card>
  );
}

  type UsersProps = {
    selectedMonth?: Date;
  };

  const Click : React.FC<UsersProps> = () =>  {
    
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Trending />
                {/* <AgeGroup /> */}
                {/* <NextClick/> */}
                <PredictedCategories />
            </div>
        </>
    );
  };

export default Click