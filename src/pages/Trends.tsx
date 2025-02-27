import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TrendingUp } from "lucide-react";
import { Card,  CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table,  TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import data from './data.json';
import Plot from "./Plots"

interface Topic {
  topics: any;
  topic: string;
  count: number;
  source: string;
  type?: string;
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
  
      const width = dimensions.width / 5;
      const height = dimensions.height / 5;
  
      const svg = d3.select(svgRef.current)
        .attr("width", "90%")
        .attr("height", "80%")
        .style("border", "1px solid #ddd")
        .style("background-color", "transparent")
        .style("display", "block")
        .style("margin", "auto");
  
      // Flatten and process the social media data
      const flattenedData: Topic[] = socialMediaData.flatMap((sourceData) =>
        sourceData.topics.map((topic) => ({ ...topic, source: sourceData.source }))
      );
  
      flattenedData.sort((a, b) => b.count - a.count);
  
      const maxCount = d3.max(flattenedData, (d: Topic) => d.count) || 0;
      const minCount = d3.min(flattenedData, (d: Topic) => d.count) || 0;
  
      // Create a responsive font size scale based on count
      const sizeScale = d3.scaleSqrt()
        .domain([minCount, maxCount])
        .range([0, Math.min(width, height) /5]); // Ensure words don't overflow
  
      // Create a color scale for each source
      const colorScale = d3.scaleOrdinal()
        .domain(["instagram", "google", "truthSocial"])
        .range(["#FF69B4", "#FFEB3B", "#1DA1F2"]);
  
      // Set up the force simulation
      d3.forceSimulation(flattenedData)
      .force("center", d3.forceCenter(width / 2, height/2)) // Place at center
      .force("charge", d3.forceManyBody().strength(20)) // Repulsion between nodes
      .force("collide", d3.forceCollide().radius((d: any) => sizeScale(d.count)*3)) // Collision force to prevent overlap
      .on("tick", ticked);
  
      // Tooltip setup
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.75)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("font-size", "14px");
  
      // Add words to the SVG
      const words = svg.selectAll(".word")
        .data(flattenedData)
        .enter()
        .append("text")
        .attr("class", "word")
        .text((d: Topic) => d.topic)
        .attr("font-size", (d: Topic) => sizeScale(d.count)) // Set font size based on count
        .attr("fill", (d: Topic) => colorScale(d.source)) // Apply the color scale
        .attr("font-family", "Arial, sans-serif")
        .style("cursor", "pointer")
        .on("mouseover", ( d: Topic) => {
          tooltip.transition().duration(200).style("visibility", "visible");
          tooltip.html(`Topic: ${d.topic}<br/>Total Count: ${d.count}<br/>Source: ${d.source}`);
        })
        .on("mousemove", (event: any) => {
          tooltip.style("top", (event.pageY) + "px");
            // .style("center", (event.pageX) + "px");
        })
        .on("mouseout", () => {
          tooltip.transition().duration(200).style("visibility", "hidden");
        });
  
      // Update the positions of the words on each tick of the simulation
      function ticked() {
        words
          .attr("x", (d: any) => Math.max(0, Math.min(width*2 - sizeScale(d.count), d.x))) // Prevent words from going out of bounds horizontally
          .attr("y", (d: any) => Math.max(0, Math.min(height*1.2 - sizeScale(d.count), d.y))); // Prevent words from going out of bounds vertically
      }
    }, [socialMediaData, dimensions]);
  
    return (
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle className="pb-2">Trending Topics on Social Media</CardTitle>
        </CardHeader>
        <svg ref={svgRef}></svg>
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
                <CardTitle >Influence Chart</CardTitle>
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

  console.log(`Calculating total count for topic: ${topic}`);

  // Get all platform keys from the data object
  const platforms = Object.keys(data) as string[];

  platforms.forEach((platform) => {
    const platformData = (data as any)[platform]?.trending_topics; // Type assertion

    // Log to confirm we're getting the platform data
    console.log(`Platform: ${platform}, Data:`, platformData);

    if (platformData) {
      platformData.forEach((t: { topic: string; count: number }) => {
        if (t.topic === topic) {
          totalCount += t.count;
          // Log the data for the topic in each platform
          console.log(`Found topic on ${platform} - Topic: ${t.topic}, Count: ${t.count}`);
        }
      });
    }
  });

  console.log(`Total count for topic '${topic}': ${totalCount}`);

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

      console.log(highDemandTopics)
  
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
  


// const Trends = () => {
//   const socialMediaData = data.graphs
//     .find((graph: any) => graph.title === "Social Media Trends")
//     ?.sources?.map((sourceData: any) => ({
//       source: sourceData.source,
//       topics: sourceData.topics.map((topic: { topic: string; count: number }) => ({
//         ...topic,
//         source: sourceData.source, // Add source to each topic
//       })),
//     })) || [];
  
//   const newsroomTopics = data.graphs.find((graph: any) => graph.title === "News Topic Counts by Source")?.sources;

//   if (!socialMediaData || socialMediaData.length === 0) {
//     return <div>No social media data available.</div>; // Optional fallback message
//   }

//   // Prepare the `trends` object to pass to InfluenceChart
//   const trends = {
//     google: {
//       trending_topics: socialMediaData[0].topics || [],
//     },
//     instagram: {
//       trending_topics: socialMediaData[1].topics || [],
//     },
//     truthSocial: {
//       trending_topics: socialMediaData[2].topics || [],
//     }
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//         <SocialMedia socialMediaData={socialMediaData} />
//         <InfluenceChart trends={trends} newsroomTopics={newsroomTopics} />
//         <Topics />
//         <Plot />
//       </div>
//     </div>
//   );
// };

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
    .find((graph: any) => graph.title === "News Topic Counts by Source")
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
        <SocialMedia socialMediaData={socialMediaData} />
        <InfluenceChart trends={trends} newsroomTopics={newsroomTopics} />
        <Topics />
        <Plot />
      </div>
    </div>
  );
};


export default Trends;
