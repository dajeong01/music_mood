import { css } from "@emotion/react";

export const sidebarContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 230px;
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #eaeaea;
  padding: 20px 18px;
`;

export const logoBox = css`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
`;

export const logoImage = css`
  width: 36px;
  height: 36px;
  border-radius: 10px;
`;

export const logoTitle = css`
  font-size: 18px;
  font-weight: 700;
  color: #2c2c2c;
`;

export const menuList = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: #333;
  font-size: 15px;
`;

export const menuItem = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #f7f7f7;
  }

  span {
    font-size: 15px;
  }
`;

export const userSection = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
`;

export const userIcon = css`
  background-color: #f0f0f0;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #555;
`;

export const username = css`
  font-size: 14px;
  color: #555;
`;
