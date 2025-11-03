package org.example.music_backend.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SpotifyTokenMapper {
    void insertSpotifyToken(SpotifyUserToken token);
}