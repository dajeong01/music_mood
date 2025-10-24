/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import * as s from "./styles";
import { reqGetSpotifyGenres } from "../../api/Spotify/GenreApi";
import { reqUpdateUserGenres } from "../../api/User/UserApi";

export default function GenreEditModal({ onClose, selectedGenres = [], onSave }) {
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState(selectedGenres);

  useEffect(() => {
    (async () => {
      const res = await reqGetSpotifyGenres();
      setGenres(res.data.genres);
    })();
  }, []);

  const handleToggle = (genre) => {
    setSelected((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSave = async () => {
    await reqUpdateUserGenres(selected);
    onSave(selected);
    onClose();
  };

  return (
    <div css={s.overlay}>
      <div css={s.modal}>
        <h2>🎧 관심 장르 선택</h2>
        <div css={s.genreGrid}>
          {genres.map((genre) => (
            <button
              key={genre}
              css={[s.genreButton, selected.includes(genre) && s.selected]}
              onClick={() => handleToggle(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        <div css={s.buttonRow}>
          <button css={s.cancel} onClick={onClose}>취소</button>
          <button css={s.save} onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
}
