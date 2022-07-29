import {put, takeLatest} from 'redux-saga/effects';
import {setLoading} from './setLoadingAction';
import {setToast} from './setToastAction';
import {auth} from '../../helpers';

export const logoutTypes = {
  LOGOUT: '@@layout/LOGOUT'
};

/**
 * Create logout action
 * @return {{type: string}}
 */
export function logout() {
  return {type: logoutTypes.LOGOUT};
}

/**
 * Handle logout
 */
export function* handleLogout() {
  yield put(setLoading());
  try {
    yield auth.signOut();
    yield put(
      setToast({
        content: 'You logged out from the application successfully'
      })
    );
    window.location.href = '/auth/login';
  } catch (e) {
    yield put(
      setToast({
        content: e.message,
        isError: true
      })
    );
  } finally {
    yield put(setLoading(false));
  }
}

/**
 * Watch logout handler
 */
export function* watchLogout() {
  yield takeLatest(logoutTypes.LOGOUT, handleLogout);
}
