/** @jsxImportSource @emotion/react */
import { useQueryClient } from "@tanstack/react-query";
import { Bell, Edit2, LogOut, Music2, PieChart, Settings, Sun, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftSideBarLayout from "../../components/LeftSideBarLayout/LeftSideBarLayout";
import GenreEditModal from "../../components/MyPage/GenreEdit/GenreEditModal";
import NicknameEditor from "../../components/MyPage/Profile/NicknameEditor";
import useUserDetailQuery from "../../queries/User/useUserDetailQuery";
import * as s from "./styles";
import { getKoreanGenreName } from "../../constants/GenreKeys";
import useUserGenreQuery from "../../queries/Spotify/useUserGenreQuery";

const mockGenres = ["재즈", "어쿠스틱", "시티팝", "발라드", "OST"];

const mockPlaylists = [
  { id: 1, name: "비 오는 날", emoji: "🌧️" },
  { id: 2, name: "햇살 가득", emoji: "☀️" },
  { id: 3, name: "잠들기 전", emoji: "😴" },
  { id: 4, name: "산책할 때", emoji: "👟" },
];

const mockHeatmapData = [
  null,
  1,
  null,
  3,
  1,
  null,
  2,
  "sad",
  null,
  1,
  null,
  2,
  1,
  null,
  null,
  1,
  3,
  null,
  "sad",
  null,
  1,
  null,
  2,
  null,
  1,
  1,
  null,
  null,
  3,
  null,
  "angry",
  null,
  2,
  3,
  null,
  null,
  1,
  null,
  1,
  null,
  null,
  2,
  null,
  1,
  null,
  3,
  1,
  null,
  2,
  null,
  null,
  1,
  "sad",
  null,
  1,
  null,
];

function EmotionHeatmap() {
  return (
    <div css={s.heatmapSection}>
      <h3 css={s.subTitle}>나의 감정 기록 (최근 4주)</h3>
      <div css={s.heatmapGrid}>
        {mockHeatmapData.map((level, index) => (
          <div key={index} css={s.heatmapDay(level)} />
        ))}
      </div>
    </div>
  );
}

export default function MyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useUserDetailQuery();
  const user = data?.data?.body[0];

  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);

  // ✅ 추가: 유저 장르 불러오기
  const { data: genres, isLoading: genreLoading, isError: genreError } = useUserGenreQuery();

  const handleGenreUpdate = (newGenres) => {
    console.log("✅ 업데이트된 장르:", newGenres);
  };

  const handleLogout = () => {
    console.log("로그아웃 시도");
  };
  const handleDeactivate = () => {
    console.log("회원 탈퇴 시도");
  };

  if (isLoading || genreLoading) return <div>로딩 중...</div>;
  if (isError || genreError) return <div>유저 정보를 불러오지 못했습니다.</div>;

  return (
    <div css={s.pageWrapper}>
      <LeftSideBarLayout />
      <main css={s.scrollWrapper}>
        <header css={s.header}>
          <h1>마이페이지</h1>
        </header>

        <div css={s.mainGrid}>
          <div css={s.gridColumnLeft}>
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
                <div css={s.playlistGrid}>
                  {user.playlists?.length > 0 ? (
                    user.playlists.map((playlist) => (
                      <div key={playlist.id} css={s.playlistItem}>
                        <div css={s.playlistCover}>
                          <span className="emoji">{playlist.emoji}</span>
                        </div>
                        <span>{playlist.name}</span>
                      </div>
                    ))
                  ) : (
                    <div css={s.emptyPlaylist}>
                      <p>아직 플레이리스트가 없어요 </p>
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

          <div css={s.gridColumnRight}>
            <section css={s.card}>
              <h2 css={s.sectionTitle}>
                <PieChart size={22} /> 나의 감정 통계
              </h2>
              <div css={s.statsGrid}>
                <div css={s.statItem}>
                  <span css={s.statLabel}>이번 달 가장 많은 감정</span>
                  <span css={s.statValue}>😄 행복</span>
                </div>
                <div css={s.statItem}>
                  <span css={s.statLabel}>총 멜로디 기록</span>
                  <span css={s.statValue}>127 개</span>
                </div>
                <div css={s.statItem}>
                  <span css={s.statLabel}>나의 행복한 날씨</span>
                  <span css={s.statValue}>
                    <Sun size={20} /> 맑음
                  </span>
                </div>
              </div>

              <EmotionHeatmap />
            </section>

            <section css={s.card}>
              <h2 css={s.sectionTitle}>
                <Settings size={22} /> 계정 관리
              </h2>
              <div css={s.accountList}>
                <div css={s.accountItem}>
                  <span>
                    <Bell size={18} /> 알림 설정
                  </span>
                  <span>&gt;</span>
                </div>
                <div css={s.accountItem} onClick={handleLogout}>
                  <span>
                    <LogOut size={18} /> 로그아웃
                  </span>
                  <span>&gt;</span>
                </div>
                <div css={[s.accountItem, s.dangerItem]} onClick={handleDeactivate}>
                  <span>
                    <Trash2 size={18} /> 회원 탈퇴
                  </span>
                  <span>&gt;</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
