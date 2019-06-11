import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { CardList } from '../CardList';
import { AddComponent } from '../AddComponent';
import { useBoardStyle } from './hooks/useBoardStyle';
import { selectBoard } from '../../ducks/board/selectors';
import { addListRequest, fetchBoardRequest } from '../../ducks/board/actions';
import { DRAGGABLE_TYPE } from '../../constants';

import {
  ITEM_TYPE,
  LIST_TYPE,
  useDroppableList,
} from '../../drag-drop/useDroppableList';

import './Board.scss';

function Board({ id, background, lists, addList, scrollbarContainer }) {
  const boardStyle = useBoardStyle(background);

  const {
    listBodyRef,
    setItemRefAt,
    listItems,
    droppableClassName,
  } = useDroppableList({
    id,
    listType: LIST_TYPE.HORIZONTAL,
    acceptedType: DRAGGABLE_TYPE.LIST,
    items: lists,
    scrollOffset: 100,
    scrollStep: 50,
  });

  const setRefs = node => {
    scrollbarContainer.current = node;
    listBodyRef.current = node;
  };

  return (
    <div
      id={id}
      className={classNames('board', droppableClassName)}
      style={boardStyle}
    >
      <ul ref={setRefs} className='board-lists'>
        {listItems.map(
          (item, idx) =>
            ({
              [ITEM_TYPE.REGULAR_ITEM]: (
                <CardList
                  key={item.data && item.data.id}
                  className='board-list'
                  setListRef={node => setItemRefAt(node, idx)}
                  {...item.data}
                />
              ),
              [ITEM_TYPE.PLACEHOLDER]: (
                <div
                  key='placeholder'
                  ref={node => setItemRefAt(node, idx)}
                  className='placeholder board-list'
                  style={{
                    width: item.geometry && item.geometry.width,
                    height: item.geometry && item.geometry.height,
                  }}
                />
              ),
            }[item.type]),
        )}
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

function BoardContainer({ id, board, fetchBoard, addList, ...rest }) {
  useEffect(() => {
    fetchBoard(id);
  }, [fetchBoard, id]);

  return board && <Board addList={addList} {...board} {...rest} />;
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
