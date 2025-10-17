/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import * as s from './styles';

function Home() {
   const canvasRef = useRef(null);
    const [weather, setWeather] = useState('sunny');
    const particlesArray = useRef([]);
    const mouse = useRef({ x: null, y: null, radius: 100 });
    const navigate = useNavigate("");

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor(x, y, directionX, directionY, size, color, currentWeather) {
                this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color; this.currentWeather = currentWeather;
            }
            draw() {
                if(!ctx) return;
                if (this.currentWeather === 'rainy') {
                    ctx.beginPath(); ctx.moveTo(this.x, this.y); ctx.lineTo(this.x + this.directionX, this.y + this.directionY * 3); ctx.strokeStyle = this.color; ctx.lineWidth = this.size / 2; ctx.stroke();
                } else {
                    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill();
                }
            }
            update(mouse) {
                if(!canvas) return;
                let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) { this.x += 3; }
                    if (mouse.x > this.x && this.x > this.size * 10) { this.x -= 3; }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) { this.y += 3; }
                    if (mouse.y > this.y && this.y > this.size * 10) { this.y -= 3; }
                }
                if (this.currentWeather === 'rainy' || this.currentWeather === 'snowy') {
                    this.y += this.directionY; this.x += this.directionX;
                    if (this.y > canvas.height) { this.y = 0 - this.size; this.x = Math.random() * canvas.width; }
                    if (this.x > canvas.width) { this.x = 0; } if (this.x < 0) { this.x = canvas.width; }
                } else {
                    if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
                    if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }
                    this.x += this.directionX; this.y += this.directionY;
                }
                this.draw();
            }
        }

        const init = () => {
            if(!canvas) return;
            particlesArray.current = [];
            let numberOfParticles;
            switch(weather) {
                case 'rainy': numberOfParticles = (canvas.height * canvas.width) / 4000; break;
                case 'snowy': numberOfParticles = (canvas.height * canvas.width) / 7000; break;
                default: numberOfParticles = (canvas.height * canvas.width) / 9000;
            }
            for (let i = 0; i < numberOfParticles; i++) {
                let size, x, y, directionX, directionY, color;
                switch (weather) {
                    case 'rainy': size = (Math.random()*1.5)+1; x=Math.random()*canvas.width; y=Math.random()*canvas.height; directionX=0.5; directionY=(Math.random()*2)+5; color='rgba(174, 229, 255, 0.6)'; break;
                    case 'snowy': size = (Math.random()*3)+2; x=Math.random()*canvas.width; y=Math.random()*canvas.height; directionX=(Math.random()*0.4)-0.2; directionY=(Math.random()*0.5)+0.5; color='rgba(255, 255, 255, 0.8)'; break;
                    default: size = (Math.random()*2)+1; x=(Math.random()*window.innerWidth); y=(Math.random()*window.innerHeight); directionX=(Math.random()*0.4)-0.2; directionY=(Math.random()*0.4)-0.2; color='rgba(255, 255, 255, 0.7)'; break;
                }
                particlesArray.current.push(new Particle(x, y, directionX, directionY, size, color, weather));
            }
        };

        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (ctx) {
                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
                particlesArray.current.forEach(p => p.update(mouse.current));
            }
        };
        
        init();
        animate();

        const handleMouseMove = e => { mouse.current = { ...mouse.current, x: e.clientX, y: e.clientY }; };
        const handleResize = () => { if(canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); } };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('resize', handleResize); cancelAnimationFrame(animationFrameId); };
    }, [weather]);
    
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal');
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            revealElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < windowHeight - 100) {
                    el.classList.add('visible');
                }
            });
        }
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();
        return () => window.removeEventListener('scroll', revealOnScroll);
    }, []);

    return (
        <div css={s.globalStyles}>
            <div css={s.weatherControls}>
                <button css={s.weatherBtn(weather === 'sunny')} onClick={() => setWeather('sunny')}>☀️</button>
                <button css={s.weatherBtn(weather === 'rainy')} onClick={() => setWeather('rainy')}>🌧️</button>
                <button css={s.weatherBtn(weather === 'snowy')} onClick={() => setWeather('snowy')}>❄️</button>
            </div>

            <section css={s.heroSection(weather)}>
                <canvas ref={canvasRef} css={s.particleCanvas}></canvas>
                <div css={s.heroContent}>
                    <h1>오늘 당신의 마음은<br/>어떤 멜로디인가요?</h1>
                    <p>하루의 감정을 기록하면, AI가 당신의 마음에<br/>꼭 맞는 음악을 찾아드려요.</p>
                    {/* <a href="#features">✨ 내 마음의 BGM 찾기</a> */}
                    <button onClick={()=> navigate("/auth/oauth2/signin")}>✨ 내 마음의 BGM 찾기</button>
                </div>
            </section>

            <section id="features" css={s.sectionLayout('#F2F2F2')}>
                <div css={s.container}>
                    <h2 className="reveal">멜로디 다이어리 엿보기</h2>
                    <div css={s.featureCards}>
                        <div className="reveal" css={s.card} style={{transitionDelay: '200ms'}}>
                             <div className="icon">🖋️😊</div>
                             <h3>하루의 조각을 기록해요</h3>
                             <p>복잡한 형식은 잠시 잊으세요. 오늘의 기분을 나타내는 이모티콘과 몇 줄의 문장이면 충분해요.</p>
                        </div>
                         <div className="reveal" css={s.card} style={{transitionDelay: '400ms'}}>
                             <div className="icon">🎧🎵</div>
                             <h3>마음을 읽는 플레이리스트</h3>
                             <p>당신의 일기 속 감정을 AI가 분석하여, 지금 가장 필요한 위로와 공감의 음악을 선물할게요.</p>
                        </div>
                         <div className="reveal" css={s.card} style={{transitionDelay: '600ms'}}>
                             <div className="icon">📅😌</div>
                             <h3>한눈에 돌아보는 감정의 흐름</h3>
                             <p>캘린더에 수놓인 감정의 색깔들을 보며 나 자신을 더 깊이 이해하는 시간을 가져보세요.</p>
                        </div>
                    </div>
                 </div>
            </section>

            <section css={s.sectionLayout('#FFF5E4')}>
                <div css={s.container}>
                    <h2 className="reveal">이렇게 쉬워요</h2>
                    <div css={s.howToFlow} className="reveal">
                         <div css={s.stepCard}>
                            <div css={s.stepMockup}>
                                 <div className="mockup-inner">
                                     <p>오늘 하루는 어땠나요?</p>
                                     <div className="line full"></div>
                                     <div className="line partial"></div>
                                 </div>
                            </div>
                            <h3>1. 일기 쓰기</h3>
                         </div>
                         <div className="arrow">→</div>
                          <div css={s.stepCard}>
                             <div css={s.stepMockup}>
                                 <div css={s.emojiGrid}>
                                     <span>😊</span><span>😄</span><span>😂</span>
                                     <span>😢</span><span>😠</span><span>🤔</span>
                                     <span>😴</span><span>😍</span><span>🥳</span>
                                 </div>
                             </div>
                             <h3>2. 감정 선택</h3>
                          </div>
                          <div className="arrow">→</div>
                          <div css={s.stepCard}>
                             <div css={s.stepMockup} style={{ flexDirection: 'column', gap: '1rem' }}>
                                 <div css={s.musicRecommendItem}>
                                    <div className="album-art sky"></div>
                                    <div>
                                        <p className="title">편안한 위로의 멜로디</p>
                                        <p className="artist">아티스트 이름</p>
                                    </div>
                                 </div>
                                  <div css={s.musicRecommendItem}>
                                     <div className="album-art orange"></div>
                                     <div>
                                         <p className="title">따스한 햇살 같은 노래</p>
                                         <p className="artist">아티스트 이름</p>
                                     </div>
                                  </div>
                             </div>
                             <h3>3. 음악 추천받기</h3>
                          </div>
                    </div>
                </div>
             </section>
             
            <section css={s.sectionLayout('#F2F2F2')} id="testimonials">
                <div css={s.container}>
                     <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="reveal">
                         <h2>먼저 다녀간 마음들의 속삭임</h2>
                         <p style={{color: '#4B5563'}}>멜로디 다이어리가 작은 위로가 되었던 순간들</p>
                     </div>
                     <div css={s.testimonialSlider} className="reveal">
                          <div css={s.testimonialCard}>
                              <p>"오늘 하루 정말 힘들었는데, 제 마음에 꼭 맞는 노래를 추천해줘서 큰 위로를 받았어요. 마치 친한 친구가 옆에서 다독여주는 것 같았어요."</p>
                              <p className="author">- 지친 하루 끝에</p>
                          </div>
                           <div css={s.testimonialCard}>
                              <p>"매일 일기를 쓰면서 제 감정을 돌아보는 습관이 생겼어요. 감정 캘린더 덕분에 제 마음의 변화를 한눈에 볼 수 있어서 정말 좋아요!"</p>
                               <p className="author">- 성장하는 나</p>
                          </div>
                           <div css={s.testimonialCard}>
                              <p>"우울한 날, 신나는 날, 감정에 따라 음악을 추천받는 재미가 쏠쏠해요. 멜로디 다이어리는 이제 제 일상의 작은 행복이 되었어요."</p>
                               <p className="author">- 음악을 사랑하는</p>
                          </div>
                           <div css={s.testimonialCard}>
                              <p>"AI가 내 글을 읽고 감정을 분석해준다는 게 신기해요. 가끔은 사람보다 더 저를 잘 알아주는 것 같아서 기특하기도 하고요. 고마워요!"</p>
                               <p className="author">- AI 친구가 생긴</p>
                          </div>
                           <div css={s.testimonialSliderSpacer}></div>
                     </div>
                </div>
            </section>

             <section css={s.sectionLayout('#FFF5E4')}>
                 <div css={s.container} className="reveal" style={{ textAlign: 'center' }}>
                     <h2 style={{marginBottom: "1.5rem"}}>당신만의 감성 플레이리스트를<br/>만들 준비가 되셨나요?</h2>
                      <button onClick={()=> navigate("/auth/oauth2/signin")} css={s.finalCtaButton}>
                         ✨ 지금 바로 시작하기
                     </button>
                 </div>
             </section>

             <footer css={s.footer}>
                 <div>
                     <p>&copy; 2024 Melody Diary. All Rights Reserved.</p>
                     <div css={s.footerLinks}>
                         <a href="#">About</a>
                         <a href="#">개인정보처리방침</a>
                         <a href="#">문의하기</a>
                     </div>
                 </div>
             </footer>
        </div>
    );
};


export default Home;