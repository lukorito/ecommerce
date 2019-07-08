import axiosInstance from '../../services/axiosInstance';
import {FETCH_PRODUCTS, FETCH_PRODUCT, SEARCH_PRODUCT} from './types';

export const fetchProducts = (page) => ({
  type: FETCH_PRODUCTS,
  payload: axiosInstance().get(`/products?page=${page}`)
});

export const fetchProduct = (productId) => ({
  type: FETCH_PRODUCT,
  payload: axiosInstance().get(`/products/${productId}`)
});

export const searchProduct = (query) => ({
  type: SEARCH_PRODUCT,
  payload: axiosInstance().get(`/products/search/?query=${query}`)
});

export const fetchProductDepartment = (departmentId) => ({
  type: FETCH_PRODUCTS,
  payload: axiosInstance().get(`/products/inDepartment/${departmentId}`)
});
