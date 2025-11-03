package org.example.music_backend.dto.spotify;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SpotifyTokenResponseDto {
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private Integer expiresIn;
}
