/** @jsxImportSource @emotion/react */
import { ChevronLeft, ChevronRight, Edit3, Music } from "lucide-react";
import { useEffect, useState } from "react";
import { reqGetMonthlyDiaries, reqSaveDiary } from "../../api/CalendarApi";
import LeftSideBarLayout from "../../components/LeftSideBarLayout/LeftSideBarLayout";
import DiaryModal from "./Modal/DiaryModal";
import * as s from "./styles";

export default function Calendar() {
  // 🔹 상태 관리
  const [selectedDay, setSelectedDay] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [diaryData, setDiaryData] = useState([]);

  // ✅ 오늘 날짜 정보
  const todayDate = new Date();
  const today = todayDate.getDate();

  // ✅ 현재 월 상태 (자동 갱신 + 수동 이동 가능)
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  // ✅ 현재 월을 YYYY-MM 형식으로 변환
  const formattedMonth = `${currentMonth.getFullYear()}-${String(
    currentMonth.getMonth() + 1
  ).padStart(2, "0")}`;

  // ✅ 월 이동 함수
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };
  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // ✅ 달력 데이터 fetch
  const fetchDiaries = async () => {
    try {
      const res = await reqGetMonthlyDiaries(formattedMonth);
      const diaries = Array.isArray(res?.data?.body) ? res.data.body : [];
      console.log("📘 다이어리 데이터:", diaries);
      setDiaryData(diaries);
    } catch (err) {
      console.error("❌ 일기 조회 실패:", err);
      setDiaryData([]);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, [formattedMonth]); // 월이 바뀔 때마다 새로 불러오기

  // 🔹 일 클릭
  const handleDayClick = (day) => {
    if (!day.inMonth) return;
    setSelectedDay(day.day);
    setModalDate(day.day);
    setOpenModal(true);
  };

  // 🔹 일기 저장
  const handleSaveDiary = async (data) => {
    try {
      await reqSaveDiary({
        date: `${formattedMonth}-${String(modalDate).padStart(2, "0")}`,
        emotion: data.emotion,
        content: data.content,
      });
      setOpenModal(false);
      fetchDiaries();
    } catch (err) {
      console.error("❌ 일기 저장 실패:", err);
    }
  };

  // ✅ 달력 데이터 생성 (1~31 기준, 실제 일수 반영 가능)
const totalDays = new Date(
  currentMonth.getFullYear(),
  currentMonth.getMonth() + 1,
  0
).getDate();
const startDay = new Date(
  currentMonth.getFullYear(),
  currentMonth.getMonth(),
  1
).getDay(); // 0=일요일 ~ 6=토요일

// ✅ 필요한 칸 수 계산 (앞쪽 공백 + 실제 날짜 수)
const totalCells = startDay + totalDays;
const totalRows = Math.ceil(totalCells / 7) * 7; // 필요한 주만큼만 (5주면 35칸, 6주면 42칸)

// ✅ 달력 데이터 생성 (공백 행 제거됨)
const calendarDays = Array.from({ length: totalRows }).map((_, i) => {
  const dayNum = i - startDay + 1;
  const inMonth = dayNum > 0 && dayNum <= totalDays;

  const diary = diaryData.find((d) => {
    if (!d?.date) return false;
    return new Date(d.date).getDate() === dayNum;
  });

  const emotion = diary?.emotion;
  const isToday =
    inMonth &&
    dayNum === today &&
    currentMonth.getMonth() === todayDate.getMonth() &&
    currentMonth.getFullYear() === todayDate.getFullYear();

  return { day: inMonth ? dayNum : "", inMonth, emotion, isToday };
});

  // 🔹 통계 계산
  const emotionStats = (diaryData || []).reduce(
    (acc, cur) => {
      if (!cur.emotion) return acc;
      acc[cur.emotion] = (acc[cur.emotion] || 0) + 1;
      acc.total++;
      return acc;
    },
    { total: 0 }
  );

  const calcPercent = (count) =>
    emotionStats.total ? Math.round((count / emotionStats.total) * 100) : 0;

  const mainEmotion =
    Object.keys(emotionStats)
      .filter((e) => e !== "total")
      .reduce(
        (max, curr) =>
          emotionStats[curr] > (emotionStats[max] || 0) ? curr : max,
        "happy"
      ) || "happy";

  // 🔹 오늘 일기 존재 여부
  const diaryExists = diaryData.some(
    (d) => new Date(d.date).getDate() === today
  );

  const emotionIconMap = {
    happy: "😄",
    sad: "😢",
    angry: "😠",
    tired: "🥱",
    excited: "🥰",
    other: "😐",
  };

  return (
    <div css={s.pageWrapper}>
      <LeftSideBarLayout />

      <main css={s.mainContent}>
        <div css={s.leftColumn}>
          {/* 🔸 달력 */}
          <div css={s.card}>
            <div css={s.calendarHeader}>
              <button css={s.navButton} onClick={handlePrevMonth}>
                <ChevronLeft size={20} />
              </button>
              <h2 css={s.calendarTitle}>
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </h2>
              <button css={s.navButton} onClick={handleNextMonth}>
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

              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  css={s.dayCell({
                    inMonth: day.inMonth,
                    isToday: day.isToday,
                    isSelected: selectedDay === day.day,
                  })}
                  onClick={() => handleDayClick(day)}
                >
                  {day.inMonth && (
                    <>
                      <span>{day.day}</span>
                      {day.emotion && (
                        <span css={s.emotionIcon}>
                          {emotionIconMap[day.emotion] || "🙂"}
                        </span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 🔸 감정 통계 */}
          <div css={s.statsRow}>
            <div css={[s.card, s.statCard]}>
              <h3 css={s.chartTitle}>
                {currentMonth.getMonth() + 1}월의 감정 조각들
              </h3>
              <div css={s.donutChartWrapper}>
                <div css={s.donutChart(emotionStats)}></div>
                <div css={s.donutCenter}>
                  <span>{emotionStats.total}일</span>
                </div>
              </div>
              <div css={s.legend}>
                {["happy", "sad", "angry", "tired", "excited", "other"].map(
                  (t, i) => (
                    <div key={i} css={s.legendItem}>
                      <div>
                        <span css={s.legendColor(t)}></span>
                        {t === "happy"
                          ? "행복 😄"
                          : t === "sad"
                          ? "슬픔 😢"
                          : t === "angry"
                          ? "화남 😠"
                          : t === "tired"
                          ? "피곤 🥱"
                          : t === "excited"
                          ? "설렘 🥰"
                          : "기타 😐"}
                      </div>
                      <span>{calcPercent(emotionStats[t] || 0)}%</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* 🔸 대표 감정 */}
            <div css={[s.card, s.statCard, s.monthlyEmotionCard]}>
              <h3 css={s.chartTitle}>이달의 대표 감정</h3>
              <p css={s.monthlyEmotionIcon}>
                {mainEmotion === "happy"
                  ? "😄"
                  : mainEmotion === "sad"
                  ? "😢"
                  : mainEmotion === "angry"
                  ? "😠"
                  : mainEmotion === "excited"
                  ? "🥰"
                  : "😐"}
              </p>
              <p css={s.monthlyEmotionText}>
                이번 달은{" "}
                <span css={s.highlight(mainEmotion)}>
                  {mainEmotion === "happy"
                    ? "'행복'"
                    : mainEmotion === "sad"
                    ? "'슬픔'"
                    : mainEmotion === "angry"
                    ? "'화남'"
                    : "'기타'"}
                </span>{" "}
                한 날이 많았네요 ☀️
              </p>
            </div>
          </div>
        </div>

        {/* 🎵 오른쪽 - 오늘의 플레이리스트 */}
        <div css={s.rightColumn}>
          {diaryExists ? (
            <div css={[s.card, s.playlistCard]}>
              <h3 css={s.playlistHeader}>
                오늘을 위한 멜로디 <Music size={20} />
              </h3>
              <p css={s.playlistSubheader}>
                날씨(<span css={s.highlight("sad")}>흐림</span>) + 감정(
                <span css={s.highlight(mainEmotion)}>😄</span>)을 위한 추천
              </p>
              <div css={s.playlistScroll}>
                <div css={s.playlist}>
                  {[...Array(10)].map((_, i) => (
                    <div key={i} css={s.playlistItem}>
                      <img
                        src={`https://placehold.co/48x48/F8E9D7/5D4037?text=MD`}
                        css={s.albumArt}
                        alt="Album Art"
                      />
                      <div css={s.songInfo}>
                        <p css={s.songTitle}>추천곡 {i + 1}</p>
                        <p css={s.songArtist}>아티스트 {i + 1}</p>
                      </div>
                      <span css={s.songTime}>3:{20 + i}</span>
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
                오늘의 날씨와 감정을 기록하고 <br /> 나만의 맞춤 멜로디를
                추천받아보세요!
              </p>
              <button css={s.emptyButton} onClick={() => setOpenModal(true)}>
                <Edit3 size={16} /> 일기 쓰러 가기
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ✨ 모달 */}
      <DiaryModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveDiary}
        diary={diaryData.find(
          (d) => new Date(d.date).getDate() === modalDate
        )}
      />
    </div>
  );
}
