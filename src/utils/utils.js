export const bgColorMap = {
  red: "bg-red-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  purple: "bg-purple-400",
  amber: "bg-amber-400",
  orange: "bg-orange-400",
};

export function formatDate(date) {
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "long",
    // year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function generateListId() {
  return `list-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function generateTaskId(listId) {
  return `${listId}-task-${Math.floor(Math.random() * 10000)}`;
}
