package org.example.music_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.spotify.genre.Genre;
import org.example.music_backend.dto.response.ResponseDto;
import org.example.music_backend.service.GenreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/genres")
public class GenreController {


    private final GenreService genreService;

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getAllGenres() {
        System.out.println("🎵 [GenreController] /api/genres 호출됨");
        List<Genre> genres = genreService.getAllGenres();
        return ResponseEntity.ok(ResponseDto.success(genres));
    }
}