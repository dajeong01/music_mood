
export const getWeatherKey = (description = "") => {
  const lower = description.toLowerCase();

  // 영어 기준
  if (lower.includes("rain")) return "rain";
  if (lower.includes("cloud")) return "clouds";
  if (lower.includes("clear")) return "clear";
  if (lower.includes("snow")) return "snow";
  if (lower.includes("thunder")) return "thunder";
  if (lower.includes("mist") || lower.includes("fog")) return "fog";

  // 한글 기준
  if (lower.includes("비") || lower.includes("소나기") || lower.includes("실비")) return "rain";
  if (lower.includes("구름") || lower.includes("튼구름") || lower.includes("온흐림")) return "clouds";
  if (lower.includes("맑음")) return "clear";
  if (lower.includes("눈")) return "snow";
  if (lower.includes("천둥")) return "thunder";
  if (lower.includes("안개") || lower.includes("박무")) return "fog";

  return "default";
};

export const getKoreanDescription = (key) => {
  const map = {
    clear: "맑음",
    clouds: "구름 많음",
    rain: "비",
    snow: "눈",
    thunder: "천둥번개",
    fog: "안개",
    default: "날씨",
  };
  return map[key] || map.default;
};
