package org.example.music_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // ✅ BrowserRouter 새로고침 시 React index.html로 포워드
        registry.addViewController("/auth/oauth2/signin").setViewName("forward:/index.html");
        registry.addViewController("/auth/oauth2/signup").setViewName("forward:/index.html");
        registry.addViewController("/weather").setViewName("forward:/index.html");
        registry.addViewController("/login").setViewName("forward:/index.html");
        registry.addViewController("/").setViewName("forward:/index.html");
    }
}