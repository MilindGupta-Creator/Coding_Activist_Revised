import { GeneratedQuestion, SampleTopic } from "../types";

export const generateSampleQuestion = async (topic: SampleTopic): Promise<GeneratedQuestion> => {
  try {
    const response = await fetch('/api/generate-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data as GeneratedQuestion;
  } catch (error) {
    console.error("Error generating question:", error);
    throw error;
  }
};
