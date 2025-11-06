package org.example.music_backend.controller;


import lombok.RequiredArgsConstructor;
import org.example.music_backend.dto.request.ReqAddTrackDto;
import org.example.music_backend.dto.request.ReqDiaryDto;
import org.example.music_backend.dto.request.ReqNewPlaylistDto;
import org.example.music_backend.dto.response.ResponseDto;
import org.example.music_backend.service.PlaylistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/playlist")
public class PlaylistController {

    private final PlaylistService playlistService;

    @PostMapping
    public ResponseEntity<ResponseDto<?>> createPlaylist(
            @RequestBody ReqNewPlaylistDto dto
    ) {
        playlistService.createPlaylist(dto);
        return ResponseEntity.ok(ResponseDto.success("✅ 플레이리스트 생성 완료"));
    }

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getMyPlaylists() {
        return ResponseEntity.ok(ResponseDto.success(playlistService.getUserPlaylists()));
    }

    @PostMapping("/{playlistId}/track")
    public ResponseEntity<ResponseDto<?>> addTrackToPlaylist(
            @PathVariable Integer playlistId,
            @RequestBody ReqAddTrackDto dto
    ) {
        dto.setPlaylistId(playlistId); // ✅ playlistId 세팅
        playlistService.addTrack(dto); // ✅ 여기 수정됨!
        return ResponseEntity.ok(ResponseDto.success("🎵 트랙 추가 완료"));
    }

    @GetMapping("/{playlistId}/tracks")
    public ResponseEntity<ResponseDto<?>> getTracks(
            @PathVariable Integer playlistId) {
        return ResponseEntity.ok(ResponseDto.success(playlistService.getTracks(playlistId)));
    }
}

