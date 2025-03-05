export const bgColorMap = {
  red: "bg-red-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  purple: "bg-purple-400",
  amber: "bg-amber-400",
  orange: "bg-orange-400",
};

export function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "long",
    // year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
