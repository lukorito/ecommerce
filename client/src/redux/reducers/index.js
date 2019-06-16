import {combineReducers} from 'redux';
import {fetchProducts, fetchProduct} from './productsReducer';
import {signUp} from './signupReducer';
import {login} from './loginReducer';
import {getCustomer, getCustomerOptions} from './customerReducer';
import { getProductAttributes } from './attributesReducer';
import {getShoppingCartId, addProductToCart, getShoppingCartTotal, getShoppingCartItems} from './shoppingCartReducer';
import { createOrder, makePayment } from './ordersReducer';


const rootReducer = combineReducers({
  products: fetchProducts,
  auth: signUp,
  login,
  customer: getCustomer,
  product: fetchProduct,
  productAttributes: getProductAttributes,
  cardId: getShoppingCartId,
  shoppingCart: addProductToCart,
  total: getShoppingCartTotal,
  items: getShoppingCartItems,
  addressDetails: getCustomerOptions,
  order: createOrder,
  payment: makePayment

});

export default rootReducer;
