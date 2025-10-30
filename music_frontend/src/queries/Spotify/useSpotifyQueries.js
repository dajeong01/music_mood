import { useQuery } from "@tanstack/react-query";
import {
    reqGetCombinedPlaylists,
    reqGetEmotionPlaylists,
    reqGetEmotionTracks,
    reqGetWeatherTracks
} from "../../api/Spotify/SpotifyApi";

export function useWeatherTracks(weatherKey) {
    
  return useQuery({
    queryKey: ["spotifyWeatherTracks", weatherKey],
    queryFn: () => reqGetWeatherTracks(weatherKey),
    enabled: !!weatherKey,
  });
  
}


// ✅ 감정 기반
export const useEmotionPlaylists = (emotionKey, options = {}) => {
  return useQuery({
    queryKey: ["spotifyEmotion", emotionKey],
    queryFn: async () => {
      const res = await reqGetEmotionPlaylists(emotionKey);
      return res.data || [];
    },
    enabled: !!emotionKey,
    staleTime: 1000 * 60 * 60,
    ...options,
  });
};

// ✅ 날씨 + 감정 조합
export function useCombinedPlaylists(weatherKey, emotionKey) {
  return useQuery({
    queryKey: ["combinedPlaylists", weatherKey, emotionKey],
    queryFn: () => reqGetCombinedPlaylists(weatherKey, emotionKey),
    enabled: !!weatherKey && !!emotionKey,
    select: (res) => res?.data || [],
  });
}


// ✅ 감정 기반 트랙 (30초 미리듣기)
export const useEmotionTracks = (emotionKey, options = {}) => {
  return useQuery({
    queryKey: ["spotifyEmotionTracks", emotionKey],
    queryFn: async () => {
      const res = await reqGetEmotionTracks(emotionKey);
      return res.data || [];
    },
    enabled: !!emotionKey,
    staleTime: 1000 * 60 * 10,
    ...options,
  });
};
