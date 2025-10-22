import { getKoreanDescription, getWeatherKey } from "../constants/WeatherKey";

export const getWeatherLabel = (description) => {
  const key = getWeatherKey(description);
  const text = getKoreanDescription(key);

  const styleMap = {
    clear: { icon: "☀️", color: "#FFD966" },
    clouds: { icon: "🌤️", color: "#CDE4FF" },
    rain: { icon: "🌧️", color: "#A4C2F4" },
    snow: { icon: "❄️", color: "#D0E0E3" },
    thunder: { icon: "🌩️", color: "#A2C4C9" },
    fog: { icon: "🌫️", color: "#B4B7BA" },
    default: { icon: "🌈", color: "#FCE5CD" },
  };

  const { icon, color } = styleMap[key] || styleMap.default;

  return { key, text, icon, color };
};
