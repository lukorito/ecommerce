import { GET_PRODUCT_ATTRIBUTES } from '../actions/types';

const initialState = {
  success: false,
  loading: false,
  error: false,
  attributes: []
};

export const getProductAttributes = (state = initialState, action) => {
  switch (action.type) {
  case `${GET_PRODUCT_ATTRIBUTES}_LOADING`:
    return {
      ...state,
      loading: true
    };
  case `${GET_PRODUCT_ATTRIBUTES}_SUCCESS`:
    return {
      ...state,
      success: true,
      loading: false,
      attributes: action.payload.data
    };
  case `${GET_PRODUCT_ATTRIBUTES}_ERROR`:
    return {
      ...state,
      error: true,
    };
  default:
    return {
      ...state
    };
  }
};
