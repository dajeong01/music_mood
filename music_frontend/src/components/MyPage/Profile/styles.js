import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const displayMode = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const editMode = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const nicknameText = css`
  font-size: 1.6rem;
  font-weight: 700;
  color: #4a3c35;
`;

export const nicknameInput = css`
  font-size: 1.3rem;
  padding: 6px 10px;
  border: 1px solid #d4b996;
  border-radius: 6px;
  outline: none;
  color: #4a3c35;
`;

export const checkButton = css`
  background: #fff5e4;
  border: 1px solid #e6c7a7;
  color: #5d4037;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.2s ease;

  &:hover {
    background: #fbe6cc;
  }
`;

export const saveButton = css`
  background: #fdfaf7;
  border: 1px solid #d4b996;
  color: #5d4037;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.2s ease;

  &:hover {
    background: #f6efe9;
  }
`;

export const disabled = css`
  opacity: 0.5;
  pointer-events: none;
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

  &:hover {
    background: #f6efe9;
    border-color: #d4b996;
  }
`;

export const message = css`
  font-size: 0.9rem;
  color: #7a6e6a;
  margin-left: 4px;
`;
