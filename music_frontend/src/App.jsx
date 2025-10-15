import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Admin from "./pages/Admin/Admin";
import Ask from "./pages/Ask/Ask";
import AskDetail from "./pages/Ask/AskDetail/AskDetail";
import AskReg from "./pages/Ask/AskReg/AskReg";
import Signin from "./pages/Auth/Signin/Signin";
import Signup from "./pages/Auth/Signup/Signup";
import CCategory from "./pages/Crew/CCategory/CCategory";
import List from "./pages/Crew/List/List";
import CrewRegister from "./pages/Crew/Register/CrewRegister";
import BoardDetail from "./pages/GlobalFree/BoardDetail/BoardDetail";
import BoardReg from "./pages/GlobalFree/BoardReg/BoardReg";
import BoardEdit from "./pages/GlobalFree/Edit/BoardEdit";
import GlobalFree from "./pages/GlobalFree/GlobalFree";
import NoticeEdit from "./pages/GlobalNotice/Edit/NoticeEdit";
import GlobalNotice from "./pages/GlobalNotice/GlobalNotice";
import NoticeDetail from "./pages/GlobalNotice/NoticeDetail/NoticeDetail";
import NoticeReg from "./pages/GlobalNotice/NoticeReg/NoticeReg";
import Home from "./pages/home/Home";
import MCategory from "./pages/Mypage/MCategory/MCategory";
import CrewRanking from "./pages/Ranking/CrewRanking/CrewRanking";
import UserRanking from "./pages/Ranking/UserRanking/UserRanking";
import Calender from "./pages/Schedule/Calender/Calender";
import Competition from "./pages/Schedule/Competition/Competition";
import CompetitionDetail from "./pages/Schedule/Competition/CompetitionDetail/CompetitionDetail";

function App() {
  ReactModal.setAppElement("#root");
  const location = useLocation();
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    const adminPageCheck = location.pathname.startsWith("/admin");
    setIsAdminPage(adminPageCheck);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/signin" element={<Signin />} />
        <Route path="/auth/oauth2/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
