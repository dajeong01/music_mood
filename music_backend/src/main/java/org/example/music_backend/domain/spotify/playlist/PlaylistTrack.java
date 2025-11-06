package org.example.music_backend.domain.spotify.playlist;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistTrack {
    private Integer playlistTrackId;
    private Integer playlistId;
    private String trackId;
    private String trackName;
    private String artistName;
    private String imageUrl;
    private String previewUrl;
    private LocalDateTime createdAt;
}