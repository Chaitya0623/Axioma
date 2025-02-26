"use client";

import '../App.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Authors from "./Authors";
import Users from "./Users";
import Revenue from './Revenue';
import Features from './Features';
import Landing from './Landing';
import TourGuide from './TourGuide';
import Trends from './Trends';

import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns/format";
import { cn } from "@/lib/utils";
import { MonthPicker } from "@/components/ui/monthpicker";
import Chatbot from './Chatbot';


import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select';

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Click from './Click';

function Date({ onMonthSelect, selectedMonth }: { onMonthSelect: (date: Date) => void, selectedMonth?: Date }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !selectedMonth && "text-muted-foreground")}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedMonth ? format(selectedMonth, "MMM yyyy") : <span>Pick a Month</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthPicker onMonthSelect={onMonthSelect} selectedMonth={selectedMonth} />
      </PopoverContent>
    </Popover>
  );
}

function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<string>("Landing");
  const [startTour, setStartTour] = useState(true);  // Don't trigger the tour immediately
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    // Check if the user has logged in and if they have seen the tour before
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setStartTour(true);  // Start the tour if the user hasn't seen it yet
      localStorage.setItem('hasSeenTour', 'true');  // Mark the tour as seen
    }
  }, []);

  const handleTourEnd = () => {
    setStartTour(false);  // End the tour when the user completes it
  };

  if (!loaded) {
    return null;
  }

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const sections = ["Landing", "User", "Author", "Revenue", "Trends", "Click"];
    
    // Save the original selectedTab to restore after generating the PDF
    const originalTab = selectedTab;
  
    // Temporarily set the selectedTab to each section one by one to render content
    for (let i = 0; i < sections.length; i++) {
      setSelectedTab(sections[i]);  // Activate the current tab
      await new Promise((resolve) => setTimeout(resolve, 1700)); // 🕒 Small delay to ensure charts load
      
      const element = document.getElementById(`tab-${sections[i]}`);
      if (!element) continue;
  
      // Ensure the element is visible and rendered
      element.style.transform = "scale(1)";
      element.style.opacity = "1"; 
  
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
  
      if (i > 0) pdf.addPage();
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text(sections[i], 95, 20);
      
      pdf.addImage(imgData, "PNG", 10, 25, 190, 0); // Keeping default width
    }
  
    // Restore the original selectedTab after generating the PDF
    setSelectedTab(originalTab);
  
    pdf.save("dashboard-report.pdf");
  };

  return (
    <div className='w-full'>
      <div className='bg-back text-text p-6'>
        <div className='w-full text-justify sm:w-1/2 sm:text-start'>
          <h1 className='text-3xl font-bold pl-5'>Axioma</h1>
          <p className='text-lg pl-5 mt-3 leading-normal'>
            We help newsrooms make informed decisions, from identifying where to make their next hire to optimizing advertising spending, all aimed at enhancing audience engagement and driving revenue growth.
          </p>
        </div>
        <div className="p-5">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className="flex flex-col md:flex-row items-start gap-4">
              {/* Tabs Section */}
              <div className="w-full md:flex-1 overflow-x-auto whitespace-nowrap">
                {/* For larger screens, display TabsList */}
                <div className="hidden md:flex gap-2 justify-start">
                  <TabsList>
                    <TabsTrigger id="step-1" value="Landing" className="p-2 text-sm rounded">Info</TabsTrigger>
                    <TabsTrigger id="step-2" value="User" className="p-2 text-sm rounded">User Demographics</TabsTrigger>
                    <TabsTrigger id="step-3" value="Author" className="p-2 text-sm rounded">Author Performance</TabsTrigger>
                    <TabsTrigger id="step-4" value="Revenue" className="p-2 text-sm rounded">Revenue Attribution</TabsTrigger>
                    {/* <TabsTrigger id="step-5" value="Features" className="p-2 text-sm rounded">Features</TabsTrigger> */}
                    <TabsTrigger value="Trends" className="p-2 text-sm">Trends</TabsTrigger>
                    <TabsTrigger id="step-6" value="Click" className="p-2 text-sm rounded">Click Prediction</TabsTrigger>
                  </TabsList>
                  <div className="text-center text-sm">
                    <Button onClick={generatePDF} className='rounded bg-white text-black hover:bg-white hover:text-black'>Download Report</Button>
                  </div>
                </div>

                {/* For smaller screens, display Select dropdown */}
                <div className="md:hidden w-full">
                  <Select value={selectedTab} onValueChange={setSelectedTab}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Tab" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Landing">Info</SelectItem>
                      <SelectItem value="User">User Demographics</SelectItem>
                      <SelectItem value="Author">Author Performance</SelectItem>
                      <SelectItem value="Revenue">Revenue Attribution</SelectItem>
                      <SelectItem value="Features">Features</SelectItem>
                      <SelectItem value="Trends">Trends</SelectItem>
                      <SelectItem value="Click">Click</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* DateRangePicker positioned next to TabsList on desktop */}
              <div className="md:mt-0 md:ml-4 flex justify-center">
                <Date onMonthSelect={setSelectedMonth} selectedMonth={selectedMonth} />
              </div>
            </div>

            {/* Tab Contents */}
            <TabsContent value="Landing">
              <div id="tab-Landing">
                <Landing />
              </div>
            </TabsContent>
            <TabsContent value="User">
              <div id="tab-User">
                <Users selectedMonth={selectedMonth} />
              </div>
            </TabsContent>
            <TabsContent value="Author">
              <div id="tab-Author">
                <Authors selectedMonth={selectedMonth} />
              </div>
            </TabsContent>
            <TabsContent value="Revenue">
              <div id="tab-Revenue">
                <Revenue selectedMonth={selectedMonth} />
              </div>
            </TabsContent>
            <TabsContent value="Features">
              <div id="tab-Features">
                <Features />
              </div>
            </TabsContent>
            <TabsContent value="Trends">
              <div id="tab-Trends">
                <Trends />
                </div>
                </TabsContent>
            <TabsContent value="Click">
              <div id="tab-Click">
                <Click />
              </div>
            </TabsContent>
            

          </Tabs>
        </div>

        {startTour && (
          <TourGuide start={startTour} setStartTour={setStartTour} onTourEnd={handleTourEnd} />
        )}

        <Chatbot id="step-6" />

      <hr />
      <h1 className='text-3xl text-center font-bold pl-5 mt-6'>Find Our Product Interesting?</h1>
      <h2 className='text-lg text-center pl-5'>Contact us at team@simppl.org</h2>
    </div>
    </div>
  );
}

export default Dashboard;
