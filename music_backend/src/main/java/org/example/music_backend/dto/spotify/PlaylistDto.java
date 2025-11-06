package org.example.music_backend.dto.spotify;

import lombok.Data;

@Data
public class PlaylistDto {
    private Integer playlistId;
    private Integer userId;
    private String emojiKey;
    private String title;
}