export const setToastTypes = {
  SET_TOAST: '@layout/SET_TOAST',
  CLOSE_TOAST: '@layout/CLOSE_TOAST'
};

/**
 * Create an action to set toast
 * @param {object} toast
 * @return {{payload: object, type: string}}
 */
export function setToast(toast) {
  return {type: setToastTypes.SET_TOAST, payload: toast};
}

/**
 * Create an action to close all toast
 * @return {{type: string}}
 */
export function closeToast() {
  return {type: setToastTypes.CLOSE_TOAST};
}
