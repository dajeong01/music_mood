package org.example.music_backend.security.model;

import org.example.music_backend.exception.auth.UnauthorizedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class PrincipalUtil {

    public PrincipalUser getPrincipalUser() {
        Object principal  = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof PrincipalUser) {
            return (PrincipalUser) principal;
        } else {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }
    }
}
