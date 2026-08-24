import type { ReactNode } from "react";

interface CurrentConditionsRootProps {
  children: ReactNode;
}
export const CurrentConditionsRoot = ({
  children,
}: CurrentConditionsRootProps) => {
  return <div className="weather-container">{children}</div>;
};
