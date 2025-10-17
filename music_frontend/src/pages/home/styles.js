/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

export const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const globalStyles = css`
  font-family: "M PLUS Rounded 1c", "Pretendard", sans-serif;
  background-color: #fff5e4;
  color: #4a4a4a;
  transition: background-color 0.5s ease;

  html, body, #root {
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
  }

  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .arrow {
    font-size: 2.4rem;
    color: #d1d5db;
    margin: 0 1.2rem;
    @media (max-width: 768px) {
      transform: rotate(90deg);
      margin: 1rem 0;
    }
  }
`;

export const weatherControls = css`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  padding: 0.5rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  display: flex;
  gap: 0.5rem;
`;

export const weatherBtn = (isActive) => css`
  width: 5rem;
  height: 5rem;
  border-radius: 9999px;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  background-color: ${isActive ? "rgba(255,255,255,0.9)" : "transparent"};
  transform: ${isActive ? "scale(1.1)" : "scale(1)"};
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

export const heroSection = (weather) => {
  const gradients = {
    rainy: "linear-gradient(-45deg, #a1a1aa, #64748b, #a1a1aa, #64748b)",
    snowy: "linear-gradient(-45deg, #f0f9ff, #dbeafe, #f0f9ff, #dbeafe)",
    sunny: "linear-gradient(-45deg, #fde68a, #a5f3fc, #fde68a, #a5f3fc)",
  };

  return css`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;
    background: ${gradients[weather]};
    background-size: 400% 400%;
    animation: ${gradientBG} 15s ease infinite;
  `;
};

export const particleCanvas = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const heroContent = css`
  position: relative;
  z-index: 2;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1rem;

  & > h1 {
    font-size: 12rem;
    line-height: 1.5;
    font-weight: 900;
    color: #1f2937;
    margin-bottom: 1.5rem;
    @media (min-width: 768px) {
      font-size: 4rem;
    }
  }

  & > p {
    font-size: 2rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 2rem;
    line-height: 1.8;
  }

  & > button {
    display: inline-block;
    background-color: white;
    color: #1f2937;
    font-weight: 700;
    padding: 1.5rem 3rem;
    border-radius: 9999px;
    font-size: 1.8rem;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    &:hover {
      background-color: #f3f4f6;
      transform: scale(1.07);
    }
  }
`;

export const sectionLayout = (bgColor) => css`
  padding: 7rem 1rem;
  background-color: ${bgColor};
  @media (min-width: 768px) {
    padding: 9rem 1rem;
  }
`;

export const container = css`
  max-width: 100rem;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;

  & > h2 {
    font-size: 3rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 4rem;
  }
`;

export const featureCards = css`
    display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 3rem;
  padding: 1rem 0;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    gap: 2rem;
  }
`;

export const card = css`
  background-color: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
  width: 28rem;
  min-height: 22rem;
  text-align: center;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1),
                0 10px 10px -5px rgba(0,0,0,0.04);
  }

  & > .icon {
    font-size: 3.8rem;
    margin-bottom: 1.2rem;
  }

  & > h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  & > p {
    font-size: 1.5rem;
    line-height: 1.7;
    color: #4b5563;
  }
`;

export const howToFlow = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

export const stepCard = css`
  text-align: center;
  width: 100%;
  max-width: 24rem;

  @media (min-width: 768px) {
    width: 30%;
  }

  & > h3 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #1f2937;
  }
`;

export const stepMockup = css`
  background-color: white;
  padding: 1.8rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  margin-bottom: 1rem;
  height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .mockup-inner {
    width: 100%;
    max-width: 16rem;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;

    & > p {
      text-align: left;
      font-size: 1rem;
      color: #9ca3af;
    }

    .line {
      height: 0.6rem;
      background-color: #e5e7eb;
      border-radius: 9999px;
      margin-top: 0.5rem;
    }

    .full {
      width: 100%;
    }
    .partial {
      width: 75%;
    }
  }
`;

export const emojiGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  font-size: 2.6rem;
`;

export const musicRecommendItem = css`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

  .album-art {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.25rem;
    flex-shrink: 0;
  }

  .sky {
    background-image: linear-gradient(to bottom right, #a5f3fc, #38bdf8);
  }

  .orange {
    background-image: linear-gradient(to bottom right, #fed7aa, #fb923c);
  }

  & > div {
    margin-left: 1rem;
    text-align: left;
  }

  .title {
    font-weight: 600;
    font-size: 1.1rem;
  }

  .artist {
    font-size: 0.9rem;
    color: #6b7280;
  }
`;

export const testimonialSlider = css`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding-bottom: 2rem;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const testimonialSliderSpacer = css`
  flex-shrink: 0;
  width: 1px;
  @media (min-width: 640px) {
    width: 2rem;
  }
`;

export const testimonialCard = css`
  scroll-snap-align: center;
  flex-shrink: 0;
  width: 100%;
  @media (min-width: 640px) {
    width: 22rem;
  }
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  text-align: left;

  & > p {
    color: #374151;
    font-style: italic;
    font-size: 1.3rem;
  }

  .author {
    text-align: right;
    font-weight: 600;
    color: #1f2937;
    margin-top: 1rem;
    font-style: normal;
  }
`;

export const finalCtaButton = css`
  display: inline-block;
  background-color: #aee5ff;
  color: #1f2937;
  font-weight: 700;
  padding: 1.5rem 3rem;
  border-radius: 9999px;
  font-size: 1.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  &:hover {
    background-color: #7dd3fc;
    transform: scale(1.05);
  }
`;

export const footer = css`
  background-color: #f2f2f2;
  padding: 2.5rem 0;
  text-align: center;
  color: #6b7280;

  & > div > p {
    font-size: 1rem;
  }
`;

export const footerLinks = css`
  display: flex;
  justify-content: center;
  gap: 1.8rem;
  margin-top: 1.2rem;
  font-size: 1rem;

  & > a {
    text-decoration: none;
    color: #6b7280;
    &:hover {
      color: #1f2937;
    }
  }
`;
