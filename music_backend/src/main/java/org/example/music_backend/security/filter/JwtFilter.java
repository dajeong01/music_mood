package org.example.music_backend.security.filter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.user.User;
import org.example.music_backend.domain.user.UserMapper;
import org.example.music_backend.security.jwt.JwtUtil;
import org.example.music_backend.security.model.PrincipalUser;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter implements Filter {

    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
//        System.out.println("[JwtFilter] Request URI: " + request.getRequestURI());
//        System.out.println("[JwtFilter] Authorization: " + request.getHeader("Authorization"));


        // ✅ 1. OPTIONS 요청은 바로 통과 (CORS preflight)
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        // ✅ 2. 인증 불필요한 URL은 바로 통과
        String uri = request.getRequestURI();
        if (uri.startsWith("/auth/") || uri.startsWith("/api/public/")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        // ✅ 3. JWT 인증 진행
        String authorization = request.getHeader("Authorization");
        authenticate(authorization);

        filterChain.doFilter(servletRequest, servletResponse);
    }

    private void authenticate(String token) {
        String validatedToken = jwtUtil.validateBearerToken(token);
        if (validatedToken == null) return;

        Claims claims = jwtUtil.getClaims(validatedToken);
        if (claims == null) return;

        setAuthentication(claims);
    }

    private void setAuthentication(Claims claims) {
        Integer userId = (Integer) claims.get("userId");
        User foundUser = userMapper.findById(userId);
        if (foundUser == null) return;

        PrincipalUser principal = PrincipalUser.builder().user(foundUser).build();
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(principal, "", principal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}