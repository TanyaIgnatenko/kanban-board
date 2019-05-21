import { all, call } from 'redux-saga/effects';
import { watchBoardRequests } from '../ducks/board/saga';

export default function* rootSaga() {
  yield all([call(watchBoardRequests)]);
}
