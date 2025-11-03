/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SpotifyRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const jwt = localStorage.getItem("AccessToken");

    if (!code) {
      alert("Spotify 인증 코드가 없습니다 😢");
      navigate("/");
      return;
    }

    // ✅ 백엔드로 인증 코드 전달 → access_token 교환
    fetch(`http://localhost:8080/auth/spotify/callback?code=${code}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("spotify_token", data.access_token);
          alert("✅ Spotify 로그인 성공!");
          navigate("/weather");
        } else {
          alert("❌ Spotify 토큰 수신 실패");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Spotify 토큰 교환 실패:", err);
        navigate("/");
      });
  }, [navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>🎧 Spotify 인증 중...</h2>
      <p>잠시만 기다려주세요...</p>
    </div>
  );
}
