import { all, call, put, takeLatest } from 'redux-saga/effects';

import { FETCH_BOARD } from './action-types';
import { fetchBoardError, fetchBoardSuccess } from './actions';

import * as services from './services';

function* fetchBoard({ id }) {
  try {
    const board = yield call(services.fetchBoardRequest, id);
    yield put(fetchBoardSuccess(board));
  } catch (error) {
    yield put(fetchBoardError(error));
  }
}

export function* watchBoardRequests() {
  yield all([
    takeLatest(FETCH_BOARD.REQUEST, fetchBoard),
  ]);
}