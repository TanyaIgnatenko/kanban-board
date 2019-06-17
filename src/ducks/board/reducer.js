import { ADD_CARD, ADD_LIST, FETCH_BOARD, MOVE } from './action-types';

const initialState = {
  board: null,
};

export const board = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOARD.SUCCESS: {
      return {
        ...state,
        board: action.board,
      };
    }
    case MOVE.CARD: {
      const { cardId, destinationListId, indexInList } = action;

      let cardToMove = null;
      const updatedLists = state.board.lists.map(list => {
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
        const dstList = updatedLists.find(
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
          lists: updatedLists,
        },
      };
    }
    case MOVE.LIST: {
      const { listId, destinationBoardId, newListIdx } = action;

      if (state.board.id !== destinationBoardId) {
        console.error('Destination board id does not match current board id');
      }

      const lastListIdx = state.board.lists.findIndex(
        list => list.id === listId,
      );
      if (newListIdx === lastListIdx) {
        return state;
      }

      const listToMove = state.board.lists[lastListIdx];
      const updatedLists = [...state.board.lists];

      updatedLists.splice(lastListIdx, 1);
      updatedLists.splice(newListIdx, 0, listToMove);

      return {
        ...state,
        board: {
          ...state.board,
          lists: updatedLists,
        },
      };
    }
    case ADD_CARD.SUCCESS: {
      const { listId, card } = action;

      const updatedLists = state.board.lists.map(list =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.concat(card),
            }
          : list,
      );

      return {
        ...state,
        board: {
          ...state.board,
          lists: updatedLists,
        },
      };
    }

    case ADD_LIST.SUCCESS: {
      const { boardId, list } = action;

      if (state.board.id !== boardId) {
        console.error('Board id does not match current board id');
      }

      return {
        ...state,
        board: {
          ...state.board,
          lists: state.board.lists.concat(list),
        },
      };
    }

    default:
      return state;
  }
};
