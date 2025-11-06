/** @jsxImportSource @emotion/react */
import { useQueryClient } from "@tanstack/react-query";
import { Bell, Edit2, LogOut, Music2, PieChart, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftSideBarLayout from "../../components/LeftSideBarLayout/LeftSideBarLayout";
import GenreEditModal from "../../components/MyPage/GenreEdit/GenreEditModal";
import NicknameEditor from "../../components/MyPage/Profile/NicknameEditor";
import { getKoreanGenreName } from "../../constants/GenreKeys";
import useDiaryStatisticsQuery from "../../queries/Diary/useDiaryStatisticsQuery";
import useUserGenreQuery from "../../queries/Spotify/useUserGenreQuery";
import useUserDetailQuery from "../../queries/User/useUserDetailQuery";
import * as s from "./styles";
import { usePlaylists } from "../../queries/Spotify/usePlaylist";

// 🎨 감정별 색상 매핑

const colorMap = {
  happy: "#FFE066",
  tired: "#C9C9C9",
  sad: "#9ED0FF",
  angry: "#FF8A8A",
  excited: "#FAD7A0",
  other: "#E0E0E0",
};

// ✅ 감정 막대 그래프 (EmotionHeatmap)
function EmotionHeatmap({ emotionStats = [] }) {
  if (!emotionStats || emotionStats.length === 0) {
    return (
      <div css={s.heatmapSection}>
        <h3 css={s.subTitle}>나의 감정 기록 (최근 4주)</h3>
        <p>감정 기록이 없습니다 😌</p>
      </div>
    );
  }

  const total = emotionStats.reduce((sum, e) => sum + e.count, 0);

  return (
    <div css={s.heatmapSection}>
      <h3 css={s.subTitle}>나의 감정 기록 (최근 4주)</h3>
      <div css={s.barChartWrapper}>
        {emotionStats.map((emotion, idx) => {
          const percent = ((emotion.count / total) * 100).toFixed(1);
          return (
            <div key={idx} css={s.barItem}>
              <div css={s.barLabel}>
                {emotion.emotion === "happy"
                  ? "😊 행복"
                  : emotion.emotion === "tired"
                  ? "😪 피곤"
                  : emotion.emotion === "sad"
                  ? "😢 슬픔"
                  : emotion.emotion === "angry"
                  ? "😠 화남"
                  : emotion.emotion === "excited"
                  ? "🥰 설렘"
                  : "🙂 기타"}
              </div>
              <div css={s.barBackground}>
                <div
                  css={s.barFill}
                  style={{
                    width: `${percent}%`,
                    backgroundColor: colorMap[emotion.emotion] || "#EAEAEA",
                  }}
                />
              </div>
              <span css={s.barPercent}>{percent}%</span>
            </div>
          );
        })}
      </div>
      <p css={s.totalText}>총 {total}회 감정이 기록되었어요 ✨</p>
    </div>
  );
}

export default function MyPage() {
  const navigate = useNavigate();
  const { data: playlists = [] } = usePlaylists();
  const queryClient = useQueryClient();

  // ✅ 유저 정보
  const { data, isLoading, isError, refetch } = useUserDetailQuery();
  const user = data?.data?.body[0];

  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);

  // ✅ 장르 정보
  const { data: genres, isLoading: genreLoading, isError: genreError } = useUserGenreQuery();

  // ✅ 감정 통계
  const { data: stats, isLoading: statsLoading, isError: statsError } = useDiaryStatisticsQuery();

  const handleGenreUpdate = (newGenres) => console.log("✅ 업데이트된 장르:", newGenres);
  const handleLogout = () => {
    console.log("로그아웃 시도");
    navigate("/");
};

  if (isLoading || genreLoading || statsLoading) return <div>로딩 중...</div>;
  if (isError || genreError || statsError) return <div>데이터를 불러오지 못했습니다 😢</div>;

  return (
    <div css={s.pageWrapper}>
      <LeftSideBarLayout />
      <main css={s.scrollWrapper}>
        <header css={s.header}>
          <h1>마이페이지</h1>
        </header>

        <div css={s.mainGrid}>
          {/* 🎵 왼쪽 영역 */}
          <div css={s.gridColumnLeft}>
            {/* 프로필 */}
            <section css={[s.card, s.profileCard]}>
              <div css={s.profileImgWrapper}>
                <img src={`https://placehold.co/100x100/F8E9D7/5D4037?text=${user.nickname?.slice(0, 2) || "MD"}`} alt="프로필 이미지" css={s.profileImg} />
              </div>

              <div css={s.profileInfo}>
                <div css={s.profileHeader}>
                  <NicknameEditor nickname={user.nickname} onUpdated={refetch} />
                </div>
                <p css={s.mood}>"{user.fullName ? `${user.fullName}님의 음악 일기 🎵` : "오늘의 감정을 기록해보세요 ☕"}"</p>
                <p css={s.email}>로그인 계정: {user.email}</p>
              </div>
            </section>

            {/* 🎧 나의 멜로디 */}
            <section css={s.card}>
              <h2 css={s.sectionTitle}>
                <Music2 size={22} /> 나의 멜로디
              </h2>

              <div css={s.subSection}>
                <div css={s.subHeader}>
                  <h3 css={s.subTitle}>나의 관심 장르</h3>
                  <button css={s.editButton} onClick={() => setIsGenreModalOpen(true)}>
                    <Edit2 size={13} /> 장르 수정
                  </button>
                </div>

                {/* 🎵 장르 태그 */}
                <div css={s.tagList}>
                  {genres?.length > 0 ? (
                    genres.map((genre) => (
                      <span key={genre.genreId} css={s.tagItem}>
                        # {getKoreanGenreName(genre.genreName)}
                      </span>
                    ))
                  ) : (
                    <p>선택된 장르가 없습니다 🎧</p>
                  )}
                </div>
              </div>

              <div css={s.subSection}>
                <h3 css={s.subTitle}>내가 만든 플레이리스트</h3>
                <div css={s.myPlaylistGrid}>
                  {playlists.length > 0 ? (
                    playlists.map((pl) => (
                      <div key={pl.playlistId} css={s.myPlaylistCard} onClick={() => navigate("/playlist")}>
                        <div css={s.myPlaylistIcon}>{pl.emojiKey}</div>
                        <span css={s.myPlaylistTitle}>{pl.title}</span>
                      </div>
                    ))
                  ) : (
                    <div css={s.emptyPlaylist}>
                      <p>아직 플레이리스트가 없어요 🎵</p>
                      <button css={s.addButton} onClick={() => navigate("/playlist")}>
                        ⨠ 새 플레이리스트 만들기
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {isGenreModalOpen && <GenreEditModal selectedGenres={user.genres} onClose={() => setIsGenreModalOpen(false)} onSave={handleGenreUpdate} />}
            </section>
          </div>

          {/* 📊 오른쪽 감정 통계 */}
          <div css={s.gridColumnRight}>
            <section css={s.card}>
              <h2 css={s.sectionTitle}>
                <PieChart size={22} /> 나의 감정 통계
              </h2>

              <div css={s.statsGrid}>
                <div css={s.statItem}>
                  <span css={s.statLabel}>이번 달 가장 많은 감정</span>
                  <span css={s.statValue}>
                    {stats?.mostEmotion === "happy" && "😄 행복"}
                    {stats?.mostEmotion === "sad" && "😢 슬픔"}
                    {stats?.mostEmotion === "tired" && "😪 피곤"}
                    {stats?.mostEmotion === "angry" && "😠 화남"}
                    {stats?.mostEmotion === "excited" && "🥰 설렘"}
                    {stats?.mostEmotion === "none" && "데이터 없음"}
                  </span>
                </div>

                <div css={s.statItem}>
                  <span css={s.statLabel}>총 멜로디 기록</span>
                  <span css={s.statValue}>
                    <span style={{ color: "#FF9A76", fontWeight: 600 }}>{stats?.totalCount}</span> 개
                  </span>
                </div>
              </div>

              {/* 막대 그래프형 감정 통계 */}
              <EmotionHeatmap emotionStats={stats?.emotionStats} />
            </section>

            {/* ⚙️ 계정 관리 */}
            <section css={s.card}>
              <h2 css={s.sectionTitle}>
                <Settings size={22} /> 계정 관리
              </h2>
              <div css={s.accountList}>
                {/* <div css={s.accountItem}>
                  <span>
                    <Bell size={18} /> 알림 설정
                  </span>
                  <span>&gt;</span>
                </div> */}
                <div css={s.accountItem} onClick={handleLogout}>
                  <span>
                    <LogOut size={18}/> 로그아웃
                  </span>
                  <span>&gt;</span>
                </div>
                {/* <div css={[s.accountItem, s.dangerItem]} onClick={handleDeactivate}>
                  <span>
                    <Trash2 size={18} /> 회원 탈퇴
                  </span>
                  <span>&gt;</span>
                </div> */}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
