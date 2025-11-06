package org.example.music_backend.domain.spotify.playlist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Playlist {
    private Integer playlistId;
    private Integer userId;
    private String emojiKey;
    private String title;
    private LocalDateTime createdAt;
}