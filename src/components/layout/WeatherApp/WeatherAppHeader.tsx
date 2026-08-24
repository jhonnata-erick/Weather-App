import type { ReactNode } from "react";

interface WeatherAppHeaderProps {
  children: ReactNode;
}
export const WeatherAppHeader = ({ children }: WeatherAppHeaderProps) => {
  return <section>{children}</section>;
};
