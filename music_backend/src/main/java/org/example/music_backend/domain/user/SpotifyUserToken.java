package org.example.music_backend.domain.user;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpotifyUserToken {
    private int id;
    private int userId;
    private String accessToken;
    private String refreshToken;
}