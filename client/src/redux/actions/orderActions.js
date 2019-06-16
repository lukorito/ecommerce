import axiosInstance from '../../services/axiosInstance';
import { CREATE_ORDER, MAKE_PAYMENT } from './types';

export const createOrder = (cartId, shippingId, taxId) => ({
  type: CREATE_ORDER,
  payload: axiosInstance().post('/orders', {cartId, shippingId, taxId})
});

export const makePayment = (stripeToken, orderId, description, amount) => ({
  type: MAKE_PAYMENT,
  payload: axiosInstance().post('/stripe/charge', {stripeToken, orderId, description, amount})
});
