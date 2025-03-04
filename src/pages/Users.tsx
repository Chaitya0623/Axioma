"use client"

import * as React from "react"

import { Area, AreaChart, CartesianGrid, XAxis,Bar, BarChart, PolarAngleAxis, PolarGrid, Radar, RadarChart} from "recharts"
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




const reteConfig = {
  visitors: {
    label: "Retention",
  },
  1: {
    label: "18-24",
    color: "hsl(var(--chart-1))",
  },
  2: {
    label: "25-34",
    color: "hsl(var(--chart-2))",
  },
  3: {
    label: "35-44",
    color: "hsl(var(--chart-3))",
  },
  4: {
    label: "45-54",
    color: "hsl(var(--chart-4))",
  },
  5: {
    label: "55-64",
    color: "hsl(var(--chart-5))",
  },

} satisfies ChartConfig



export function Retention({ selectedMonth }: { selectedMonth?: Date }) {
  // Set default to January if no month is selected
  const selectedMonthName = selectedMonth ? format(selectedMonth, "MMM") : "Jan"; // Default to "Jan" if no month is provided

  // Find the "Retention Percentage" graph data
  const graphData = dataJson.graphs.find(graph => graph.title === "Retention Percentage")?.data;

  // If no "Retention Percentage" data is found, return null
  if (!graphData) {
    console.error("No Retention Percentage data found.");
    return null;
  }

  // Map the data based on the selected month
  const filteredData = Object.entries(graphData).map(([ageGroup, monthlyData]) => ({
    ageGroup,
    retention: monthlyData[selectedMonthName] || 0,
    fill: monthlyData.fill,  // Store the fill color
  }));

  // Debugging: Log the filtered data
  console.log("Filtered Data for Chart:", filteredData);

  // Check if filteredData has valid content
  if (filteredData.length === 0) {
    console.error("No valid data found for the selected month.");
    return null;
  }


  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Retention Percentage Per Age Group</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={reteConfig}>
        {/* BarChart component from recharts */}
        <BarChart data={filteredData} width={500} height={300}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="ageGroup"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value} // Display age group labels
          />
          {/* Re-enabling tooltip with custom content */}
          <ChartTooltip
            cursor={false}
            content={({ payload, label }) => {
              if (payload && payload.length) {
                const { retention } = payload[0].payload;
                return (
                  <div style={{ backgroundColor: '#000', padding: '5px', border: '1px solid #ccc', color:"#fff"}}>
                    <strong>{label}</strong><br />
                    Retention: {retention}%
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="retention"
            strokeWidth={2}
            radius={8}
          />
          
        </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        Current content effectively targets and retains older audiences. To attract younger audiences, consider publishing topics like Housing and Arts that are more trending on platforms like Instagram.
        </div>
      </CardFooter>
    </Card>
  );
}


// Traffic
const srcConfig = {
  desktop: {
    label: "Traffic",
    color: "hsl(var(--ring))",
  },

} satisfies ChartConfig;

export function Source({ selectedMonth }: { selectedMonth?: Date }) {
  // Default to "Jan" if no month is provided
  const selectedMonthName = selectedMonth ? format(selectedMonth, "MMM") : "Jan"; 

  // Find the "User Demographics" graph data
  const graphData = dataJson.graphs.find(graph => graph.title === "User Demographics")?.data;

  // If graphData is undefined or null, handle it gracefully
  if (!graphData) {
    return <div>No data available</div>;
  }

  const monthData = Object.entries(graphData).reduce((acc, [platform, monthlyData]) => {
    acc.push({
      platform,
      count: monthlyData[selectedMonthName as keyof typeof monthlyData] || 0,
    });
    return acc;
  }, [] as { platform: string; count: number}[]);

  // Sort the data by visitors in descending order
  const sortedData = monthData.sort((a, b) => b.count - a.count);

  // Extract the months with the highest and lowest engagement
  // const first = sortedData[0].platform;
  // const second = sortedData[1].platform;
  // const least = sortedData[sortedData.length - 1].platform;
  // const least2 = sortedData[sortedData.length - 2].platform;

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Where Does Our Audience Come From?</CardTitle>
      </CardHeader>
      <CardContent className="pb-1">
        <ChartContainer
          config={srcConfig}
          className="mx-auto max-h-[300px]"
        >
          <RadarChart data={sortedData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="platform" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--color-desktop)" // Adjust the fill color dynamically if needed
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        With most users arriving through browsing and link redirections, Google and Instagram emerge as the dominant traffic sources.
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
  government: {
    label: "Arts",
    color: "hsl(var(--chart-a2))",
  },
} satisfies ChartConfig

const age = [
  { month: "18-24", housing: 120, politics: 130, government: 150 },
  { month: "25-34", housing: 250, politics: 180, government: 400 },
  { month: "35-44", housing: 200, politics: 120, government: 300 },
  { month: "45-54", housing: 100, politics: 150, government: 350 },
  { month: "55-64", housing: 150, politics: 90, government: 200 },
  { month: "65+", housing: 130, politics: 70, government: 180 },
];

export function AgeGroup() {
  

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">Reaching Every Age Group</CardTitle>
        <div className="flex justify-center items-center">
          
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={ageConfig}>
          <BarChart data={age}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
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
              dataKey="government"
              stackId="a"
              fill="var(--color-government)"
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

  type UsersProps = {
    selectedMonth?: Date;
  };

  const Users : React.FC<UsersProps> = ({ selectedMonth }) =>  {
    
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Source selectedMonth={selectedMonth} />
                <EngagedSession />
                
                <AgeGroup/>
                <Retention selectedMonth={selectedMonth} />
            </div>
        </>
    );
  };

export default Users


    

