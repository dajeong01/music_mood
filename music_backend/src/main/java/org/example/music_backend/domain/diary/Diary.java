package org.example.music_backend.domain.diary;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Diary {
    private int diaryId;
    private int userId;
    private LocalDate date;
    private String emotion;
    private String content;
    private LocalDateTime createdAt;
}