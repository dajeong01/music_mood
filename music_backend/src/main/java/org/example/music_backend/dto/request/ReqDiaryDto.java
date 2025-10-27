package org.example.music_backend.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReqDiaryDto {
    private LocalDate date;
    private String emotion;
    private String content;
}
