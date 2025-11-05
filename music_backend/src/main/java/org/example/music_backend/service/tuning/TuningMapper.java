package org.example.music_backend.service.tuning;

import java.util.Locale;

public class TuningMapper {

    public static Tuning mapEmotion(String emotion) {
        return switch (emotion.toLowerCase()) {
            case "happy"   -> Tuning.of(0.75, 0.85, 0.75, 0.25, 110, null, 1);
            case "sad"     -> Tuning.of(0.30, 0.25, 0.45, 0.60, null, 90, 0);
            case "angry"   -> Tuning.of(0.90, 0.30, 0.55, 0.15, 120, null, 1);
            case "excited" -> Tuning.of(0.85, 0.75, 0.85, 0.20, 120, null, 1);
            case "tired"   -> Tuning.of(0.35, 0.45, 0.50, 0.65, null, 85, 0);
            default        -> Tuning.of(0.60, 0.55, 0.60, 0.30, null, null, null);
        };
    }

    public static Tuning mapWeather(String weather) {
        return switch (weather.toLowerCase()) {
            case "clear"  -> Tuning.of(0.65, 0.70, 0.65, 0.25, 105, null, 1);
            case "clouds" -> Tuning.of(0.55, 0.50, 0.55, 0.35, null, 110, null);
            case "rain"   -> Tuning.of(0.45, 0.35, 0.50, 0.60, null, 100, 0);
            case "snow"   -> Tuning.of(0.50, 0.45, 0.55, 0.55, null, 105, null);
            case "thunder", "storm" -> Tuning.of(0.85, 0.35, 0.55, 0.20, 115, null, 0);
            default -> Tuning.of(0.60, 0.55, 0.60, 0.30, null, null, null);
        };
    }

    // ✅ 날씨+감정 조합 문자열 생성
    public static String buildMixKeyword(String weather, String emotion) {
        return switch (weather.toLowerCase()) {
            case "clear" -> "sunshine " + emotion;
            case "clouds" -> "cloudy " + emotion;
            case "rain" -> "rainy " + emotion;
            case "snow" -> "winter " + emotion;
            default -> emotion;
        };
    }

    public static String buildSpotifyRecommendationUrl(String seedGenres, Tuning t, int limit) {
        StringBuilder sb = new StringBuilder("https://api.spotify.com/v1/recommendations?");
        sb.append("seed_genres=").append(seedGenres);
        sb.append("&limit=").append(limit);
        sb.append("&market=KR");

        add(sb, "target_energy", t.energy());
        add(sb, "target_valence", t.valence());
        add(sb, "target_danceability", t.dance());
        add(sb, "target_acousticness", t.acoustic());
        addInt(sb, "min_tempo", t.minTempo());
        addInt(sb, "max_tempo", t.maxTempo());
        addInt(sb, "target_mode", t.mode());

        return sb.toString();
    }

    private static void add(StringBuilder sb, String k, Double v) {
        if (v != null)
            sb.append("&").append(k).append("=")
                    .append(String.format(Locale.US, "%.2f", v));
    }

    private static void addInt(StringBuilder sb, String k, Integer v) {
        if (v != null)
            sb.append("&").append(k).append("=").append(v);
    }
}
