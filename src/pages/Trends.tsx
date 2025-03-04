"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart,  XAxis, YAxis, Cell, PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Table,  TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import data from './data.json';
import { format } from "date-fns";

  // Flatten and aggregate topics
  const topics = data.graphs.flatMap(graph =>
    graph.sources?.flatMap(source =>
      source.topics.map(topic => ({
        topic: topic.topic,
        count: topic.count
      }))
    ) || []
  );

  const topicCounts = topics.reduce<{ [key: string]: number }>((acc, { topic, count }) => {
    if (!acc[topic]) {
      acc[topic] = 0;
    }
    acc[topic] += count;
    return acc;
  }, {});

  const aggregatedTopics = Object.entries(topicCounts).map(([topic, count]) => ({
    topic,
    count
  }));

  const sortedTopics = aggregatedTopics.sort((a, b) => b.count - a.count);
  const top7Topics = sortedTopics.slice(0, 5);

  const predefinedColors = [
    "#522500", // Example color 1
    "#8F3E00", // Example color 3
    "#C06722", // Example color 4
    "#EDA268", // Example color 5
    "#FFC599", // Example color 6
    "#FFD1AD",  // Example color 7
    "#FFDCC2"
  ];

  // Prepare chart data
  const chartData = top7Topics.map((topic, index) => ({
    topic: topic.topic,
    visitors: topic.count,
    fill: predefinedColors[index % predefinedColors.length]  // Use predefined color
  }));

  const chartConfig = {
    visitors: {
      label: "Count",
    },
    // You can add other custom properties if needed
  } satisfies ChartConfig;

  export function SocialMedia() {
    return (
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle className="font-bold text-lg">What’s Making Waves Online?</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 17,
              }}
            >
              <YAxis
                dataKey="topic"  // This should correspond to the key used in `chartData`
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value || "Unknown"}  // Fallback to "Unknown" if value is undefined
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
            Understanding online trends helps anticipate shifts in public interest and adapt content strategies accordingly. With Elections and COVID driving discussions, it’s clear that governance and health remain top priorities. Identifying such trends early ensures our newsroom stays relevant while catering to audience needs.
          </div>
        </CardFooter>
      </Card>
    );
  }

  const srcConfig = {
    desktop: {
      label: "Traffic",
      color: "hsl(var(--ring))",
    },
  
  } satisfies ChartConfig;
  
  export function InfluenceChart({ selectedMonth }: { selectedMonth?: Date }) {
    // Default to "Jan" if no month is provided
    const selectedMonthName = selectedMonth ? format(selectedMonth, "MMM") : "Jan"; 
  
    // Find the "User Demographics" graph data
    const graphData = data.graphs.find(graph => graph.title === "Trending Conversations")?.data;
  
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
          <CardTitle className="font-bold text-lg">Where Are These Conversations Happening?</CardTitle>
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
          While Google and Instagram drive the highest user traffic, Reddit stands out as the platform with the most trending discussions, highlighting its role in surfacing popular topics.
          </div>
        </CardFooter>
      </Card>
    );
  }



