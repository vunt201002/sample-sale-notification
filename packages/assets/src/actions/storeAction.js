import {handleError} from '@assets/services/errorService';
import {api} from '@assets/helpers';

export const storeTypes = {
  SET_USER: '@@layout/SET_USER',
  SET_LOADING: '@layout/SET_LOADING',
  SET_TOAST: '@layout/SET_TOAST',
  CLOSE_TOAST: '@layout/CLOSE_TOAST',
  SET_SHOP: '@@shop/SET_SHOP',
  SET_SUBSCRIPTION: '@@subscription/SET_SUBSCRIPTION'
};

export const reducer = (state, {type, payload}) => {
  switch (type) {
    case storeTypes.SET_USER:
      return {...state, user: payload};
    case storeTypes.SET_LOADING:
      return {...state, loading: payload};
    case storeTypes.SET_TOAST:
      return {...state, toast: payload};
    case storeTypes.CLOSE_TOAST:
      return {...state, toast: undefined};
    case storeTypes.SET_SHOP:
      return {...state, shop: payload};
    case storeTypes.SET_SUBSCRIPTION:
      return {...state, loading: false, subscription: payload};
    default:
      return state;
  }
};

export function setLoading(dispatch, payload = true) {
  dispatch(storeTypes.SET_LOADING, payload);
}

export function setToast(dispatch, content, error = false) {
  dispatch(storeTypes.SET_TOAST, {content, error});
}

export function closeToast(dispatch) {
  dispatch(storeTypes.CLOSE_TOAST);
}

export function setSubscription(dispatch, payload = null) {
  dispatch(storeTypes.SET_SUBSCRIPTION, payload);
}

export async function getSubscription(dispatch) {
  try {
    setLoading(dispatch, true);
    const payload = await api('/subscription');
    setSubscription(dispatch, payload);
  } catch (e) {
    handleError(e);
    setLoading(dispatch, false);
  }
}
