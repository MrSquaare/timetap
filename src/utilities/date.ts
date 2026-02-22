export const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTime = (date: Date) => {
  return `${formatDate(date)} ${formatTime(date)}`;
};
