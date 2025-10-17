/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

//
// 🧭 Header
//
export const header = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 3rem;
  background-color: #ffffff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const logoContainer = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  user-select: none;
`;

export const logoImage = css`
  height: 38px;
  width: auto;
  border-radius: 6px;
`;

export const logoText = css`
  font-size: 1.9rem;
  font-weight: 700;
  color: #6c7325;
  letter-spacing: 0.4px;
`;

export const nav = css`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

export const menu = css`
  display: flex;
  list-style: none;
  gap: 3rem;

  & > li > a {
    font-size: 1.15rem;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    position: relative;
    transition: all 0.25s ease;

    &:hover {
      color: #6c7325;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0%;
      height: 2px;
      background-color: #6c7325;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

export const icons = css`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const icon = css`
  font-size: 1.6rem;
  cursor: pointer;
  color: #4b5563;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: scale(1.15);
    color: #6c7325;
  }
`;

export const profileImgBox = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #6c7325;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

//
// 🧱 Left Sidebar Layout
//
export const layout = css`
  display: flex;
  height: 100vh;
`;

export const leftBox = css`
  width: 260px;
  background-color: #fafafa;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 1.5rem;
`;

export const sidebarHeader = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
`;

export const sidebarLogo = css`
  width: 70px;
  height: auto;
  margin-bottom: 0.5rem;
`;

export const sidebarTitle = css`
  font-size: 1.6rem;
  font-weight: 700;
  color: #6c7325;
  text-align: center;
`;

export const buttonContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;

  & > button,
  & > a {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    font-size: 1.05rem;
    font-weight: 500;
    color: #374151;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease;

    &:hover {
      background-color: rgba(108, 115, 37, 0.08);
      color: #6c7325;
    }

    svg {
      font-size: 1.3rem;
    }
  }
`;

export const bottomSection = css`
  margin-top: auto;
  text-align: center;
  font-size: 0.95rem;
  color: #9ca3af;

  & > a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: #6c7325;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.25s ease;

    &:hover {
      color: #4a501a;
    }
  }
`;
