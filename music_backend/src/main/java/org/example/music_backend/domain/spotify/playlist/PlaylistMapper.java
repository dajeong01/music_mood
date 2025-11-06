package org.example.music_backend.domain.spotify.playlist;

import org.apache.ibatis.annotations.Mapper;
import org.example.music_backend.dto.spotify.PlaylistDto;

import java.util.List;

@Mapper
public interface PlaylistMapper {
    void createPlaylist(PlaylistDto playlist);
    List<PlaylistDto> findByUserId(int userId);
    void insertTrack(PlaylistTrack track); // ✅ 추가
    List<PlaylistTrack> getTracksByPlaylistId(Integer playlistId); // ✅ 트랙 조회
}