import ReactModal from "react-modal";
import { Route, Routes } from "react-router-dom";
// import Header from "./components/Header/Header";
import Signin from "./pages/Auth/Signin/Signin";
import Signup from "./pages/Auth/Signup/Signup";
import Home from "./pages/home/Home";
import Weather from "./pages/Weather/Weather";
import MyPage from "./pages/MyPage/MyPage";
import { Toaster } from "react-hot-toast";
import Calendar from "./pages/Calendar/Calendar";
import SpotifyRedirectHandler from "./pages/Spotify/SpotifyRedirectHandler";

function App() {
  ReactModal.setAppElement("#root");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/signin" element={<Signin />} />
        <Route path="/oauth/signup" element={<Signup />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/auth/spotify/redirect" element={<SpotifyRedirectHandler />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />

      {/* <Footer /> */}
    </>
  );
}

export default App;
