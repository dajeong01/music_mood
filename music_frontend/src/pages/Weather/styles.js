import { css } from "@emotion/react";

export const pageWrapper = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: #f8f5f2; /* 전체 배경색을 따뜻한 크림색으로 */
  font-family: "Pretendard", "Gamja Flower", sans-serif; /* 폰트 우선순위 조정 */
`;

export const container = css`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 36px; /* 전체 간격 조금 더 넓게 */
  padding: 40px 50px; /* 패딩 증가 */
  overflow: hidden;
`;

export const leftScroll = css`
  overflow-y: auto;
  padding-right: 18px; /* 스크롤바와의 여백 증가 */
  display: flex;
  flex-direction: column;
  gap: 30px; /* 섹션 간 간격 증가 */

  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 증가 */
  }
  &::-webkit-scrollbar-thumb {
    background: #d4b996; /* 스크롤바 색상을 따뜻한 톤으로 */
    border-radius: 8px;
    border: 2px solid #f8f5f2; /* 스크롤바 테두리 색상 */
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const rightScroll = css`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 30px; /* 섹션 간 간격 증가 */
  padding-right: 18px; /* 스크롤바와의 여백 증가 */

  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 증가 */
  }
  &::-webkit-scrollbar-thumb {
    background: #d4b996; /* 스크롤바 색상을 따뜻한 톤으로 */
    border-radius: 8px;
    border: 2px solid #f8f5f2; /* 스크롤바 테두리 색상 */
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

/* 날씨 카드 */
export const todayBox = css`
  background: linear-gradient(135deg, #a7d9f7, #c1e6fa); /* 더 부드럽고 밝은 파란색 그라데이션 */
  color: white;
  border-radius: 25px; /* 모서리 더 둥글게 */
  padding: 30px; /* 패딩 증가 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /* 그림자 강화 */

  .date {
    font-size: 1.1rem; /* 날짜 글자 크기 조정 */
    font-weight: 500;
    margin-bottom: 20px; /* 날짜 아래 간격 증가 */
    letter-spacing: 0.5px;
  }
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px; /* 메인 날씨 아래 간격 증가 */

    .tempBox {
      .temp {
        font-size: 5.5rem; /* 온도 글자 크기 더 크게 */
        font-weight: 700;
        line-height: 1;
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* 온도에 그림자 추가 */
      }
      .desc {
        font-size: 1.5rem; /* 설명 글자 크기 증가 */
        margin-top: 8px;
        text-transform: capitalize; /* 첫 글자 대문자 */
      }
    }
    .icon {
      width: 130px; /* 아이콘 크기 증가 */
      height: 130px;
      filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.15)); /* 아이콘에 그림자 추가 */
    }
  }
  .detail {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid rgba(255, 255, 255, 0.3); /* 구분선 색상 조정 */
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2열 배치 */
    gap: 15px 25px; /* 간격 조정 */
    font-size: 1rem; /* 디테일 정보 글자 크기 */
    line-height: 1.4;

    div {
      display: flex;
      align-items: center;
      gap: 8px; /* 아이콘과 텍스트 사이 간격 */
      font-weight: 500;
    }
  }
