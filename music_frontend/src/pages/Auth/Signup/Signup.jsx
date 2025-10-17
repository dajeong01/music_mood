import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { reqCheckNickname, reqRegisterUser } from "../../../api/User/UserApi";
import { SIGNUP_REGEX, SIGNUP_REGEX_ERROR_MESSAGE } from "../../../constants/signupRegex";

function Signup() {
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const providerId = searchParams.get("providerId");
  const oauthType = searchParams.get("oauthType");

  const [user, setUser] = useState({
    fullName: "",
    nickname: "",
    isNicknameChecked: false,
  });

  const [errors, setErrors] = useState({
    nickname: "",
  });

  const updateUser = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateField = (field, value) => {
    if (field === "nickname" && !SIGNUP_REGEX.nickName.test(value)) {
      return SIGNUP_REGEX_ERROR_MESSAGE.nickName;
    }
    return "";
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    updateUser("nickname", value);
    updateUser("isNicknameChecked", false);
    const errorMsg = validateField("nickname", value);
    setErrors((prev) => ({ ...prev, nickname: errorMsg }));
  };

  const handleCheckNickname = async () => {
    if (!user.nickname.trim()) return;
    try {
      const response = await reqCheckNickname(user.nickname);
      const isAvailable = response.data.body === "false";
      if (isAvailable) {
        updateUser("isNicknameChecked", true);
        alert("사용 가능한 닉네임입니다!");
      } else {
        alert("중복된 닉네임입니다.");
      }
    } catch {
      alert("중복확인 중 오류가 발생했습니다.");
    }
  };

  const handleOnRegisterUser = async () => {
    const regUser = {
      oauthType,
      providerId,
      email,
      fullName: user.fullName,
      nickname: user.nickname,
    };

    try {
      const result = await reqRegisterUser(regUser);
      const accessToken = result?.data?.body?.accessToken;

      if (accessToken) {
        const bearerToken = `Bearer ${accessToken}`;
        localStorage.setItem("AccessToken", bearerToken);
        await queryClient.invalidateQueries({ queryKey: ["principal"] });
        alert("회원가입이 완료되었습니다!");
        navigate("/");
      } else {
        alert("회원가입은 되었지만 토큰 발급에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  const isNicknameValid = SIGNUP_REGEX.nickName.test(user.nickname);
  const isUserValid = user.fullName.trim() && user.isNicknameChecked && isNicknameValid;

  return (
    <div>
      <h2>추가 정보 입력</h2>

      <div>
        <h3>이메일</h3>
        <input disabled value={email || ""} />
      </div>

      <div>
        <h3>이름</h3>
        <input value={user.fullName} onChange={(e) => updateUser("fullName", e.target.value)} required />
      </div>

      <div>
        <h3>닉네임</h3>
        <input type="text" value={user.nickname} onChange={handleNicknameChange} required />
        <button onClick={handleCheckNickname} disabled={!user.nickname.trim()}>
          {user.isNicknameChecked ? "❤️ 사용 가능!" : "닉네임 중복 확인"}
        </button>
        {errors.nickname && <p style={{ color: "red" }}>{errors.nickname}</p>}
      </div>

      <button type="button" onClick={handleOnRegisterUser} disabled={!isUserValid}>
        회원가입 완료
      </button>
    </div>
  );
}

export default Signup;
