import {SIGN_UP} from '../actions/types';

const initialState = {
  success: false,
  loading: false,
  error: false,
  errors: [],
};

export const signUp = (state = initialState, action) => {
  switch (action.type) {
  case `${SIGN_UP}_LOADING`:
    return {
      ...state,
      loading: true
    };
  case `${SIGN_UP}_SUCCESS`:
    return {
      ...state,
      success: true,
      loading: false
    };
  case `${SIGN_UP}_ERROR`:
    return {
      ...state,
      success: false,
      loading: false,
      error: true,
      errors: action.payload.response.data.errors
    };
  default:
    return {
      ...state
    };
  }
};
