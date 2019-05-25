import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { Card } from '../Card';
import { AddComponent } from '../AddComponent';
import { addCardRequest, moveList } from '../../ducks/board/actions';
import { ITEM_TYPE, useDroppableList } from '../../drag-drop/useDroppableList';
import { useDraggable } from '../../drag-drop/useDraggable';
import { DRAGGABLE_TYPE } from '../../constants';
import { moveTo } from '../../helpers/moveTo';

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
  const isPositionLess = useCallback(
    (draggablePos, cardPos) => draggablePos.y <= cardPos.y,
    [],
  );
  const {
    listNode,
    setItemAt,
    listItems,
    droppableClassName,
  } = useDroppableList({
    id,
    acceptedType: DRAGGABLE_TYPE.CARD,
    items: cards,
    isPositionLess,
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
            componentName='карточку'
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
          {listItems.map((item, idx) => {
            switch (item.type) {
              case ITEM_TYPE.REGULAR_ITEM:
                return (
                  <Card
                    key={item.data.id}
                    {...item.data}
                    className='list-card'
                    setCardRef={node => setItemAt(node, idx)}
                  />
                );
              case ITEM_TYPE.PLACEHOLDER:
                return (
                  <li
                    key={`placeholder_at_idx_${item.index}`}
                    ref={node => setItemAt(node, idx)}
                    className='placeholder list-card'
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
  className: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapDispatchToProps = {
  addCard: addCardRequest,
  moveList,
};

export default connect(
  null,
  mapDispatchToProps,
)(CardList);
