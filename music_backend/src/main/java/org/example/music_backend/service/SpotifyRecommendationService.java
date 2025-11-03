package org.example.music_backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.music_backend.domain.spotify.genre.Genre;
import org.example.music_backend.domain.spotify.genre.GenreMapper;
import org.example.music_backend.domain.spotify.userGenre.UserGenreMapper;
import org.example.music_backend.dto.spotify.SpotifyTrackDto;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class SpotifyRecommendationService {

    private final SpotifyAuthService spotifyAuthService;
    private final UserGenreMapper userGenreMapper;
    private final GenreMapper genreMapper;

    // ✅ 날씨 기반 추천
    public List<SpotifyTrackDto> getWeatherBasedRecommendations(int userId, String weatherKey) {
        List<String> genres = getUserGenres(userId); // 🔹 여기 호출됨
        String token = spotifyAuthService.getAppAccessToken();

        String moodKeyword = switch (weatherKey.toLowerCase()) {
            case "rain" -> "rainy";
            case "clouds" -> "cloudy";
            case "clear" -> "sunny";
            case "snow" -> "snow";
            case "thunder" -> "storm";
            default -> "weather";
        };

        return callSpotifySearch(genres, token, moodKeyword);
    }

    // ✅ 감정 기반 추천
    public List<SpotifyTrackDto> getEmotionBasedRecommendations(int userId, String emotionKey) {
        List<String> genres = getUserGenres(userId); // 🔹 여기 호출됨
        String token = spotifyAuthService.getAppAccessToken();
        return callSpotifySearch(genres, token, emotionKey.toLowerCase());
    }

    // ✅ 사용자 장르 조회 (이 부분 추가!)
    private List<String> getUserGenres(int userId) {
        List<Integer> genreIds = userGenreMapper.findGenreIdsByUserId(userId);

        if (genreIds == null || genreIds.isEmpty()) {
            return List.of("pop"); // fallback
        }

        System.out.println("🎧 사용자 장르 ID 목록: " + genreIds);

        return genreMapper.findGenreNamesByIds(genreIds).stream()
                .map(genre -> genre.getGenreName())
                .filter(Objects::nonNull)
                .toList();
    }

    // ✅ Spotify 검색 API 호출
    private List<SpotifyTrackDto> callSpotifySearch(List<String> genres, String token, String keyword) {
        if (genres.isEmpty()) genres = List.of("pop");

        String genre = genres.get(0).toLowerCase();

        // ✅ Spotify에서 인식되는 키워드로 매핑
        String validKeyword = switch (keyword.toLowerCase()) {
            case "happy" -> "happy";
            case "sad" -> "sad";
            case "angry" -> "rock";
            case "excited" -> "party";
            case "tired" -> "chill";
            case "rain", "clouds" -> "rainy";
            case "clear" -> "summer";
            case "snow" -> "winter";
            default -> "";
        };

        // ✅ 1차 시도: genre 기반 + 키워드 검색
        String query = validKeyword.isBlank()
                ? genre
                : String.format("%s %s", genre, validKeyword);

        String url = String.format(
                "https://api.spotify.com/v1/search?q=%s&type=track&market=KR&limit=8",
                query.replace(" ", "%20")
        );

        System.out.println("🎧 Spotify 검색 API 요청 URL: " + url);

        try {
            JsonNode node = WebClient.create()
                    .get()
                    .uri(url)
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();

            List<SpotifyTrackDto> result = extractTracks(node);
            if (!result.isEmpty()) return result;

            // ✅ 2차 시도 (fallback): 장르만 검색
            String fallbackUrl = String.format(
                    "https://api.spotify.com/v1/search?q=%s&type=track&market=KR&limit=8",
                    genre
            );
            System.out.println("🎧 Fallback URL: " + fallbackUrl);

            node = WebClient.create()
                    .get()
                    .uri(fallbackUrl)
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();

            return extractTracks(node);

        } catch (WebClientResponseException e) {
            log.error("❌ Spotify Search API Error: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            return Collections.emptyList();
        } catch (Exception e) {
            log.error("❌ Spotify 검색 요청 중 예외 발생", e);
            return Collections.emptyList();
        }
    }

    // ✅ 공통 트랙 변환 함수
    private List<SpotifyTrackDto> extractTracks(JsonNode node) {
        if (node == null || node.get("tracks") == null) return Collections.emptyList();

        List<SpotifyTrackDto> result = new ArrayList<>();
        node.get("tracks").get("items").forEach(track -> {
            SpotifyTrackDto dto = new SpotifyTrackDto();
            dto.setName(track.get("name").asText());
            dto.setArtist(track.get("artists").get(0).get("name").asText());
            dto.setImage(track.get("album").get("images").get(0).get("url").asText());
            dto.setPreview(track.get("preview_url").asText(null));
            result.add(dto);
        });

        System.out.println("🎶 Spotify 검색 결과 개수: " + result.size());
        return result;
    }

}