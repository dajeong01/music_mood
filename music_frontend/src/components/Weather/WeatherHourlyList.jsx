/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getWeatherLabel } from "../../utils/weatherUtils";

export default function WeatherHourlyList({ todayHourly }) {
  return (
    <section css={hourlyBox}>
      <h3>이후 시간대별 날씨</h3>
      <div css={hourlyList}>
        {todayHourly.map((h, i) => {
          const { text, icon, color } = getWeatherLabel(h.description);
          return (
            <div key={i} css={hourlyCard(color)}>
              <p className="time">{h.time}</p>
              <div className="icon">{icon}</div>
              <p className="temp">{h.temp}°</p>
              <p className="desc">{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const hourlyBox = css`
  width: 100%;
  max-width: 680px;
  margin: 0 auto 10px;
  text-align: center;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }
`;

const hourlyList = css`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 6px;
`;

const hourlyCard = (bgColor) => css`
  flex: 1;
  min-width: 100px;
  background: ${bgColor}15; /* 살짝 더 투명하게 */
  border: 1px solid rgba(0, 0, 0, 0.05); /* 💡 부드러운 테두리 */
  border-radius: 20px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 4px 10px rgba(0, 0, 0, 0.06); /* 💡 더 깊은 입체감 */
  text-align: center;
  padding: 14px 8px;
  transition: all 0.25s ease;
  background-clip: padding-box;

  &:hover {
    transform: translateY(-3px); /* hover 시 살짝 떠오름 */
    box-shadow:
      0 3px 6px rgba(0, 0, 0, 0.08),
      0 6px 14px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.08);
  }

  .time {
    font-weight: 600;
    color: #333;
    font-size: 14px;
    margin-bottom: 6px;
  }

  .icon {
    font-size: 28px;
    margin: 6px 0;
  }

  img {
    width: 40px;
    height: 30px;
    margin: 0 auto;
  }

  .temp {
    font-weight: 700;
    color: #ff7043; /* 따뜻한 오렌지톤 (기온) */
    margin-top: 6px;
    font-size: 15px;
  }

  .desc {
    font-size: 13px;
    color: #666;
    margin-top: 4px;
  }
`;
