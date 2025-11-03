package org.example.music_backend.dto.spotify;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class SpotifyGenreMapper {

    // ✅ DB에 있는 20개 장르 기준 매핑
    private static final Map<String, String> GENRE_MAP = new HashMap<>();

    static {
        GENRE_MAP.put("k-pop", "k-pop");
        GENRE_MAP.put("pop", "pop");
        GENRE_MAP.put("r-n-b", "r-n-b");
        GENRE_MAP.put("hip-hop", "hip-hop");
        GENRE_MAP.put("indie", "indie");
        GENRE_MAP.put("rock", "rock");
        GENRE_MAP.put("j-pop", "j-pop");
        GENRE_MAP.put("anime", "anime");
        GENRE_MAP.put("edm", "edm");
        GENRE_MAP.put("house", "house");
        GENRE_MAP.put("jazz", "jazz");
        GENRE_MAP.put("soul", "soul");
        GENRE_MAP.put("acoustic", "acoustic");
        GENRE_MAP.put("classical", "classical");
        GENRE_MAP.put("soundtracks", "soundtracks");
        GENRE_MAP.put("chill", "chill");
        GENRE_MAP.put("study", "study");
        GENRE_MAP.put("sleep", "sleep");
        GENRE_MAP.put("sad", "sad");
        GENRE_MAP.put("ballad", "pop"); // Spotify에 없어서 pop으로 매핑
    }

    /**
     * ✅ DB 장르명을 Spotify seed_genres 형식으로 변환
     */
    public static List<String> mapToSpotifyGenres(List<String> inputGenres) {
        return inputGenres.stream()
                .map(g -> GENRE_MAP.getOrDefault(g.toLowerCase(), null))
                .filter(Objects::nonNull)
                .distinct()
                .toList();
    }
}

