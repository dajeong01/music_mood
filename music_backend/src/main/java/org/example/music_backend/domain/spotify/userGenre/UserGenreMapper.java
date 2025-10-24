package org.example.music_backend.domain.spotify.userGenre;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserGenreMapper {
    void deleteUserGenres(Integer userId);

    void insertUserGenre(Integer userId, Integer genreId);

    List<Integer> getUserGenres(Integer userId);
}
