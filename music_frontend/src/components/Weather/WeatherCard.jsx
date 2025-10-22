/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getWeatherLabel } from "../../utils/weatherUtils";

export default function WeatherCard({ date, min, max, description }) {
  const { text, icon, color } = getWeatherLabel(description);

  return (
    <div css={cardBox(color)}>
      <div className="day">
        {new Date(date).toLocaleDateString("ko-KR", { weekday: "short" })}
      </div>
      <div className="icon">{icon}</div>
      <p css={tempBox}>
        <span css={maxTemp}>{Math.round(max)}°</span>
        <span css={divider}> / </span>
        <span css={minTemp}>{Math.round(min)}°</span>
      </p>
      <p className="desc">{text}</p>
    </div>
  );
}

/* ---------------- 🎨 Styles ---------------- */
const cardBox = (bgColor) => css`
  flex: 1;
  background: ${bgColor}15; /* 배경은 살짝 투명 */
  border: 1px solid rgba(0, 0, 0, 0.05); /* 💡 아주 은은한 회색 테두리 */
  border-radius: 20px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 4px 12px rgba(0, 0, 0, 0.06); /* 💡 그림자도 살짝 강화 */
  padding: 16px 8px;
  text-align: center;
  transition: all 0.25s ease;
  min-width: 100px;
  background-clip: padding-box;

  &:hover {
    transform: translateY(-3px); /* 살짝 떠오르는 효과 */
    box-shadow:
      0 3px 6px rgba(0, 0, 0, 0.08),
      0 6px 14px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.08);
  }

  .day {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 6px;
  }

  .icon {
    font-size: 28px;
    margin-bottom: 6px;
  }

  .desc {
    font-size: 13px;
    color: #444;
  }
`;
const tempBox = css`
  margin: 4px 0 8px 0;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

const maxTemp = css`
  color: #ff5a36; /* 🔥 따뜻한 오렌지톤 (최고기온) */
  font-weight: 600;
`;

const divider = css`
  color: #777;
  margin: 0 3px;
`;

const minTemp = css`
  color: #2f6bff; /* ❄️ 시원한 파랑톤 (최저기온) */
  font-weight: 500;
`;
