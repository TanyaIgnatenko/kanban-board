import React, { useEffect, useMemo } from 'react';
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
import { useScrollable } from '../../drag-drop/useScrollable';

function Board({ id, background, name, lists, addList }) {
  const boardStyle = useBoardStyle(background);

  const acceptedTypes = useMemo(() => [DRAGGABLE_TYPE.LIST], []);
  const { setItemRefAt, listItems, droppableClassName } = useDroppableList({
    id,
    listType: LIST_TYPE.HORIZONTAL,
    acceptedTypes,
    items: lists,
  });

  const scrolledByTypes = useMemo(
    () => [DRAGGABLE_TYPE.LIST, DRAGGABLE_TYPE.CARD],
    [],
  );
  const scrollableRef = useScrollable({
    id,
    scrolledByTypes,
    scrollPointOffset: 60,
    scrollStep: 20,
  });

  return (
    <div
      id={id}
      className={classNames('board', droppableClassName)}
      style={boardStyle}
    >
      <h1 className='board-title' style={{ color: name.color }}>
        {name.text}
      </h1>
      <ul ref={scrollableRef} className='board-lists'>
        {listItems.map(
          (item, idx) =>
            ({
              [ITEM_TYPE.REGULAR_ITEM]: (
                <li key={item.data && item.data.id}>
                  <CardList
                    className='board-list-zone'
                    setListRef={node => setItemRefAt(node, idx)}
                    {...item.data}
                  />
                </li>
              ),
              [ITEM_TYPE.PLACEHOLDER]: (
                <li key='placeholder'>
                  <div
                    ref={node => setItemRefAt(node, idx)}
                    className='placeholder board-list-zone'
                    style={{
                      width: item.geometry && item.geometry.width,
                      height: item.geometry && item.geometry.height,
                    }}
                  />
                </li>
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
