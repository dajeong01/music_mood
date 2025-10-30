import api from "../axios";

export const reqGetWeatherTracks = async (weatherKey) => {
  const res = await api.get(`/api/spotify/weather/tracks/${weatherKey}`);
  console.log("✅ API 응답(raw):", res);
  return res.data.body || [];
};

// ✅ 감정 기반 플레이리스트
export const reqGetEmotionPlaylists = async (emotionKey) => {
  return api.get(`/api/spotify/emotion/${emotionKey}`);
};

// ✅ 날씨 + 감정 조합 플레이리스트
export const reqGetCombinedPlaylists = async (weatherKey, emotionKey) => {
  return api.get(`/api/spotify/mix`, {
    params: { weather: weatherKey, emotion: emotionKey },
  });
};

// ✅ 감정 기반 트랙 (30초 미리듣기)
export const reqGetEmotionTracks = async (emotionKey) => {
  return api.get(`/api/spotify/emotion/${emotionKey}`);
};
