/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// --- 🎨 테마 색상 ---
export const theme = {
  bg: "#f8f5f2", // 전체 배경
  bgCard: "#fffdf9", // 카드 배경
  bgHover: "#f6efe9", // hover 배경
  bgToday: "#fff5e4", // 오늘 날짜 강조
  textPrimary: "#5d4037", // 진한 갈색
  textSecondary: "#7a6e6a", // 중간 갈색
  textDisabled: "#b0a49f", // 비활성 텍스트
  line: "#f3eeea", // 라인
  shadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
  happy: "#fde68a",
  sad: "#aee5ff",
  angry: "#ffc1c1",
  other: "#e5e7eb",
};

// --- 📦 전체 페이지 레이아웃 ---
export const pageWrapper = css`
  display: flex;
  height: 100vh;
  background: ${theme.bg};
  font-family: 'Pretendard', 'M PLUS Rounded 1c', sans-serif;
`;

// --- 메인 영역 (달력 + 리스트) ---
export const mainContent = css`
  flex: 1;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 30px;
  padding: 30px 40px;
  overflow: hidden;
`;

export const leftColumn = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const rightColumn = css`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
`;

// --- 공통 카드 ---
export const card = css`
  background: ${theme.bgCard};
  border-radius: 25px;
  box-shadow: ${theme.shadow};
  padding: 30px;
`;

// --- 📅 캘린더 카드 ---
export const calendarHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

export const calendarTitle = css`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.textPrimary};
  font-family: "Gamja Flower", sans-serif;
`;

export const navButton = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.line};
  background: transparent;
  color: ${theme.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: ${theme.bgHover};
    color: ${theme.textPrimary};
  }
`;

export const calendarGrid = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  text-align: center;
`;

export const dayHeader = css`
  font-weight: 600;
  color: ${theme.textSecondary};
  font-size: 1.2rem;
  padding-bottom: 10px;
`;

export const dayHeaderSun = css`
  color: #d9534f;
`;

export const dayHeaderSat = css`
  color: #2563eb;
`;

export const dayCell = ({ inMonth, isToday, isSelected }) => css`
  position: relative;
  aspect-ratio: 2.5 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.2s ease;
  color: ${inMonth ? theme.textPrimary : theme.textDisabled};
  cursor: ${inMonth ? "pointer" : "default"};

  ${inMonth &&
  `
    &:hover {
      background: ${theme.bgHover};
      transform: scale(1.05);
    }
  `}

  ${isToday &&
  `
    background: ${theme.bgToday};
    font-weight: 700;
  `}

  ${isSelected &&
  `
    background: ${theme.textPrimary};
    color: white;
    font-weight: 700;
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  `}
`;

export const emotionIcon = css`
  position: absolute;
  bottom: 6px;
  right: 8px;
  font-size: 1.5rem;
  filter: grayscale(0.3);
`;

// --- 📊 통계 카드 ---
export const statsRow = css`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

export const statCard = css`
  flex: 1;
`;

export const chartTitle = css`
  font-weight: 700;
  color: ${theme.textPrimary};
  font-size: 1.3rem;
  // margin-bottom: px;
`;

export const donutChartWrapper = css`
  position: relative;
  width: 70px;
  height: 70px;
  margin: 0 auto;
`;

export const donutChart = (stats) => css`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    ${theme.happy} 0% ${stats.happy}%,
    ${theme.sad} ${stats.happy}% ${stats.happy + stats.sad}%,
    ${theme.angry} ${stats.happy + stats.sad}% ${stats.happy + stats.sad + stats.angry}%,
    ${theme.other} ${stats.happy + stats.sad + stats.angry}% 100%
  );
`;

export const donutCenter = css`
  position: absolute;
  inset: 16px;
  background: ${theme.bgCard};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${theme.textPrimary};
  }
`;

export const legend = css`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const legendItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.3rem;
  color: ${theme.textSecondary};

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  span:last-of-type {
    font-weight: 600;
    color: ${theme.textPrimary};
  }
`;

export const legendColor = (type) => css`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${theme[type]};
`;

// --- 😄 이달의 감정 카드 ---
export const monthlyEmotionCard = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const monthlyEmotionIcon = css`
  font-size: 4.4rem;
  margin-bottom: 20px;
`;

export const monthlyEmotionText = css`
  font-size: 1.3rem;
  color: ${theme.textSecondary};
  line-height: 1.6;
`;

export const highlight = (type) => css`
  font-weight: 700;
  color: ${type === "happy"
    ? "#D97706"
    : type === "sad"
    ? "#2563EB"
    : type === "angry"
    ? "#D9534F"
    : theme.textPrimary};
`;

// --- 🎵 플레이리스트 영역 ---
export const playlistCard = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const playlistHeader = css`
  font-weight: 700;
  color: ${theme.textPrimary};
  font-size: 1.4rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const playlistSubheader = css`
  font-size: 1.3rem;
  color: ${theme.textSecondary};
  margin-bottom: 20px;
`;

export const playlistScroll = css`
  flex: 1;
  overflow-y: auto;
  margin-right: -15px;
  padding-right: 15px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d4b996;
    border-radius: 8px;
  }
`;

export const playlist = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const playlistItem = css`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 5px;
  border-radius: 12px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.bgHover};
    cursor: pointer;
  }
`;

export const albumArt = css`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 1rem;
`;

export const songInfo = css`
  flex-grow: 1;
  min-width: 0;
`;

export const songTitle = css`
  font-weight: 600;
  color: ${theme.textPrimary};
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const songArtist = css`
  font-size: 1rem;
  color: ${theme.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const songTime = css`
  font-size: 1rem;
  color: ${theme.textDisabled};
  font-weight: 500;
`;

// --- ✏️ 일기 없음 상태 ---
export const emptyStateCard = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const emptyIcon = css`
  font-size: 4rem;
  margin-bottom: 16px;
`;

export const emptyTitle = css`
  font-weight: 700;
  color: ${theme.textPrimary};
  font-size: 1.6rem;
  margin-bottom: 8px;
`;

export const emptyText = css`
  font-size: 1.3rem;
  color: ${theme.textSecondary};
  line-height: 1.6;
  max-width: 280px;
`;

export const emptyButton = css`
  margin-top: 24px;
  background: ${theme.bgToday};
  color: ${theme.textPrimary};
  font-weight: 600;
  font-size: 1rem;
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #fde68a;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

// --- 🌙 사이드바 ---
export const sidebar = css`
  width: 240px;
  height: 100vh;
  padding: 32px 20px;
  background-color: ${theme.bgCard};
  border-right: 1px solid ${theme.line};
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
`;

export const logoBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 56px;
  cursor: pointer;
`;

export const menuList = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const menuItem = ({ isActive }) => css`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  font-size: 17px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-weight: 500;
  color: ${isActive ? theme.textPrimary : theme.textSecondary};
  background-color: ${isActive ? theme.bgToday : "transparent"};

  svg {
    stroke-width: 1.5;
    flex-shrink: 0;
    color: ${isActive ? theme.textPrimary : "#888"};
  }

  span {
    font-weight: ${isActive ? "700" : "500"};
  }

  &:hover {
    background: ${theme.bgHover};
    color: ${theme.textPrimary};
    svg {
      color: ${theme.textPrimary};
    }
  }
`;

export const sidebarSpacer = css`
  flex-grow: 1;
`;
