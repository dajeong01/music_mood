import api from "../axios";

// ✅ 날씨 기반 추천 요청
export const reqGetWeatherRecommendations = async (weatherKey) => {
  return api.get("/api/spotify/recommendations/weather", {
    params: { weatherKey },
  });
};
// ✅ 감정 기반 추천 요청
export const reqGetEmotionRecommendations = async (emotionKey) => {
  return api.get("/api/spotify/recommendations/emotion", {
    params: { emotionKey },
  });
};
