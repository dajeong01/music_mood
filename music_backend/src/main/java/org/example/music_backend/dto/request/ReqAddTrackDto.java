package org.example.music_backend.dto.request;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqAddTrackDto {
    private Integer playlistId; // 어떤 플레이리스트에 넣는지
    private String trackId;     // 스포티파이 ID
    private String trackName;
    private String artistName;
    private String imageUrl;
    private String previewUrl;
}