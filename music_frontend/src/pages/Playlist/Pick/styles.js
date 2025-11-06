import { css } from "@emotion/react";

export const overlay = css`
  position: fixed;
  top:0; left:0;
  width:100vw; height:100vh;
  background: rgba(0,0,0,0.4);
  display:flex; align-items:center; justify-content:center;
  z-index:3000;
`;

export const modal = css`
  width: 90%;
  max-width: 430px;
  background: #fffdf9;
  border-radius: 18px;
  padding: 20px;
`;

export const title = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const item = css`
  display:flex;
  align-items:center;
  gap:10px;
  padding: 12px;
  border-radius: 12px;
  cursor:pointer;
  &:hover { background:#f6efe9; }
`;

export const emoji = css`
  font-size: 2rem;
`;

export const name = css`
  font-size: 1.5rem;
`;

export const newBtn = css`
  margin-top: 12px;
  width: 100%;
  background:#f6efe9;
  padding:10px;
  border-radius:10px;
`;

export const closeBtn = css`
  margin-top: 10px;
  width:100%;
`;
