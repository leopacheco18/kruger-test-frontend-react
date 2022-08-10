import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Footer from '../../components/global/Footer';
import HeaderNav from '../../components/global/HeaderNav';
import LogoutButton from '../../components/global/LogoutButton';
import CrudUser from '../../components/homeAdmin/CrudUser';
import './HomeAdmin.css'

const HomeAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    redirectHome()
  }, [])


  const redirectHome = () => {
    if(localStorage.getItem('token') && localStorage.getItem('user')){
      let user = JSON.parse(localStorage.getItem('user'));
      if(user.id_role !== 1) {
        localStorage.clear();
        navigate("/");
      }
    }

    if(!localStorage.getItem('token') || !localStorage.getItem('user')){
      localStorage.clear();
      navigate("/");
    }
    
  }
  return (
    <>
    <HeaderNav />
    <div className='content'>
      <CrudUser />

    
    <LogoutButton />
    </div>
    <Footer />
    </>
  )
}

export default HomeAdmin