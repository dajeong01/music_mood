package org.example.music_backend.security.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.user.User;
import org.example.music_backend.domain.user.UserMapper;
import org.example.music_backend.security.jwt.JwtUtil;
import org.example.music_backend.security.model.PrincipalUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Value("${app.web-host}")
    private String webHost;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        System.out.println("✅ [OAuth2SuccessHandler] onAuthenticationSuccess() 호출됨");

        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        User user = principalUser.getUser();
        System.out.println("✅ [OAuth2SuccessHandler] 로그인 성공 - 사용자 이메일: " + user.getEmail());

        String redirectUrl;
        User foundUser = userMapper.findByEmail(user.getEmail());

        if (foundUser == null) {
            // 신규 유저 → 회원가입 페이지로 이동
            String email = URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8);
            String oauthType = URLEncoder.encode(user.getOauthType(), StandardCharsets.UTF_8);
            String providerId = URLEncoder.encode(user.getProviderId(), StandardCharsets.UTF_8);

            redirectUrl = String.format(
                    "%s/auth/oauth2/signup?email=%s&providerId=%s&oauthType=%s",
                    webHost, email, providerId, oauthType
            );

            System.out.println("🟢 [OAuth2SuccessHandler] 신규 유저 → 회원가입 페이지 리다이렉트");
        } else {
            // 기존 유저 → 로그인 완료 → 토큰 생성 후 프론트로 전달
            String accessToken = jwtUtil.generateAccessToken(foundUser);
            System.out.println("🟢 [OAuth2SuccessHandler] 기존 유저 accessToken 생성 완료: " + accessToken);

            redirectUrl = String.format("%s/auth/oauth2/signin?accessToken=%s", webHost, accessToken);
            System.out.println("🟢 [OAuth2SuccessHandler] 기존 유저 → 로그인 완료 리다이렉트 URL: " + redirectUrl);
        }

        System.out.println("➡️ [OAuth2SuccessHandler] 최종 Redirect URL: " + redirectUrl);
        response.sendRedirect(redirectUrl);
    }
}
