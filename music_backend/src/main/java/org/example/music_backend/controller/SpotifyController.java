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


    // ✅ 감정 기반 추천 (리팩토링된 메서드명 반영)
    @GetMapping("/emotion/{emotionKey}")
    public ResponseEntity<ResponseDto<List<Map<String, Object>>>> getEmotionTracks(
            @PathVariable String emotionKey
    ) {
        List<Map<String, Object>> tracks = spotifyService.getEmotionTracks(emotionKey);
        return ResponseEntity.ok(new ResponseDto<>(200, "감정 기반 트랙 추천 성공", tracks));
    }

    // ✅ 날씨 + 감정 조합 추천 (리팩토링된 메서드명 반영)
    @GetMapping("/mix")
    public ResponseEntity<ResponseDto<List<Map<String, Object>>>> getCombinedTracks(
            @RequestParam String weather,
            @RequestParam String emotion
    ) {
        List<Map<String, Object>> tracks = spotifyService.getCombinedTracks(weather, emotion);
        return ResponseEntity.ok(new ResponseDto<>(200, "날씨 + 감정 조합 추천 성공", tracks));
    }
}