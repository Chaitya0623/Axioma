"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, Cell, LabelList } from "recharts";
import data from './data.json';

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
  const rawData = data.graphs.find(graph => graph.title === "News Topic Counts by Source")?.data || {};
  const graphData: GraphData[] = Object.entries(rawData).map(([topic, values]) => ({
    topic,
    count: (values as { count: number }).count,
  }));

  console.log(graphData);

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg">News topics by source</CardTitle>
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
              content={<ChartTooltipContent hideLabel={false} />}
            />
            <Bar dataKey="count" radius={5}>
              {graphData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
              <LabelList
                dataKey="count"
                position="right"
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
          This chart represents the total number of news articles on various topics.
        </div>
      </CardFooter>
    </Card>
  );
};

export default Plots;
