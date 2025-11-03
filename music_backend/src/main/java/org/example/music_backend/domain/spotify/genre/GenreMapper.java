package org.example.music_backend.domain.spotify.genre;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface GenreMapper {

    List<Genre> getAllGenres();

    // 여러 장르 id로 이름 조회
    List<Genre> findGenreNamesByIds(List<Integer> genreIds);
}