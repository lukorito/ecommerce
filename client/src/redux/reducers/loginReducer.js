import { LOGIN } from '../actions/types';

const initialState = {
  success: false,
  loading: false,
  error: false,
  errors: [],
};

export const login = (state = initialState, action) => {
  switch (action.type) {
  case `${LOGIN}_LOADING`:
    return {
      ...state,
      loading: true
    };
  case `${LOGIN}_SUCCESS`:
    return {
      ...state,
      success: true,
      loading: false
    };
  case `${LOGIN}_ERROR`:
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

