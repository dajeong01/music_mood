import { css } from "@emotion/react";

export const global = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');

  html {
    font-size: 62.5%; /* 1rem = 10px */
    font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
    font-weight: 400;
    background-color: #fff;
    color: var(--main-color);
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
  }

  #root {
    font-size: 1.4rem; /* 기본 폰트 크기 */
    line-height: 1.6;
  }

  :root {
    --main-color: #1f1f21;
    --sub-color: #ebebeb;
    --point-color: #fa2847;
    --hB-color: rgba(129, 126, 126, 0.1);
    --bg-color: #fffaf5;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    background: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;
