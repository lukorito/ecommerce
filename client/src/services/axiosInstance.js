import axios from 'axios';
import {getUserToken} from '../helpers/authUser';

const axiosInstance = () => {
  const {REACT_APP_BACKEND_URL} = process.env;

  const authHeader = () => {
    const token = getUserToken();
    if(token) {
      return {
        Authorization: `Bearer ${token}`
      };
    }
    return {};
  };

  const instanceCreate = axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    }
  });
  return instanceCreate;
};

export default axiosInstance;
