import {
  FETCH_BOARD,
  FETCH_LISTS,
  GRAB_CARD,
  GRABBED_CARD_CHANGE_LIST,
  MOVE_CARD,
  RELEASE_CARD,
} from './action-types';

const initialState = {
  board: null,
};

export const board = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOARD.SUCCESS: {
      return {
        ...state,
        board: {
          id: action.board.id,
          name: action.board.name,
          lists: action.board.lists,
          background: action.board.background,
        },
      };
    }
    case MOVE_CARD: {
      const { cardId, destinationListId, indexInList } = action;

      let cardToMove = null;
      const modifiedLists = state.board.lists.map(list => {
        const found = list.cards.find(item => item.id === cardId);
        if (found) {
          cardToMove = found;
          return {
            ...list,
            cards: list.cards.filter(item => item.id !== cardId),
          };
        }
        return list;
      });

      if (cardToMove) {
        const dstList = modifiedLists.find(
          list => list.id === destinationListId,
        );
        if (dstList) {
          dstList.cards.splice(indexInList, 0, cardToMove);
        } else {
          console.error('List with id', destinationListId, 'not found');
        }
      } else {
        console.error('List containing card with id', cardId, 'not found');
      }

      return {
        ...state,
        board: {
          ...state.board,
          lists: modifiedLists,
        },
      };
    }
    default:
      return state;
  }
};