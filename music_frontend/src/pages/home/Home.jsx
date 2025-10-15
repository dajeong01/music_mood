/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import running from "../../assets/videos/running.mp4";
import runninPhoto from "../../assets/images/러닝.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Home(props) {
  
  
  return (
    <div css={s.container}>
      <main>
        <div css={s.main}>
          <div css={s.mainVideo}>
            <video
              src={running}
              controls={false}
              muted={true}
              autoPlay={true}
              loop={true}
            />
          </div>
          <div css={s.mainText}>
            <div>부산 인기 크루 모아보기</div>
            <div>Busan Running Crew's</div>
          </div>
          <div css={s.mainGallery}>
            <Slider
              centerMode={true}
              infinite={true}
              sliderToShow={1}
              speed={500}
              initialSlide={2}
              slidesToScroll={1}
              variableWidth={true}
              centerPadding={"60px"}
              autoplay={true}
              autoplaySpeed={4000}
              ltr={true}
            >
              <div css={s.sliderImg}>
                1
                <img src={runninPhoto} alt="" />
              </div>
              <div css={s.sliderImg}>
                1
                <img src={runninPhoto} alt="" />
              </div>
              <div css={s.sliderImg}>
                1
                <img src={runninPhoto} alt="" />
              </div>
              <div css={s.sliderImg}>
                1
                <img src={runninPhoto} alt="" />
              </div>
              <div css={s.sliderImg}>
                1
                <img src={runninPhoto} alt="" />
              </div>
            </Slider>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;