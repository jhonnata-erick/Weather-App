import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sparkles,
  type LucideIcon,
  type LucideProps,
  Moon,
  CloudMoon,
  Sunrise,
  Sunset,
} from "lucide-react";

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  color?: string;
  size?: number;
}

export function WeatherIcon({
  code,
  color = "#182033",
  size = 24,
  isDay = true,
}: WeatherIconProps) {
  const iconMap: Record<
    number,
    {
      day: React.ComponentType<{ color: string; size: number }>;
      night: React.ComponentType<{ color: string; size: number }>;
    }
  > = {
    0: { day: Sun, night: Moon }, // Céu limpo
    1: { day: CloudSun, night: CloudMoon }, // Principalmente limpo
    2: { day: CloudSun, night: CloudMoon }, // Parcialmente nublado
    3: { day: Cloud, night: Cloud }, // Encoberto
    45: { day: CloudFog, night: CloudFog }, // Nevoeiro
    48: { day: CloudFog, night: CloudFog }, // Nevoeiro com depósito de rime
    51: { day: CloudDrizzle, night: CloudDrizzle }, // Chuvisco leve
    53: { day: CloudDrizzle, night: CloudDrizzle }, // Chuvisco moderado
    55: { day: CloudDrizzle, night: CloudDrizzle }, // Chuvisco denso
    56: { day: CloudDrizzle, night: CloudDrizzle }, // Chuvisco congelante leve
    57: { day: CloudDrizzle, night: CloudDrizzle }, // Chuvisco congelante denso
    61: { day: CloudRain, night: CloudRain }, // Chuva fraca
    63: { day: CloudRain, night: CloudRain }, // Chuva moderada
    65: { day: CloudRain, night: CloudRain }, // Chuva forte
    66: { day: CloudRain, night: CloudRain }, // Chuva congelante leve
    67: { day: CloudRain, night: CloudRain }, // Chuva congelante forte
    71: { day: CloudSnow, night: CloudSnow }, // Neve fraca
    73: { day: CloudSnow, night: CloudSnow }, // Neve moderada
    75: { day: CloudSnow, night: CloudSnow }, // Neve forte
    77: { day: CloudSnow, night: CloudSnow }, // Grãos de neve
    80: { day: CloudRain, night: CloudRain }, // Pancadas de chuva fracas
    81: { day: CloudRain, night: CloudRain }, // Pancadas de chuva moderadas
    82: { day: CloudRain, night: CloudRain }, // Pancadas de chuva violentas
    85: { day: CloudSnow, night: CloudSnow }, // Pancadas de neve fracas
    86: { day: CloudSnow, night: CloudSnow }, // Pancadas de neve fortes
    95: { day: CloudLightning, night: CloudLightning }, // Trovoada leve ou moderada
    96: { day: CloudLightning, night: CloudLightning }, // Trovoada com granizo leve
    97: { day: CloudLightning, night: CloudLightning }, // Trovoada com granizo forte
    200: { day: Sunrise, night: Sunrise }, // Nascer do sol
    300: { day: Sunset, night: Sunset }, // Por do sol
  };
  const IconDay = iconMap[code]?.day || Sparkles;
  const IconNight = iconMap[code]?.night || Sparkles;

  return isDay ? (
    <IconDay color={color} size={size} />
  ) : (
    <IconNight color={color} size={size} />
  );
}
