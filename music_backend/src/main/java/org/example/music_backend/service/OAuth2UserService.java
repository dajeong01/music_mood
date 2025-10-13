package org.example.music_backend.service;

import lombok.RequiredArgsConstructor;
import org.example.music_backend.domain.user.User;
import org.example.music_backend.security.model.PrincipalUser;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private static String s(Object o) { return (o == null) ? null : String.valueOf(o); }

    @SuppressWarnings("unchecked")
    private static Map<String, Object> map(Map<String, Object> src, String key) {
        Object v = (src == null) ? null : src.get(key);
        return (v instanceof Map) ? (Map<String, Object>) v : null;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        String email = null;
        String providerId = null;

        Map<String, Object> attrs = oAuth2User.getAttributes();

        switch (registrationId) {
            case "google": {
                email = s(attrs.get("email"));
                providerId = s(attrs.get("sub"));
                break;
            }
            case "kakao": {
                Map<String, Object> account = map(attrs, "kakao_account");
                providerId = s(attrs.get("id"));
                email = s(account == null ? null : account.get("email"));
                break;
            }
            case "naver": {
                Map<String, Object> response = map(attrs, "response");
                providerId = s(response == null ? null : response.get("id"));
                email = s(response == null ? null : response.get("email"));
                break;
            }
            default:
                throw new OAuth2AuthenticationException("Unsupported provider: " + registrationId);
        }

        if (providerId == null) {
            throw new OAuth2AuthenticationException("Provider id is null for " + registrationId);
        }

        User user = User.builder()
                .email(email)
                .oauthType(registrationId)
                .providerId(providerId)
                .build();

        return new PrincipalUser(user, attrs != null ? attrs : Collections.emptyMap());
    }
}
