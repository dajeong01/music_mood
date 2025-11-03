package org.example.music_backend.service;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.spotify.genre.Genre;
import org.example.music_backend.domain.spotify.genre.GenreMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GenreService {

    private final GenreMapper genreMapper;

    public List<Genre> getAllGenres() {
        System.out.println("🎧 [GenreService] DB에서 장르 목록 가져오기 실행");
        return genreMapper.getAllGenres();
    }
}