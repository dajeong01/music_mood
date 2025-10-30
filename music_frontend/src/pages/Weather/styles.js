import { css } from "@emotion/react";

export const pageWrapper = css`
  display: flex;
  min-height: 100vh;
  background: #fffdf9;
  // background: #F7F3E8;
  // background: #FAF7EE;
  // background: #F1F3EE;
  // background: #F9F2F0;
  // background: #F0F3F5;
`;

export const container = css`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 0.9fr; /* 좌/우 2열 */
  gap: 20px;
  padding: 20px;
  overflow: hidden; /* 각 컬럼 내부만 스크롤 */
`;

export const leftScroll = css`
  display: flex;
  flex-direction: column;
  align-items: stretch; /* ✅ 변경 */
  margin-top: 2rem;
`;

export const rightScroll = css`
  overflow-y: auto;
  padding-left: 4px;
  margin-right: 3rem;
`;

export const todayBox = css`
  background: linear-gradient(180deg, #fff9ed, #fff);
  border-radius: 20px;
  padding: 28px 30px; /* ✅ 복원: 여백 넓게 */
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 15px;
  width: 100%;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;

  .date {
    font-size: 17px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }

  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .tempBox .temp {
    font-size: 44px; /* ✅ 다시 커지게 */
    font-weight: 700;
    color: #ff7043;
    line-height: 1;
  }

  /* ✅ 이 부분 수정 */
  .tempBox .desc {
    margin-top: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 16px;
    color: #444;
    font-weight: 500;
    letter-spacing: -0.3px;
    text-align: center;
  }

  .tempBox .desc .icon {
    font-size: 22px;
    line-height: 1;
    transform: translateY(-1px); /* 살짝 올려서 시각 중심 맞추기 */
  }

  .detail {
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px dashed rgba(0, 0, 0, 0.08);
    font-size: 15px;
    color: #555;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 10px;
  }
`;

export const cardStyle = css`
  background: #fffaf5;
  border-radius: 20px;
  padding: 18px 16px;
  text-align: center;
  width: 100px;
  min-height: 150px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  }

  .day {
    font-weight: 600;
    font-size: 15px;
    color: #444;
    margin-bottom: 4px;
  }

  .temps {
    font-size: 14px;
    font-weight: 600;
    margin-top: 8px;

    .max {
      color: #e57373;
    }
    .min {
      color: #64b5f6;
    }
    .slash {
      margin: 0 4px;
      color: #aaa;
    }
  }

  .desc {
    font-size: 13px;
    color: #555;
    margin-top: 6px;
    font-weight: 500;
  }
`;

export const playlistBox = css`
  background: #fffdf9;
  border-radius: 25px;
  padding: 24px 28px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.04);
  margin-bottom: 3rem;
  width: 100%;
  overflow-x: hidden; /* ✅ 자신 내부만 스크롤 가능하게 */
`;

export const playlistHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h2 {
    font-size: 1.35rem;
    font-weight: 700;
    color: #4a3c35;
  }

  span {
    font-size: 0.9rem;
    color: #8d817b;
    cursor: pointer;
    transition: color 0.2s ease;
    &:hover {
      color: #4a3c35;
    }
  }
`;


export const genres = css`
  font-size: 14px;
  color: #888;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #1a0a03ff;
  }
`;

export const playlistList = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const playItem = css`
  display: flex;
  align-items: center;
  gap: 15px;
  background: #fdfaf7;
  border-radius: 18px;
  padding: 12px 18px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  &:hover {
    background: #f6efe9;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .info {
    flex-grow: 1;
    margin-left: 0;
  }

  .title {
    font-weight: 600;
    color: #4a3c35;
    font-size: 1.1rem; /* 제목 글자 크기 증가 */
  }
  .artist {
    font-size: 0.95rem; /* 아티스트 글자 크기 증가 */
    color: #8b7d76;
    margin-top: 4px;
  }
  .time {
    font-size: 0.95rem;
    color: #b0a49f;
    flex-shrink: 0;
  }
`;

export const placeholderImg = css`
  width: 65px;
  height: 65px;
  background: #e6e3df;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #7a6e6a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

/* 🎵 감정 기반 추천 멜로디 */
export const moodBox = css`
  background: #fffdf9;
  border-radius: 25px;
  padding: 24px 28px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.04);
  width: 100%;
  overflow-x: hidden; /* ✅ 자신만 스크롤 */
`;

export const moodList = css`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 24px; /* 카드 간격 조금 더 넓게 */
  padding: 14px 6px 18px 6px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2d2b9;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #fdf8f1;
  }
`;


/* ✅ 카드 디자인 개선 */
export const moodItem = css`
  flex: 0 0 200px; /* ✅ 카드 크기 */
  background: #fffaf3;
  border-radius: 22px;
  padding: 22px 14px;
  text-align: center;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease; /* ✅ 부드러운 애니메이션 */
  transform-origin: center center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  /* ✅ Hover 시 확대 + 그림자 강조 */
  &:hover {
    transform: scale(1.07) translateY(-6px);
    box-shadow: 0 12px 26px rgba(255, 200, 130, 0.25), 0 6px 18px rgba(0, 0, 0, 0.1);
    background: #fff9ef;
  }

  img {
    width: 95px; /* ✅ 조금 더 큼 */
    height: 95px;
    border-radius: 14px;
    object-fit: cover;
    margin: 0 auto 10px;
    transition: transform 0.3s ease;
  }

  /* ✅ 이미지도 살짝 커지게 */
  &:hover img {
    transform: scale(1.05);
  }

  .title {
    font-weight: 700;
    font-size: 1.1rem; /* ✅ 크고 선명하게 */
    color: #3b2f2a;
    margin-bottom: 6px;
  }

  .artist {
    font-size: 0.95rem;
    color: #7a6d65;
    font-weight: 500;
    margin-bottom: 10px;
  }

  button {
    margin-top: 8px;
    background: #f9fafb;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 6px 10px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #ffe1b8;
      transform: scale(1.05);
    }
  }
`;


export const loading = css`
  display: grid;
  place-items: center;
  height: 60vh;
  color: #6b7280;
  font-size: 15px;
`;

export const playButton = css`
  background: #fffaf2;
  border: 1px solid #e0d7c8;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 13px;
  color: #6b4c3a;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover:not(:disabled) {
    background: #ffe4b3;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #f3f0eb;
    color: #aaa;
    cursor: default;
  }
`;

export const albumArt = css`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
`;

export const albumArtSmall = css`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 6px;
`;
