import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { CardList } from '../CardList';
import { AddComponent } from '../AddComponent';
import { useBoardStyle } from './hooks/useBoardStyle';
import { selectBoard } from '../../ducks/board/selectors';
import { addListRequest, fetchBoardRequest } from '../../ducks/board/actions';
import { ITEM_TYPE, useDroppableList } from '../../drag-drop/useDroppableList';
import { DRAGGABLE_TYPE } from '../../constants';

import './Board.scss';

function Board({ id, background, lists, addList }) {
  const boardStyle = useBoardStyle(background);

  const {
    listNode,
    setItemAt,
    listItems,
    droppableClassName,
  } = useDroppableList({
    id,
    acceptedType: DRAGGABLE_TYPE.LIST,
    items: lists,
    isPositionLess: useCallback(
      (draggableCenter, itemCenter) => draggableCenter.x <= itemCenter.x,
      [],
    ),
  });

  return (
    <div
      id={id}
      ref={listNode}
      className={classNames('board', droppableClassName)}
      style={boardStyle}
    >
      <ul className='board-lists'>
        {listItems.map((item, idx) => {
          switch (item.type) {
            case ITEM_TYPE.REGULAR_ITEM:
              return (
                <CardList
                  key={item.data.id}
                  className='board-list'
                  setListRef={node => setItemAt(node, idx)}
                  {...item.data}
                />
              );
            case ITEM_TYPE.PLACEHOLDER:
              return (
                <div
                  key={`placeholder_at_idx_${item.index}`}
                  ref={node => setItemAt(node, idx)}
                  className='placeholder board-list'
                  style={{
                    width: item.geometry && item.geometry.width,
                    height: item.geometry && item.geometry.height,
                  }}
                />
              );
            default:
              console.error('Unknown item type', item.type);
          }
          return null;
        })}
        <AddComponent
          className='add-list-wrapper'
          formClassName='add-list-form'
          openCreationFormBtnText='Добавить ещё одну колонку'
          placeholderFormText='Введите название колонки'
          submitFormBtnText='Добавить колонку'
          onAdd={addList.bind(null, id)}
        />
      </ul>
    </div>
  );
}

function BoardContainer({ id, board, fetchBoard, addList }) {
  useEffect(() => {
    fetchBoard(id);
  }, [fetchBoard, id]);

  return board && <Board addList={addList} {...board} />;
}

const mapStateToProps = state => ({
  board: selectBoard(state),
});

const mapDispatchToProps = {
  fetchBoard: fetchBoardRequest,
  addList: addListRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer);
