/** @jsxImportSource @emotion/react */
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseURL } from "../../../api/axios";
import * as s from "./styles";

function Signin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    // console.log("🔍 [Signin] URL:", window.location.href);
    // console.log("🟢 [Signin] accessToken:", accessToken);

    if (accessToken) {
      localStorage.setItem("AccessToken", `Bearer ${accessToken}`);
      // console.log("✅ [Signin] localStorage 저장 완료:", localStorage.getItem("AccessToken"));

      queryClient.invalidateQueries({ queryKey: ["principal"] })
        .then(() => {
          console.log("✅ [Signin] principal 캐시 무효화 완료, /로 이동");
          navigate("/weather");
        });
    }
  }, []);

  const handleLogin = (provider) => {
    console.log("➡️ [Signin] 로그인 요청:", provider);
    window.location.href = `${baseURL}/oauth2/authorization/${provider}`;
  };

  return (
    <div css={s.container}>
      <div css={s.loginTitle}>Melody Diary</div>
      <div css={s.buttons}>
        <button onClick={() => handleLogin("google")}>
          <FcGoogle /> 구글 계정으로 로그인
        </button>
        <button onClick={() => handleLogin("kakao")}>
          <RiKakaoTalkFill /> 카카오 계정으로 로그인
        </button>
        <button onClick={() => handleLogin("naver")}>
          <SiNaver /> 네이버 계정으로 로그인
        </button>
      </div>
    </div>
  );
}

export default Signin;
