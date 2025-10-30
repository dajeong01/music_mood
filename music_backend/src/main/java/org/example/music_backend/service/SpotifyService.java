package org.example.music_backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.music_backend.domain.spotify.genre.Genre;
// 💥 UserGenreService를 import 해야 합니다.
import org.example.music_backend.service.UserGenreService;
import org.example.music_backend.dto.spotify.SpotifyPlaylistDto;
import org.example.music_backend.dto.spotify.SpotifySearchResponse;
// 💥💥💥 [추가] 새로 만드신 SpotifyGenreMapper를 import 합니다. 💥💥💥
import org.example.music_backend.dto.spotify.SpotifyGenreMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
// 💥 UriUtils를 import 해야 합니다.
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SpotifyService {

    private final WebClient webClient;
    private final UserGenreService userGenreService;

    // 💥💥💥 수정: WebClientConfig의 baseUrl ("https://api.spotify.com/v1")을
    // 사용할 것이므로, 이 상수는 제거합니다. 💥💥💥
    // private static final String SPOTIFY_API_BASE = "https://api.spotify.com/v1";

    @Value("${spotify.client-id}")
    private String clientId;

    @Value("${spotify.client-secret}")
    private String clientSecret;

    // ============ 1️⃣ Spotify 인증 토큰 ============
    @SuppressWarnings("unchecked")
    private String getAccessToken() {
        log.info("🎧 [SpotifyService] Access Token 요청 시작...");

        Map<String, Object> response = webClient.post()
                .uri("https://accounts.spotify.com/api/token") // 👈 이 URI는 절대 경로 유지 (도메인이 다름)
                .headers(h -> {
                    String auth = Base64.getEncoder()
                            .encodeToString((clientId + ":" + clientSecret)
                                    .getBytes(StandardCharsets.UTF_8));
                    h.set(HttpHeaders.AUTHORIZATION, "Basic " + auth);
                    h.set(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded");
                })
                .bodyValue("grant_type=client_credentials")
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response == null || response.get("access_token") == null)
            throw new RuntimeException("Spotify access token 발급 실패");

        log.info("✅ [SpotifyService] Access Token 발급 완료");
        return (String) response.get("access_token");
    }

    // ============ 2️⃣ Spotify 추천 요청 헬퍼 (수정됨: 상대 경로 사용) ============
    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> getRecommendations(String seedGenres,
                                                         Double targetEnergy,
                                                         Double targetValence,
                                                         Double targetTempo) {
        List<Map<String, Object>> result = new ArrayList<>();

        // 💥💥💥 수정됨: 절대 경로 -> 상대 경로로 변경 💥💥💥
        // WebClientConfig의 baseUrl ("https://api.spotify.com/v1") 뒤에 붙습니다.
        StringBuilder url = new StringBuilder("/recommendations?limit=12"); // 👈 'v1' 제거
        url.append("&seed_genres=")
                .append(UriUtils.encode(seedGenres, StandardCharsets.UTF_8));
        if (targetEnergy != null) url.append("&target_energy=").append(targetEnergy);
        if (targetValence != null) url.append("&target_valence=").append(targetValence);
        if (targetTempo != null) url.append("&target_tempo=").append(targetTempo);

        log.info("🎯 Spotify 요청 URL = {}", url);

        try {
            Map<String, Object> response = webClient.get()
                    .uri(url.toString()) // 👈 상대 경로 사용
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || !response.containsKey("tracks")) {
                log.warn("❌ Spotify Recommendations 결과가 없거나 'tracks' 키가 없습니다.");
                return List.of();
            }

            List<Map<String, Object>> tracks = (List<Map<String, Object>>) response.get("tracks");

            for (Map<String, Object> track : tracks) {
                try {
                    Map<String, Object> item = new HashMap<>();
                    item.put("name", track.get("name"));
                    item.put("artist", ((List<Map<String, Object>>) track.get("artists")).get(0).get("name"));
                    item.put("preview", track.get("preview_url"));
                    item.put("url", ((Map<String, Object>) track.get("external_urls")).get("spotify"));
                    Map<String, Object> album = (Map<String, Object>) track.get("album");
                    List<Map<String, Object>> images = (List<Map<String, Object>>) album.get("images");
                    if (images != null && !images.isEmpty()) item.put("image", images.get(0).get("url"));
                    result.add(item);
                } catch (Exception e) {
                    log.warn("⚠️ 트랙 파싱 중 오류 발생: {}", e.getMessage());
                }
            }

        } catch (Exception e) {
            log.error("❌ Spotify 추천 요청 실패: {}", e.getMessage(), e);
        }
        return result;
    }

    // ============ 3️⃣ 공통: 관심 장르 기반 시드 추출 (수정됨: SpotifyGenreMapper 사용) ============
    private String getUserSeedGenres() {
        // 1. 사용자 장르 불러오기 (DB에서)
        List<String> dbGenreNames = userGenreService.getUserGenres().stream()
                .map(Genre::getGenreName) // "k-pop", "r-n-b", "ballad"
                .map(String::toLowerCase)
                .toList();

        if (dbGenreNames.isEmpty()) {
            log.warn("⚠️ 사용자 관심 장르 없음. 기본 pop, indie 사용");
            return "pop,indie";  // 기본값 설정
        }

        // 2. 💥💥💥 [수정] SpotifyGenreMapper를 사용해 공식 장르명으로 변환 💥💥💥
        List<String> spotifyGenres = SpotifyGenreMapper.mapToSpotifyGenres(dbGenreNames); // "k-pop", "r-n-b", "pop"

        if (spotifyGenres.isEmpty()) {
            log.warn("⚠️ 매핑된 Spotify 장르 없음. 기본 pop, indie 사용");
            return "pop,indie";
        }

        // 3. Spotify는 최대 5개의 seed_genres만 허용합니다.
        List<String> limitedGenres = spotifyGenres.stream().limit(5).toList();

        log.info("🌱 사용자 Seed 장르 (DB): {}", dbGenreNames);
        log.info("🌱 매핑된 Seed 장르 (Spotify): {}", String.join(",", limitedGenres));
        return String.join(",", limitedGenres);
    }

    // ============ 4️⃣ 날씨 기반 추천 ============
    public List<Map<String, Object>> getWeatherTracks(String weather) {
        String seed = getUserSeedGenres();  // 사용자 관심 장르
        double energy = 0.6;
        double valence = 0.5;

        // 날씨에 따른 energy, valence 설정
        switch (weather.toLowerCase()) {
            case "rain" -> { energy = 0.3; valence = 0.3; }
            case "clear" -> { energy = 0.8; valence = 0.9; }
            case "clouds" -> { energy = 0.5; valence = 0.5; }
            case "snow" -> { energy = 0.4; valence = 0.6; }
            case "thunder" -> { energy = 0.9; valence = 0.3; }
            case "fog" -> { energy = 0.3; valence = 0.4; }
        }

        log.info("🌤 날씨기반 추천: seed={}, energy={}, valence={}", seed, energy, valence);

        return getRecommendations(seed, energy, valence, null);
    }

    // ============ 5️⃣ 감정 기반 추천 ============
    public List<Map<String, Object>> getEmotionTracks(String emotion) {
        String seed = getUserSeedGenres();  // 사용자 관심 장르
        double energy = 0.5;
        double valence = 0.5;

        // 감정에 따른 energy, valence 설정
        switch (emotion.toLowerCase()) {
            case "happy" -> { energy = 0.9; valence = 0.9; }
            case "sad" -> { energy = 0.3; valence = 0.2; }
            case "angry" -> { energy = 0.9; valence = 0.2; }
            case "tired" -> { energy = 0.4; valence = 0.4; }
            case "excited" -> { energy = 0.9; valence = 0.8; }
        }

        log.info("💭 감정기반 추천: seed={}, energy={}, valence={}", seed, energy, valence);
        return getRecommendations(seed, energy, valence, null);
    }

    // ============ 6️⃣ 날씨 + 감정 조합 ============
    public List<Map<String, Object>> getCombinedTracks(String weather, String emotion) {
        String seed = getUserSeedGenres();  // 사용자 관심 장르

        double energy = 0.5;
        double valence = 0.5;

        // 날씨 & 감정 조합 보정
        if (weather.equalsIgnoreCase("rain") && emotion.equalsIgnoreCase("sad")) {
            energy = 0.3; valence = 0.2;
        } else if (weather.equalsIgnoreCase("clear") && emotion.equalsIgnoreCase("happy")) {
            energy = 0.9; valence = 0.9;
        } else if (weather.equalsIgnoreCase("clouds") && emotion.equalsIgnoreCase("tired")) {
            energy = 0.4; valence = 0.4;
        } else if (weather.equalsIgnoreCase("snow") && emotion.equalsIgnoreCase("happy")) {
            energy = 0.6; valence = 0.8;
        }

        log.info("🌈 조합 추천: weather={}, emotion={}, energy={}, valence={}", weather, emotion, energy, valence);
        return getRecommendations(seed, energy, valence, null);
    }

    // ============ 7️⃣ [추가] 플레이리스트 검색 (searchPlaylistsDto) (수정됨: 상대 경로) ============
    private List<SpotifyPlaylistDto> searchPlaylistsDto(String query) {
        try {
            // 💥💥💥 수정됨: 절대 경로 -> 상대 경로로 변경 💥💥💥
            String url = "/search?q=" + UriUtils.encode(query, StandardCharsets.UTF_8) // 👈 'v1' 제거
                    + "&type=playlist&limit=10";

            SpotifySearchResponse response = webClient.get()
                    .uri(url) // 👈 상대 경로 사용
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

    // ============ 8️⃣ [추가] toPlaylistMap 헬퍼 ============
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
}

