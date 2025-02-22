"use client"


import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export function OffPlatform() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>On-and-Off Platform Analysis</CardTitle>
      </CardHeader>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        It leverages real-time insights, such as those from Google Trends, to identify trending topics in the current landscape. Unlike traditional methods that rely on past data, this approach enables editorial teams to craft timely and relevant content that aligns with audience interests, maximizing engagement and ensuring up-to-date relevance in a rapidly evolving digital Security.
        </div>
      </CardFooter>
    </Card>
  )
}

export function PredictClick() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>Predictive Click Model</CardTitle>
      </CardHeader>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        Leverage advanced algorithms to predict the likelihood of users clicking on specific content. By analyzing interest, recency, topic similarity, and trendiness, this feature enables data-driven decisions to optimize content strategy, enhance engagement, and recommend relevant new topics effectively.
        </div>
      </CardFooter>
    </Card>
  )
}

export function Sentiment() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>Advanced Theme and Sentiment Insights Linked to Revenue</CardTitle>
      </CardHeader>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        This feature connects sentiment and theme analysis directly to revenue, focusing on user engagement. It helps editorial teams identify emotional drivers behind their most profitable content, enabling strategic content creation. Future enhancements could include analyzing user comments (with permissions) and integrating insights with social media platforms for a comprehensive view of audience engagement.
        </div>
      </CardFooter>
    </Card>
  )
}

export function Anomaly() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>Anomaly detection for Events</CardTitle>
      </CardHeader>
      <CardFooter className="flex-col text-center gap-2 text-base">
        <div className="leading-none text-muted-foreground">
        It identifies unusual spikes in traffic for specific articles or authors, providing alerts about potential issues or extraordinary performance. This allows teams to respond quickly, either to capitalize on unexpected success or address possible concerns, such as legal challenges. It ensures proactive management of content dynamics, maximizing opportunities while mitigating risks.
        </div>
      </CardFooter>
    </Card>
  )
}


const Features = () => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 m-5">
                <OffPlatform/>
                <PredictClick/>
                <Sentiment />
                <Anomaly />
            </div>
        </>
    );
  };

export default Features