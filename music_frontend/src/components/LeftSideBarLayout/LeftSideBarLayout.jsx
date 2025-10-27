/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate } from "react-router-dom";
import { CloudSun, CalendarDays, ListMusic, User } from "lucide-react";
import * as s from "./styles";

export default function LeftSideBarLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <CloudSun size={20} />, label: "오늘의 날씨", path: "/weather" },
    { icon: <CalendarDays size={20} />, label: "감정 캘린더", path: "/calendar" },
    { icon: <ListMusic size={20} />, label: "플레이리스트", path: "/playlist" },
  ];

  const mypageMenu = {
    icon: <User size={20} />,
    label: "마이페이지",
    path: "/mypage",
  };

  return (
    <aside css={s.sidebar}>
      {/* 로고 영역 */}
      <div css={s.logoBox} >
        <h1 css={s.logoText}>Melody Diary</h1>
      </div>

      {/* 메뉴 리스트 */}
      <nav css={s.menuList}>
        {menuItems.map((item) => (
          <div
            key={item.label}
            css={s.menuItem({ isActive: location.pathname === item.path })}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* 하단 마이페이지 */}
      <div css={s.sidebarSpacer}></div>
      <div css={s.menuList}>
        <div
          css={s.menuItem({ isActive: location.pathname === mypageMenu.path })}
          onClick={() => navigate(mypageMenu.path)}
        >
          {mypageMenu.icon}
          <span>{mypageMenu.label}</span>
        </div>
      </div>
    </aside>
  );
}
