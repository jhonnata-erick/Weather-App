export const getDayOfWeek = (date: string) => {
  const dayNumber = new Date(date).getUTCDay();
  const todayDayNumber = new Date().getUTCDay();
  const days: [
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
  ];
  const day_of_week = todayDayNumber === dayNumber ? "Today" : days[dayNumber];
  return day_of_week;
};
