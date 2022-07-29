import {connectRouter, routerMiddleware} from 'connected-react-router';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import {
  applyMiddleware,
  combineReducers,
  createStore as createReduxStore
} from 'redux';
import rootSaga from '../actions/rootSaga';
import layoutReducer from './layoutReducer';
import sampleReducer from './sampleReducer';

/**
 * Generate a reducer store from a configuration
 * @param {object} history
 * @return {object}
 */
export default function createStore(history) {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const store = createReduxStore(
    combineReducers({
      router: connectRouter(history),
      sample: sampleReducer,
      layout: layoutReducer
    }),
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
