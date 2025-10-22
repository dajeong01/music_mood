/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import LeftSideBarLayout from "../../components/LeftSideBarLayout/LeftSideBarLayout";
import WeatherHourlyList from "../../components/Weather/WeatherHourlyList";
import WeatherList from "../../components/Weather/WeatherList";
import WeatherLocation from "../../components/Weather/WeatherLocation";
import useLocationQuery from "../../queries/Weather/useLocationQuery";
import { getWeatherLabel } from "../../utils/weatherUtils";
import * as s from "./styles";

export default function Weather() {
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem("selectedCity") || "부산광역시";
  });
  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    return localStorage.getItem("selectedDistrict") || "해운대구";
  });

  useEffect(() => {
    if (selectedCity) localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) localStorage.setItem("selectedDistrict", selectedDistrict);
  }, [selectedDistrict]);

  const { coords, weather, forecast, todayHourly, loading } = useLocationQuery(
    selectedCity,
    selectedDistrict
  );

  // ✅ 1️⃣ 로딩 중
  if (loading) return <p>로딩 중...</p>;

  // ✅ 2️⃣ 좌표 또는 날씨 없을 때
  if (!loading && (!coords || !weather || !weather.main)) {
    return (
      <div css={s.pageWrapper}>
        <LeftSideBarLayout />
        <div css={s.container}>
          <div css={s.leftScroll}>
            <section css={s.todayBox}>
              <WeatherLocation
                selectedCity={selectedCity}
                selectedDistrict={selectedDistrict}
                onSelectCity={(city) => {
                  setSelectedCity(city);
                  setSelectedDistrict(""); // ✅ 도시 바뀌면 구 초기화
                }}
                onSelectDistrict={(district) => setSelectedDistrict(district)}
                onApply={(city, district) => {
                  console.log("✅ 적용 버튼 클릭:", city, district);
                }}
              />
              <p>구를 선택해 주세요</p>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // ✅ 3️⃣ 안전하게 값 추출 (weather 존재 확인 후)
  const date = weather?.dt
    ? new Date(weather.dt * 1000).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      })
    : "";

  const { text, icon } = getWeatherLabel(weather?.weather?.[0]?.description);

  return (
    <div css={s.pageWrapper}>
      <LeftSideBarLayout />

      <div css={s.container}>
        <div css={s.leftScroll}>
          <section css={s.todayBox}>
            <div className="date">{date}</div>
            <WeatherLocation
              selectedCity={selectedCity}
              selectedDistrict={selectedDistrict}
              onSelectCity={(city) => {
                setSelectedCity(city);
                setSelectedDistrict(""); // ✅ 도시 변경 시 구 초기화
              }}
              onSelectDistrict={(district) => setSelectedDistrict(district)}
              onApply={(city, district) => {
                console.log("✅ 적용 버튼 클릭:", city, district);
              }}
              
            />

            {/* ✅ 메인 날씨 */}
            <div className="main">
              <div className="tempBox">
                <p className="temp">{Math.round(weather.main.temp)}°</p>
                <p className="desc">
                  <span className="icon">{icon}</span>
                  <span>{text}</span>
                </p>
              </div>
            </div>

            {/* ✅ 상세 정보 */}
            <div className="detail">
              <div>
                🌅 일출{" "}
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                  "ko-KR",
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </div>
              <div>
                🌇 일몰{" "}
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                  "ko-KR",
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </div>
              <div>💧 습도 {weather.main.humidity}%</div>
              <div>🌬️ 바람 {weather.wind.speed} m/s</div>
            </div>
          </section>

          {/* ✅ 시간대별 예보 */}
          <WeatherHourlyList todayHourly={todayHourly || []} />

          {/* ✅ 주간 예보 */}
          <WeatherList forecast={forecast || []} />
        </div>

        {/* ✅ 우측 영역 */}
        <div css={s.rightScroll}>
          <section css={s.playlistBox}>
            <h2>오늘 날씨를 위한 플레이리스트</h2>
            <div css={s.playlistList}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} css={s.playItem}>
                  <div css={s.placeholderImg}>MD</div>
                  <div className="info">
                    <p className="title">노래 제목 {i}</p>
                    <p className="artist">아티스트</p>
                  </div>
                  <span className="time">3:14</span>
                </div>
              ))}
            </div>
          </section>

          {/* ✅ 감정 기반 멜로디 */}
          <section css={s.moodBox}>
            <h3>최근 ‘행복’했던 당신을 위한 멜로디</h3>
            <div css={s.moodList}>
              <div css={s.moodItem} color="#fde68a">
                MD
                <p>기분 좋은 하루</p>
              </div>
              <div css={s.moodItem} color="#bae6fd">
                MD
                <p>Happy Vibe</p>
              </div>
              <div css={s.moodItem} color="#bbf7d0">
                MD
                <p>솜사탕 구름</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
