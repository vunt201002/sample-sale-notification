import {put, takeLatest, call} from 'redux-saga/effects';
import {api} from '../../helpers';
import {setLoading} from "../layout/setLoadingAction";
import {setToast} from "../layout/setToastAction";

/**
 * A enumeration or a list of action for using in action creator
 *
 * @type {{PAGINATE_SAMPLES_SUCCEED: string, PAGINATE_SAMPLES_FAILED: string, PAGINATE_SAMPLES: string}}
 */
export const paginateActionTypes = {
  PAGINATE_SAMPLES: '@@sample/PAGINATE_SAMPLES',
  PAGINATE_SAMPLES_FAILED: '@@sample/PAGINATE_SAMPLES_FAILED',
  PAGINATE_SAMPLES_SUCCEED: '@@sample/PAGINATE_SAMPLES_SUCCEED'
};

/**
 * An action creator to paginate samples
 *
 * @return {{type: string}}
 */
export function paginateSamples() {
  return {type: paginateActionTypes.PAGINATE_SAMPLES};
}

/**
 * An action creator is called after paginating all samples successfully
 *
 * @param {Array} samples
 * @return {{payload: Array, type: string}}
 */
export function paginateSamplesSucceed(samples = []) {
  return {type: paginateActionTypes.PAGINATE_SAMPLES_SUCCEED, payload: samples};
}

/**
 * An action creator is called when paginating samples has crashes
 *
 * @return {{type: string}}
 */
export function paginateSamplesFailed() {
  return {type: paginateActionTypes.PAGINATE_SAMPLES_FAILED};
}

/**
 * A saga to paginate samples with pagination.
 * For more information information about saga, please visit redux-saga home page
 *
 * Here are steps to produce it:
 * 1. Try to call for getting samples with pagination.
 * 2. If successfully, put all samples and its pagination to reducer.
 * 3. If fail, call paginateSampleFailed to tell reducer that calling API failed before.
 *
 * @see https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
 */
export function* paginateSamplesSaga() {
  yield put(setLoading());
  try {
    // 1.Try to call for getting samples with pagination.
    // TODO: Implement to call API
    const {samples} = yield call(api, '/samples');

    // 2. If successfully, put all samples and its pagination to reducer.
    yield put(paginateSamplesSucceed(samples));
  } catch (e) {
    yield put(
      setToast({
        content: e.message,
        error: true
      })
    );
    // 3. If fail, call paginateSampleFailed to tell reducer that calling API failed before.
    yield put(paginateSamplesFailed());
  } finally {
    yield put(setLoading(false));
  }
}

/**
 *
 */
export function* watchPaginateSamples() {
  yield takeLatest(paginateActionTypes.PAGINATE_SAMPLES, paginateSamplesSaga);
}
