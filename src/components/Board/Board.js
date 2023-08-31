import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { CardList } from '../CardList';
import { AddComponent } from '../AddComponent';
import { selectBoard } from '../../ducks/board/selectors';
import { addListRequest, fetchBoardRequest } from '../../ducks/board/actions';
import { useUncontrollableProps } from '../../hooks/uncontrollable';
import { useScrollByShift } from '../../hooks/scrollByShift';
import { useScrollable } from '../../drag-drop/useScrollable';
import { DRAGGABLE_TYPE } from '../../constants';

import {
  ITEM_TYPE,
  LIST_TYPE,
  useDroppableList,
} from '../../drag-drop/useDroppableList';

import './Board.scss';

function Board({ id, name, lists, addList }) {
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

  const addComponentUncontrollableProps = useUncontrollableProps([
    {
      propName: 'isFormOpened',
      changeHandlerName: 'onFormOpenedChange',
      defaultValue: false,
    },
  ]);

  const onScrollablePointerDown = useScrollByShift(scrollableRef);

  return (
    <div
      id={id}
      className={classNames('board', droppableClassName)}
      onPointerDown={onScrollablePointerDown}
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
                      width: item.dimensions && item.dimensions.width,
                      height: item.dimensions && item.dimensions.height,
                    }}
                  />
                </li>
              ),
            }[item.type]),
        )}
        <AddComponent
          className='add-list-wrapper'
          formClassName='add-list-form'
          openCreationFormBtnText='Add a list'
          placeholderFormText='Enter a list title...'
          submitFormBtnText='Add list'
          onAdd={addList.bind(null, id)}
          {...addComponentUncontrollableProps}
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
