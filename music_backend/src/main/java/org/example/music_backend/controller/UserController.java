package org.example.music_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.dto.response.ResponseDto;
import org.example.music_backend.dto.user.UserRegisterReqDto;
import org.example.music_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<ResponseDto<?>> register(@RequestBody UserRegisterReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(userService.register(dto)));
    }

    @GetMapping("/users/nickname/check")
    public ResponseEntity<ResponseDto<?>> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(ResponseDto.success(userService.checkNickname(nickname)));
    }
}
