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
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        boolean isOption = request.getMethod().equalsIgnoreCase("OPTION");
        if (isOption) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        String authorization = request.getHeader("Authorization");
        authenticate(authorization);

        filterChain.doFilter(servletRequest, servletResponse);
    }

    private void authenticate(String token) {
        String validatedToken = jwtUtil.validateBearerToken(token);
        if (validatedToken == null) {
            return;
        }

        Claims claims = jwtUtil.getClaims(validatedToken);
        if (claims == null) {
            return;
        }

        setAuthentication(claims);
    }

    private void setAuthentication(Claims claims) {
        Integer userId = (Integer) claims.get("userId");
        User foundUser = userMapper.findById(userId);
        if (foundUser == null) {
            return;
        }
        PrincipalUser principal = PrincipalUser.builder().user(foundUser).build();
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, "", principal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}