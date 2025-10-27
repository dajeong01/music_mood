package org.example.music_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.spotify.genre.Genre;
import org.example.music_backend.dto.response.ResponseDto;
import org.example.music_backend.service.UserGenreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/genres")
@RequiredArgsConstructor
public class UserGenreController {

    private final UserGenreService userGenreService;

    @PostMapping("/update")
    public ResponseEntity<ResponseDto<?>> updateUserGenres(
            @RequestBody List<Integer> genreIds
    ) {
        userGenreService.updateUserGenres(genreIds);
        return ResponseEntity.ok(ResponseDto.success("관심 장르가 저장되었습니다."));
    }

    @GetMapping()
    public ResponseEntity<ResponseDto<?>> getUserGenres() {
        return ResponseEntity.ok(ResponseDto.success(userGenreService.getUserGenres()));
    }
}
