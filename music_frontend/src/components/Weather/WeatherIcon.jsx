import { WiCloud, WiDaySunny, WiFog, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

export default function WeatherIcon({ description, size = 50 }) {
  const lower = description.toLowerCase();

  const icons = {
    clear: <WiDaySunny color="#FFB300" size={size} />,
    clouds: <WiCloud color="#9E9E9E" size={size} />,
    rain: <WiRain color="#4FC3F7" size={size} />,
    snow: <WiSnow color="#81D4FA" size={size} />,
    thunder: <WiThunderstorm color="#E57373" size={size} />,
    mist: <WiFog color="#BDBDBD" size={size} />,
  };

  const key = Object.keys(icons).find((k) => lower.includes(k));
  return icons[key] || icons.clear;
}
