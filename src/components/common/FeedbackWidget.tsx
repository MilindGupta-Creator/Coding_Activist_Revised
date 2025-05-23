"use client";

import { useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { MessageSquare, X } from "lucide-react";

type FeedbackType = "improvement" | "bug" | "feature" | "other";

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("improvement");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "feedback"), {
        content: feedback,
        type: feedbackType,
        timestamp: new Date().toISOString(),
      });
      toast.success("Thank you for your feedback!");
      setFeedback("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFeedbackPrompt = () => {
    switch (feedbackType) {
      case "improvement":
        return "What improvements would you like to see on our platform?";
      case "bug":
        return "Please describe the issue you encountered:";
      case "feature":
        return "What new feature would you like to see?";
      case "other":
        return "Share your thoughts with us:";
      default:
        return "Share your feedback with us:";
    }
  };

  return (
    <>
      {/* Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-4 bg-violet-500 text-white p-3 rounded-full shadow-lg hover:bg-violet-600 transition-colors z-50 flex items-center gap-2"
        aria-label="Open feedback form"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Help Us Improve
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Your feedback helps us make Coding Activist better!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackType("improvement")}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    feedbackType === "improvement"
                      ? "bg-violet-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Improvement
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType("bug")}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    feedbackType === "bug"
                      ? "bg-violet-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Bug Report
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType("feature")}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    feedbackType === "feature"
                      ? "bg-violet-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Feature Request
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType("other")}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    feedbackType === "other"
                      ? "bg-violet-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Other
                </button>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {getFeedbackPrompt()}
                </p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 min-h-[120px] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-violet-500 text-white py-3 px-4 rounded-lg hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? "Sending..." : "Send Feedback"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackWidget; 