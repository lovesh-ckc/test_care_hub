import { ThemeConfig } from "./types";

const themeMap: Record<string, string> = {
  "#0f766e": "theme-teal",
  "#a855f7": "theme-purple",
  "#f97316": "theme-orange",
};

export function getThemeClass(theme: ThemeConfig): string {
  const key = theme.brand?.toLowerCase();
  return (key && themeMap[key]) || "theme-default";
}
