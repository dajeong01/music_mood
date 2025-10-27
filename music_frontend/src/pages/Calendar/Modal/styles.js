/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const theme = {
  bg: "#f8f5f2",
  bgCard: "#fffdf9",
  bgHover: "#f6efe9",
  textPrimary: "#5d4037",
  textSecondary: "#7a6e6a",
  textDisabled: "#b0a49f",
  line: "#f3eeea",
  shadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  happy: "#fde68a",
  sad: "#aee5ff",
  angry: "#ffc1c1",
  other: "#e5e7eb",
  excited: "#fecdd3",
  tired: "#dbeafe",
};

// --- Modal Layout ---
export const overlay = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 1rem;
`;

export const modalCard = css`
  background: ${theme.bgCard};
  border-radius: 25px;
  box-shadow: ${theme.shadow};
  width: 100%;
  max-width: 500px;
  padding: 30px;
  animation: fadeIn 0.25s ease-out forwards;

  @keyframes fadeIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// --- Header ---
export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

export const title = css`
  font-family: "Gamja Flower", sans-serif;
  font-size: 1.8rem;
  color: ${theme.textPrimary};
`;

export const closeBtn = css`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${theme.bgHover};
  color: ${theme.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #e0d9d3;
    color: ${theme.textPrimary};
  }
`;

// --- Sections ---
export const section = css`
  margin-bottom: 30px;
`;

export const sectionTitle = css`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.textPrimary};
  margin-bottom: 15px;
`;

// --- Emotion List ---
export const emotionList = css`
  display: flex;
  justify-content: space-around;
  gap: 8px;
`;

export const emotionItem = ({ isSelected, emotion }) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 10px 5px;
  border-radius: 12px;
  border: 2px solid transparent;
  flex-grow: 1;
  transition: all 0.2s ease;

  ${isSelected &&
  `
    border-color: ${
      theme[emotion] || theme.happy
    };
    background-color: #fffaf0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  `}
`;

export const emotionIcon = css`
  font-size: 2rem;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.15);
  }
`;

export const emotionLabel = css`
  font-size: 0.9rem;
  color: ${theme.textSecondary};
`;

// --- Textarea ---
export const textarea = css`
  width: 100%;
  min-height: 140px;
  padding: 15px;
  border: 1px solid ${theme.line};
  border-radius: 12px;
  background: ${theme.bgHover};
  font-family: 'Pretendard', sans-serif;
  font-size: 1.5rem;
  color: ${theme.textPrimary};
  resize: vertical;
  line-height: 1.6;
  box-sizing: border-box;
  outline: none;
  transition: 0.2s;

  &::placeholder {
    color: ${theme.textDisabled};
  }

  &:focus {
    border-color: #d4b996;
    background: white;
    box-shadow: 0 0 0 3px rgba(212, 185, 150, 0.2);
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d4b996;
    border-radius: 8px;
  }
`;

// --- Footer ---
export const footer = css`
  display: flex;
  justify-content: flex-end;
`;

export const saveButton = css`
  background: ${theme.textPrimary};
  color: ${theme.bgCard};
  font-weight: 600;
  font-size: 1.2rem;
  padding: 12px 25px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #422d26;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;
