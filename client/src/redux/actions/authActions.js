import {SIGN_UP, LOGIN, LOGOUT} from './types';
import axiosInstance from '../../services/axiosInstance';

export const signUp = (name, email, password) => ({
  type: SIGN_UP,
  payload: axiosInstance().post('/customers', {name, email, password})
});

export const login = (email, password) => ({
  type: LOGIN,
  payload: axiosInstance().post('/customers/login', {email, password})
});

export const logout = () => ({
  type: LOGOUT
});

