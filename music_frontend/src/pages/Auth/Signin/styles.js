import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFFDF9; /* 부드러운 크림색 배경 */

  height: 100vh;
  text-align: center;
`;

export const loginTitle = css`
  font-size: 4rem;
  font-weight: 700;
  color: #5d4037;
  font-family: "Gamja Flower", sans-serif;
    margin-bottom: 5rem;
`;

export const buttons = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.5rem;
    width: 32rem;
    height: 6rem;
    border: 0.2rem solid #5d4037;
    border-radius: 0.7rem;
    background-color: transparent;

    &:nth-of-type(1) > svg {
      font-size: 2rem;
      margin-right: 0.8rem;
    }

    &:nth-of-type(2) > svg {
      font-size: 2rem;
      color: #ffe603;
      margin-right: 0.8rem;
    }

    &:nth-of-type(3) > svg {
      color: #04c75c;
      margin-right: 0.8rem;
    }
  }
`;
