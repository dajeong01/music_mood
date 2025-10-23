import { css } from "@emotion/react";

export const pageWrapper = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: #f8f5f2;
  font-family: "Pretendard", sans-serif;
`;

export const scrollWrapper = css`
  flex: 1;
  overflow-y: auto;
  padding: 40px 50px;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d4b996;
    border-radius: 8px;
    border: 2px solid #f8f5f2;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const header = css`
  margin-bottom: 30px;
  h1 {
    font-family: "Gamja Flower", sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #5d4037;
  }
`;

// ⭐ 2단 그리드 레이아웃
export const mainGrid = css`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 30px;
  align-items: start;
`;

export const gridColumnLeft = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const gridColumnRight = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// 공통 카드
export const card = css`
  background: #fffdf9;
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
`;

export const sectionTitle = css`
  font-size: 1.4rem;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const subTitle = css`
  font-size: 1.15rem;
  font-weight: 600;
  color: #4a3c35;
  margin-bottom: 15px;
`;

// 프로필 카드
export const profileCard = css`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const profileImg = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fdf7e6;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
`;

export const profileInfo = css`
  flex-grow: 1;
`;

export const profileHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const nickname = css`
  font-size: 1.8rem;
  font-weight: 700;
  color: #4a3c35;
`;

export const editButton = css`
  background: #fdfaf7;
  border: 1px solid #e6e3df;
  color: #7a6e6a;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  &:hover {
    background: #f6efe9;
    border-color: #d4b996;
  }
`;

export const mood = css`
  font-size: 1.1rem;
  color: #7a6e6a;
  font-style: italic;
  margin-bottom: 10px;
`;

export const email = css`
  font-size: 0.9rem;
  color: #b0a49f;
`;

// 감정 통계
export const statsGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const statItem = css`
  background: #fdfaf7;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

export const statLabel = css`
  font-size: 0.95rem;
  color: #8b7d76;
  text-align: center;
  line-height: 1.3;
`;

export const statValue = css`
  font-size: 1.3rem;
  font-weight: 600;
  color: #5d4037;
  display: flex;
  align-items: center;
  gap: 6px;
`;

// 감정 히트맵
export const heatmapSection = css`
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid #f3eeea;
`;

export const heatmapGrid = css`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 4px;
  height: 140px;
`;

export const heatmapDay = (level) => css`
  width: 100%;
  height: 16px;
  border-radius: 3px;
  background-color: ${{
    1: "#fff5e4",
    2: "#ffe4b0",
    3: "#ffd27c",
    sad: "#dbeafe",
    angry: "#fee2e2",
  }[level] || "#f3eeea"};
`;

// 나의 멜로디
export const subSection = css`
  &:not(:last-of-type) {
    margin-bottom: 30px;
  }
`;

export const tagList = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const tagItem = css`
  background: #fff5e4;
  color: #5d4037;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 1.4rem;
  font-weight: 500;
`;

export const playlistGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 15px;
`;

export const playlistItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  span {
    font-size: 0.95rem;
    color: #4a3c35;
    font-weight: 500;
  }
`;

export const playlistCover = css`
  width: 100%;
  position: relative;
  background: #fdf7e6;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
  .emoji {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5rem;
  }
`;

// 계정 관리
export const accountList = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const accountItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fdfaf7;
  padding: 18px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 500;
  color: #4a3c35;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  &:hover {
    background: #f6efe9;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  }
  span:first-of-type {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  span:last-of-type {
    color: #b0a49f;
  }
`;

export const dangerItem = css`
  color: #d9534f;
  &:hover {
    background: #fff1f2;
    color: #d9534f;
  }
`;
