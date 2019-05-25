import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  addCardError,
  addCardSuccess,
  addListError,
  addListSuccess,
  fetchBoardError,
  fetchBoardSuccess,
} from './actions';

import { ADD_CARD, ADD_LIST, FETCH_BOARD } from './action-types';

import * as services from './services';

function* fetchBoard({ id }) {
  try {
    const board = yield call(services.fetchBoardRequest, id);
    yield put(fetchBoardSuccess(board));
  } catch (error) {
    yield put(fetchBoardError(error));
  }
}

function* addCard({ listId, content }) {
  try {
    const newCardInfo = yield call(services.addCardRequest, listId, content);
    yield put(addCardSuccess(newCardInfo.listId, newCardInfo.card));
  } catch (error) {
    yield put(addCardError(error));
  }
}

function* addList({ boardId, content }) {
  try {
    const newListInfo = yield call(services.addListRequest, boardId, content);
    yield put(addListSuccess(newListInfo.boardId, newListInfo.list));
  } catch (error) {
    yield put(addListError(error));
  }
}

export function* watchBoardRequests() {
  yield all([
    takeLatest(FETCH_BOARD.REQUEST, fetchBoard),
    takeLatest(ADD_CARD.REQUEST, addCard),
    takeLatest(ADD_LIST.REQUEST, addList),
  ]);
}
