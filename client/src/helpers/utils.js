export const getStoredCartId = () => {
  return localStorage.getItem('cartId');
};

export const removeStoredCartId = () => {
  return localStorage.removeItem('cartId');
};

