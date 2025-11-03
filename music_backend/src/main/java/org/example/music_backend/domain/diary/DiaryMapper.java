package org.example.music_backend.domain.diary;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface DiaryMapper {
    int insertDiary(Diary diary);
    int updateDiary(Diary diary);
    Diary findDiaryByUserAndDate(Map<String, Object> params);
    List<Diary> findMonthlyDiaries(Map<String, Object> params);

    Diary findDiaryByUserIdAndDate(@Param("userId") int userId, @Param("date") String date);
}
