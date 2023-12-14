import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import View from "./Pages/View";
function App() {
  const navigate = useNavigate();
  return (
    <GoogleOAuthProvider clientId="1061676741686-j9flk690mn53ba8nupppk5n0h8d9t1ca.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
