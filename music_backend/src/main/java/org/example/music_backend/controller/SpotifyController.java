package org.example.music_backend.controller;


import lombok.RequiredArgsConstructor;
import org.example.music_backend.dto.response.ResponseDto;
import org.example.music_backend.service.SpotifyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/spotify")
public class SpotifyController {

    private final SpotifyService spotifyService;

    @GetMapping("/weather/tracks/{weatherKey}")
    public ResponseEntity<ResponseDto<List<Map<String, Object>>>> getWeatherTracks(
            @PathVariable String weatherKey
    ) {
        System.out.println("🎯 [Controller] weatherKey = " + weatherKey);

        List<Map<String, Object>> tracks = spotifyService.getWeatherTracks(weatherKey);

        System.out.println("🎯 [Controller] tracks size = " + tracks.size());

        ResponseDto<List<Map<String, Object>>> response =
                new ResponseDto<>(200, "날씨 기반 트랙 추천 성공", tracks);
        return ResponseEntity.ok(response);
    }


    // 감정만 기반
    @GetMapping("/emotion/{emotionKey}")
    public List<Map<String, Object>> getEmotion(@PathVariable String emotionKey) {
        return spotifyService.getEmotionPlaylists(emotionKey);
    }

    // 날씨 + 감정 조합
    @GetMapping("/mix")
    public List<Map<String, Object>> getCombined(
            @RequestParam String weather,
            @RequestParam String emotion
    ) {
        return spotifyService.getCombinedPlaylists(weather, emotion);
    }

    @GetMapping("/tracks/{emotionKey}")
    public ResponseEntity<?> getEmotionTracks(@PathVariable String emotionKey) {
        return ResponseEntity.ok(spotifyService.getEmotionTracks(emotionKey));
    }
}