import createSagaMiddleware from 'redux-saga';

import { applyMiddleware, createStore } from 'redux';
// import { routerMiddleware } from 'connected-react-router';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';

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
