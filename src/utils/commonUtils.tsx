export const capitalizeWords = (text: string): string => {
  // Handle empty or null input
  if (!text) return "";

  // Split the text by spaces and capitalize each word
  return text
    .split(" ")
    .map((word) => {
      // Skip empty strings
      if (!word) return word;
      // Capitalize first letter and make rest lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};
