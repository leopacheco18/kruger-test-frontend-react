
import { useState } from 'react'
import axios from 'axios';
const backendUrl = 'http://127.0.0.1:8000/api/';
const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);
    
    const request = async (configRequest) => {
        setIsLoading(true);
        const response = await axios[configRequest.type](backendUrl + configRequest.endpoint, configRequest.data,{ headers: headers});
        setIsLoading(false);
        return response.data;
    }

  return {isLoading, request}
}

export default useHttp