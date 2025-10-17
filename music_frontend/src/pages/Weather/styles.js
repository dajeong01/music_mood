import { css } from "@emotion/react";

export const pageWrapper = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: #f8fafc;
`;

export const container = css`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 32px;
  padding: 32px 48px;
  overflow: hidden; /* ✅ 전체는 고정, 내부 스크롤만 가능 */
`;

export const leftScroll = css`
  overflow-y: auto;
  padding-right: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 8px;
  }
`;

export const rightScroll = css`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-right: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 8px;
  }
`;

/* 날씨 카드 */
export const weatherBox = css`
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: white;
  border-radius: 20px;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

/* 이하 부분은 동일한 구성 */
export const weatherHeader = css`
  display: flex;
  flex-direction: column;

  .city {
    font-size: 20px;
    font-weight: 600;
  }
  .date {
    font-size: 14px;
    opacity: 0.85;
  }
`;

export const weatherMain = css`
  text-align: right;

  .temp {
    font-size: 70px;
    font-weight: 700;
    line-height: 1;
  }

  .desc {
    font-weight: 500;
    margin-top: 8px;
  }

  .iconBox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const placeholderBox = css`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
`;

/* 시간대별 날씨 */
export const hourlyBox = css`
  background: #ffffff;
  border-radius: 20px;
  padding: 24px 32px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  h3 {
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16px;
  }
`;

export const hourScroll = css`
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const hourCard = css`
  flex-shrink: 0;
  width: 80px;
  border: 2px solid #bae6fd;
  border-radius: 12px;
  text-align: center;
  padding: 10px 6px;
  background: #f9fafb;

  .time {
    font-size: 12px;
    font-weight: 600;
    color: #0ea5e9;
  }

  .temp {
    font-weight: 700;
    color: #111827;
  }
`;

export const weatherDetail = css`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;

  .label {
    font-size: 13px;
    color: #9ca3af;
  }
  .value {
    font-weight: 700;
    color: #374151;
    margin-top: 4px;
  }
`;

/* 감정 선택 */
export const emotionBox = css`
  background: #ffffff;
  border-radius: 20px;
  padding: 20px 28px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

export const emotionHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: #1f2937;
`;

export const emotionBtns = css`
  display: flex;
  gap: 10px;

  .btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 20px;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
      background: #fef3c7;
    }
  }
`;

/* 플레이리스트 */
export const playlistBox = css`
  background: #ffffff;
  border-radius: 20px;
  padding: 24px 32px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  h2 {
    font-weight: 700;
    font-size: 18px;
    color: #1f2937;
    margin-bottom: 20px;
  }
`;

export const playlistList = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const playItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fafafa;
  border-radius: 12px;
  padding: 10px 14px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }

  .info {
    flex-grow: 1;
    margin-left: 10px;
  }

  .title {
    font-weight: 600;
    color: #111827;
  }
  .artist {
    font-size: 13px;
    color: #6b7280;
  }
  .time {
    font-size: 13px;
    color: #9ca3af;
  }
`;

export const placeholderImg = css`
  width: 60px;
  height: 60px;
  background: #e0e7ff;
  border-radius: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

/* 🎵 감정 기반 추천 멜로디 */
export const moodBox = css`
  background: #ffffff;
  border-radius: 20px;
  padding: 24px 32px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  h3 {
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 20px;
  }
`;

export const moodList = css`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const moodItem = css`
  flex: 1 1 30%;
  min-width: 150px;
  background: ${(props) => props.color || "#fde68a"};
  border-radius: 16px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #111827;
  font-weight: 600;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    background: #fcd34d;
  }

  p {
    margin-top: 8px;
    font-size: 14px;
    color: #4b5563;
  }
`;
