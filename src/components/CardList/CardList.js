import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { Card } from '../Card';
import { AddComponent } from '../AddComponent';
import { addCardRequest, moveList } from '../../ducks/board/actions';
import { useDraggable } from '../../drag-drop/useDraggable';
import { DRAGGABLE_TYPE } from '../../constants';
import { moveTo } from '../../helpers/moveTo';

import {
  ITEM_TYPE,
  LIST_TYPE,
  useDroppableList,
} from '../../drag-drop/useDroppableList';

import './CardList.scss';

function CardList({
  id,
  name,
  cards,
  addCard,
  setListRef,
  moveList,
  className,
}) {
  const {
    listNode,
    setItemAt,
    listItems,
    droppableClassName,
  } = useDroppableList({
    id,
    listType: LIST_TYPE.VERTICAL,
    acceptedType: DRAGGABLE_TYPE.CARD,
    items: cards,
  });

  const dragHandleRef = useRef(null);

  useDraggable({
    context: {
      id,
    },
    type: DRAGGABLE_TYPE.LIST,
    node: listNode,
    dragHandle: dragHandleRef,
    renderElement: ({ clientPosition, draggedObjectRef }) => (
      <div
        id={id}
        ref={draggedObjectRef}
        className={classNames('card-list', 'dragged', className)}
        style={moveTo(clientPosition)}
      >
        <header>
          <h2 className='list-title'>{name}</h2>
        </header>
        {Boolean(listItems.length) && (
          <ul className='list-cards'>
            {listItems.map((item, idx) => (
              <Card
                key={item.data.id}
                {...item.data}
                className='list-card'
                setCardRef={node => setItemAt(node, idx)}
              />
            ))}
          </ul>
        )}
        <footer>
          <AddComponent
            className='add-card-btn'
            openCreationFormBtnText='Добавить ещё одну карточку'
            placeholderFormText='Введите название карточки'
            submitFormBtnText='Добавить карточку'
            onAdd={addCard.bind(null, id)}
          />
        </footer>
      </div>
    ),
    onRelease: ({ draggableContext, droppableContext }) => {
      moveList(
        draggableContext.id,
        droppableContext.id,
        droppableContext.index,
      );
    },
  });

  const setRefs = node => {
    setListRef(node);
    listNode.current = node;
  };

  return (
    <li
      id={id}
      ref={setRefs}
      className={classNames('card-list', droppableClassName, className)}
    >
      <header ref={dragHandleRef}>
        <h2 className='list-title'>{name}</h2>
      </header>
      {Boolean(listItems.length) && (
        <ul className='list-cards'>
          {listItems.map(
            (item, idx) =>
              ({
                [ITEM_TYPE.REGULAR_ITEM]: (
                  <Card
                    key={item.data && item.data.id}
                    {...item.data}
                    className='list-card'
                    setCardRef={node => setItemAt(node, idx)}
                  />
                ),
                [ITEM_TYPE.PLACEHOLDER]: (
                  <li
                    key='placeholder'
                    ref={node => setItemAt(node, idx)}
                    className='placeholder list-card'
                    style={{
                      width: item.geometry && item.geometry.width,
                      height: item.geometry && item.geometry.height,
                    }}
                  />
                ),
              }[item.type]),
          )}
        </ul>
      )}
      <footer>
        <AddComponent
          className='add-card-btn'
          openCreationFormBtnText='Добавить ещё одну карточку'
          placeholderFormText='Введите название карточки'
          submitFormBtnText='Добавить карточку'
          onAdd={addCard.bind(null, id)}
        />
      </footer>
    </li>
  );
}

CardList.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  addCard: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired,
  setListRef: PropTypes.func.isRequired,
  className: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

CardList.defaultProps = {
  className: '',
};

const mapDispatchToProps = {
  addCard: addCardRequest,
  moveList,
};

export default connect(
  null,
  mapDispatchToProps,
)(CardList);
