package org.example.music_backend.service;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.spotify.genre.GenreMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SpotifyService {

    private final GenreMapper genreMapper;
    private final WebClient webClient = WebClient.create();

    @Value("${spotify.client-id}")
    private String clientId;

    @Value("${spotify.client-secret}")
    private String clientSecret;

    @SuppressWarnings("unchecked")
    private String getAccessToken() {
        System.out.println("🎧 [SpotifyService] Access Token 요청 시작...");
        String tokenUrl = "https://accounts.spotify.com/api/token";

        Map<String, Object> response = (Map<String, Object>) webClient.post()
                .uri(tokenUrl)
                .headers(headers -> {
                    String auth = Base64.getEncoder()
                            .encodeToString((clientId + ":" + clientSecret)
                                    .getBytes(StandardCharsets.UTF_8));
                    headers.set("Authorization", "Basic " + auth);
                    headers.set("Content-Type", "application/x-www-form-urlencoded");
                })
                .bodyValue("grant_type=client_credentials")
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        String token = (String) response.get("access_token");
        System.out.println("✅ [SpotifyService] Access Token 발급 완료: " + token);
        return token;
    }



}
