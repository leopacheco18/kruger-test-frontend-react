import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/global/Footer";
import HeaderNav from "../../components/global/HeaderNav";
import LogoutButton from "../../components/global/LogoutButton";
import ProfileCard from "../../components/homeEmployee/ProfileCard";
import "./HomeEmployee.css";

const HomeEmployee = () => {
  const navigate = useNavigate();

  useEffect(() => {
    redirectHome();
  }, []);

  const redirectHome = () => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user.id_role !== 2) {
        localStorage.clear();
        navigate("/");
      }
    }

    if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <>
      <HeaderNav />
      <div className="content">
        <div className="content-container">
          <ProfileCard />
        </div>

        <LogoutButton />
      </div>
      <Footer />
    </>
  );
};

export default HomeEmployee;
