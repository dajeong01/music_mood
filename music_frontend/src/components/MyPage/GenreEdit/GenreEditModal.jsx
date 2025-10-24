/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { reqGetGenresFromDb } from "../../../api/Spotify/GenreApi";
import { reqUpdateUserGenres } from "../../../api/Spotify/UserGenreApi";
import { getKoreanGenreName } from "../../../constants/GenreKeys";
import * as s from "./styles";

export default function GenreEditModal({ onClose, selectedGenres = [], onSave }) {
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState(selectedGenres);

  useEffect(() => {
    (async () => {
      try {
        const res = await reqGetGenresFromDb();
        console.log("🎧 DB에서 불러온 장르:", res);
        // ✅ ResponseDto 구조: { code, message, body: [...] }
        setGenres(res.body || []);
      } catch (err) {
        console.error("❌ 장르 불러오기 실패:", err);
      }
    })();
  }, []);

  const handleToggle = (genreId) => {
    setSelected((prev) =>
      prev.includes(genreId)
        ? prev.filter((g) => g !== genreId)
        : [...prev, genreId]
    );
  };

  const handleSave = async () => {
    await reqUpdateUserGenres(selected); // [1, 4, 7] 이런 ID 배열 전달
    onSave(selected);
    onClose();
  };

  return (
    <div css={s.overlay}>
      <div css={s.modal}>
        <h2>🎧 관심 장르 선택</h2>
        <div css={s.genreGrid}>
          {genres.length > 0 ? (
            genres.map((genre) => (
              <button
                key={genre.genre_id}
                css={[
                  s.genreButton,
                  selected.includes(genre.genre_id) && s.selected,
                ]}
                onClick={() => handleToggle(genre.genre_id)}
              >
                {getKoreanGenreName(genre.genre_name)}
              </button>
            ))
          ) : (
            <p>장르 목록을 불러오는 중입니다...</p>
          )}
        </div>

        <div css={s.buttonRow}>
          <button css={s.cancel} onClick={onClose}>
            취소
          </button>
          <button css={s.save} onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
