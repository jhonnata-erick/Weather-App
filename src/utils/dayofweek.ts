export const getDayOfWeek = (date: string) => {
  const dayNumber = new Date(date);
  const todayDayNumber = new Date();
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
  const day_of_week =
    todayDayNumber.getUTCDate() === dayNumber.getUTCDate()
      ? "Today"
      : days[dayNumber.getUTCDay()];
  return day_of_week;
};
