/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useCreatePlaylist } from "../../../queries/Spotify/usePlaylist";
import * as s from "./styles";

const emojiOptions = ["🎵", "🎧", "✨", "❤️", "⭐", "🌧️", "☀️", "😴", "👟", "📚", "☕", "🌙", "🥳", "🎮", "🌱"];

export default function NewPlaylistModal({ onClose }) {
  const [selectedEmoji, setSelectedEmoji] = useState("🎵");
  const [title, setTitle] = useState("");

  const { mutate: createPlaylist } = useCreatePlaylist();

  const handleSave = () => {
    if (!title.trim()) {
      alert("플레이리스트 이름을 입력해주세요!");
      return;
    }

    createPlaylist(
      { emojiKey: selectedEmoji, title },
      {
        onSuccess: () => {
          alert("✨ 플레이리스트가 생성되었습니다!");
          onClose();
        },
        onError: () => alert("❌ 플레이리스트 생성 실패..."),
      }
    );
  };

  return (
    <div css={s.overlay}>
      <div css={s.modalCard}>
        <div css={s.header}>
          <h2>새 플레이리스트</h2>
          {/* <button css={s.closeBtn} onClick={onClose}>
            ×
          </button> */}
        </div>

        <div>
          <p css={s.sectionTitle}>아이콘</p>
          <div css={s.iconPreview}>{selectedEmoji}</div>

          <div css={s.emojiGrid}>
            {emojiOptions.map((emoji, idx) => (
              <button key={idx} css={[s.emojiItem, selectedEmoji === emoji && s.emojiSelected]} onClick={() => setSelectedEmoji(emoji)}>
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div css={s.inputWrap}>
          <p css={s.sectionTitle}>제목</p>
          <input css={s.input} placeholder="플레이리스트 이름 입력..." value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div css={s.footer}>
          <button css={s.btnCancel} onClick={onClose}>
            취소
          </button>
          <button css={s.btnSave} onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
