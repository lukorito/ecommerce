import {CLEAR_ERRORS, RESET_SUCCESS} from './types';

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const resetSuccess = () => ({
  type: RESET_SUCCESS,
});
