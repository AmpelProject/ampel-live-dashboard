function formatDate(value: string): string {
  return Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date(value));
}

export { formatDate };
