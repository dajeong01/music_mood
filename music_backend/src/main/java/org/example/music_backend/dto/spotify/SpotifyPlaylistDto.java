package org.example.music_backend.dto.spotify;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpotifyPlaylistDto {
    private String name;
    private String owner;
    private String url;
    private String image;
}