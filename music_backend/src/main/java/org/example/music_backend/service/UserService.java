package org.example.music_backend.service;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.user.User;
import org.example.music_backend.domain.user.UserMapper;
import org.example.music_backend.dto.user.UserRegisterReqDto;
import org.example.music_backend.security.jwt.JwtUtil;
import org.example.music_backend.security.model.PrincipalUser;
import org.example.music_backend.security.model.PrincipalUtil;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final PrincipalUtil principalUtil;

    public Map<String, String> register(UserRegisterReqDto dto) {
        User user = dto.toEntity();

        userMapper.insert(user);

        String accessToken = jwtUtil.generateAccessToken(user);

        Map<String, String> result = new HashMap<>();
        result.put("accessToken", accessToken);
        return result;
    }

    public String checkNickname(String nickname) {
        User user = userMapper.findByNickname(nickname);
        if (user == null) {
            return "false";
        } else {
            return "true";
        }
    }

    public List<User> getUserDetail() {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        return userMapper.getUserDetail(userId);
    }

    public String updateNickname(String nickname) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        int result = userMapper.updateNickname(userId, nickname);
        return result > 0 ? "success" : "fail";
    }

}
