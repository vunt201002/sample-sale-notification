import {all, fork} from 'redux-saga/effects';
import {watchPaginateSamples} from './sample/paginateSample';

export default function* rootSaga() {
  yield all([fork(watchPaginateSamples)]);
}