const getTotalCount = (topic: string) => {
  let totalCount = 0;


  // Get all platform keys from the data object
  const platforms = Object.keys(data) as string[];

  platforms.forEach((platform) => {
    const platformData = (data as any)[platform]?.trending_topics; // Type assertion

    if (platformData) {
      platformData.forEach((t: { topic: string; count: number }) => {
        if (t.topic === topic) {
          totalCount += t.count;
        }
      });
    }
  });


  return totalCount;
};


  const Topics = () => {
    // Ensure data.graphs and sources are available before accessing them
    const allTopics = (data.graphs || []).flatMap((graph) =>
      (graph.sources || []).flatMap((source) => source.topics || [])
    );

    // Remove duplicates by creating a Set of topics
    const uniqueTopicsMap: { [key: string]: any } = {};

    allTopics.forEach((topic) => {
      if (!uniqueTopicsMap[topic.topic]) {
        uniqueTopicsMap[topic.topic] = topic; // Add only the first occurrence of the topic
      }
    });

    // Create an array of unique topics

    const uniqueTopics = Object.values(uniqueTopicsMap);

    // Threshold for high demand and untapped topics
    const highDemandThreshold = 100;
    const untappedThreshold = 50;

    // Identify high demand topics (trending + high cumulative count)
    const highDemandTopics = uniqueTopics
      .filter((topic) => topic.type === 'trending' && highDemandThreshold > getTotalCount(topic.topic)  )
      .sort((a, b) => getTotalCount(b.topic) - getTotalCount(a.topic)); // Sort by highest cumulative count


    // Identify untapped topics (rising + low cumulative count)
    const untappedTopics = uniqueTopics
      .filter((topic) => topic.type === 'rising' && getTotalCount(topic.topic) <= untappedThreshold)
      .sort((a, b) => getTotalCount(b.topic) - getTotalCount(a.topic)); // Sort by lowest cumulative count


    return (
        <Card>
        <CardHeader className="items-center pb-0">
                <CardTitle className="font-bold text-lg">What’s In Demand And What’s Missing?</CardTitle>
              </CardHeader>
          <div className="flex flex-col md:flex-row gap-8 p-6">
          {/* High Demand Topics Table */}
          <div className="w-full md:w-1/2">
            <Table className="table-auto w-full text-left">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-2">High Demand Topics</TableHead>
                  <TableHead className="px-4 py-2"></TableHead>
                </TableRow>
              </TableHeader>
              <tbody>
                {highDemandTopics.map((topic) => (
                  <TableRow key={topic.topic}>
                    <TableCell className="px-4 py-2  text-white">
                      {topic.topic}
                    </TableCell>
                    <TableCell className="px-4 py-2  text-white"><TrendingUp className="h-4 w-4" /></TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Untapped Topics Table */}
          <div className="w-full md:w-1/2">
            <Table className="table-auto w-full text-left">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-2">Untapped Topics</TableHead>
                  <TableHead className="px-4 py-2"></TableHead>
                </TableRow>
              </TableHeader>
              <tbody>
                {untappedTopics.map((topic) => (
                  <TableRow key={topic.topic}>
                    <TableCell className="px-4 py-2 text-white">
                      {topic.topic}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-white"><TrendingUp className="h-4 w-4" /></TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
          </div>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        While topics like Cryptocurrency, Mental Health and Climate Action are already trending across platforms, areas such as Space Exploration, AI Revolution and Sustainability remain underrepresented, presenting opportunities for increased coverage and engagement.
        </div>
      </CardFooter>
        </Card>
    );
  };


const Trends = () => {

  // Define the type for transformed graph data
interface GraphData {
  topic: string;
  count: number;
}

// Define the color palette extracted from the image
const barColors = [
  "#522500", "#8F3E00", "#C06722", "#EDA268",
  "#FFC599", "#FFD1AD", "#FFDCC2", "#FFE6D6"
];

const Plots = () => {
  // Extract and transform data to an array format
  const rawData = data.graphs.find(graph => graph.title === "News Topic Counts of Articles")?.data || {};
  const graphData: GraphData[] = Object.entries(rawData).map(([topic, values]) => ({
    topic,
    count: (values as { count: number }).count,
  }));

  console.log(graphData);

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">What's Trending On Other Newsrooms?</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ /* Adjust your config here */ }}>
          <BarChart
            data={graphData}
            layout="vertical"
            margin={{ left: 17}}
          >
            <YAxis
              dataKey="topic"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="count" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={5}>
              {graphData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
          Other newsrooms are tapping into emerging trends like AI, while our platform remains strong in Health and Environment. Maintaining this focus is key, but exploring untapped trending topics can help broaden our reach.
        </div>
      </CardFooter>
    </Card>
  );
};

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SocialMedia/>
        <InfluenceChart />
        <Topics />
        <Plots />
      </div>
    </div>
  );
};


export default Trends;
