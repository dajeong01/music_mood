import { useQuery } from "@tanstack/react-query";
import { reqGetEmotionRecommendations, reqGetWeatherRecommendations } from "../../api/Spotify/SpotifyRecommendationApi";

export const useWeatherRecommendations = (weatherKey) => {
  return useQuery({
    queryKey: ["weatherRecommendations", weatherKey],
    queryFn: async () => {
      const res = await reqGetWeatherRecommendations(weatherKey);
      return res.data.tracks;
    },
    enabled: !!weatherKey,
  });
};

export const useEmotionRecommendations = (emotionKey) => {
  return useQuery({
    queryKey: ["emotionRecommendations", emotionKey],
    queryFn: async () => {
      const res = await reqGetEmotionRecommendations(emotionKey);
      return res.data.tracks;
    },
    enabled: !!emotionKey,
  });
};
