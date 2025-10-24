import { css } from "@emotion/react";

// 🎨 공통 색상 (Mypage와 동일 톤)
const ivory = "#fffdf9";
const beige = "#fdfaf7";
const accent = "#d4b996";
const brown = "#5d4037";
const hover = "#f6efe9";

// 🌙 전체 오버레이
export const overlay = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

// 📦 모달 본체
export const modal = css`
  background: ${ivory};
  border-radius: 24px;
  width: 480px;
  padding: 32px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.25s ease;

  h2 {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${brown};
    margin-bottom: 24px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// 🎧 장르 버튼 목록
export const genreGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 28px;
`;

// 🎵 장르 버튼
export const genreButton = css`
  background: ${beige};
  border: 1px solid transparent;
  border-radius: 14px;
  color: ${brown};
  font-size: 1rem;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${hover};
  }
`;

// ✅ 선택된 장르 버튼
export const selected = css`
  background: ${accent};
  color: white;
  border: 1px solid ${accent};
  font-weight: 600;
`;

// 버튼 하단 영역
export const buttonRow = css`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

// ❌ 취소 버튼
export const cancel = css`
  background: #ddd;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ccc;
  }
`;

// 💾 저장 버튼
export const save = css`
  background: ${accent};
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${brown};
  }
`;
