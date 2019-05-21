import { combineReducers } from 'redux';
// import { createBrowserHistory } from 'history';
// import { connectRouter } from 'connected-react-router';

import { board } from '../ducks/board/reducer';

// const history = createBrowserHistory();

const rootReducer = combineReducers({
  // router: connectRouter(history),
  board,
});

export { rootReducer };
