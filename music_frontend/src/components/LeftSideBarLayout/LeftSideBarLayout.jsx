/** @jsxImportSource @emotion/react */
import * as s from './styles';
import ContentLayout from '../ContentLayout/ContentLayout';
import logo from '/assets/images/Melody Diary - MarkMaker Logo.png'; 

function LeftSideBarLayout({ profileSection, navigationButtons, bottomSection, children }) {
  return (
    <div css={s.layout}>
      {/* 🎵 왼쪽 사이드바 */}
      <div css={s.leftBox}>
        <div css={s.sidebarHeader}>
          <img src={logo} alt="Melody Diary Logo" css={s.sidebarLogo} />
          <h1 css={s.sidebarTitle}>Melody Diary</h1>
        </div>

        <div css={s.buttonContainer}>
          {profileSection}
          {navigationButtons}
        </div>

        {bottomSection}
      </div>

      {/* 🌤️ 오른쪽 메인 콘텐츠 */}
      <ContentLayout>{children}</ContentLayout>
    </div>
  );
}

export default LeftSideBarLayout;
