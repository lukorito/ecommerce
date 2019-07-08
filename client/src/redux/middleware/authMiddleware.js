import {LOGIN, LOGOUT, SIGN_UP } from '../actions/types';
import { removeToken } from '../../helpers/authUser';

const authMiddleware = () => (next) => (action) => {
  if(action.type === `${LOGIN}_SUCCESS` || action.type === `${SIGN_UP}_SUCCESS`) {
    const token = action.payload.data.accessToken;
    localStorage.setItem('token', token);
  }
  if(action.type === `${LOGOUT}`) {
    removeToken();
  }
  return next(action);
};


export default authMiddleware;