`;

/* 5일 예보 */
export const forecastBox = css`
  background: #fffdf9; /* 카드 배경색을 따뜻한 크림색으로 */
  border-radius: 25px; /* 모서리 더 둥글게 */
  padding: 30px; /* 패딩 증가 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05); /* 그림자 조정 */

  h3 {
    font-size: 1.3rem; /* 제목 글자 크기 증가 */
    margin-bottom: 25px; /* 제목 아래 간격 증가 */
    font-weight: 700;
    color: #5d4037; /* 제목 색상 조정 */
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
      /* 아이콘 대신 이모지 사용 (옵션) */
      content: "📆";
      font-size: 1.3em;
    }
  }
  .forecastList {
    display: flex;
    flex-direction: column;
    gap: 15px; /* 리스트 아이템 간 간격 증가 */
  }
  .forecastCard {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 양쪽 정렬 */
    padding: 15px 20px; /* 패딩 증가 */
    border-radius: 18px; /* 둥근 정도 조정 */
    background: #fdfaf7; /* 개별 카드 배경색 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03); /* 개별 카드 그림자 */
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .day {
      width: 60px; /* 요일 너비 고정 */
      font-weight: 600;
      color: #7a6e6a; /* 요일 색상 조정 */
      font-size: 1.05rem;
    }
    img {
      width: 60px; /* 아이콘 크기 증가 */
      height: 60px;
      margin-right: 10px; /* 아이콘 오른쪽 여백 */
    }
    .temps {
      margin-left: auto; /* 온도 정보를 오른쪽으로 밀기 */
      display: flex;
      align-items: baseline;
      gap: 5px;

      .max {
        color: #e11d48; /* 빨간색 유지 */
        font-weight: 700;
        font-size: 1.1rem;
      }
      .min {
        color: #2563eb; /* 파란색 유지 */
        font-weight: 500;
        font-size: 0.95rem;
      }
      .slash {
        color: #b0a49f; /* 슬래시 색상 조정 */
        font-size: 0.95rem;
      }
    }
    .desc {
      color: #8b7d76; /* 설명 색상 조정 */
      font-size: 0.95rem;
      width: 80px; /* 설명 너비 고정 */
      text-align: right;
      text-transform: capitalize;
    }
  }
`;

/* 플레이리스트 */
export const playlistBox = css`
  background: #fffdf9;
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);

  h2 {
    font-weight: 700;
    font-size: 1.3rem;
    color: #5d4037;
    margin-bottom: 25px;
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
  gap: 15px; /* 간격 조정 */
  background: #fdfaf7;
  border-radius: 18px;
  padding: 12px 18px; /* 패딩 조정 */
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  &:hover {
    background: #f6efe9; /* 호버 시 색상 조정 */
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .info {
    flex-grow: 1;
    margin-left: 0; /* 기존 마진 제거 */
  }

  .title {
    font-weight: 600;
    color: #4a3c35; /* 제목 색상 조정 */
    font-size: 1.05rem;
  }
  .artist {
    font-size: 0.9rem; /* 아티스트 글자 크기 조정 */
    color: #8b7d76; /* 아티스트 색상 조정 */
    margin-top: 4px;
  }
  .time {
    font-size: 0.9rem; /* 시간 글자 크기 조정 */
    color: #b0a49f; /* 시간 색상 조정 */
    flex-shrink: 0; /* 내용이 길어져도 줄바꿈되지 않도록 */
  }
`;

export const placeholderImg = css`
  width: 65px; /* 플레이스홀더 이미지 크기 증가 */
  height: 65px;
  background: #e6e3df; /* 배경색 조정 */
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
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);

  h3 {
    font-weight: 700;
    font-size: 1.3rem;
    color: #5d4037;
    margin-bottom: 25px;
  }
`;

export const moodList = css`
  display: flex;
  gap: 20px; /* 간격 증가 */
  flex-wrap: wrap;
`;

export const moodItem = (props) => css`
  flex: 1 1 calc(33.333% - 20px); /* 3개씩 균등 배치, 간격 고려 */
  min-width: 140px; /* 최소 너비 조정 */
  height: 160px; /* 높이 조정 */
  background-color: ${props.color || "#fdf7e6"}; /* 기본 색상 추가 */
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #4a3c35; /* 텍스트 색상 조정 */
  font-weight: 600;
  font-size: 1.2rem; /* MD 텍스트 크기 조정 */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 그림자 추가 */

  &:hover {
    transform: translateY(-5px); /* 더 역동적인 호버 효과 */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /* 호버 시 그림자 강화 */
  }

  p {
    margin-top: 10px; /* p 태그 위쪽 간격 증가 */
    font-size: 0.95rem; /* p 태그 글자 크기 조정 */
    color: #7a6e6a; /* p 태그 색상 조정 */
    font-weight: 500;
  }
`;
