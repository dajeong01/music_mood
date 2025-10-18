/** @jsxImportSource @emotion/react */
import { CiCalendarDate, CiCloudSun, CiMusicNote1, CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Melody Diary - MarkMaker Logo1.png";
import * as s from "./styles";

export default function LeftSideBarLayout() {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <CiCloudSun size={22} />,
      label: "오늘의 날씨",
      path: "/weather",
    },
    {
      icon: <CiCalendarDate size={22} />,
      label: "감정 캘린더",
      path: "/calendar",
    },
    {
      icon: <CiMusicNote1 size={22} />,
      label: "플레이리스트",
      path: "/playlist",
    },
    {
      icon: <CiUser size={22} />,
      label: "마이페이지",
      path: "/mypage",
    },
  ];

  return (
    <div css={s.wrapper}>
      <div css={s.logoBox}>
        <img src={Logo} alt="Melody Diary" css={s.logoImg} />
        {/* <h1>Melody Diary</h1> */}
      </div>

      <div css={s.menuList}>
        {menuItems.map((item, idx) => (
          <div key={idx} css={s.menuItem} onClick={() => navigate(item.path)}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
