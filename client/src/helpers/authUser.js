export const getUserToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (e) {
    console.log(e);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('token');
  } catch (e) {
    console.log(e);
  }
};
