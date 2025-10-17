/** @jsxImportSource @emotion/react */
import { useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import usePrincipalQuery from "../../queries/User/usePrincipalQuery";
import * as s from "./styles";
import logo from "/assets/images/Melody Diary - MarkMaker Logo.png"; 

function Header() {
  const principalQuery = usePrincipalQuery();
  const queryClient = useQueryClient();
  const userInfo = principalQuery?.data?.data?.body?.user;

  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleProfileClick = () => {
    const accessToken = localStorage.getItem("AccessToken");
    handleNavigate(accessToken ? "/mypage" : "/auth/oauth2/signin");
  };

  const handleLogout = () => {
    const accessToken = localStorage.getItem("AccessToken");
    if (!accessToken) return alert("로그인 상태가 아닙니다.");

    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("AccessToken");
      queryClient.clear();
      handleNavigate("/");
      alert("로그아웃되었습니다.");
    }
  };

  const handleAdminPageOnClick = () => handleNavigate("/admin");

  return (
    <header css={s.header}>
      {/* 🪶 Melody Diary 로고 */}
      <div css={s.logoContainer} onClick={() => handleNavigate("/")}>
        <img src={logo} alt="Melody Diary Logo" css={s.logoImage} />
        <span css={s.logoText}>Melody Diary</span>
      </div>

      {/* 🔽 상단 네비게이션 */}
      <nav
        css={s.nav}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(true)}
      >
        <ul css={s.menu}>
          <li><a>오늘의 날씨</a></li>
          <li><a>감정 캘린더</a></li>
          <li><a>플레이리스트</a></li>
          <li><a>마이페이지</a></li>
        </ul>
      </nav>

      {/* 👤 유저 관련 아이콘 */}
      <div css={s.icons}>
        {userInfo?.role === "ROLE_ADMIN" && (
          <div css={s.icon} onClick={handleAdminPageOnClick}>
            <Settings />
          </div>
        )}
        <div css={s.icon} onClick={handleProfileClick}>
          {userInfo?.picture ? (
            <div css={s.profileImgBox}>
              <img src={userInfo.picture} alt="프로필 이미지" />
            </div>
          ) : (
            <FiUser />
          )}
        </div>
        {userInfo && (
          <div css={s.icon} onClick={handleLogout}>
            <TbLogout />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
