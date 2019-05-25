import { FETCH_BOARD, MOVE_CARD } from './action-types';

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
