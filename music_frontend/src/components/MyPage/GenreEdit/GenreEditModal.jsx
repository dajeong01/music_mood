/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { reqGetGenresFromDb } from "../../../api/Spotify/GenreApi";
import { reqUpdateUserGenres } from "../../../api/Spotify/UserGenreApi";
import { getKoreanGenreName } from "../../../constants/GenreKeys";
import { useQueryClient } from "@tanstack/react-query";

import * as s from "./styles";

export default function GenreEditModal({ onClose, selectedGenres = [], onSave }) {
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState(selectedGenres);
  const queryClient = useQueryClient();

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
    setSelected((prev) => (prev.includes(genreId) ? prev.filter((g) => g !== genreId) : [...prev, genreId]));
  };

  const handleSave = async () => {
    await reqUpdateUserGenres(selected);
    onSave(selected);
    queryClient.invalidateQueries(["userGenres"]); // 마이페이지 관심 장르 즉시 업데이트
    queryClient.invalidateQueries(["weatherRecommendations"]); // 날씨 기반 음악 새로고침
    queryClient.invalidateQueries(["emotionRecommendations"]); // 감정 기반 음악 새로고침
    onClose();
  };

  return (
    <div css={s.overlay}>
      <div css={s.modal}>
        <h2>🎧 관심 장르 선택</h2>
        <div css={s.genreGrid}>
          {genres.length > 0 ? (
            genres.map((genre) => (
              <button key={genre.genreId} css={[s.genreButton, selected.includes(genre.genreId) && s.selected]} onClick={() => handleToggle(genre.genreId)}>
                {getKoreanGenreName(genre.genreName)}
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
