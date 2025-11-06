package org.example.music_backend.service;


import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.spotify.playlist.PlaylistMapper;
import org.example.music_backend.domain.spotify.playlist.PlaylistTrack;
import org.example.music_backend.dto.request.ReqAddTrackDto;
import org.example.music_backend.dto.request.ReqNewPlaylistDto;
import org.example.music_backend.dto.spotify.PlaylistDto;
import org.example.music_backend.security.jwt.JwtUtil;
import org.example.music_backend.security.model.PrincipalUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaylistService {

    private final PlaylistMapper playlistMapper;
    private final PrincipalUtil principalUtil;

    public void createPlaylist(ReqNewPlaylistDto req) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        PlaylistDto dto = new PlaylistDto();
        dto.setUserId(userId);
        dto.setEmojiKey(req.getEmojiKey());
        dto.setTitle(req.getTitle());

        playlistMapper.createPlaylist(dto);
    }

    public List<PlaylistDto> getUserPlaylists() {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        return playlistMapper.findByUserId(userId);
    }


    public void addTrack(ReqAddTrackDto dto) {
        PlaylistTrack track = PlaylistTrack.builder()
                .playlistId(dto.getPlaylistId())
                .trackId(dto.getTrackId())
                .trackName(dto.getTrackName())
                .artistName(dto.getArtistName())
                .imageUrl(dto.getImageUrl())
                .previewUrl(dto.getPreviewUrl())
                .build();
        playlistMapper.insertTrack(track);
    }

    public List<PlaylistTrack> getTracks(Integer playlistId) {
        return playlistMapper.getTracksByPlaylistId(playlistId);
    }
}
