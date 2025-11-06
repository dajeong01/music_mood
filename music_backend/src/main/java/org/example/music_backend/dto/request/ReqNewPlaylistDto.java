package org.example.music_backend.dto.request;

import lombok.Data;

@Data
public class ReqNewPlaylistDto {
    private String emojiKey;
    private String title;
}
