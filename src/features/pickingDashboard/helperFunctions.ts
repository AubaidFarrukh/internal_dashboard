import { formatDate } from "../../utils";

interface TPercentageComment {
  phrase: string;
  color: string;
  comment: string;
}

export const getPickingProgressComments = (
  percentage: number,
  orderDate: string
): TPercentageComment => {
  // Get the current date
  const currentDate = formatDate("today", "YYYY/MM/DD");

  // Check if the order date is the same as today's
  const isToday = orderDate === currentDate;

  // Messages for today's data
  if (percentage === 100) {
    return {
      phrase: "Perfect",
      color: "darkgreen",
      comment: isToday
        ? "Great work! All items are being given smoothly."
        : "Amazing! A job well done.",
    };
  } else if (percentage >= 90) {
    return {
      phrase: "Excellent",
      color: "darkgreen",
      comment: isToday
        ? "Great work! Pickers are accurately handling most items."
        : "High accuracy. Most items picked correctly.",
    };
  } else if (percentage >= 70) {
    return {
      phrase: "Good",
      color: "lightgreen",
      comment: isToday
        ? "Pickers are making good progress. Accuracy is improving."
        : "Well done! Accuracy is good.",
    };
  } else if (percentage >= 50) {
    return {
      phrase: "Moderate",
      color: "yellow",
      comment: isToday
        ? "Pickers are steadily working on picking items."
        : "Keep improving! Accuracy is average.",
    };
  } else if (percentage >= 30) {
    return {
      phrase: "Fair",
      color: "orange",
      comment: isToday
        ? "It's a good start. Keep up the pace."
        : "Picking accuracy needs improvement. Attention required.",
    };
  } else {
    return {
      phrase: "Poor",
      color: "red",
      comment: isToday
        ? "Let's get started with the today's orders!"
        : "Critical attention required. Picking accuracy needs significant improvement.",
    };
  }
};

export const getDeliveryProgressComments = (
  percentage: number,
  orderDate: string
): TPercentageComment => {
  // Get the current date
  const currentDate = formatDate("today", "YYYY/MM/DD");

  // Check if the order date is the same as today's
  const isToday = orderDate === currentDate;

  // Messages for today's data
  if (percentage === 100) {
    return {
      phrase: "Perfect",
      color: "darkgreen",
      comment: isToday
        ? "Great work! All orders have been successfully delivered."
        : "Amazing! A job well done with 100% delivery success.",
    };
  } else if (percentage >= 90) {
    return {
      phrase: "Excellent",
      color: "darkgreen",
      comment: isToday
        ? "Great work! Most orders have been delivered successfully."
        : `High delivery success. ${percentage.toFixed(
            2
          )}% of orders delivered correctly.`,
    };
  } else if (percentage >= 70) {
    return {
      phrase: "Good",
      color: "lightgreen",
      comment: isToday
        ? "Orders are being delivered successfully. Keep it up!"
        : `Well done! ${percentage.toFixed(2)}% of orders delivered correctly.`,
    };
  } else if (percentage >= 50) {
    return {
      phrase: "Moderate",
      color: "yellow",
      comment: isToday
        ? "Making moderate progress in delivering orders."
        : `Keep improving! ${percentage.toFixed(
            2
          )}% of orders delivered correctly.`,
    };
  } else if (percentage >= 30) {
    return {
      phrase: "Fair",
      color: "orange",
      comment: isToday
        ? "It's a good start. Keep up the pace in delivering orders."
        : `Delivery success needs improvement. ${percentage.toFixed(
            2
          )}% of orders delivered correctly.`,
    };
  } else {
    return {
      phrase: "Poor",
      color: "red",
      comment: isToday
        ? "Let's get started with delivering the rest of today's orders!"
        : `Critical attention required. Only ${percentage.toFixed(
            2
          )}% of orders delivered correctly.`,
    };
  }
};
