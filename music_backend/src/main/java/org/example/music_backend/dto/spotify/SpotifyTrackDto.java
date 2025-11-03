package org.example.music_backend.dto.spotify;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpotifyTrackDto {
    private String name;
    private String artist;
    private String image;
    private String preview;
}
