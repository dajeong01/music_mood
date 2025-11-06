import { css } from "@emotion/react";

export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const modal = css`
  background: #fffdf9;
  border-radius: 20px;
  width: 90%;
  max-width: 380px;
  padding: 22px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  animation: fadeUp 0.2s ease-out;
  position: relative;
  @keyframes fadeUp {
    from { opacity: 0; transform: scale(.95); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

export const closeBtn = css`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f6efe9;
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
`;

export const albumArt = css`
  width: 100%;
  border-radius: 16px;
  margin-bottom: 18px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
`;

export const titleRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const textArea = css`
  flex: 1;
`;

export const title = css`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  color: #5d4037;
`;

export const artist = css`
  font-size: 1rem;
  margin-top: 4px;
  color: #7a6e6a;
`;

export const favoriteIcon = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.12);
    transition: 0.15s ease;
  }
`;


export const previewBox = css`
  margin: 20px 0;
`;

export const previewPlaceholder = css`
  background: #282828;
  color: white;
  padding: 14px;
  text-align: center;
  border-radius: 12px;
`;

export const actionBtns = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const btn = css`
  padding: 12px;
  border: 1px solid #e8ddd5;
  border-radius: 10px;
  background: #f7f2ed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: #efe7de;
  }
`;

export const logoIcon = css`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

export const platformIcon = css`
  width: 100px;
  height: 15px;
  margin-right: 6px;
  object-fit: contain;
`;
