import { css } from "@emotion/react";

export const pageWrapper = css`
  display: flex;
  background: #f8f5f2;
  width: 100%;
  min-height: 100vh;
`;

export const container = css`
  flex: 1;
  padding: 40px 60px;
`;

export const title = css`
  font-size: 40px;
  font-weight: bold;
  color: #5d4037;
  font-family: 'Gamja Flower', sans-serif;
`;

export const subtitle = css`
  margin-top: 5px;
  color: #7a6e6a;
  font-size: 15px;
`;

export const grid = css`
  margin-top: 35px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 24px;
`;

export const newPlaylistCard = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px;
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

export const plusIcon = css`
  font-size: 35px;
  font-weight: bold;
  color: #5d4037;
`;

export const newText = css`
  margin-top: 6px;
  color: #7a6e6a;
  font-weight: 600;
`;

export const card = css`
  border-radius: 14px;
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

export const cover = css`
  background: #f6efe9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

export const cardBody = css`
  padding: 14px;
`;

export const cardTitle = css`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  line-height: 1.2;
`;

export const cardCount = css`
  font-size: 13px;
  color: #7a6e6a;
  margin-top: 4px;
`;
