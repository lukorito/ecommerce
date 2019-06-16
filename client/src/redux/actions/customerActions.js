import axiosInstance from '../../services/axiosInstance';
import {GET_CUSTOMER, GET_TAXES, GET_REGIONS, UPDATE_CUSTOMER_ADDRESS} from './types';

export const getCustomer = () => ({
  type: GET_CUSTOMER,
  payload: axiosInstance().get('/customer')
});

export const getTaxDetails = () => ({
  type: GET_TAXES,
  payload: axiosInstance().get('/tax')
});

export const getShippingRegions = () => ({
  type: GET_REGIONS,
  payload: axiosInstance().get('/shipping/regions')
});

export const updateCustomerAddress = (firstAddress, secondAddress, city, region, postalCode, country, shippingRegionId) => ({
  type: UPDATE_CUSTOMER_ADDRESS,
  payload: axiosInstance().put('/customers/address', {firstAddress, secondAddress, city, region, postalCode, country, shippingRegionId})
});

