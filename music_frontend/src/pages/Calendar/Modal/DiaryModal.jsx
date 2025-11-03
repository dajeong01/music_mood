/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import * as s from "./styles";

export default function DiaryModal({ isOpen, onClose, onSave, diary }) {
  const [selectedEmotion, setSelectedEmotion] = useState("happy");
  const [content, setContent] = useState("");

  const emotions = [
    { key: "happy", icon: "😄", label: "행복" },
    { key: "sad", icon: "😢", label: "슬픔" },
    { key: "angry", icon: "😠", label: "화남" },
    { key: "excited", icon: "🥰", label: "설렘" },
    { key: "tired", icon: "😴", label: "피곤" },
    { key: "other", icon: "😐", label: "그냥" },
  ];

  useEffect(() => {
    if (!isOpen) {
      setSelectedEmotion("happy");
      setContent("");
    } else if (diary) {
      setSelectedEmotion(diary.emotion || "happy");
      setContent(diary.content || "");
    }
  }, [isOpen, diary]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSave = () => {
    if (!content.trim()) {
      alert("내용을 입력해주세요 📝");
      return;
    }
    onSave({ emotion: selectedEmotion, content });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div css={s.overlay} onClick={handleOverlayClick}>
      <div css={s.modalCard}>
        {/* Header */}
        <div css={s.header}>
          <h2 css={s.title}>일기 작성</h2>
          <button css={s.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* 감정 선택 */}
        <div css={s.section}>
          <h3 css={s.sectionTitle}>오늘의 감정은?</h3>
          <div css={s.emotionList}>
            {emotions.map((emo) => (
              <div
                key={emo.key}
                css={s.emotionItem({
                  isSelected: selectedEmotion === emo.key,
                  emotion: emo.key,
                })}
                onClick={() => setSelectedEmotion(emo.key)}
              >
                <span css={s.emotionIcon}>{emo.icon}</span>
                <span css={s.emotionLabel}>{emo.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div css={s.section}>
          <h3 css={s.sectionTitle}>오늘의 멜로디</h3>
          <textarea
            css={s.textarea}
            rows={6}
            placeholder="오늘의 날씨, 기분, 들었던 노래 등 자유롭게 기록해 보세요 🎧"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div css={s.footer}>
          <button css={s.saveButton} onClick={handleSave}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
