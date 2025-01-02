"use client";
import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

type Sentiment = "up" | "down" | null;

export default function ChatPage() {
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment>(null);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSentimentSelect = async (sentiment: Sentiment) => {
    try {
      const response = await fetch("/api/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sentiment,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save sentiment");
      }

      setSelectedSentiment(sentiment);
    } catch (error) {
      console.error("Error saving sentiment:", error);
    }
  };

  const getButtonStyles = (buttonSentiment: Sentiment) => {
    const baseStyles =
      "p-6 rounded-full transition-all duration-200 transform hover:scale-110";
    const selectedStyles = "bg-blue-100 text-blue-600 scale-110";
    const unselectedStyles = "bg-gray-100 text-gray-600 hover:bg-gray-200";

    return `${baseStyles} ${
      selectedSentiment === buttonSentiment ? selectedStyles : unselectedStyles
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-4">
      <div className="text-2xl font-medium text-gray-700">{today}</div>
      <div className="text-2xl font-medium text-gray-700">
        Did you improve from yourself yesterday by 1%?
      </div>

      <div className="flex space-x-8">
        <button
          onClick={() => handleSentimentSelect("up")}
          className={getButtonStyles("up")}
          aria-label="Thumbs up"
        >
          <ThumbsUp size={32} />
        </button>

        <button
          onClick={() => handleSentimentSelect("down")}
          className={getButtonStyles("down")}
          aria-label="Thumbs down"
        >
          <ThumbsDown size={32} />
        </button>
      </div>

      {selectedSentiment && (
        <p className="text-gray-600 mt-4">
          You selected thumbs {selectedSentiment}. Click again to change your
          selection.
        </p>
      )}
    </div>
  );
}
