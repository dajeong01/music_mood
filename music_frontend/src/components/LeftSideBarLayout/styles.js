import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 240px;
  height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
  border-right: 1px solid #e1e1e1;
  font-family: "Gamja Flower", "Segoe UI", sans-serif;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
`;

export const logoBox = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 56px;
  width: 100%;

  h1 {
    font-size: 26px;
    font-weight: 600;
    color: #7a8c43;
    letter-spacing: 0.5px;
  }
`;

export const logoImg = css`
  width: 20rem;
  height: auto;
  object-fit: contain;
  margin-bottom: 10px;
`;

export const menuList = css`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

export const menuItem = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: 17px;
  color: #444;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-weight: 500;

  svg {
    color: #555;
    stroke-width: 1.8;
    flex-shrink: 0;
    transition: all 0.25s ease;
  }

  &:hover {
    background: #eaf0ff;
    color: #2c56d2;

    svg {
      color: #2c56d2;
    }
  }

  span {
    font-weight: 600;
    letter-spacing: 0.2px;
  }
`;
