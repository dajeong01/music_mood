/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { usePlaylists, useAddTrackToPlaylist } from "../../../queries/Spotify/usePlaylist";

export default function PlaylistPickModal({ track, onClose }) {
  const { data: playlists = [] } = usePlaylists();
  const { mutateAsync } = useAddTrackToPlaylist();
  console.log(track)

const handleSelect = async (playlistId) => {
  await mutateAsync({
    playlistId,
    track: {
      trackId: track.id,
      trackName: track.name,
      artistName: track.artist,
      imageUrl: track.image,
      previewUrl: track.preview
    }
  });

  alert("✅ 플레이리스트에 추가 완료!");
  onClose();
};


  return (
    <div css={s.overlay}>
      <div css={s.modal}>
        <h3 css={s.title}>플레이리스트에 추가</h3>

        {playlists.map((pl) => (
          <button
            key={pl.playlistId}
            css={s.item}
            onClick={() => handleSelect(pl.playlistId)}
          >
            <span css={s.emoji}>{pl.emojiKey}</span>
            <span css={s.name}>{pl.title}</span>
          </button>
        ))}

        <button css={s.closeBtn} onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
