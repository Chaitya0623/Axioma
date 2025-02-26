import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import data from './data.json';
import Plot from "./Plots"

interface Topic {
  topic: string;
  count: number;
}

interface SourceData {
  source: string;
  topics: Topic[];
}



const SocialMedia = ({ socialMediaData }: { socialMediaData: SourceData[] }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    if (!svgRef.current) return;

    const width = dimensions.width/5;
    const height = dimensions.height/5;

    const svg = d3.select(svgRef.current)
      .attr("width", "80%")
      .attr("height", "80%")
      .style("border", "1px solid #ddd")
      .style("background-color", "transparent")
      .style("display", "block")  // This makes the SVG a block element
  .style("margin", "auto");   

  
    // Flatten and process the social media data
    const flattenedData: Topic[] = socialMediaData.flatMap((sourceData) =>
      sourceData.topics.map((topic) => ({ ...topic, source: sourceData.source }))
    );

    flattenedData.sort((a, b) => b.count - a.count);

    const maxCount = d3.max(flattenedData, (d: Topic) => d.count) || 0;
    const minCount = d3.min(flattenedData, (d: Topic) => d.count) || 0;

    const sizeScale = d3.scaleSqrt()
      .domain([minCount, maxCount])
      .range([20, 80]);

    const colorScale = (source: string) => {
      switch (source) {
        case "instagram":
          return "#FF69B4"; // Pink
        case "google":
          return "#FFEB3B"; // Yellow
        case "truthSocial":
          return "#1DA1F2"; // Blue
        default:
          return "#333";
      }
    };

    const simulation = d3.forceSimulation(flattenedData)
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("charge", d3.forceManyBody().strength(-10))
      .force("collide", d3.forceCollide().radius((d: any) => sizeScale(d.count) + 5))
      .on("tick", ticked);

    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(0, 0, 0, 0.75)")
      .style("color", "white")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("font-size", "14px");

    const words = svg.selectAll(".word")
      .data(flattenedData)
      .enter()
      .append("text")
      .attr("class", "word")
      .text((d: Topic) => d.topic)
      .attr("font-size", (d: Topic) => sizeScale(d.count)/2)
      .attr("fill", (d: Topic) => colorScale(d.source))
      .attr("font-family", "Arial, sans-serif")
      .style("cursor", "pointer")
      .on("mouseover", (event: any, d: Topic) => {
        tooltip.transition().duration(200).style("visibility", "visible");
        tooltip.html(`Topic: ${d.topic}<br/>Total Count: ${d.count}<br/>Source: ${d.source}`);
      })
      .on("mousemove", (event: any) => {
        tooltip.style("top", (event.pageY ) + "px")
          .style("left", (event.pageX + 5) + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("visibility", "hidden");
      });

    function ticked() {
      words
        .attr("x", (d: any) => Math.max(0, Math.min(width - sizeScale(d.count), d.x)))
        .attr("y", (d: any) => Math.max(0, Math.min(height*5 - sizeScale(d.count), d.y)));
    }
  }, [socialMediaData]);

  return (
    <Card>
        <CardHeader className="items-center pb-0">
      <CardTitle>Trending Topics on Social Media</CardTitle>
      </CardHeader>
      <svg className="p-8" ref={svgRef}></svg>
    </Card>
  );
};


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
    // Flatten the newsroom topics into a single array of topic names (strings)
    const allNewsroomTopics = newsroomTopics.flatMap(newsroom => newsroom.topics);
    const topicsOnly = allNewsroomTopics.map(newsTopic => newsTopic.topic);
  
    // Function to calculate percentage
    const calculatePercentage = (platformTopics: { topic: string, count: number }[]) => {
      // Extract the 'topic' name directly from platformTopics
      const platformNames = platformTopics.map((platform) => platform.topic);
  
      // Find the matching topics in the flattened list of newsroom topics
      const matchingTopics = platformNames.filter((topicName) =>
        topicsOnly.includes(topicName) // Check if the topic exists in any newsroom's topics
      );
  
      // Return the calculated percentage
      return (matchingTopics.length / platformNames.length) * 100;
    };
  
    // Example: Calculate percentage for each platform
    const googlePercentage = calculatePercentage(trends.google.trending_topics);
    const instagramPercentage = calculatePercentage(trends.instagram.trending_topics);
    const truthSocialPercentage = calculatePercentage(trends.truthSocial.trending_topics);
  
    return (
      <Card>
        <CardHeader className="items-center pb-0">
                <CardTitle className="font-bold text-lg">Influence Chart</CardTitle>
              </CardHeader>
        <div className="p-10">
          <div className="p-2">
          <CardDescription>Google: {googlePercentage.toFixed(2)}%</CardDescription>
            <div
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: 'oklch(0.373 0.034 259.733)', // Background color (the scale)
                borderRadius: '5px',
                overflow: 'hidden', // Ensure the inner bar is clipped to the rounded corners
              }}
            >
              <div
                style={{
                  width: `${googlePercentage}%`,
                  height: '100%',
                  backgroundColor: '#FFEB3B', // Google color
                  transition: 'width 0.3s ease-in-out',
                }}
              ></div>
            </div>
          </div>
          <div className="p-2">
          <CardDescription>Instagram: {instagramPercentage.toFixed(2)}%</CardDescription>
            <div
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: 'oklch(0.373 0.034 259.733)', // Background color (the scale)
                borderRadius: '5px',
                overflow: 'hidden', // Ensure the inner bar is clipped to the rounded corners
              }}
            >
              <div
                style={{
                  width: `${instagramPercentage}%`,
                  height: '100%',
                  backgroundColor: '#FF69B4', // Instagram color
                  transition: 'width 0.3s ease-in-out',
                }}
              ></div>
            </div>
          </div>
          <div className="p-2">
            <CardDescription>Truth Social: {truthSocialPercentage.toFixed(2)}% </CardDescription>
            <div
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: 'oklch(0.373 0.034 259.733)', // Background color (the scale)
                borderRadius: '5px',
                overflow: 'hidden', // Ensure the inner bar is clipped to the rounded corners
              }}
            >
              <div
                style={{
                  width: `${truthSocialPercentage}%`,
                  height: '100%',
                  backgroundColor: '#1DA1F2', // Truth Social color
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
  
    // Ensure trends.google, trends.instagram, and trends.twitter are defined and contain trending_topics
    ['google', 'instagram', 'twitter'].forEach((platform) => {
      const platformData = data[platform];
  
      if (platformData && Array.isArray(platformData.trending_topics)) {
        platformData.trending_topics.forEach((t) => {
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
    const highDemandThreshold = 200;
    const untappedThreshold = 50;
  
    // Identify high demand topics (trending + high cumulative count)
    const highDemandTopics = uniqueTopics
      .filter((topic) => topic.type === 'trending' && getTotalCount(topic.topic) > highDemandThreshold)
      .sort((a, b) => getTotalCount(b.topic) - getTotalCount(a.topic)); // Sort by highest cumulative count
      
  
    // Identify untapped topics (rising + low cumulative count)
    const untappedTopics = uniqueTopics
      .filter((topic) => topic.type === 'rising' && getTotalCount(topic.topic) <= untappedThreshold)
      .sort((a, b) => getTotalCount(b.topic) - getTotalCount(a.topic)); // Sort by lowest cumulative count

      console.log(untappedTopics)
  
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* High Demand Topics Table */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-bold">High Demand Topics</h3>
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
                    <TableCell className="px-4 py-2">
                      <strong>{topic.topic}</strong>
                    </TableCell>
                    <TableCell className="px-4 py-2"><TrendingUp className="h-4 w-4" /></TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
  
          {/* Untapped Topics Table */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-bold">Untapped Topics</h3>
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
                    <TableCell className="px-4 py-2">
                      <strong>{topic.topic}</strong>
                    </TableCell>
                    <TableCell className="px-4 py-2"><TrendingUp className="h-4 w-4" /></TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  };
  
  
  
const Trends = () => {
  const socialMediaData = data.graphs.find((graph: any) => graph.title === "Social Media Trends")?.sources;
  const newsroomTopics = data.graphs.find((graph: any) => graph.title === "News Topic Counts by Source")?.sources;  // Example, modify based on your actual data

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
// console.log(trends)
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SocialMedia socialMediaData={socialMediaData} />
        <InfluenceChart trends={trends} newsroomTopics={newsroomTopics}/>
        <Topics/>
        <Plot/>
      </div>
    </div>
  );
};


export default Trends;
