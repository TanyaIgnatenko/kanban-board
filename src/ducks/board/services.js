import { uniqueId } from 'lodash';

import { mockBoard } from './mocks';

/**
 * This file is going to send requests to server and return server responses in the future
 */
export function fetchBoardRequest(id) {
  return mockBoard;
}

export function addCardRequest(listId, content) {
  const newCard = {
    id: uniqueId('card'),
    content,
  };
  return { listId, card: newCard };
}

export function addListRequest(boardId, content) {
  const newList = {
    id: uniqueId('list'),
    name: content,
    cards: [],
  };
  return { boardId, list: newList };
}
