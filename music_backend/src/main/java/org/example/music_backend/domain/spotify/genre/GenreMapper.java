package org.example.music_backend.domain.spotify.genre;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface GenreMapper {

    List<Map<String, Object>> getAllGenres();
}