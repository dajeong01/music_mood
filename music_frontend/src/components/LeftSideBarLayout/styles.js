import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 240px;
  height: 100vh;
  padding: 32px 20px;
  background-color: #FFFDF9; /* 부드러운 크림색 배경 */
  border-right: 1px solid #F3EEEA; /* 은은한 구분선 */
  font-family: "Gamja Flower", "Segoe UI", sans-serif;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.03);
`;

export const logoBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 56px;
  width: 100%;
  cursor: pointer;
`;

export const logoImg = css`
  width: 170px; /* 로고 크기 살짝 조정 */
  height: auto;
  object-fit: contain;
`;

export const menuList = css`
  display: flex;
  flex-direction: column;
  gap: 12px; /* 메뉴 간격 조정 */
  width: 100%;
`;

// active 상태에 따라 다른 스타일을 적용하기 위해 함수 형태로 변경합니다.
export const menuItem = ({ isActive }) => css`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  font-size: 17px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-weight: 500;
  letter-spacing: 0.3px;

  /* isActive 상태에 따른 기본 스타일 설정 */
  background-color: ${isActive ? "#FFF5E4" : "transparent"};
  color: ${isActive ? "#5D4037" : "#6B7280"};

  svg {
    stroke-width: 1.5;
    flex-shrink: 0;
    color: ${isActive ? "#5D4037" : "#888"};
    transition: all 0.25s ease;
  }
  
  span {
    font-weight: ${isActive ? "700" : "500"};
  }

  /* 활성화되지 않은 메뉴 아이템에만 hover 효과 적용 */
  ${!isActive &&
  `&:hover {
    background: #FFF9F0; /* 더 연한 크림색으로 호버 효과 */
    color: #5D4037; /* 호버 시 텍스트 색상 변경 */

    svg {
      color: #5D4037;
    }
  }`}
`;
