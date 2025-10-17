/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { CiCloudSun, CiCalendarDate, CiUser } from "react-icons/ci";
import { RiFolderMusicLine } from "react-icons/ri";
import Logo from "../../assets/images/Melody Diary - MarkMaker Logo.png";

export default function LeftSideBarLayout() {
  const menuItems = [
    { icon: <CiCloudSun size={22} />, label: "오늘의 날씨" },
    { icon: <CiCalendarDate size={22} />, label: "감정 캘린더" },
    { icon: <RiFolderMusicLine size={22} />, label: "플레이리스트" },
    { icon: <CiUser size={22} />, label: "마이페이지" },
  ];

  return (
    <div css={s.sidebarContainer}>
      <div css={s.logoBox}>
        <img src={Logo} alt="Melody Diary Logo" css={s.logoImage} />
        <h1 css={s.logoTitle}>Melody Diary</h1>
      </div>

      <nav css={s.menuList}>
        {menuItems.map((item, idx) => (
          <div key={idx} css={s.menuItem}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div css={s.userSection}>
        <div css={s.userIcon}>U</div>
        <span css={s.username}>Username</span>
      </div>
    </div>
  );
}
