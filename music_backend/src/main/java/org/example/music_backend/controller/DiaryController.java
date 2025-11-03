package org.example.music_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.diary.Diary;
import org.example.music_backend.dto.request.ReqDiaryDto;
import org.example.music_backend.dto.response.ResponseDto;
import org.example.music_backend.dto.user.UserRegisterReqDto;
import org.example.music_backend.security.model.PrincipalUtil;
import org.example.music_backend.service.DiaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diary")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final PrincipalUtil principalUtil;

    @PostMapping
    public ResponseEntity<ResponseDto<?>> saveDiary(@RequestBody ReqDiaryDto dto) {
        diaryService.saveOrUpdateDiary(dto);
        return ResponseEntity.ok(ResponseDto.success("다이어리 등록 & 수정 완료"));
    }

    @GetMapping("/month")
    public ResponseEntity<ResponseDto<?>> getMonthlyDiaries(@RequestParam String month) {
        List<Diary> diaries = diaryService.getMonthlyDiaries(month);
        return ResponseEntity.ok(ResponseDto.success(diaries));
    }

    @GetMapping
    public ResponseEntity<?> getDiaryByDate(@RequestParam String date) {
        int userId = principalUtil.getPrincipalUser().getUser().getUserId();
        System.out.println("📖 [Diary GET] userId=" + userId + ", date=" + date);

        Diary diary = diaryService.getDiaryByDate(userId, date);
        return ResponseEntity.ok(new ResponseDto<>(200, "일기 조회 성공", diary));
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics() {
        return ResponseEntity.ok(diaryService.getDiaryStatistics());
    }


}
