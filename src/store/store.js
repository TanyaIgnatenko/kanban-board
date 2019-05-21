import createSagaMiddleware from 'redux-saga';

import { applyMiddleware, createStore } from 'redux';
// import { routerMiddleware } from 'connected-react-router';

import { rootReducer, history } from './rootReducer';
import rootSaga from './rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// const navigationMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export { store };
