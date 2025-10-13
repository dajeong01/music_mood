package org.example.music_backend.dto.user;

import lombok.Data;
import org.example.music_backend.domain.user.User;


@Data
public class UserRegisterReqDto {
    private String oauthType;
    private String providerId;
    private String email;
    private String fullName;
    private String nickname;

    public User toEntity() {
        return User.builder()
                .email(email)
                .oauthType(oauthType)
                .providerId(providerId)
                .fullName(fullName)
                .nickname(nickname)
                .build();
    }
}
