import { CREATE_ORDER, MAKE_PAYMENT, RESET_SUCCESS } from '../actions/types';

const initialState = {
  success: false,
  loading: false,
  error: false,
  order: {}
};

export const createOrder = (state = initialState, action) => {
  switch (action.type) {
  case `${RESET_SUCCESS}`:
    return {
      ...state,
      success: false
    };
  case `${CREATE_ORDER}_LOADING`:
    return {
      ...state,
      loading: true
    };
  case `${CREATE_ORDER}_SUCCESS`:
    return {
      ...state,
      success: true,
      loading: false,
      order: action.payload.data
    };
  case `${CREATE_ORDER}_ERROR`:
    return {
      ...state,
      success: false,
      error: true,
    };
  default:
    return {
      ...state
    };
  }
};

const initialStatePayment = {
  success: false,
  loading: false,
  error: false,
};

export const makePayment = (state=initialStatePayment, action) => {
  switch (action.type) {
  case RESET_SUCCESS: {
    return {
      ...state,
      success: false
    };
  }
  case `${MAKE_PAYMENT}_LOADING`:
    return {
      ...state,
      loading: true
    };
  case `${MAKE_PAYMENT}_SUCCESS`:
    return {
      ...state,
      success: true,
      loading: false,
    };
  case `${MAKE_PAYMENT}_ERROR`:
    return {
      ...state,
      success: false,
      error: true,
    };
  default:
    return {
      ...state
    };
  }
};
