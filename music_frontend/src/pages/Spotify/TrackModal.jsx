/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import { CiStar } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import PlaylistPickerModal from "../Playlist/Pick/PlaylistPickModal";

export default function TrackModal({ track, onClose }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPlaylistPicker, setShowPlaylistPicker] = useState(false);

  const openSpotify = () => {
    window.open(`https://open.spotify.com/track/${track.id}`, "_blank");
  };

  const openYouTube = () => {
    const query = encodeURIComponent(`${track.name} ${track.artist}`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
  };

  return (
    <div css={s.overlay}>
      <div css={s.modal}>
        <button css={s.closeBtn} onClick={onClose}>
          ✕
        </button>

        <img src={track.image} alt="Album Art" css={s.albumArt} />

        <div css={s.titleRow}>
          <div css={s.textArea}>
            <h2 css={s.title}>{track.name}</h2>
            <p css={s.artist}>{track.artist}</p>
          </div>

          <div
            css={s.favoriteIcon}
            onClick={() => {
              setIsFavorite(true);
              setShowPlaylistPicker(true);
            }}
          >
            {isFavorite ? <AiFillStar size={22} color="#FACC15" /> : <CiStar size={22} color="#444" />}
          </div>
        </div>

        {/* 미리듣기 */}
        <div css={s.previewBox}>
          {track.preview ? <audio controls src={track.preview} style={{ width: "100%" }} /> : <div css={s.previewPlaceholder}>미리듣기 없음 😢</div>}
        </div>

        <div css={s.actionBtns}>
          {/* Spotify */}
          <button css={s.btn} onClick={openSpotify}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/2024_Spotify_Logo_%28black%29.svg" alt="Spotify" css={s.platformIcon} />
            {/* Spotify */}
          </button>

          {/* YouTube */}
          <button css={s.btn} onClick={openYouTube}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube" css={s.platformIcon} />
            {/* YouTube 웹 열기 */}
          </button>
        </div>
      </div>
      {showPlaylistPicker && <PlaylistPickerModal track={track} onClose={() => setShowPlaylistPicker(false)} />}
    </div>
  );
}
