import type { ReactNode } from "react";

interface WeatherAppRootProps {
  children: ReactNode;
}
export const WeatherAppRoot = ({ children }: WeatherAppRootProps) => {
  return <section>{children}</section>;
};
