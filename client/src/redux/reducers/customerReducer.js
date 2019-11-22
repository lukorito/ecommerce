import { GET_CUSTOMER, GET_REGIONS, GET_TAXES,UPDATE_CUSTOMER_ADDRESS } from '../actions/types';

const initialState = {
  success: false,
  loading: false,
  error: false,
  errors: [],
  customer: {}
};

export const getCustomer = (state = initialState, action) => {
  switch (action.type) {
  case `${GET_CUSTOMER}_LOADING`:
    return {
      ...state,
      loading: true
    };
  case `${GET_CUSTOMER}_SUCCESS`:
    return {
      ...state,
      success: true,
      loading: false,
      customer: action.payload.data.customer
    };
  case `${UPDATE_CUSTOMER_ADDRESS}_SUCCESS`:
    return {
      ...state,
      success: true,
      loading: false,
    };
  case `${GET_CUSTOMER}_ERROR`:
    return {
      ...state,
      error: true,
      errors: action.payload
    };
  default:
    return {
      ...state
    };
  }
};

const initialStateCustomerOptions = {
  regions: [],
  taxes: []
};

export const getCustomerOptions =(state=initialStateCustomerOptions, action) => {
  switch (action.type) {
  case `${GET_REGIONS}_SUCCESS`:
    return {
      ...state,
      regions: action.payload.data
    };
  case `${GET_TAXES}_SUCCESS`:
    return {
      ...state,
      taxes: action.payload.data
    };

  default:
    return {
      ...state
    };
  }
};

