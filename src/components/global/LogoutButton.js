import React from 'react'
import { LogoutOutlined } from '@ant-design/icons';
import useHttp from '../../hooks/useHttp';
import { message } from 'antd';
import { useNavigate } from "react-router-dom";


const LogoutButton = () => {

  const { isLoading, request } = useHttp();
  const navigate = useNavigate();
  
  const logout = async () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let config = {
      type: "post",
      endpoint: "logout",
      data: {...user}
    };
    const response = await request(config);
    if(response.success){
        message.success('Se cerro la sesión de manera satisfactoria');
        localStorage.clear();
        navigate('/')
    }
  }

  return (
    <div className='logout-button' onClick={logout}>
        <LogoutOutlined />
    </div>
  )
}

export default LogoutButton