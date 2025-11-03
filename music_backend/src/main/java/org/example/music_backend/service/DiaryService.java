package org.example.music_backend.service;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.diary.Diary;
import org.example.music_backend.domain.diary.DiaryMapper;
import org.example.music_backend.dto.request.ReqDiaryDto;
import org.example.music_backend.security.model.PrincipalUtil;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final PrincipalUtil principalUtil;
    private final DiaryMapper diaryMapper;

    public void saveOrUpdateDiary(ReqDiaryDto dto) {
        Map<String, Object> params = new HashMap<>();
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        params.put("userId", userId);
        System.out.println(userId);
        params.put("date", dto.getDate());

        Diary diary = Diary.builder()
                .userId(userId)
                .date(dto.getDate())
                .emotion(dto.getEmotion())
                .content(dto.getContent())
                .build();

        Diary existing = diaryMapper.findDiaryByUserAndDate(params);

        if (existing == null) {
            diaryMapper.insertDiary(diary);
        } else {
            diaryMapper.updateDiary(diary);
        }
    }

    public List<Diary> getMonthlyDiaries(String month) {
        YearMonth yearMonth = YearMonth.parse(month);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        Map<String, Object> params = new HashMap<>();
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        System.out.println("✅ userId from principal = " + userId);
        params.put("userId", userId);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        params.put("startDate", startDate.format(formatter));
        params.put("endDate", endDate.format(formatter));
        return diaryMapper.findMonthlyDiaries(params);
    }

    public Diary getDiaryByDate(int userId, String date) {
        return diaryMapper.findDiaryByUserIdAndDate(userId, date);
    }


    public Map<String, Object> getDiaryStatistics() {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        List<Map<String, Object>> emotionStats = diaryMapper.getEmotionStatistics(Map.of("userId", userId));
        int totalCount = diaryMapper.getTotalDiaryCount(userId);

        String mostEmotion = "데이터 없음";
        if (!emotionStats.isEmpty()) {
            mostEmotion = emotionStats.stream()
                    .max(Comparator.comparingInt(e -> Integer.parseInt(e.get("count").toString())))
                    .map(e -> (String) e.get("emotion"))
                    .orElse("데이터 없음");
        }

        return Map.of(
                "totalCount", totalCount,
                "mostEmotion", mostEmotion,
                "emotionStats", emotionStats
        );
    }
}



