import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const HomeEmployee = () => {
  const navigate = useNavigate();

  useEffect(() => {
    redirectHome()
  }, [])


  const redirectHome = () => {
    if(localStorage.getItem('token') && localStorage.getItem('user')){
      let user = JSON.parse(localStorage.getItem('user'));
      if(user.id_role !== 2) {
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
    <div>HomeEmployee</div>
  )
}

export default HomeEmployee