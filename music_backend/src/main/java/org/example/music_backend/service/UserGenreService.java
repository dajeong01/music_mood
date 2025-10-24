package org.example.music_backend.service;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.spotify.userGenre.UserGenreMapper;
import org.example.music_backend.security.model.PrincipalUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserGenreService {

    private final UserGenreMapper userGenreMapper;
    private final PrincipalUtil principalUtil;

    @Transactional
    public void updateUserGenres(List<Integer> genreIds) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        userGenreMapper.deleteUserGenres(userId);
        for (Integer genreId : genreIds) {
            userGenreMapper.insertUserGenre(userId, genreId);
        }
    }

    public List<Integer> getUserGenreIds() {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        return userGenreMapper.getUserGenres(userId);
    }
}