/** @jsxImportSource @emotion/react */
import { useState } from "react";
import LeftSideBarLayout from "../../components/LeftSideBarLayout/LeftSideBarLayout";
import { usePlaylists } from "../../queries/Spotify/usePlaylist";
import NewPlaylistModal from "./New/NewPlaylistModal";
import * as s from "./styles";
import PlaylistDetailModal from "./Tracks/PlaylistDetailModal";


export default function Playlist() {
  const { data: playlists } = usePlaylists();

  // 새 플레이리스트 모달
  const [openNewModal, setOpenNewModal] = useState(false);

  // 플레이리스트 상세 모달
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);

  return (
    <div css={s.pageWrapper}>
      <LeftSideBarLayout />

      <div css={s.container}>
        <h1 css={s.title}>나의 플레이리스트</h1>

        <div css={s.grid}>
          {/* 새 플레이리스트 생성 버튼 */}
          <button css={s.newCard} onClick={() => setOpenNewModal(true)}>
            <span css={s.plus}>＋</span>
            <span css={s.newText}>새 플레이리스트</span>
          </button>

          {/* 플레이리스트 카드 */}
          {playlists?.map((pl) => (
            <div
              key={pl.playlistId}
              css={s.card}
              onClick={() => {
                setSelectedPlaylist(pl);
                setOpenPlaylistModal(true);
              }}
            >
              <div css={s.cover}>{pl.emojiKey}</div>
              <div css={s.cardBody}>
                <h3 css={s.cardTitle}>{pl.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* 새 플레이리스트 모달 */}
        {openNewModal && (
          <NewPlaylistModal onClose={() => setOpenNewModal(false)} />
        )}

        {/* 플레이리스트 상세 모달 */}
        {openPlaylistModal && (
          <PlaylistDetailModal
            playlist={selectedPlaylist}
            onClose={() => setOpenPlaylistModal(false)}
          />
        )}
      </div>
    </div>
  );
}
