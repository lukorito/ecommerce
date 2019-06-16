import axiosInstance from '../../services/axiosInstance';
import {FETCH_PRODUCTS, FETCH_PRODUCT} from './types';

export const fetchProducts = (page) => ({
  type: FETCH_PRODUCTS,
  payload: axiosInstance().get(`/products?page=${page}`)
});

export const fetchProduct = (productId) => ({
  type: FETCH_PRODUCT,
  payload: axiosInstance().get(`/products/${productId}`)
});
