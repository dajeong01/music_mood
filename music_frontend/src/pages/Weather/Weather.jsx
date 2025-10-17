/** @jsxImportSource @emotion/react */
import LeftSideBarLayout from "../../components/LeftSideBarLayout/LeftSideBarLayout";
import * as s from "./styles";

export default function Weather() {
  return (
    <div css={s.pageWrapper}>
      <LeftSideBarLayout />
      <div css={s.container}>
        {/* 왼쪽 스크롤 영역 */}
        <div css={s.leftScroll}>
          <section css={s.weatherBox}>
            <div css={s.weatherHeader}>
              <p className="city">Busan</p>
              <p className="date">Friday, 17 Oct 2025</p>
            </div>
            <div css={s.weatherMain}>
              <p className="temp">23°</p>
              <div className="iconBox">
                <div css={s.placeholderBox}>Weather Icon</div>
                <p className="desc">Mostly Sunny</p>
              </div>
            </div>
          </section>

          <section css={s.hourlyBox}>
            <h3>오늘의 날씨 정보</h3>
            <div css={s.hourScroll}>
              {["Now", "12 PM", "1 PM", "2 PM"].map((time, i) => (
                <div key={i} css={s.hourCard}>
                  <p className="time">{time}</p>
                  <p className="temp">23°</p>
                </div>
              ))}
            </div>
            <div css={s.weatherDetail}>
              <div><p className="label">일출</p><p className="value">06:30</p></div>
              <div><p className="label">일몰</p><p className="value">17:45</p></div>
              <div><p className="label">습도</p><p className="value">58%</p></div>
              <div><p className="label">바람</p><p className="value">3m/s</p></div>
            </div>
          </section>
        </div>

        {/* 오른쪽 스크롤 영역 */}
        <div css={s.rightScroll}>

          <section css={s.playlistBox}>
            <h2>오늘 날씨를 위한 플레이리스트</h2>
            <div css={s.playlistList}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} css={s.playItem}>
                  <div css={s.placeholderImg}>MD</div>
                  <div className="info">
                    <p className="title">노래 제목 {i}</p>
                    <p className="artist">아티스트</p>
                  </div>
                  <span className="time">3:14</span>
                </div>
              ))}
            </div>
          </section>

          {/* <section css={s.emotionBox}>
            <div css={s.emotionHeader}>
              <p>오늘의 기분은?</p>
              <div css={s.emotionBtns}>
                <div className="btn">😄</div>
                <div className="btn">😢</div>
                <div className="btn">😠</div>
              </div>
            </div>
          </section> */}

          {/* 🎵 감정 기반 멜로디 */}
          <section css={s.moodBox}>
            <h3>최근 ‘행복’했던 당신을 위한 멜로디</h3>
            <div css={s.moodList}>
              <div css={s.moodItem} color="#fde68a">
                MD
                <p>기분 좋은 하루</p>
              </div>
              <div css={s.moodItem} color="#bae6fd">
                MD
                <p>Happy Vibe</p>
              </div>
              <div css={s.moodItem} color="#bbf7d0">
                MD
                <p>솜사탕 구름</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
