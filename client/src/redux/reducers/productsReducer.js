import {FETCH_PRODUCTS, FETCH_PRODUCT, SEARCH_PRODUCT} from '../actions/types';

const initialState = {
  success: false,
  loading: false,
  error: null,
  products: [],
  count: null
};

export const fetchProducts = (state = initialState, action) => {
  switch (action.type) {
  case `${FETCH_PRODUCTS}_LOADING`:
    return {
      ...state,
      loading: true,
    };
  case `${FETCH_PRODUCTS}_SUCCESS`:
    return {
      ...state,
      loading: false,
      success: true,
      products: action.payload.data.products,
      count: action.payload.data.count
    };
  case `${FETCH_PRODUCTS}_ERROR`:
    return {
      ...state,
      success: false,
      error: action.payload.data
    };
  default:
    return state;

  }
};
const initialStateProduct = {
  success: false,
  loading: false,
  error: null,
  product: {}
};
export const fetchProduct = (state = initialStateProduct, action) => {
  switch (action.type) {
  case `${FETCH_PRODUCT}_LOADING`:
    return {
      ...state,
      loading: true,
    };
  case `${FETCH_PRODUCT}_SUCCESS`:
    return {
      ...state,
      loading: false,
      success: true,
      product: action.payload.data[0]
    };
  case `${FETCH_PRODUCT}_ERROR`:
    return {
      ...state,
      success: false,
      error: action.payload.data
    };
  default:
    return state;

  }
};

const initialStateSearch = {
  success: false,
  loading: false,
  error: null,
  results: []
};

export const searchProduct = (state = initialStateSearch, action) => {
  switch (action.type) {
  case `${SEARCH_PRODUCT}_LOADING`:
    return {
      ...state,
      loading: true,
    };
  case `${SEARCH_PRODUCT}_SUCCESS`:
    return {
      ...state,
      loading: false,
      success: true,
      results: action.payload.data
    };
  case `${SEARCH_PRODUCT}_ERROR`:
    return {
      ...state,
      success: false,
      loading: false,
      error: action.payload.data
    };
  default:
    return state;

  }
};

