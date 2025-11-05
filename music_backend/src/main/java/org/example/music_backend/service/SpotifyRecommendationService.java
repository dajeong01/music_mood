package org.example.music_backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.music_backend.domain.spotify.genre.GenreMapper;
import org.example.music_backend.domain.spotify.userGenre.UserGenreMapper;
import org.example.music_backend.dto.spotify.SpotifyTrackDto;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class SpotifyRecommendationService {

    private final SpotifyAuthService spotifyAuthService;
    private final UserGenreMapper userGenreMapper;
    private final GenreMapper genreMapper;

    /* ✅ 날씨 기반 */
    public List<SpotifyTrackDto> getWeatherBasedRecommendations(int userId, String weatherKey) {
        List<String> genres = getUserGenres(userId);
        String token = spotifyAuthService.getAppAccessToken();

        String moodKeyword = switch (weatherKey.toLowerCase()) {
            case "rain" -> "rainy";
            case "clouds" -> "cloudy";
            case "clear" -> "sunny";
            case "snow" -> "snow";
            case "thunder" -> "storm";
            default -> "";
        };

        return callSpotifySearch(genres, token, moodKeyword);
    }

    /* ✅ 감정 기반 */
    public List<SpotifyTrackDto> getEmotionBasedRecommendations(int userId, String emotionKey) {
        List<String> genres = getUserGenres(userId);
        String token = spotifyAuthService.getAppAccessToken();
        return callSpotifySearch(genres, token, emotionKey.toLowerCase());
    }

    /* ✅ 날씨 + 감정 혼합 추천 (search 방식) */
    public List<SpotifyTrackDto> getMixedRecommendations(int userId, String weatherKey, String emotionKey, int limit) {
        List<String> genres = getUserGenres(userId);
        String token = spotifyAuthService.getAppAccessToken();

        String mixKeyword = buildMixKeyword(weatherKey, emotionKey);

        // ✅ Step1: mix 검색
        List<SpotifyTrackDto> result = callSpotifySearch(genres, token, mixKeyword);
        if (!result.isEmpty()) return result.stream().limit(limit).toList();

        // ✅ Step2: emotion 검색
        result = callSpotifySearch(genres, token, emotionKey);
        if (!result.isEmpty()) return result.stream().limit(limit).toList();

        // ✅ Step3: 장르 fallback
        return callSpotifySearch(genres, token, genres.get(0)).stream().limit(limit).toList();
    }

    /* ✅ 혼합 키워드 생성 */
    private String buildMixKeyword(String weather, String emotion) {
        String w = switch (weather.toLowerCase()) {
            case "clear" -> "sunny";
            case "clouds" -> "cloudy";
            case "rain" -> "rainy";
            case "snow" -> "snow";
            default -> "";
        };

        String e = switch (emotion.toLowerCase()) {
            case "happy" -> "happy";
            case "sad" -> "sad";
            case "angry" -> "angry";
            case "excited" -> "party";
            case "tired" -> "chill";
            default -> "";
        };

        return (w + " " + e).trim();
    }

    /* ✅ DB 장르 조회 */
    private List<String> getUserGenres(int userId) {
        List<Integer> ids = userGenreMapper.findGenreIdsByUserId(userId);
        if (ids == null || ids.isEmpty()) return List.of("pop");

        return genreMapper.findGenreNamesByIds(ids).stream()
                .map(g -> g.getGenreName().toLowerCase())
                .filter(Objects::nonNull)
                .toList();
    }

    /* ✅ Spotify Search API 호출 */
    private List<SpotifyTrackDto> callSpotifySearch(List<String> genres, String token, String keyword) {
        if (genres.isEmpty()) genres = List.of("pop");

        String genre = genres.get(0).toLowerCase();
        String query = (genre + " " + keyword).trim().replace(" ", "%20");

        String url = "https://api.spotify.com/v1/search?q=" +
                query +
                "&type=track&market=KR&limit=10";

        try {
            JsonNode node = WebClient.create()
                    .get()
                    .uri(url)
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();

            List<SpotifyTrackDto> tracks = extractTracks(node);
            if (!tracks.isEmpty()) return tracks;

            // ✅ fallback: genre only
            node = WebClient.create()
                    .get()
                    .uri("https://api.spotify.com/v1/search?q=" + genre + "&type=track&market=KR&limit=10")
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();

            return extractTracks(node);

        } catch (Exception ex) {
            log.warn("Spotify search failed: {}", ex.getMessage());
            return Collections.emptyList();
        }
    }

    /* ✅ Search 결과 파싱 */
    private List<SpotifyTrackDto> extractTracks(JsonNode node) {
        if (node == null || node.get("tracks") == null) return Collections.emptyList();

        List<SpotifyTrackDto> result = new ArrayList<>();
        node.get("tracks").get("items").forEach(track -> {
            result.add(SpotifyTrackDto.builder()
                    .name(track.get("name").asText())
                    .artist(track.get("artists").get(0).get("name").asText())
                    .image(track.get("album").get("images").get(0).get("url").asText())
                    .preview(track.get("preview_url").asText(null))
                    .build());
        });

        return result;
    }
}
