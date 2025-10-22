package org.example.music_backend.service;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.location.Location;
import org.example.music_backend.domain.location.LocationMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final LocationMapper locationMapper;

    public List<String> getAllCities() {
        return locationMapper.getAllCities();
    }

    public List<String> getDistrictsByCity(String city) {
        return locationMapper.getDistrictsByCity(city);
    }

    public Location searchLocation(String city, String district) {
        return locationMapper.searchLocation(city, district);
    }


}
