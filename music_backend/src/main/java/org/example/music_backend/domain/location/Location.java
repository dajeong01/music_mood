package org.example.music_backend.domain.location;

import lombok.Data;

@Data
public class Location {
    private int id;
    private String city;
    private String district;
    private double lat;
    private double lon;
}
