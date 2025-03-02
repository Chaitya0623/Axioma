
"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart,  XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
import React from "react";
import { Table,  TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import data from './data.json';
import Plots from "./Plots";

interface Topic {
  topics: any;
  topic: string;
  count: number;
  source: string;
  type?: string;
}


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
  const top7Topics = sortedTopics.slice(0, 7);

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
          <CardTitle>Trending Topics on Social Media</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 0,
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
              <XAxis dataKey="visitors" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="visitors" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-center gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Top trending topics on different Social Media Platforms
          </div>
        </CardFooter>
      </Card>
    );
  }



interface Topic {
    name: string;
  }

  interface TrendsData {
    google: { trending_topics: Topic[] };
    instagram: { trending_topics: Topic[] };
    truthSocial: { trending_topics: Topic[] };
  }

  interface InfluenceChartProps {
    trends: TrendsData;
    newsroomTopics: Topic[];
  }


const InfluenceChart: React.FC<InfluenceChartProps> = ({ trends, newsroomTopics }) => {

    const topicsOnly = newsroomTopics.map(newsTopic => newsTopic.topic);

    const calculatePercentage = (platformTopics: { topic: string, count: number }[]) => {

      const platformNames = platformTopics.map((platform) => platform.topic);

      // Find the matching topics in the flattened list of newsroom topics
      const matchingTopics = platformNames.filter((topicName) =>
        topicsOnly.includes(topicName)
      );

      return (matchingTopics.length / platformNames.length) * 100;
    };

    const googlePercentage = calculatePercentage(trends.google.trending_topics);
    const instagramPercentage = calculatePercentage(trends.instagram.trending_topics);
    const truthSocialPercentage = calculatePercentage(trends.truthSocial.trending_topics);

    return (
      <Card>
        <CardHeader className="items-center pb-0">
                <CardTitle >Influence Chart</CardTitle>
              </CardHeader>
        <div className="p-10">
          <div className="p-2">
          <CardDescription className="p-2">Google: {googlePercentage.toFixed(2)}%</CardDescription>
            <div
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#495057',
                borderRadius: '5px',
                overflow: 'hidden', // Ensure the inner bar is clipped to the rounded corners
              }}
            >
              <div
                style={{
                  width: `${googlePercentage}%`,
                  height: '100%',
                  backgroundColor: '#6f1d1b',
                  transition: 'width 0.3s ease-in-out',
                }}
              ></div>
            </div>
          </div>
          <div className="p-2">
          <CardDescription className="p-2">Instagram: {instagramPercentage.toFixed(2)}%</CardDescription>
            <div
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#495057',
                borderRadius: '5px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${instagramPercentage}%`,
                  height: '100%',
                  backgroundColor: '#bb9457',
                  transition: 'width 0.3s ease-in-out',
                }}
              ></div>
            </div>
          </div>
          <div className="p-2">
            <CardDescription className="p-2">Truth Social: {truthSocialPercentage.toFixed(2)}% </CardDescription>
            <div
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#495057',
                borderRadius: '5px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${truthSocialPercentage}%`,
                  height: '100%',
                  backgroundColor: '#ffe6a7',
                  transition: 'width 0.3s ease-in-out',
                }}
              ></div>
            </div>
          </div>
        </div>
      </Card>
    );
  };



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
      <div className="space-y-8">
        <Card className="flex flex-col md:flex-row gap-8 p-6">
          {/* High Demand Topics Table */}
          <div className="w-full md:w-1/2">
            <CardTitle >High Demand Topics</CardTitle>
            <Table className="table-auto w-full text-left">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-2">Topic</TableHead>
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
            <CardTitle>Untapped Topics</CardTitle>
            <Table className="table-auto w-full text-left">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-2">Topic</TableHead>
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
        </Card>
      </div>
    );
  };


const Trends = () => {
  const socialMediaData = data.graphs
    .find((graph: any) => graph.title === "Social Media Trends")
    ?.sources?.map((sourceData: any) => ({
      source: sourceData.source,
      topics: sourceData.topics.map((topic: { topic: string; count: number }) => ({
        ...topic,
        source: sourceData.source, // Add source to each topic
      })),
    })) || [];

  // Safely extract newsroomTopics with a similar pattern
  const newsroomTopics = data.graphs
    .find((graph: any) => graph.title === "News Topic Counts")
    ?.sources
    ?.flatMap((sourceData: any) =>
      sourceData.topics.map((topic: { topic: string; count: number }) => ({
        ...topic,
        source: sourceData.source, // Add source to each topic
      }))
    ) || []; // Fallback to empty array if no matching graph or sources are found

  if (!socialMediaData || socialMediaData.length === 0) {
    return <div>No social media data available.</div>; // Optional fallback message
  }

  // Prepare the `trends` object to pass to InfluenceChart
  const trends = {
    google: {
      trending_topics: socialMediaData[0].topics || [],
    },
    instagram: {
      trending_topics: socialMediaData[1].topics || [],
    },
    truthSocial: {
      trending_topics: socialMediaData[2].topics || [],
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SocialMedia/>
        <InfluenceChart trends={trends} newsroomTopics={newsroomTopics} />
        <Topics />
        <Plots />
      </div>
    </div>
  );
};


export default Trends;
