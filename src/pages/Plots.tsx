"use client";
import ReactECharts from "echarts-for-react";
// import { Bar, BarChart, CartesianGrid, LabelList, XAxis,YAxis } from "recharts"
import newsData from './data.json';

import {
  // Card,
  // CardContent,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "../components/ui/chart"
const BubbleChart = () => {
  const newData = newsData.graphs.flatMap(item => 
    item.sources?.flatMap(source => 
      source.topics.map(topic => ({
        source: source.source,
        topic: topic.topic,
        count: topic.count
      }))
    ).filter(Boolean) 
  ).filter(Boolean); 

  console.log(newData);

  // Define colors with an index signature
  const sourceColors: Record<string, string> = {
    "bbc-news": "#ff5733",
    "abc-news": "#33ff57",
    "new-york-magazine": "#3357ff",
    "rt-news": "#ff33aa"
  };

  // Convert Data to ECharts Format
  const chartData = newData.map((item) => ({
    name: item!.topic,
    value: [Math.random() * 100, Math.random() * 100, item!.count],
    source: item!.source,
    itemStyle: { color: sourceColors[item!.source] }
  }));

  // ECharts Option
  const option = {
    // title: { text: "Topic Bubble Chart", left: "center" },
    tooltip: {
      trigger: "item",
      formatter: (params: { name: string; data: { source: string; value: [number, number, number] } }) => {
        return `<div><strong>${params.name}</strong><br/>Source: ${params.data.source}<br/>Count: ${params.data.value[2]}</div>`;
      }
    },
    xAxis: { show: false },
    yAxis: { show: false },
    series: [
      {
        type: "scatter",
        symbolSize: (val: [number, number, number]) => val[2], 
        data: chartData,
        label: {
          show: true, 
          position: "inside", 
          formatter: (params: { name: string }) => params.name, 
          color: "#fff",
          fontWeight: "bold"
        }
      }
    ]
  };
  
  return(
    <div className = "flex justify-center items-center" >  
    <div className = "w-1/2 border-2 border-white rounded-xl">
    <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-lg"></CardTitle>
      </CardHeader>
  <ReactECharts option={option} style={{ height: "500px" }} />
  </div>
  </div>
);
};

export default BubbleChart;