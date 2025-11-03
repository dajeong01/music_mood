package org.example.music_backend.controller;


import lombok.RequiredArgsConstructor;
import org.example.music_backend.service.SpotifyAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth/spotify")
@RequiredArgsConstructor
public class SpotifyAuthController {

    private final SpotifyAuthService spotifyAuthService;

    @GetMapping("/callback")
    public ResponseEntity<?> spotifyCallback(@RequestParam String code) {
        String accessToken = spotifyAuthService.exchangeCodeForAccessToken(code);

        Map<String, Object> result = new HashMap<>();
        result.put("access_token", accessToken);

        return ResponseEntity.ok(result);
    }
}