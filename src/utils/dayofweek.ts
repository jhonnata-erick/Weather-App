export const getDayOfWeek = (date: string, timezone?: string, now?: string) => {
  //if not passing timezone string, any date string is acceptable, else, just ISO 8601
  const day = new Date(timezone ? date + "T00:00:00" : date);
  const today = now ? new Date(now) : new Date();
  const dayofweek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: timezone || undefined, // Usa a string diretamente da API (ex: "America/Sao_Paulo")
  });
  const fulldate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: timezone || undefined,
  });
  const formatedDay = fulldate.format(day);
  const formatedToday = fulldate.format(today);
  /*const days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];*/
  const day_of_week =
    formatedDay === formatedToday ? "Today" : dayofweek.format(day);
  return day_of_week;
};
