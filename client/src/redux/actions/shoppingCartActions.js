import axiosInstance from '../../services/axiosInstance';
import {
  GET_SHOPPING_CART_ID,
  ADD_PRODUCTS_TO_CART,
  GET_SHOPPING_CART_TOTAL,
  GET_SHOPPING_CART_ITEMS,
  UPDATE_SHOPPING_CART,
  REMOVE_ITEM_SHOPPING_CART,
  EMPTY_SHOPPING_CART
} from './types';

export const getShoppingCartId = () => ({
  type: GET_SHOPPING_CART_ID,
  payload: axiosInstance().get('/shoppingcart/generateUniqueId')
});

export const addProductToCart = (cartId, productId, attributes) => ({
  type: ADD_PRODUCTS_TO_CART,
  payload: axiosInstance().post('/shoppingcart/add', {cartId, productId, attributes})
});

export const getShoppingCartTotal = (cartId) => ({
  type: GET_SHOPPING_CART_TOTAL,
  payload: axiosInstance().get(`/shoppingcart/totalAmount/${cartId}`)
});

export const getShoppingCartItems = (cartId) => ({
  type: GET_SHOPPING_CART_ITEMS,
  payload: axiosInstance().get(`/shoppingcart/${cartId}`)
});

export const updateShoppingCart = (itemId, quantity) => ({
  type: UPDATE_SHOPPING_CART,
  payload: axiosInstance().put(`/shoppingcart/update/${itemId}`, {quantity})
});

export const deleteItemFromCart = (itemId) => ({
  type: REMOVE_ITEM_SHOPPING_CART,
  payload: axiosInstance().delete(`/shoppingcart/removeProduct/${itemId}`)
});

export const emptyCart = (cartId) => ({
  type: EMPTY_SHOPPING_CART,
  payload: axiosInstance().delete(`/shoppingcart/empty/${cartId}`)
});
