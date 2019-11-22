import { GET_SHOPPING_CART_ID } from '../actions/types';

const cartHandlerMiddleware = () => (next) => (action) => {
  if(action.type === `${GET_SHOPPING_CART_ID}_SUCCESS`) {
    const cartId = action.payload.data.cartId;
    localStorage.setItem('cartId', cartId);
  }
  return next(action);
};

export default cartHandlerMiddleware;
