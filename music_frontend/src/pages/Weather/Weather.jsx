/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftSideBarLayout from "../../components/LeftSideBarLayout/LeftSideBarLayout";
import WeatherHourlyList from "../../components/Weather/WeatherHourlyList";
import WeatherList from "../../components/Weather/WeatherList";
import WeatherLocation from "../../components/Weather/WeatherLocation";
import useLocationQuery from "../../queries/Weather/useLocationQuery";
import { getWeatherLabel } from "../../utils/weatherUtils";
import * as s from "./styles";

// ✅ API / Query
import { reqGetUserGenres } from "../../api/Spotify/UserGenreApi";
import {
  useEmotionRecommendations,
  useWeatherRecommendations,
} from "../../queries/Spotify/useSpotifyRecommendations";
import { color } from "framer-motion";

export default function Weather() {
  // ✅ 지역 상태
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem("selectedCity") || "부산광역시");
  const [selectedDistrict, setSelectedDistrict] = useState(localStorage.getItem("selectedDistrict") || "해운대구");

  const navigate = useNavigate();
  const audioRef = useRef(null);

  // ✅ 관심 장르
  const [userGenres, setUserGenres] = useState([]);


  // ✅ 미리듣기 상태
  const [playingPreview, setPlayingPreview] = useState(null);

  // ✅ 위치 + 날씨 API
  const { coords, weather, forecast, todayHourly, loading } = useLocationQuery(selectedCity, selectedDistrict);

  // ✅ 관심 장르 불러오기
  useEffect(() => {
    const fetchUserGenres = async () => {
      try {
        const res = await reqGetUserGenres();
        const genreList = Array.isArray(res?.data) ? res.data : res?.data?.body || [];
        const names = genreList.map((g) => (g.genre_name || g.genreName || "").toLowerCase());
        setUserGenres(names);
        console.log("🎧 관심 장르:", names);
      } catch (err) {
        console.error("❌ 관심 장르 불러오기 실패:", err);
      }
    };
    fetchUserGenres();
  }, []);

  // ✅ localStorage 유지
  useEffect(() => {
    if (selectedCity) localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) localStorage.setItem("selectedDistrict", selectedDistrict);
  }, [selectedDistrict]);

  // ✅ 현재 날씨 텍스트 (UI용)
  const weatherDesc = weather?.weather?.[0]?.description || "";
  const { text, icon } = getWeatherLabel(weatherDesc);

  // ✅ 백엔드용 weatherKey
  const weatherKeyForBackend = useMemo(() => {
    const rawMain = weather?.weather?.[0]?.main || "";
    return rawMain.toLowerCase() || "default";
  }, [weather]);

  // ✅ 감정키 (임시)
  const emotionKey = "happy";

  // ✅ 추천곡 요청
  const {
    data: weatherTracks = [],
    isLoading: weatherLoading,
  } = useWeatherRecommendations(weatherKeyForBackend);

  const {
    data: emotionTracks = [],
    isLoading: emotionLoading,
  } = useEmotionRecommendations(emotionKey);

  // ✅ 미리듣기 재생
  const handlePlayPreview = (previewUrl) => {
    if (!previewUrl) {
      alert("이 곡은 미리듣기를 지원하지 않습니다 😢");
      return;
    }
    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(previewUrl);
    audioRef.current = audio;
    audio.play();
    setPlayingPreview(previewUrl);
    audio.onended = () => setPlayingPreview(null);
  };

  // ✅ 로딩 중
  if (loading)
    return (
      <div css={s.pageWrapper}>
        <LeftSideBarLayout />
        <div css={s.container}>
          <p>🌤️ 날씨 불러오는 중...</p>
        </div>
      </div>
    );

  // ✅ 날씨 정보 없음
  if (!weather || !weather.main)
    return (
      <div css={s.pageWrapper}>
        <LeftSideBarLayout />
        <div css={s.container}>
          <p>❌ 날씨 정보를 불러올 수 없습니다 😢</p>
        </div>
      </div>
    );

  // ✅ 날짜 포맷팅
  const date = new Date(weather.dt * 1000).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  // ✅ 렌더링
  return (
    <div css={s.pageWrapper}>
      <LeftSideBarLayout />
      <div css={s.container}>
        {/* 왼쪽 영역 (날씨) */}
        <div css={s.leftScroll}>
          <section css={s.todayBox}>
            <div className="date">{date}</div>
            <WeatherLocation
              selectedCity={selectedCity}
              selectedDistrict={selectedDistrict}
              onSelectCity={(city) => {
                setSelectedCity(city);
                setSelectedDistrict("");
              }}
              onSelectDistrict={(district) => setSelectedDistrict(district)}
              onApply={(city, district) => console.log("✅ 적용:", city, district)}
            />
            <div className="main">
              <div className="tempBox">
                <p className="temp">{Math.round(weather.main.temp)}°</p>
                <p className="desc">
                  <span className="icon">{icon}</span>
                  <span>{text}</span>
                </p>
              </div>
            </div>
            <div className="detail">
              <div>🌅 일출 {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</div>
              <div>🌇 일몰 {new Date(weather.sys.sunset * 1000).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</div>
              <div>💧 습도 {weather.main.humidity}%</div>
              <div>🌬️ 바람 {weather.wind.speed} m/s</div>
            </div>
          </section>

          <WeatherHourlyList todayHourly={todayHourly || []} />
          <WeatherList forecast={forecast || []} />
        </div>

        {/* 오른쪽 영역 (추천 섹션) */}
        <div css={s.rightScroll}>
          {/* 날씨 기반 추천 */}
          <section css={s.playlistBox}>
            <div css={s.playlistHeader}>
              <h2>오늘 날씨에 어울리는 곡들 🎵</h2>
              <span css={s.genres} onClick={() => navigate("/mypage")}>
                🎧 관심 장르 편집
              </span>
            </div>
            {weatherLoading ? (
              <p>불러오는 중...</p>
            ) : weatherTracks.length === 0 ? (
              <p>추천된 곡이 없습니다 😢</p>
            ) : (
              <div css={s.moodList}>
                {weatherTracks.map((t, i) => (
                  <div key={i} css={s.moodItem}>
                    <img src={t.image} alt={t.name} css={s.albumArtSmall} />
                    <p className="title">{t.name}</p>
                    <p className="artist">{t.artist}</p>
                    <button
                      css={s.playButton}
                      disabled={!t.preview}
                      onClick={() => handlePlayPreview(t.preview)}
                    >
                      {!t.preview ? "미리듣기 없음 😢" : playingPreview === t.preview ? "⏸ 정지" : "▶ 재생"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 감정 기반 추천 */}
          <section css={s.moodBox}>
            <h2>최근 ‘{emotionKey}’했던 당신을 위한 멜로디 🎧</h2>
            {emotionLoading ? (
              <p>로딩 중...</p>
            ) : emotionTracks.length === 0 ? (
              <p>추천된 트랙이 없습니다 😢</p>
            ) : (
              <div css={s.moodList}>
                {emotionTracks.map((t, i) => (
                  <div key={i} css={s.moodItem}>
                    <img src={t.image} alt={t.name} css={s.albumArtSmall} />
                    <p className="title">{t.name}</p>
                    <p className="artist">{t.artist}</p>
                    <button
                      css={s.playButton}
                      disabled={!t.preview}
                      onClick={() => handlePlayPreview(t.preview)}
                    >
                      {!t.preview ? "미리듣기 없음 😢" : playingPreview === t.preview ? "⏸ 정지" : "▶ 재생"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
