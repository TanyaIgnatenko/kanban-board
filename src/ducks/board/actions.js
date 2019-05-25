import { ADD_CARD, ADD_LIST, FETCH_BOARD, MOVE_CARD } from './action-types';

export const fetchBoardRequest = id => {
  return {
    type: FETCH_BOARD.REQUEST,
    id,
  };
};

export const fetchBoardSuccess = board => {
  return {
    type: FETCH_BOARD.SUCCESS,
    board,
  };
};

export const fetchBoardError = error => {
  return {
    type: FETCH_BOARD.ERROR,
    error,
  };
};

export const moveCard = (cardId, destinationListId, indexInList) => {
  return {
    type: MOVE_CARD,
    cardId,
    destinationListId,
    indexInList,
  };
};

export const addCardRequest = (listId, content) => {
  return {
    type: ADD_CARD.REQUEST,
    listId,
    content,
  };
};

export const addCardSuccess = (listId, card) => {
  return {
    type: ADD_CARD.SUCCESS,
    listId,
    card,
  };
};

export const addCardError = error => {
  return {
    type: ADD_CARD.ERROR,
    error,
  };
};

export const addListRequest = (boardId, content) => {
  return {
    type: ADD_LIST.REQUEST,
    boardId,
    content,
  };
};

export const addListSuccess = (boardId, list) => {
  return {
    type: ADD_LIST.SUCCESS,
    boardId,
    list,
  };
};

export const addListError = error => {
  return {
    type: ADD_LIST.ERROR,
    error,
  };
};
