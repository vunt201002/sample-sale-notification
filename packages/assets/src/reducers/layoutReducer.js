import {setUserTypes} from '../actions/layout/setUserAction';
import {setLoadingTypes} from '../actions/layout/setLoadingAction';
import {setToastTypes} from '../actions/layout/setToastAction';

const defaultState = {
  loading: false,
  isToast: false
};

/**
 * Layout reducer contains all state for using in layout
 *
 * @param {object} state
 * @param {string} type
 * @param {*} payload
 * @return {object}
 */
export default function layoutReducer(state = defaultState, {type, payload}) {
  switch (type) {
    case setUserTypes.SET_USER:
      return {...state, user: payload};
    case setLoadingTypes.SET_LOADING:
      return {...state, loading: payload};

    case setToastTypes.SET_TOAST:
      return {...state, isToast: true, toast: payload};

    case setToastTypes.CLOSE_TOAST:
      return {...state, isToast: false, toast: undefined};
    default:
      return state;
  }
}
