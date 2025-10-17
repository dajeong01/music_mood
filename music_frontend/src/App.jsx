import ReactModal from "react-modal";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
// import Header from "./components/Header/Header";
import Signin from "./pages/Auth/Signin/Signin";
import Signup from "./pages/Auth/Signup/Signup";
import Home from "./pages/home/Home";

function App() {
  ReactModal.setAppElement("#root");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/signin" element={<Signin />} />
        <Route path="/oauth/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
