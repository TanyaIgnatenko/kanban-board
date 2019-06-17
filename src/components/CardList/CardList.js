import React, { useState, useRef, useMemo } from 'react';
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
import { useScrollable } from '../../drag-drop/useScrollable';

function CardList({
  id,
  name,
  cards,
  addCard,
  setListRef,
  moveList,
  className,
}) {
  const acceptedTypes = useMemo(() => [DRAGGABLE_TYPE.CARD], []);
  const { setItemRefAt, listItems, droppableClassName } = useDroppableList({
    id,
    listType: LIST_TYPE.VERTICAL,
    acceptedTypes,
    items: cards,
  });

  const scrolledByTypes = useMemo(() => [DRAGGABLE_TYPE.CARD]);
  const scrollableRef = useScrollable({
    id,
    scrolledByTypes,
    scrollPointOffset: 60,
    scrollStep: 20,
  });

  const dragHandleRef = useRef(null);
  const listRef = useRef(null);

  const [isCardFormOpened, setIsCardFormOpened] = useState(false);

  const addCardComponent = (
    <AddComponent
      isFormOpened={isCardFormOpened}
      formClassName='card-form'
      openCreationFormBtnText='Добавить ещё одну карточку'
      placeholderFormText='Введите название карточки'
      submitFormBtnText='Добавить карточку'
      onFormOpenedChange={value => setIsCardFormOpened(value)}
      onAdd={addCard.bind(null, id)}
    />
  );

  const cardListContent = (
    <>
      <header ref={dragHandleRef}>
        <h2 className='list-title'>{name}</h2>
      </header>
      {(Boolean(listItems.length) || isCardFormOpened) && (
        <ul ref={scrollableRef} className='list-cards'>
          {listItems.map(
            (item, idx) =>
              ({
                [ITEM_TYPE.REGULAR_ITEM]: (
                  <li key={item.data && item.data.id}>
                    <Card
                      {...item.data}
                      className='list-card'
                      setCardRef={node => setItemRefAt(node, idx)}
                    />
                  </li>
                ),
                [ITEM_TYPE.PLACEHOLDER]: (
                  <li key='placeholder'>
                    <div
                      ref={node => setItemRefAt(node, idx)}
                      className='placeholder list-card'
                      style={{
                        width: item.geometry && item.geometry.width,
                        height: item.geometry && item.geometry.height,
                      }}
                    />
                  </li>
                ),
              }[item.type]),
          )}
          {isCardFormOpened && addCardComponent}
        </ul>
      )}
      <footer>{!isCardFormOpened && addCardComponent}</footer>
    </>
  );

  useDraggable({
    context: {
      id,
    },
    type: DRAGGABLE_TYPE.LIST,
    ref: listRef,
    dragHandleRef,
    renderAvatar: ({ clientPosition, draggedObjectRef }) => (
      <div
        id={id}
        ref={draggedObjectRef}
        className={classNames('card-list', 'dragged', className)}
        style={moveTo(clientPosition)}
      >
        {cardListContent}
      </div>
    ),
    onRelease: ({ draggableContext, droppableContext }) => {
      moveList(
        draggableContext.id,
        droppableContext.id,
        droppableContext.placeholderIndex,
      );
    },
  });

  const setRefs = node => {
    setListRef(node);
    listRef.current = node;
  };

  return (
    <div id={id} className={classNames(droppableClassName, className)}>
      <div id={id} ref={setRefs} className='card-list' tabIndex={0}>
        {cardListContent}
      </div>
    </div>
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
