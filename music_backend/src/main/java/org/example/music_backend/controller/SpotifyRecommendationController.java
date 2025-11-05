package org.example.music_backend.controller;

import lombok.RequiredArgsConstructor;
import org.apache.juli.logging.Log;
import org.example.music_backend.dto.spotify.SpotifyTrackDto;
import org.example.music_backend.security.model.PrincipalUtil;
import org.example.music_backend.service.SpotifyRecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/spotify/recommendations")
@RequiredArgsConstructor
public class SpotifyRecommendationController {

    private final SpotifyRecommendationService spotifyRecommendationService;
    private final PrincipalUtil principalUtil;

    // ✅ 날씨 기반 추천
    @GetMapping("/weather")
    public ResponseEntity<?> getWeatherRecommendations(
            @RequestParam String weatherKey) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        System.out.println("🎵 [Weather Recommendation] userId=" + userId + ", weatherKey=" + weatherKey);


        List<SpotifyTrackDto> tracks =
                spotifyRecommendationService.getWeatherBasedRecommendations(userId, weatherKey);

        return ResponseEntity.ok(Map.of("tracks", tracks));
    }

    // ✅ 감정 기반 추천
    @GetMapping("/emotion")
    public ResponseEntity<?> getEmotionRecommendations(
            @RequestParam String emotionKey) {

        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        System.out.println("🎵 [Emotion Recommendation] userId=" + userId + ", emotionKey=" + emotionKey);
        List<SpotifyTrackDto> tracks =
                spotifyRecommendationService.getEmotionBasedRecommendations(userId, emotionKey);

        return ResponseEntity.ok(Map.of("tracks", tracks));
    }

    @GetMapping("/mix")
    public ResponseEntity<?> getMixedRecommendations(
            @RequestParam String weatherKey,
            @RequestParam String emotionKey,
            @RequestParam(defaultValue = "10") int limit) {
        System.out.println(weatherKey + "|" + emotionKey);

        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        var tracks = spotifyRecommendationService.getMixedRecommendations(userId, weatherKey, emotionKey, limit);

        return ResponseEntity.ok(Map.of("tracks", tracks));
    }
}