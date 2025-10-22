/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import WeatherCard from "./WeatherCard";

export default function WeatherList({ forecast }) {
  // 1) 입력이 배열이 아니면 적절히 변환
  const items = Array.isArray(forecast)
    ? forecast
    : Array.isArray(forecast?.list)
      ? groupToDaily(forecast.list)   // 2.5/forecast 원본 -> 일자별 배열로 변환
      : [];

  if (items.length === 0) {
    return (
      <section css={forecastBox}>
        <h3>5일간의 날씨 예보</h3>
        <div css={forecastList}>로딩 중 혹은 예보 데이터 없음</div>
      </section>
    );
  }

  return (
    <section css={forecastBox}>
      <h3>5일간의 날씨 예보</h3>
      <div css={forecastList}>
        {items.map((item, i) => (
          <WeatherCard
            key={i}
            date={item.date}
            min={Math.round(item.min)}
            max={Math.round(item.max)}
            description={item.weather?.description}
            icon={item.weather?.icon}
          />
        ))}
      </div>
    </section>
  );
}

/** 3시간 간격 리스트 -> 일자별 {date, min, max, weather} 배열로 */
function groupToDaily(list) {
  const byDate = {};
  list.forEach((it) => {
    const date = it.dt_txt.split(" ")[0];
    const t = it.main.temp;
    if (!byDate[date]) {
      byDate[date] = {
        date,
        min: t,
        max: t,
        weather: { ...it.weather[0] }, // 아이콘/설명 기본값
      };
    } else {
      byDate[date].min = Math.min(byDate[date].min, t);
      byDate[date].max = Math.max(byDate[date].max, t);
    }
    // 정오 데이터가 있으면 그 날을 대표하는 아이콘/설명으로 교체
    if (it.dt_txt.includes("12:00:00")) {
      byDate[date].weather = { ...it.weather[0] };
    }
  });
  return Object.values(byDate).slice(0, 5);
}

const forecastBox = css`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  text-align: center;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 14px;
  }
`;

const forecastList = css`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
  width: 100%;
`;
