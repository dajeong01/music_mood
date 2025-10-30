package org.example.music_backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.music_backend.dto.spotify.SpotifyPlaylistDto;
import org.example.music_backend.dto.spotify.SpotifySearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SpotifyService {

    private final WebClient webClient;

    private static final String SPOTIFY_API_BASE = "https://api.spotify.com/v1";

    @Value("${spotify.client-id}")
    private String clientId;

    @Value("${spotify.client-secret}")
    private String clientSecret;

    // ==========================
    // 1. 매핑 테이블
    // ==========================

    private static final Map<String, List<String>> WEATHER_GENRE_MAP = Map.ofEntries(
            Map.entry("rain", List.of("acoustic", "jazz", "chill", "soul")),
            Map.entry("clear", List.of("pop", "indie", "dance", "rnb")),
            Map.entry("clouds", List.of("chill", "rnb", "soul", "pop")),
            Map.entry("snow", List.of("classical", "soundtrack", "piano")),
            Map.entry("thunder", List.of("rock", "metal", "edm")),
            Map.entry("fog", List.of("ambient", "chill")),
            Map.entry("default", List.of("pop", "indie"))
    );

    private static final Map<String, List<String>> EMOTION_GENRE_MAP = Map.ofEntries(
            Map.entry("happy", List.of("pop", "dance", "indie", "k-pop")),
            Map.entry("sad", List.of("acoustic", "piano", "chill", "soul")),
            Map.entry("angry", List.of("rock", "metal", "edm")),
            Map.entry("tired", List.of("chill", "ambient", "jazz")),
            Map.entry("excited", List.of("house", "dance", "r-n-b")),
            Map.entry("default", List.of("pop", "indie"))
    );

    private static final Map<String, List<String>> COMBINED_GENRE_MAP = Map.ofEntries(
            Map.entry("rain_happy", List.of("chill", "acoustic", "indie")),
            Map.entry("rain_sad", List.of("jazz", "piano", "soul")),
            Map.entry("rain_tired", List.of("ambient", "chill")),
            Map.entry("clear_happy", List.of("pop", "dance", "indie")),
            Map.entry("clear_tired", List.of("chill", "acoustic")),
            Map.entry("clouds_sad", List.of("chill", "acoustic")),
            Map.entry("snow_happy", List.of("classical", "soundtrack")),
            Map.entry("snow_sad", List.of("piano", "chill")),
            Map.entry("thunder_angry", List.of("rock", "metal")),
            Map.entry("fog_tired", List.of("ambient", "chill")),
            Map.entry("default", List.of("pop", "indie"))
    );


    // ==========================
    // 2. 액세스 토큰 (Client Credentials Flow)
    // ==========================
    @SuppressWarnings("unchecked")
    private String getAccessToken() {
        log.info("🎧 [SpotifyService] Access Token 요청 시작...");

        Map<String, Object> response = webClient.post()
                .uri("https://accounts.spotify.com/api/token")
                .headers(headers -> {
                    // 💥 만약 여기가 NPE가 터진다면 application.properties에 값이 없는 것
                    String auth = Base64.getEncoder()
                            .encodeToString((clientId + ":" + clientSecret)
                                    .getBytes(StandardCharsets.UTF_8));
                    headers.set(HttpHeaders.AUTHORIZATION, "Basic " + auth);
                    headers.set(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded");
                })
                .bodyValue("grant_type=client_credentials")
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response == null || response.get("access_token") == null) {
            throw new RuntimeException("Spotify access token 발급 실패");
        }

        String token = (String) response.get("access_token");
        log.info("✅ [SpotifyService] Access Token 발급 완료");
        return token;
    }

    // ==========================
    // 3. 공통 playlist 검색 함수
    // ==========================
    private List<SpotifyPlaylistDto> searchPlaylistsDto(String query) {
        try {
            String url = SPOTIFY_API_BASE
                    + "/search?q=" + UriUtils.encode(query, StandardCharsets.UTF_8)
                    + "&type=playlist&limit=10";

            SpotifySearchResponse response = webClient.get()
                    .uri(url)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                    .retrieve()
                    .bodyToMono(SpotifySearchResponse.class)
                    .block();

            if (response == null || response.getPlaylists() == null) {
                return Collections.emptyList();
            }

            return response.getPlaylists().getItems().stream()
                    .filter(Objects::nonNull)
                    .map(item -> {
                        String name = item.getName();
                        String owner = item.getOwner() != null
                                ? item.getOwner().getDisplayName()
                                : "Unknown";
                        String spotifyUrl = (item.getExternalUrls() != null)
                                ? item.getExternalUrls().getSpotify()
                                : null;
                        String imageUrl = (item.getImages() != null && !item.getImages().isEmpty())
                                ? item.getImages().get(0).getUrl()
                                : null;

                        return new SpotifyPlaylistDto(name, owner, spotifyUrl, imageUrl);
                    })
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("🎧 Spotify playlist 검색 실패: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    // 프론트가 바로 쓰기 편하게 Map 형태로 변환해주는 헬퍼
    private List<Map<String, Object>> toPlaylistMap(List<SpotifyPlaylistDto> list) {
        return list.stream()
                .map(dto -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("name", dto.getName());
                    map.put("owner", dto.getOwner());
                    map.put("spotifyUrl", dto.getUrl());
                    map.put("imageUrl", dto.getImage());
                    return map;
                })
                .collect(Collectors.toList());
    }

    // ==========================
    // 4. 날씨 기반 트랙 추천 (수정됨)
    // ==========================
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getWeatherTracks(String weatherKey) {
        List<Map<String, Object>> result = new ArrayList<>();

        try {
            List<String> genres = WEATHER_GENRE_MAP.getOrDefault(
                    weatherKey, WEATHER_GENRE_MAP.get("default")
            );
            String query = String.join(" ", genres);
            log.info("🌤 [SpotifyService] 날씨 기반 트랙 검색 query = {}", query);

            // ✅ Search API 사용 (recommendations → search)
            String url = SPOTIFY_API_BASE + "/search?q=" + UriUtils.encode(query, StandardCharsets.UTF_8)
                    + "&type=track&limit=8";
            log.info("🌤 [SpotifyService] 최종 요청 URL: {}", url);

            Map<String, Object> response = webClient.get()
                    .uri(url)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || !response.containsKey("tracks")) {
                log.warn("⚠️ [SpotifyService] 응답에 tracks 없음.");
                return List.of();
            }

            Map<String, Object> tracksObj = (Map<String, Object>) response.get("tracks");
            List<Map<String, Object>> tracks = (List<Map<String, Object>>) tracksObj.get("items");

            for (Map<String, Object> track : tracks) {
                try {
                    Map<String, Object> t = new HashMap<>();
                    t.put("name", track.get("name"));
                    t.put("artist", ((List<Map<String, Object>>) track.get("artists")).get(0).get("name"));
                    t.put("preview", track.get("preview_url"));
                    t.put("url", ((Map<String, Object>) track.get("external_urls")).get("spotify"));

                    Map<String, Object> album = (Map<String, Object>) track.get("album");
                    List<Map<String, Object>> images = (List<Map<String, Object>>) album.get("images");
                    if (images != null && !images.isEmpty()) {
                        t.put("image", images.get(0).get("url"));
                    }
                    result.add(t);
                } catch (Exception e) {
                    log.warn("⚠️ [SpotifyService] 트랙 파싱 오류: {}", e.getMessage());
                }
            }

        } catch (Exception e) {
            log.error("❌ [SpotifyService] getWeatherTracks 실패: {}", e.getMessage(), e);
            return Collections.emptyList();
        }

        log.info("✅ [SpotifyService] 최종 반환 트랙 수: {}", result.size());
        return result;
    }


    // ==========================
    // 5. 감정 기반 추천 (플레이리스트)
    // ==========================
    public List<Map<String, Object>> getEmotionPlaylists(String emotion) {
        // 이 메서드는 이미 searchPlaylistsDto를 호출하고,
        // searchPlaylistsDto 내부에 try-catch가 있으므로 안전합니다.
        List<String> genres = EMOTION_GENRE_MAP.getOrDefault(
                emotion,
                EMOTION_GENRE_MAP.get("default")
        );
        String query = String.join(" ", genres);
        log.info("💭 [SpotifyService] 감정 기반 추천 요청: {}", query);
        return toPlaylistMap(searchPlaylistsDto(query));
    }

    // ==========================
    // 6. 날씨 + 감정 조합 추천 (플레이리스트)
    // ==========================
    public List<Map<String, Object>> getCombinedPlaylists(String weather, String emotion) {
        // 이 메서드도 searchPlaylistsDto를 호출하므로 안전합니다.
        String mapKey = weather + "_" + emotion;
        List<String> genres = COMBINED_GENRE_MAP.getOrDefault(
                mapKey,
                COMBINED_GENRE_MAP.get("default")
        );
        String query = String.join(" ", genres);
        log.info("🌦️ [SpotifyService] 날씨+감정 조합 추천 요청: {} → {}", mapKey, query);
        return toPlaylistMap(searchPlaylistsDto(query));
    }

    // ==========================
    // 7. 감정 기반 개별 트랙 추천 (수정됨)
    // ==========================
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getEmotionTracks(String emotionKey) {
        List<Map<String, Object>> result = new ArrayList<>();

        // 💥💥💥 시작점에 try-catch 추가 💥💥💥
        try {
            // 🎵 1️⃣ 장르 매핑
            List<String> genres = EMOTION_GENRE_MAP.getOrDefault(
                            emotionKey,
                            EMOTION_GENRE_MAP.get("default")
                    ).stream()
                    .map(g -> g.replace("-", "").replace(" ", ""))
                    .toList();

            String seedGenres = String.join(",", genres);
            if (seedGenres == null || seedGenres.isBlank()) {
                log.warn("⚠️ [SpotifyService] seed_genres가 비어 있습니다. 기본 장르 pop,indie 사용.");
                seedGenres = "pop,indie";
            }

            // 🎯 2️⃣ Spotify Search API (track 단위로 곡 추천)
            String url = SPOTIFY_API_BASE + "/search?q=" + seedGenres + "&type=track&limit=6";
            log.info("🎵 [SpotifyService] 감정 기반 트랙 추천 요청 URL: {}", url);

            Map<String, Object> response = webClient.get()
                    .uri(url)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || !response.containsKey("tracks")) {
                log.warn("❌ [SpotifyService] Spotify Search 결과가 없습니다.");
                return List.of();
            }

            Map<String, Object> tracksObj = (Map<String, Object>) response.get("tracks");
            List<Map<String, Object>> tracks = (List<Map<String, Object>>) tracksObj.get("items");

            // 🎧 3️⃣ 결과 파싱
            for (Map<String, Object> track : tracks) {
                try {
                    Map<String, Object> t = new HashMap<>();
                    t.put("name", track.get("name"));
                    t.put("artist", ((List<Map<String, Object>>) track.get("artists")).get(0).get("name"));
                    t.put("preview", track.get("preview_url"));
                    t.put("url", ((Map<String, Object>) track.get("external_urls")).get("spotify"));

                    Map<String, Object> album = (Map<String, Object>) track.get("album");
                    List<Map<String, Object>> images = (List<Map<String, Object>>) album.get("images");
                    if (images != null && !images.isEmpty()) {
                        t.put("image", images.get(0).get("url"));
                    }
                    result.add(t);
                } catch (Exception e) {
                    log.warn("⚠️ [SpotifyService] 트랙 파싱 중 오류: {}", e.getMessage());
                }
            }

        } catch (Exception e) {
            // 💥 500 에러를 방지하고 로그를 남김
            log.error("❌ [SpotifyService] getEmotionTracks 실패: {}", e.getMessage(), e);
            return Collections.emptyList(); // 500 에러 대신 빈 리스트 반환
        }

        log.info("✅ [SpotifyService] 감정 기반 트랙 개수: {}", result.size());
        return result;
    }
}

