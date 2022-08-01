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
      return {...state, isToast: true, toast: payload};
    case storeTypes.CLOSE_TOAST:
      return {...state, isToast: false, toast: undefined};
    case storeTypes.SET_SHOP:
      return {...state, shop: payload};
    case storeTypes.SET_SUBSCRIPTION:
      return {...state, subscription: payload};
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
