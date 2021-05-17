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

function toHHMMSS(sec_num: number | undefined): string | undefined {
  if (sec_num == undefined) {
    return undefined;
  }
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - hours * 3600) / 60);
  const seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);

  return (
    (hours > 0 ? String(hours) + ":" + (minutes < 10 ? "0" : "") : "") +
    String(minutes) +
    ":" +
    (seconds < 10 ? "0" : "") +
    String(seconds)
  );
}

export { formatDate, toHHMMSS };
