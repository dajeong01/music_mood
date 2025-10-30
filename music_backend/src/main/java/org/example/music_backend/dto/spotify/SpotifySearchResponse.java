package org.example.music_backend.dto.spotify;

import lombok.Data;
import java.util.List;

@Data
public class SpotifySearchResponse {
    private Playlists playlists;

    @Data
    public static class Playlists {
        private List<Item> items;
    }

    @Data
    public static class Item {
        private String name;
        private Owner owner;
        private ExternalUrls externalUrls;
        private List<Image> images;
    }

    @Data
    public static class Owner {
        private String displayName;
    }

    @Data
    public static class ExternalUrls {
        private String spotify;
    }

    @Data
    public static class Image {
        private String url;
    }
}
