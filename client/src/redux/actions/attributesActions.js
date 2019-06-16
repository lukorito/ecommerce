import {GET_PRODUCT_ATTRIBUTES} from './types';
import axiosInstance from '../../services/axiosInstance';

export const getProductAttributes = (productId) => ({
  type: GET_PRODUCT_ATTRIBUTES,
  payload: axiosInstance().get(`/attributes/inProduct/${productId}`)
});
