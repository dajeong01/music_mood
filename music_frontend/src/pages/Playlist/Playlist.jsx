/** @jsxImportSource @emotion/react */
import LeftSideBarLayout from "../../components/LeftSideBarLayout/LeftSideBarLayout";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";

export default function Playlist() {
  const navigate = useNavigate();

  // 임시 데이터 — 나중에 API 연결 예정
  const playlists = [
    { id: 1, emoji: "🌧️", title: "비 오는 날 오후", count: 12 },
    { id: 2, emoji: "☀️", title: "햇살 좋은 아침에", count: 23 },
    { id: 3, emoji: "😴", title: "잠 못 드는 새벽", count: 8 },
    { id: 4, emoji: "👟", title: "숲속에서 힐링", count: 15 },
    { id: 5, emoji: "❤️", title: "사랑이 시작될 때", count: 31 },
  ];

  return (
    <div css={s.pageWrapper}>
      <LeftSideBarLayout />

      <div css={s.container}>
        <h1 css={s.title}>나의 플레이리스트</h1>
        <p css={s.subtitle}>당신의 감정들이 모여 만들어진 멜로디.</p>

        <div css={s.grid}>
          {/* ✅ 새 플레이리스트 버튼 */}
          <button css={s.newPlaylistCard} onClick={() => alert("새 playlist 만들기!")}>
            <div css={s.plusIcon}>+</div>
            <span css={s.newText}>새 플레이리스트</span>
          </button>

          {/* ✅ 플레이리스트 목록 */}
          {playlists.map((p) => (
            <div key={p.id} css={s.card} onClick={() => navigate(`/playlist/${p.id}`)}>
              <div css={s.cover}>{p.emoji}</div>
              <div css={s.cardBody}>
                <h3 css={s.cardTitle}>{p.title}</h3>
                <p css={s.cardCount}>{p.count}곡</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
