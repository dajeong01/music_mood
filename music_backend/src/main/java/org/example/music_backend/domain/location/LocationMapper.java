package org.example.music_backend.domain.location;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface LocationMapper {
    List<String> getAllCities();
    List<String> getDistrictsByCity(String city);
    Location searchLocation(@Param("city") String city, @Param("district") String district);

}
