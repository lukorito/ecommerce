import {
  GET_SHOPPING_CART_ID,
  ADD_PRODUCTS_TO_CART,
  GET_SHOPPING_CART_TOTAL,
  RESET_SUCCESS,
  GET_SHOPPING_CART_ITEMS,
  UPDATE_SHOPPING_CART, EMPTY_SHOPPING_CART,
} from '../actions/types';

const initialState = {
  success: false,
  loading: false,
  error: false
};

export const getShoppingCartId = (state = initialState, action) => {
  switch (action.type) {
  case `${GET_SHOPPING_CART_ID}_LOADING`:
    return {
      ...state,
      loading: true,
    };
  case `${GET_SHOPPING_CART_ID}_SUCCESS`:
    return {
      ...state,
      loading: false,
      success: true,
    };
  case `${GET_SHOPPING_CART_ID}_ERROR`:
    return {
      ...state,
      success: false,
      loading: false,
      error: true
    };
  default:
    return state;

  }
};

const initialStateCart = {
  success: false,
  loading: false,
  error: false,
  cart: []
};
export const addProductToCart = (state= initialStateCart, action) => {
  switch (action.type) {
  case RESET_SUCCESS: {
    return {
      ...state,
      success: false
    };
  }
  case `${ADD_PRODUCTS_TO_CART}_LOADING`:
    return {
      ...state,
      loading: true,
    };
  case `${ADD_PRODUCTS_TO_CART}_SUCCESS`:
    return {
      ...state,
      loading: false,
      success: true,
      cart: action.payload.data
    };
  case `${ADD_PRODUCTS_TO_CART}_ERROR`:
    return {
      ...state,
      success: false,
      loading: false,
      error: true
    };
  default:
    return state;

  }
};

const initialStateCartTotal = {
  success: false,
  loading: false,
  error: false,
  total: '0.00'
};

export const getShoppingCartTotal = (state= initialStateCartTotal, action) => {
  switch (action.type) {
  case `${GET_SHOPPING_CART_TOTAL}_LOADING`:
    return {
      ...state,
      loading: true,
    };
  case `${GET_SHOPPING_CART_TOTAL}_SUCCESS`:
    return {
      ...state,
      loading: false,
      success: true,
      total: action.payload.data.total_amount === null ? '0.00' : action.payload.data.total_amount
    };
  case `${GET_SHOPPING_CART_TOTAL}_ERROR`:
    return {
      ...state,
      success: false,
      loading: false,
      error: true
    };
  default:
    return state;
  }
};

const initialStateCartItems = {
  success: false,
  loading: false,
  error: false,
  items: []
};

export const getShoppingCartItems = (state= initialStateCartItems, action) => {
  switch (action.type) {
  case RESET_SUCCESS: {
    return {
      ...state,
      success: false
    };
  }

  case `${GET_SHOPPING_CART_ITEMS}_LOADING`:
    return {
      ...state,
      loading: true,
    };
  case `${GET_SHOPPING_CART_ITEMS}_SUCCESS`:
    return {
      ...state,
      loading: false,
      success: true,
      items: action.payload.data
    };
  case `${EMPTY_SHOPPING_CART}_SUCCESS`:
    return {
      ...state,
      loading: false,
      success: true,
      items: action.payload.data
    };
  case `${UPDATE_SHOPPING_CART}_SUCCESS`:
    return {
      ...state,
      loading: false,
      success: true,
    };
  case `${GET_SHOPPING_CART_ITEMS}_ERROR`:
    return {
      ...state,
      success: false,
      loading: false,
      error: true
    };
  default:
    return state;
  }
};
