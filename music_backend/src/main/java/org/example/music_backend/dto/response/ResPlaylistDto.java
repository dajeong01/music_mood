package org.example.music_backend.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ResPlaylistDto {
    private Integer playlistId;
    private String emojiKey;
    private String title;
    private Integer trackCount;
}

