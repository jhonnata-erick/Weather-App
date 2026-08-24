import type { ReactNode } from "react";

interface WeatherAppContentProps {
  children: ReactNode;
}
export const WeatherAppContent = ({ children }: WeatherAppContentProps) => {
  return <section>{children}</section>;
};
