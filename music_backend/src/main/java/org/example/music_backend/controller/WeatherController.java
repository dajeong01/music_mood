package org.example.music_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.dto.response.ResponseDto;
import org.example.music_backend.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weather")
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping("/cities")
    public ResponseEntity<ResponseDto<?>> getCities() {
        return ResponseEntity.ok(ResponseDto.success(weatherService.getAllCities()));
    }

    @GetMapping("/districts")
    public ResponseEntity<ResponseDto<?>> getDistricts(@RequestParam String city) {
        return ResponseEntity.ok(ResponseDto.success(weatherService.getDistrictsByCity(city)));
    }

    @GetMapping("/locations")
    public ResponseEntity<ResponseDto<?>> searchLocation(
            @RequestParam String city,
            @RequestParam String district) {
        return ResponseEntity.ok(ResponseDto.success(weatherService.searchLocation(city, district)));
    }
}
