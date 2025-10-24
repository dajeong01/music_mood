package org.example.music_backend.domain.user;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    int insert(User userInfo);
    User findByEmail(String email);
    User findById(Integer userId);
    User findByNickname(String nickname);
    List<User> getUserDetail(Integer userId);
    int updateNickname(Integer userId, String nickname);
}
