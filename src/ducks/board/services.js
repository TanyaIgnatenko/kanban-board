import _ from 'lodash';

import { mockBoard } from './mocks';

/**
 * This file is going to send requests to server and return server responses in the future
 */
export function fetchBoardRequest(id) {
  return mockBoard;
}

export function addCardRequest(listId, content) {
  const card = {
    id: _.uniqueId('card'),
    content,
  };
  return { listId, card };
}

export function addListRequest(boardId, content) {
  const list = {
    id: _.uniqueId('list'),
    name: content,
    cards: [],
  };
  return { boardId, list };
}