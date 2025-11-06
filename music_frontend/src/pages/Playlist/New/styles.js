import { css } from "@emotion/react";

export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

export const modalCard = css`
  width: 95%;
  max-width: 600px;
  background: #fffdf9;
  padding: 30px;
  border-radius: 26px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
  transform: scale(.95);
  opacity: 0;
  animation: fadeIn .22s ease-out forwards;

  @keyframes fadeIn {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const modalHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const modalTitle = css`
  font-family: 'Gamja Flower', sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  color: #5d4037;
`;

export const section = css`
  margin-bottom: 25px;
`;

export const sectionTitle = css`
  font-size: 1.3rem;
  font-weight: 600;
  color: #4a3c35;
  margin-bottom: 10px;
`;

export const iconPreviewWrapper = css`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const iconPreview = css`
  width: 100px;
  height: 100px;
  font-size: 3rem;
  border-radius: 15px;
  background: #f6efe9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5d4037;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.08);
`;

export const emojiGrid = css`
  display: grid;
  margin-top: 2rem;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`;

export const emojiItem = css`
  aspect-ratio: 1/1;
  font-size: 2.4rem;
  border-radius: 10px;
  border: 2px solid #f3eeea;
  background: #fffdf9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background: #faf3ea;
    transform: translateY(-2px);
  }
`;

export const selectedEmoji = css`
  border-color: #d4b996;
  background: #fff5e4;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

export const input = css`
  width: 100%;
  height: 48px;
  border-radius: 10px;
  padding: 0 14px;
  border: 1px solid #f3eeea;
  background: #f6efe9;
  font-size: 1.5rem;
  margin-top: 5px;
  font-family: Pretendard;

  &::placeholder {
    color: #b7aba3;
  }

  &:focus {
    outline: none;
    background: #fff;
    border-color: #d4b996;
    box-shadow: 0 0 0 2px rgba(212,185,150,0.2);
  }
`;

export const footer = css`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
`;

export const btnSecondary = css`
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  background: #f2ece6;
  color: #8a807b;
  border: 1px solid #e6ddd6;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background: #e6dbd3;
    color: #5d4037;
  }
`;

export const btnPrimary = css`
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  background: #5d4037;
  color: #fff;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background: #4a332c;
    transform: translateY(-1px);
  }
`;
