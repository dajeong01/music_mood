import { css } from "@emotion/react";

export const overlay = css`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 2000;
`;

export const modalCard = css`
  background: #fffdf9;
  width: 95%;
  max-width: 800px;
  height: 100vh;
  max-height: 850px;
  padding: 26px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  animation: fadeIn .2s ease-out forwards;
  transform: scale(.95);
  opacity: 0;

  @keyframes fadeIn {
    to { transform: scale(1); opacity: 1; }
  }
`;

export const modalHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
`;

export const headerLeft = css`
  display: flex;
  align-items: center;
  gap: 16px; /* 이모지와 텍스트 간격 */
`;

export const playlistIcon = css`
  width: 70px;
  height: 70px;
  border-radius: 15px;
  background: #f6efe9;
  font-size: 2.8rem;
  display: flex; align-items: center; justify-content: center;
`;

export const playlistInfo = css`
  flex: 1;
`;

export const playlistTitle = css`
  font-family: 'Gamja Flower', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #5d4037;
  margin: 0;
  line-height: 1.2;
  margin-top: 10px;
`;

export const playlistCount = css`
  font-size: 1.5rem;
  color: #7a6e6a;
  margin-top: 10px;
`;

export const closeButton = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f6f6f9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;

  &:hover {
    background: #e0d9d3;
  }
`;

/* Track List Area */
export const trackScroll = css`
  flex: 1;
  overflow-y: auto;
  padding-right: 5px;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb {
    background: #d4b996;
    border-radius: 6px;
  }
`;

export const trackList = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const trackItem = css`
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 10px;
  gap: 6px;
  cursor: pointer;

  &:hover {
    background: #f6efe9;
  }
`;

export const albumArt = css`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 1rem;
`;

export const trackInfo = css`
  flex: 1;
  min-width: 0;
`;

export const trackTitle = css`
  font-weight: 600;
  color: #5d4037;
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const trackArtist = css`
  font-size: 1rem;
  color: #7a6e6a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const trackActions = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const iconButton = css`
  color: #b0a49f;
  cursor: pointer;
  transition: .2s;

  &:hover {
    color: #5d4037;
  }
`;
