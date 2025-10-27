import { css } from "@emotion/react";

export const sidebar = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 240px;
  height: 100vh;
  background-color: #fffcf8;
  border-right: 1px solid #f2ede8;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.02);
  padding: 36px 22px;
  font-family: "Pretendard", sans-serif;
`;

export const logoBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  cursor: pointer;
`;

export const logoText = css`
  font-family: "Gamja Flower", sans-serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: #5d4037;
  user-select: none;
`;

export const menuList = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const sidebarSpacer = css`
  flex-grow: 1;
`;

export const menuItem = ({ isActive }) => css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 15px;
  font-size: 16.5px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  color: ${isActive ? "#5D4037" : "#8b8b8b"};
  background-color: ${isActive ? "#FFF5E4" : "transparent"};
  font-weight: ${isActive ? "700" : "500"};

  svg {
    color: ${isActive ? "#5D4037" : "#a8a8a8"};
    stroke-width: 1.7;
    transition: color 0.2s ease;
  }

  &:hover {
    background-color: #fff9f2;
    color: #5d4037;
    svg {
      color: #5d4037;
    }
  }
`;
