/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

/* 전체 레이아웃 */
export const pageWrapper = css`
  display: flex;
  background: #f8f5f2;
  width: 100%;
  min-height: 100vh;
`;

/* 내용 영역 (사이드바 오른쪽 영역) */
export const container = css`
  flex: 1;
  padding: 50px 60px;
  overflow-y: auto;
`;

/* 제목 */
export const title = css`
  font-size: 40px;
  font-weight: bold;
  color: #5d4037;
  font-family: "Gamja Flower", sans-serif;
`;

export const subtitle = css`
  margin-top: 6px;
  color: #7a6e6a;
  font-size: 15px;
`;

/* 그리드 영역 */
export const grid = css`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 22px;
`;

/* 새 플레이리스트 카드 */
export const newCard = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 16px;
  border: 2px dashed #e0d9d3;
  background: #f6efe9;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: #fff5e4;
    border-color: #5d4037;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    transform: translateY(-4px);
  }
`;

export const plus = css`
  font-size: 35px;
  color: #5d4037;
  font-weight: bold;
`;

export const newText = css`
  margin-top: 6px;
  font-size: 15px;
  color: #7a6e6a;
  font-weight: 600;
`;

/* 플레이리스트 카드 */
export const card = css`
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: #fffdf9;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: 0.25s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }
`;

/* 앨범 커버 (이모지 영역) */
export const cover = css`
  background: #f6efe9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

export const cardBody = css`
  padding: 14px;
`;

export const cardTitle = css`
  font-size: 17px;
  font-weight: 700;
  color: #5d4037;
`;

export const cardCount = css`
  font-size: 13px;
  color: #7a6e6a;
  margin-top: 4px;
`;

