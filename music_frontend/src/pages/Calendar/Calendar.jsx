/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Edit3,
  ListMusic,
  Music,
  User,
} from "lucide-react";
import * as s from "./styles";

/**
 * 사이드바 레이아웃 컴포넌트
 */
function LeftSideBarLayout() {
  const currentPath = "/calendar"; // 임시 활성화 상태

  const navigate = (path) => {
    console.log(`Navigating to ${path}`);
  };

  const menuItems = [
    { icon: <CloudSun size={20} />, label: "오늘의 날씨", path: "/weather" },
    { icon: <CalendarDays size={20} />, label: "감정 캘린더", path: "/calendar" },
    { icon: <ListMusic size={20} />, label: "플레이리스트", path: "/playlist" },
  ];

  const mypageMenu = {
    icon: <User size={20} />,
    label: "마이페이지",
    path: "/mypage",
  };

  return (
    <aside css={s.sidebar}>
      <div css={s.logoBox} onClick={() => navigate("/")}>
        <h1
          style={{
            fontFamily: "'Gamja Flower', sans-serif",
            fontSize: "2rem",
            color: "#5d4037",
            fontWeight: "700",
          }}
        >
          Melody Diary
        </h1>
      </div>
      <nav css={s.menuList}>
        {menuItems.map((item) => (
          <div
            key={item.label}
            css={s.menuItem({ isActive: currentPath === item.path })}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      <div css={s.sidebarSpacer}></div>
      <div css={s.menuList}>
        <div
          css={s.menuItem({ isActive: currentPath === mypageMenu.path })}
          onClick={() => navigate(mypageMenu.path)}
        >
          {mypageMenu.icon}
          <span>{mypageMenu.label}</span>
        </div>
      </div>
    </aside>
  );
}

/**
 * 메인 감정 캘린더 페이지
 */
export default function EmotionCalendar() {
  const [selectedDay, setSelectedDay] = useState(14);
  const [diaryExists, setDiaryExists] = useState(true);

  const calendarData = {
    days: [
      { day: 28, inMonth: false },
      { day: 29, inMonth: false },
      { day: 30, inMonth: false },
      { day: 1, inMonth: true, emotion: "😄" },
      { day: 2, inMonth: true },
      { day: 3, inMonth: true, emotion: "😢" },
      { day: 4, inMonth: true },
      { day: 5, inMonth: true },
      { day: 6, inMonth: true, emotion: "😄" },
      { day: 7, inMonth: true },
      { day: 8, inMonth: true },
      { day: 9, inMonth: true, emotion: "🤔" },
      { day: 10, inMonth: true },
      { day: 11, inMonth: true },
      { day: 12, inMonth: true, emotion: "😍" },
      { day: 13, inMonth: true },
      { day: 14, inMonth: true, emotion: "😠", isToday: true },
      { day: 15, inMonth: true },
      { day: 16, inMonth: true },
      { day: 17, inMonth: true, emotion: "😄" },
      { day: 18, inMonth: true },
      { day: 19, inMonth: true },
      { day: 20, inMonth: true },
      { day: 21, inMonth: true, emotion: "😄" },
      { day: 22, inMonth: true },
      { day: 23, inMonth: true },
      { day: 24, inMonth: true },
      { day: 25, inMonth: true, emotion: "😢" },
      { day: 26, inMonth: true },
      { day: 27, inMonth: true },
      { day: 28, inMonth: true },
      { day: 29, inMonth: true },
      { day: 30, inMonth: true },
      { day: 31, inMonth: true, emotion: "🥳" },
      { day: 1, inMonth: false },
    ],
    stats: {
      total: 9,
      happy: 50,
      sad: 20,
      angry: 15,
      other: 15,
      mainEmotion: "😄",
    },
  };

  const todayDiary = {
    weather: "흐림",
    emotion: "😠",
    playlist: Array.from({ length: 10 }).map((_, i) => ({
      art: `https://placehold.co/48x48/F8E9D7/5D4037?text=MD`,
      title: `추천곡 ${i + 1}`,
      artist: `아티스트 ${i + 1}`,
      time: `3:${20 + i}`,
    })),
  };

  const handleDayClick = (day) => {
    if (!day.inMonth) return;
    setSelectedDay(day.day);
    setDiaryExists(day.day === 14);
  };

  return (
    <div css={s.pageWrapper}>
      <LeftSideBarLayout />
      <main css={s.mainContent}>
        {/* 왼쪽: 달력 + 통계 */}
        <div css={s.leftColumn}>
          {/* 캘린더 */}
          <div css={s.card}>
            <div css={s.calendarHeader}>
              <button css={s.navButton}>
                <ChevronLeft size={20} />
              </button>
              <h2 css={s.calendarTitle}>2025년 10월</h2>
              <button css={s.navButton}>
                <ChevronRight size={20} />
              </button>
            </div>

            <div css={s.calendarGrid}>
              {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
                <div
                  key={d}
                  css={[
                    s.dayHeader,
                    i === 0 && s.dayHeaderSun,
                    i === 6 && s.dayHeaderSat,
                  ]}
                >
                  {d}
                </div>
              ))}

              {calendarData.days.map((day, idx) => (
                <div
                  key={idx}
                  css={s.dayCell({
                    inMonth: day.inMonth,
                    isToday: day.isToday,
                    isSelected: selectedDay === day.day,
                  })}
                  onClick={() => handleDayClick(day)}
                >
                  <span>{day.day}</span>
                  {day.emotion && <span css={s.emotionIcon}>{day.emotion}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* 통계 */}
          <div css={s.statsRow}>
            <div css={[s.card, s.statCard]}>
              <h3 css={s.chartTitle}>10월의 감정 조각들</h3>
              <div css={s.donutChartWrapper}>
                <div css={s.donutChart(calendarData.stats)}></div>
                <div css={s.donutCenter}>
                  <span>{calendarData.stats.total}일</span>
                </div>
              </div>
              <div css={s.legend}>
                {["happy", "sad", "angry", "other"].map((t, i) => (
                  <div key={i} css={s.legendItem}>
                    <div>
                      <span css={s.legendColor(t)}></span>
                      {t === "happy"
                        ? "행복"
                        : t === "sad"
                        ? "슬픔"
                        : t === "angry"
                        ? "화남"
                        : "기타"}
                    </div>
                    <span>{calendarData.stats[t]}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div css={[s.card, s.statCard, s.monthlyEmotionCard]}>
              <h3 css={s.chartTitle}>이달의 대표 감정</h3>
              <p css={s.monthlyEmotionIcon}>{calendarData.stats.mainEmotion}</p>
              <p css={s.monthlyEmotionText}>
                이번 달은 <span css={s.highlight("happy")}>'행복'</span>한 날이 많았네요!{" "}
                앞으로도 즐거운 날들이 가득하기를 ☀️
              </p>
            </div>
          </div>
        </div>

        {/* 오른쪽: 플레이리스트 */}
        <div css={s.rightColumn}>
          {diaryExists ? (
            <div css={[s.card, s.playlistCard]}>
              <h3 css={s.playlistHeader}>
                오늘을 위한 멜로디 <Music size={20} />
              </h3>
              <p css={s.playlistSubheader}>
                날씨(<span css={s.highlight("sad")}>{todayDiary.weather}</span>) + 감정(
                <span css={s.highlight("angry")}>{todayDiary.emotion}</span>)을 위한 추천
              </p>
              <div css={s.playlistScroll}>
                <div css={s.playlist}>
                  {todayDiary.playlist.map((song, index) => (
                    <div key={index} css={s.playlistItem}>
                      <img src={song.art} css={s.albumArt} alt="Album Art" />
                      <div css={s.songInfo}>
                        <p css={s.songTitle}>{song.title}</p>
                        <p css={s.songArtist}>{song.artist}</p>
                      </div>
                      <span css={s.songTime}>{song.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div css={[s.card, s.emptyStateCard]}>
              <div css={s.emptyIcon}>✏️</div>
              <h3 css={s.emptyTitle}>오늘은 아직 일기가 없네요!</h3>
              <p css={s.emptyText}>
                오늘의 날씨와 감정을 기록하고 <br /> 나만의 맞춤 멜로디를 추천받아보세요!
              </p>
              <button css={s.emptyButton}>
                <Edit3 size={16} /> 일기 쓰러 가기
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
