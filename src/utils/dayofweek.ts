export const getDayOfWeek = ({ date, now }: { date: string; now?: string }) => {
  const dateOnly = /^(\d{4}-\d{2}-\d{2})$/.exec(date)?.[1];
  const day = new Date(dateOnly ? `${dateOnly}T00:00:00Z` : date);
  const today = now ? new Date(now) : new Date();
  const dayofweek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    ...(dateOnly ? { timeZone: "UTC" } : {}),
  });
  const currentDateOnly = now
    ? /^(\d{4}-\d{2}-\d{2})T/.exec(now)?.[1]
    : undefined;
  const isToday = dateOnly && currentDateOnly
    ? dateOnly === currentDateOnly
    : day.getFullYear() === today.getFullYear() &&
      day.getMonth() === today.getMonth() &&
      day.getDate() === today.getDate();

  return isToday ? "Today" : dayofweek.format(day);
};
