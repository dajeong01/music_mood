/** @jsxImportSource @emotion/react */
import { Edit2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { reqCheckNickname, reqUpdateNickname } from "../../../api/User/UserApi";
import * as s from "./styles";

export default function NicknameEditor({ nickname: initialNickname, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(initialNickname);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");

  const handleEditClick = async () => {
    if (isEditing && isChecked) {
      // ✅ 수정 완료
      try {
        await reqUpdateNickname({nickname});
        toast.success("닉네임이 성공적으로 변경되었어요 🎉", {
          icon: "✨",
          style: {
            borderRadius: "10px",
            background: "#fffaf5",
            color: "#5d4037",
            fontWeight: "500",
          },
        });

        setIsEditing(false);
        setIsChecked(false);
        setMessage("");
        onUpdated?.(); // 부모 refetch 호출
      } catch {
        toast.error("닉네임 수정 중 오류가 발생했어요 😢", {
          style: {
            borderRadius: "10px",
            background: "#fff1f2",
            color: "#6b1a1a",
          },
        });
      }
    } else {
      // ✏️ 수정 시작
      setIsEditing(true);
      setIsChecked(false);
      setMessage("");
    }
  };

  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      setMessage("닉네임을 입력해주세요.");
      return;
    }

    try {
      const res = await reqCheckNickname(nickname);
      console.log("닉네임 체크 결과:", nickname, res.data.body);
      if (res.data.body === "false") {
        setIsChecked(true);
        setMessage("✅ 사용 가능한 닉네임이에요!");
      } else {
        setIsChecked(false);
        setMessage("⚠️ 이미 존재하는 닉네임이에요.");
      }
    } catch {
      setMessage("서버 오류가 발생했어요.");
    }
  };

  return (
    <div css={s.wrapper}>
      {isEditing ? (
        <div css={s.editMode}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setIsChecked(false);
              setMessage("");
            }}
            css={s.nicknameInput}
          />
          <button css={s.checkButton} onClick={handleCheckNickname}>
            중복 확인
          </button>
          <button css={[s.saveButton, !isChecked && s.disabled]} onClick={handleEditClick} disabled={!isChecked}>
            수정 완료
          </button>
        </div>
      ) : (
        <div css={s.displayMode}>
          <span css={s.nicknameText}>{nickname}</span>
          <button css={s.editButton} onClick={handleEditClick}>
            <Edit2 size={13} /> 닉네임 수정
          </button>
        </div>
      )}
      {message && <p css={s.message}>{message}</p>}
    </div>
  );
}
