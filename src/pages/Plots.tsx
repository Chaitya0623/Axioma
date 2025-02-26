"use client";
import ReactECharts from "echarts-for-react";
import newsData from "./data.json";
// import { CardHeader, CardTitle } from "../components/ui/card";

const BubbleChart = () => {
  const newData = newsData.graphs.flatMap((item) =>
    item.sources?.flatMap((source) =>
      source.topics.map((topic) => ({
        source: source.source,
        topic: topic.topic,
        count: topic.count,
      }))
    ).filter(Boolean)
  ).filter(Boolean);


  const sourceColors: Record<string, string> = {
    "BBC-News": "rgb(1, 58, 96)",
    "ABC-News": "rgb(250, 227, 178)",
    "New-York-Magazine": "rgb(253, 176, 104)",
    "RT-News": "rgb(205, 164, 152)",
  };

  const topicPositions: Record<string, [number, number]> = {
    "Elections": [120, 270],
    "Politics": [180, 380],
    "Economy": [220, 210],
    "Stock Market": [300, 300],
    
    "AI": [450, 210],
    "Technology": [500, 170],
    "Crypto": [420, 70],
    
    "Climate": [630, 240],
    "COVID": [650, 430],
    "Healthcare": [740, 250],
    "Renewable Energy": [760, 110],
    
    "Football": [830, 340],
    "Fashion": [880, 290],
    "Entertainment": [920, 470],
    
    "War": [1020, 270],
    "Geopolitics": [1050, 430],
  };
  
  const jitter = (value: number, amount: number = 30) => {
    return value + (Math.random() - 0.5) * amount;
  };

  // Converting the data to ECharts format
  const chartData = newData.map((item) => {
    const basePosition = topicPositions[item!.topic] || [Math.random() * 1200, Math.random() * 400];
    
    return {
      name: item!.topic,
      value: [
        jitter(basePosition[0]),
        jitter(basePosition[1]),
        Math.max(20, item!.count * 1.5),
      ],
      source: item!.source,
      itemStyle: { color: sourceColors[item!.source] || "gray" },
    };
  });

  // ECharts Option 
  const option = {
    tooltip: {
      trigger: "item",
      formatter: (params: { name: string; data: { source: string; value: [number, number, number] } }) => {
        return `<div><strong>${params.name}</strong><br/>Source: ${params.data.source}<br/>Count: ${newData.find(d => d?.topic === params.name)?.count || "N/A"}</div>`;
      },
      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
      borderColor: 'white',                
      borderWidth: 1,             
      textStyle: {
        color: 'white'                       
      }
    },
    xAxis: { 
      show: false, 
      min: 100, 
      max: 1100 
    },
    yAxis: { 
      show: false, 
      min: 50, 
      max: 450 
    },
    grid: {
      top: '10%',  
      bottom: '10%', 
      containLabel: true
    },
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
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          fontSize: 14,
        },
        zlevel: 1,
        animation: true,
        animationThreshold: 1000,
        animationDuration: 1000,
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl border-2 border-white rounded-xl">
        {/* Header section for title */}
        <div className="w-full text-center py-4">
          <h1 className="text-2xl font-bold">News Topic Distribution</h1>
        </div>
        
        {/* Chart section */}
        <div className="w-full h-[28rem] rounded-xl ">
          <ReactECharts 
            option={option} 
            style={{ height: '100%', width: '100%' }}
          />
        </div>
        
        {/* Insights section at bottom */}
        <div className="w-full text-center py-4">
          <p className="text-lg">Political and economic topics dominate the news landscape, reflecting global governance and financial concerns. Meanwhile, AI and technology are gaining significant media attention, highlighting their growing impact on society.</p>
        </div>
      </div>
    </div>
  );
};

export default BubbleChart;