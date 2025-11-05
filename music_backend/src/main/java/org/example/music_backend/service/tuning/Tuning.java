package org.example.music_backend.service.tuning;

public record Tuning(
        Double energy,
        Double valence,
        Double dance,
        Double acoustic,
        Integer minTempo,
        Integer maxTempo,
        Integer mode
) {
    public static Tuning of(Double e, Double v, Double d, Double a, Integer minT, Integer maxT, Integer mode) {
        return new Tuning(e, v, d, a, minT, maxT, mode);
    }

    public static Tuning merge(Tuning w, Tuning e) {
        return new Tuning(
                avg(w.energy,  e.energy),
                avg(w.valence, e.valence),
                avg(w.dance,   e.dance),
                avg(w.acoustic, e.acoustic),
                maxInt(w.minTempo, e.minTempo),
                minInt(w.maxTempo, e.maxTempo),
                e.mode != null ? e.mode : w.mode
        );
    }

    // ✅ 느슨한 튜닝으로 (tempo 제거 = 검색 범위 넓힘)
    public Tuning toLoose() {
        return new Tuning(
                energy, valence, dance, acoustic,
                null, null, mode
        );
    }

    private static Double avg(Double a, Double b) {
        if (a == null && b == null) return null;
        if (a == null) return b;
        if (b == null) return a;
        return (a + b) / 2.0;
    }

    private static Integer maxInt(Integer a, Integer b) {
        if (a == null) return b;
        if (b == null) return a;
        return Math.max(a, b);
    }

    private static Integer minInt(Integer a, Integer b) {
        if (a == null) return b;
        if (b == null) return a;
        return Math.min(a, b);
    }
}
