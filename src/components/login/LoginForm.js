import { Form, Input, message } from "antd";
import React, { useState } from "react";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeOutlined ,
} from "@ant-design/icons";
import useHttp from "../../hooks/useHttp";
import Loading from "../global/Loading";

const LoginForm = () => {
  const [formInfo, setFormInfo] = useState({
    user: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const { isLoading, request } = useHttp();



  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const changeVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async () => {
    let config = {
      type: 'post',
      endpoint: 'login',
      data: {...formInfo}
    }
    const response = await request(config)
    if(response.error){
      message.error('Usuario o Clave incorrectos.')
    }else{
      localStorage.setItem('user', JSON.stringify(response.user))
      localStorage.setItem('token', response.access_token)
      window.location.reload();

    }
  }

  return (
    <Form layout="vertical" 
    onFinish={handleSubmit}
    autoComplete="off">
      {isLoading && <Loading />}
      <Form.Item label="Usuario" 
        rules={[{ required: true, message: 'Usuario es obligatorio' }]} 
        name="user">
        <Input
        size="large"
          type="text"
          name="user"
          onChange={handleChange}
          placeholder="user..."
          addonBefore={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item label="Clave"    
        name="password"     rules={[{ required: true, message: 'Clave es obligatorio' }]}
>
        <Input
        size="large"
          type={passwordVisible ? 'text' : 'password'}
          name="password"
          onChange={handleChange}
          placeholder="1234..."
          addonBefore={
            passwordVisible ? (
              <EyeOutlined  onClick={changeVisibility} />
            ) : (
              <EyeInvisibleOutlined onClick={changeVisibility} />
            )
          }
        />
      </Form.Item>
      <button type="submit" className='login-submit-button'>Iniciar Sesión</button>
    </Form>
  );
};

export default LoginForm;
