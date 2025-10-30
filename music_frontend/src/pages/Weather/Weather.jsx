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

// ✅ Spotify 관련
import { reqGetUserGenres } from "../../api/Spotify/UserGenreApi";
import { useEmotionTracks, useWeatherTracks } from "../../queries/Spotify/useSpotifyQueries";

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
        // 백엔드에서 body 대신 data로 오는 케이스 방어
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

  // ✅ UI용 이모지/문구
  const { text, icon } = getWeatherLabel(weatherDesc);

  // ✅ 백엔드에 보낼 날씨 키 (중요!!)
  //    OpenWeatherMap의 main 값을 그대로 사용하고, 우리가 가진 매핑 키에 맞게 소문자로 변환
  //    ex) "Clear" -> "clear", "Clouds" -> "clouds", "Rain" -> "rain"
  const weatherKeyForBackend = useMemo(() => {
    const rawMain = weather?.weather?.[0]?.main || ""; // Clear / Clouds / Rain ...
    const key = rawMain.toLowerCase(); // "clear" / "clouds" / "rain" ...
    // 혹시라도 빈 값이면 fallback "default"
    return key || "default";
  }, [weather]);

  // ✅ 날씨 기반 트랙 (곡 단위) - 이제 항상 실제 날씨 키로 요청함
  console.log("☁ weather.weather[0].main =", weather?.weather?.[0]?.main);
  console.log("☁ weatherKeyForBackend (프론트 → 백) =", weatherKeyForBackend);

  const { data: weatherTracks = [], isLoading: weatherLoading } = useWeatherTracks(weatherKeyForBackend);

  // ✅ 감정 기반 트랙 (임시 감정: happy)
  const emotionKey = "happy";
  const { data: emotionData, isLoading: emotionLoading } = useEmotionTracks(emotionKey);
  const emotionTracks = Array.isArray(emotionData)
  ? emotionData
  : emotionData?.body || [];

  // ✅ 30초 미리듣기 재생
  const handlePlayPreview = (previewUrl) => {
    if (!previewUrl) {
      alert("이 곡은 미리듣기를 지원하지 않습니다 😢");
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

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
              onApply={(city, district) => {
                console.log("✅ 적용:", city, district);
              }}
            />

            {/* 메인 날씨 */}
            <div className="main">
              <div className="tempBox">
                <p className="temp">{Math.round(weather.main.temp)}°</p>
                <p className="desc">
                  <span className="icon">{icon}</span>
                  <span>{text}</span>
                </p>
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="detail">
              <div>🌅 일출 {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</div>
              <div>🌇 일몰 {new Date(weather.sys.sunset * 1000).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</div>
              <div>💧 습도 {weather.main.humidity}%</div>
              <div>🌬️ 바람 {weather.wind.speed} m/s</div>
            </div>
          </section>

          {/* 시간대별 예보 */}
          <WeatherHourlyList todayHourly={todayHourly || []} />

          {/* 주간 예보 */}
          <WeatherList forecast={forecast || []} />
        </div>

        {/* 오른쪽 영역 (Spotify) */}
        <div css={s.rightScroll}>
          {/* 날씨 기반 추천 곡 */}
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
                    <button css={s.playButton} disabled={!t.preview} onClick={() => handlePlayPreview(t.preview)}>
                      {!t.preview ? "미리듣기 없음 😢" : playingPreview === t.preview ? "⏸ 정지" : "▶ 재생"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 감정 기반 트랙 */}
          <section css={s.moodBox}>
            <h3>최근 ‘{emotionKey}’했던 당신을 위한 멜로디 🎧</h3>
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
                      disabled={!t.preview} // ✅ 미리듣기 없으면 비활성화
                      onClick={() => t.preview && handlePlayPreview(t.preview)}
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
