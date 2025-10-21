/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import LeftSideBarLayout from "../../components/LeftSideBarLayout/LeftSideBarLayout";
import * as s from "./styles";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const lat = 35.1796;
    const lon = 129.0756;

    // 현재 날씨
    const fetchWeather = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${API_KEY}`
      );
      const data = await res.json();
      setWeather(data);
    };

    // 5일 예보
    const fetchForecast = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${API_KEY}`
      );
      const data = await res.json();

      const grouped = {};
      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(item);
      });

      const daily = Object.keys(grouped).map((date) => {
        const temps = grouped[date].map((t) => t.main.temp);
        const max = Math.max(...temps);
        const min = Math.min(...temps);
        const noon = grouped[date].find((t) => t.dt_txt.includes("12:00:00"));
        return {
          date,
          max,
          min,
          weather: noon ? noon.weather[0] : grouped[date][0].weather[0],
        };
      });

      setForecast(daily.slice(0, 5));
    };

    fetchWeather();
    fetchForecast();
  }, []);

  if (!weather) return <p>로딩 중...</p>;

  const date = new Date(weather.dt * 1000).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div css={s.pageWrapper}>
      <LeftSideBarLayout />
      <div css={s.container}>
        {/* 왼쪽 날씨 영역 */}
        <div css={s.leftScroll}>
          {/* 오늘 날씨 카드 */}
          <section css={s.todayBox}>
            <div className="date">{date}</div>
            <div className="main">
              <div className="tempBox">
                <p className="temp">{Math.round(weather.main.temp)}°</p>
                <p className="desc">{weather.weather[0].description}</p>
              </div>
              <img
                className="icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="날씨 아이콘"
              />
            </div>
            <div className="detail">
              <div>🌅 일출 {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</div>
              <div>🌇 일몰 {new Date(weather.sys.sunset * 1000).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</div>
              <div>💧 습도 {weather.main.humidity}%</div>
              <div>🌬️ 바람 {weather.wind.speed} m/s</div>
            </div>
          </section>

          {/* 5일 예보 */}
          <section css={s.forecastBox}>
            <h3>📆 5일간의 날씨 예보</h3>
            <div className="forecastList">
              {forecast.map((item, i) => (
                <div key={i} className="forecastCard">
                  <p className="day">
                    {new Date(item.date).toLocaleDateString("ko-KR", {
                      weekday: "short",
                    })}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather.icon}.png`}
                    alt="icon"
                  />
                  <div className="temps">
                    <span className="max">{Math.round(item.max)}°</span>
                    <span className="slash">/</span>
                    <span className="min">{Math.round(item.min)}°</span>
                  </div>
                  <p className="desc">{item.weather.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div css={s.rightScroll}>
          <section css={s.playlistBox}>
            <h2>오늘 날씨를 위한 플레이리스트</h2>
            <div css={s.playlistList}>
              {[1, 2, 3, 4].map((i) => (
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

          {/* <section css={s.emotionBox}>
            <div css={s.emotionHeader}>
              <p>오늘의 기분은?</p>
              <div css={s.emotionBtns}>
                <div className="btn">😄</div>
                <div className="btn">😢</div>
                <div className="btn">😠</div>
              </div>
            </div>
          </section> */}

          {/* 🎵 감정 기반 멜로디 */}
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
