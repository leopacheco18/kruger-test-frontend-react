import React, { useEffect } from "react";
import "./Login.css";
import KrugerLogo from "./../../assets/img/logos/kruger_logo.png";
import LoginForm from "../../components/login/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    redirectHome()
  }, [])


  const redirectHome = () => {
    if(localStorage.getItem('token') && localStorage.getItem('user')){
      let user = JSON.parse(localStorage.getItem('user'));
      if(user.id_role === 1) {
        navigate("/homeAdmin");
      }else if( user.id_role === 2) {
        navigate("/homeEmployee");
      }else{
        localStorage.clear();
      }
    }
  }

  return (
    <div className="container-login">
      <div className="login-kruger-logo">
        <img src={KrugerLogo} alt="Logo de Kruger" />
      </div>
      <div className="card-login">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
