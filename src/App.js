import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import HomeAdmin from "./pages/homeAdmin/HomeAdmin";
import HomeEmployee from "./pages/homeEmployee/HomeEmployee";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homeAdmin" element={<HomeAdmin />} />
        <Route path="/homeEmployee" element={<HomeEmployee />} />
        <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
