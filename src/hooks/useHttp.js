import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const backendUrl = "https://kruger-test-backend-laravel.herokuapp.com/api/";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const request = async (configRequest) => {
    setIsLoading(true);
    try {
      const response = await axios[configRequest.type](
        backendUrl + configRequest.endpoint,
        configRequest.data,
        {
          headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLoading(false);
      return response.data;
    } catch (e) {
      setIsLoading(false);
      if (e.response?.status === 401) {
        localStorage.clear();
        message.error("Su sesión ha caducado.");
        navigate("/");
      }else{
        message.error("Algo salio mal, intentalo de nuevo.");
      }
    }
  };

  return { isLoading, request };
};

export default useHttp;
