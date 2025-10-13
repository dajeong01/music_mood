package org.example.music_backend.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insert(User userInfo);
    User findByEmail(String email);
    User findById(Integer userId);
    User findByNickname(String nickname);
}
