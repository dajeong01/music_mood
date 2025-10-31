package org.example.music_backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.music_backend.domain.spotify.genre.Genre;
import org.example.music_backend.dto.spotify.SpotifyGenreMapper;
import org.example.music_backend.dto.spotify.SpotifyPlaylistDto;
import org.example.music_backend.dto.spotify.SpotifySearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.model_objects.specification.Recommendations;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import se.michaelthelin.spotify.requests.data.browse.GetRecommendationsRequest;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SpotifyService {

    private final UserGenreService userGenreService;

    @Value("${spotify.client-id}")
    private String clientId;

    @Value("${spotify.client-secret}")
    private String clientSecret;

    // ✅ Spotify API 객체 생성 (Access Token 없이)
    private SpotifyApi baseSpotifyApi() {
        return new SpotifyApi.Builder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .setRedirectUri(URI.create("https://example.com/callback"))
                .build();
    }

    // ✅ Access Token 발급
    private String getAccessToken() {
        try {
            log.info("🎧 [SpotifyService] Access Token 요청 시작...");
            SpotifyApi spotifyApi = baseSpotifyApi();

            ClientCredentialsRequest request = spotifyApi.clientCredentials().build();
            ClientCredentials credentials = request.execute();

            spotifyApi.setAccessToken(credentials.getAccessToken());
            log.info("✅ [SpotifyService] Access Token 발급 완료");
            return credentials.getAccessToken();

        } catch (IOException | SpotifyWebApiException e) {
            log.error("❌ Spotify Access Token 요청 실패: {}", e.getMessage(), e);
            throw new RuntimeException("Spotify Access Token 발급 실패");
        }
    }

    // ✅ SpotifyApi 생성 (토큰 포함)
    private SpotifyApi spotifyApiWithToken() {
        String token = getAccessToken();
        return new SpotifyApi.Builder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .setAccessToken(token)
                .setRedirectUri(URI.create("https://example.com/callback"))
                .build();
    }

    // ✅ DB → Spotify 장르 시드 변환
    private String getUserSeedGenres() {
        List<String> dbGenreNames = userGenreService.getUserGenres().stream()
                .map(Genre::getGenreName)
                .map(String::toLowerCase)
                .toList();

        if (dbGenreNames.isEmpty()) {
            log.warn("⚠️ 사용자 관심 장르 없음 → 기본 pop, indie 사용");
            return "pop,indie";
        }

        List<String> spotifyGenres = SpotifyGenreMapper.mapToSpotifyGenres(dbGenreNames);
        if (spotifyGenres.isEmpty()) {
            log.warn("⚠️ Spotify 매핑 실패 → 기본 pop, indie 사용");
            return "pop,indie";
        }

        List<String> limited = spotifyGenres.stream().limit(5).toList();
        log.info("🌱 사용자 Seed 장르 (DB): {}", dbGenreNames);
        log.info("🌱 Spotify 매핑 Seed 장르: {}", limited);
        return String.join(",", limited);
    }

    // ✅ 핵심: Spotify 추천 요청
    private List<Map<String, Object>> getRecommendations(String seedGenres,
                                                         Double targetEnergy,
                                                         Double targetValence,
                                                         Double targetTempo) {
        List<Map<String, Object>> result = new ArrayList<>();

        try {
            SpotifyApi spotifyApi = spotifyApiWithToken();

            GetRecommendationsRequest.Builder builder = spotifyApi.getRecommendations()
                    .limit(12)
                    .seed_genres(Arrays.asList(seedGenres.split(","))); // ✅ 수정 완료

            if (targetEnergy != null) builder.target_energy(targetEnergy.floatValue());
            if (targetValence != null) builder.target_valence(targetValence.floatValue());
            if (targetTempo != null) builder.target_tempo(targetTempo.floatValue());

            Recommendations rec = builder.build().execute();

            for (Track track : rec.getTracks()) {
                Map<String, Object> item = new HashMap<>();
                item.put("name", track.getName());
                item.put("artist", track.getArtists()[0].getName());
                item.put("preview", track.getPreviewUrl());
                item.put("url", track.getExternalUrls().getExternalUrls().get("spotify"));
                if (track.getAlbum() != null && track.getAlbum().getImages().length > 0) {
                    item.put("image", track.getAlbum().getImages()[0].getUrl());
                }
                result.add(item);
            }

            log.info("🎵 추천 트랙 {}개 수신 완료", result.size());
        } catch (Exception e) {
            log.error("❌ Spotify 추천 요청 실패: {}", e.getMessage(), e);
        }
        return result;
    }

    // ✅ 날씨 기반 추천
    public List<Map<String, Object>> getWeatherTracks(String weather) {
        String seed = getUserSeedGenres();
        double energy = 0.6, valence = 0.5;

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

    // ✅ 감정 기반 추천
    public List<Map<String, Object>> getEmotionTracks(String emotion) {
        String seed = getUserSeedGenres();
        double energy = 0.5, valence = 0.5;

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

    // ✅ 날씨 + 감정 조합
    public List<Map<String, Object>> getCombinedTracks(String weather, String emotion) {
        String seed = getUserSeedGenres();
        double energy = 0.5, valence = 0.5;

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
}
