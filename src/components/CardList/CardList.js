import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import CardListAvatar from './CardListAvatar';
import { Card } from '../Card';
import { AddComponent } from '../AddComponent';
import { addCardRequest, moveList } from '../../ducks/board/actions';
import { useScrollable } from '../../drag-drop/useScrollable';
import { useDraggable } from '../../drag-drop/useDraggable';
import { DRAGGABLE_TYPE } from '../../constants';

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
    scrollPointOffset: 10,
    scrollStep: 15,
  });

  const dragHandleRef = useRef(null);
  const listRef = useRef(null);

  const [isCardFormOpened, setIsCardFormOpened] = useState(false);

  const addCardComponent = (
    <AddComponent
      isFormOpened={isCardFormOpened}
      formClassName='card-form'
      openCreationFormBtnText='Add a card'
      placeholderFormText='Enter a title for this card...'
      submitFormBtnText='Add card'
      onFormOpenedChange={value => setIsCardFormOpened(value)}
      onAdd={addCard.bind(null, id)}
    />
  );

  useDraggable({
    context: {
      id,
    },
    type: DRAGGABLE_TYPE.LIST,
    ref: listRef,
    dragHandleRef,
    renderAvatar: ({ clientPosition, grabPoint, dimensions, ref }) => (
      <CardListAvatar
        id={id}
        name={name}
        cardListAvatarRef={ref}
        dragHandleRef={dragHandleRef}
        scrollableRef={scrollableRef}
        listItems={listItems}
        setItemRefAt={setItemRefAt}
        addCardComponent={addCardComponent}
        isCardFormOpened={isCardFormOpened}
        grabPoint={grabPoint}
        dimensions={dimensions}
        clientPosition={clientPosition}
        className={className}
      />
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
                          width: item.dimensions && item.dimensions.width,
                          height: item.dimensions && item.dimensions.height,
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
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
