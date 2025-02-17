"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatbotProps {
  id: string;  // Define 'id' as a string
}

export default function Chatbot({ id }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { type: "incoming", text: "Hello! How can I assist you today?" },
  ]);
  const [loading, setLoading] = useState(false);

  // const handleSendMessage = async () => {
  //   if (!input.trim()) return;

  //   setMessages((prev) => [...prev, { type: "outgoing", text: input }]);

  //   const question = input;
  //   setInput("");
  //   setLoading(true);

  //   try {
  //     const response = await fetch("https://newsroom-analytics-demo.onrender.com/ask", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ question }),
  //       mode: "cors",
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       setMessages((prev) => [
  //         ...prev,
  //         { type: "incoming", text: data.answer || "I'm sorry, I don't understand." },
  //       ]);
  //     } else {
  //       setMessages((prev) => [
  //         ...prev,
  //         { type: "incoming", text: data.error || "An error occurred." },
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setMessages((prev) => [
  //       ...prev,
  //       { type: "incoming", text: "Failed to connect to the server." },
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
  
    setMessages((prev) => [...prev, { type: "outgoing", text: input }]);
  
    const question = input;
    setInput("");
    setLoading(true);
  
    // Prepare conversation context (convert messages to a format usable by backend)
    const conversation = messages.map((msg) => {
      return {
        role: msg.type === "incoming" ? "assistant" : "user",
        content: msg.text,
      };
    });
    console.log({ question, conversation });
    try {
      const response = await fetch("https://newsroom-analytics-demo.vercel.app/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, conversation }), 
        mode: "cors",
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { type: "incoming", text: data.answer || "I'm sorry, I don't understand." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { type: "incoming", text: data.error || "An error occurred." },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "incoming", text: "Failed to connect to the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden"></div>
      )}

      {/* Chatbot Container */}
      <div className="fixed bottom-4 right-4 z-50">
        {/* Floating Button */}
        <Button id={id}
          onClick={() => setIsOpen(!isOpen)}
          className="shadow-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2 flex items-center justify-center"
        >
          {isOpen ? <br /> : "Chat"}
        </Button>

        {/* Chat Window */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          {isOpen && (
            <div
              className={cn(
                "relative bg-zinc-900 rounded-lg shadow-lg overflow-hidden",
                "w-80 h-[80vh] sm:h-auto sm:w-96", 
                "sm:h-[600px]" 
              )}
            >
              {/* Chat Header */}
              <div className="p-3 bg-zinc-900 text-white rounded-t-lg flex justify-between items-center">
                <span>Chat with us</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white text-xl hover:text-gray-300 focus:outline-none"
                >
                  &times;
                </button>
              </div>

              {/* Chat Body */}
              <div className="p-3 space-y-2 text-sm overflow-y-auto h-[calc(100%-120px)]">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "px-4 py-2 w-fit max-w-[75%] break-words",
                      msg.type === "incoming"
                        ? "bg-gray-100 text-gray-800 rounded-r-xl rounded-bl-xl"
                        : "bg-zinc-800 text-white ml-auto rounded-l-xl rounded-br-xl"
                    )}
                  >
                    {msg.text}
                  </div>
                ))}
                {loading && (
                  <div className="text-gray-400 text-sm">Thinking...</div>
                )}
              </div>

              {/* Chat Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-zinc-900 border-t border-gray-700 flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 text-black rounded-full px-4"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                >
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
