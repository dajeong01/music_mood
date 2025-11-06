/** @jsxImportSource @emotion/react */
import { X } from "lucide-react";
import { usePlaylistTracks } from "../../../queries/Spotify/usePlaylist";
import * as s from "./styles";
import { useState } from "react";
import TrackModal from "../../Spotify/TrackModal";

export default function PlaylistDetailModal({ playlist, onClose }) {
  const { playlistId, title, emojiKey } = playlist;
  const { data: tracks = [] } = usePlaylistTracks(playlistId);
  const [selectedTrack, setSelectedTrack] = useState(null);

  return (
    <div css={s.overlay}>
      <div css={s.modalCard}>
<div css={s.modalHeader}>
  <div css={s.headerLeft}>
    <div css={s.playlistIcon}>{emojiKey}</div>
    <div>
      <h2 css={s.playlistTitle}>{title}</h2>
      <p css={s.playlistCount}>총 {tracks.length}곡</p>
    </div>
  </div>

  <button css={s.closeButton} onClick={onClose}>
    <X size={20} />
  </button>
</div>

        <div css={s.trackScroll}>
          {tracks.map((t, i) => (
            <div key={i} css={s.trackItem} onClick={() => setSelectedTrack(t)}>
              <img src={t.imageUrl} css={s.albumArt} alt="track" />
              <div css={s.trackInfo}>
                <p css={s.trackTitle}>{t.trackName}</p>
                <p css={s.trackArtist}>{t.artistName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedTrack && (
        <TrackModal
          track={{
            id: selectedTrack.trackId,
            name: selectedTrack.trackName,
            artist: selectedTrack.artistName,
            image: selectedTrack.imageUrl,
            preview: selectedTrack.previewUrl,
          }}
          onClose={() => setSelectedTrack(null)}
        />
      )}
    </div>
  );
}
