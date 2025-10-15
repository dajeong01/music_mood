import { css } from "@emotion/react";

export const global = css`
  @import url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Thin.woff') format('woff');

  html {
    font-size: 62.5%;
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    background-color: #fff;
  }


  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
  }

  #root {
    font-size: 1.4rem;
  }

  :root {
    --main-color: #1f1f21;
    --sub-color: #ebebeb;
    --point-color: #fa2847;
    --hB-color: rgba(129, 126, 126, 0.1);
  }
`;
