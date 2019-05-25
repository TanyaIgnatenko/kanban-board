import { ADD_CARD, ADD_LIST, FETCH_BOARD, MOVE } from './action-types';

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
    case MOVE.CARD: {
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
    case MOVE.LIST: {
      const { listId, destinationBoardId, indexInBoard } = action;
      if (state.board.id !== destinationBoardId) {
        console.error('Board destination id does not match current board id');
      }

      const lastIdx = state.board.lists.findIndex(list => list.id === listId);
      if (indexInBoard === lastIdx) {
        return state;
      }

      const movedList = state.board.lists[lastIdx];
      const idxToRemoveAt = lastIdx + (indexInBoard < lastIdx ? 1 : 0);

      const modifiedLists = [...state.board.lists];

      modifiedLists.splice(indexInBoard, 0, movedList);
      modifiedLists.splice(idxToRemoveAt, 1);

      return {
        ...state,
        board: {
          ...state.board,
          lists: modifiedLists,
        },
      };
    }
    case ADD_CARD.SUCCESS: {
      const updatedLists = state.board.lists.map(list =>
        list.id === action.listId
          ? {
              ...list,
              cards: [...list.cards, action.card],
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
      return {
        ...state,
        board: {
          ...state.board,
          lists: [...state.board.lists, action.list],
        },
      };
    }

    default:
      return state;
  }
};
