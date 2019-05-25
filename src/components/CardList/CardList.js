import React, { useRef, useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { Card } from '../Card';
import { AddComponent } from '../AddComponent';
import { useDroppable } from '../../drag-drop/useDroppable';
import { addCardRequest } from '../../ducks/board/actions';
import { lowerBound } from '../../helpers/lowerBound';
import { DRAGGABLE_TYPE } from '../../constants';

import './CardList.scss';

function CardList({ id, name, cards, addCard, className }) {
  const list = useRef(null);
  const cardsRefs = useRef([]);

  const [placeholderPosition, setPlaceholderPosition] = useState(null);
  const [placeholderHeight, setPlaceholderHeight] = useState(null);

  const onDraggableEnter = useCallback(draggable => {
    setPlaceholderHeight(draggable.geometry.height);
  }, []);

  const onDraggableHover = useCallback(draggable => {
    const draggableCenterY =
      draggable.position.y + draggable.geometry.height / 2;

    let placeholderPosition = lowerBound(cardsRefs.current, card => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterY = cardRect.top + cardRect.height / 2;
      return draggableCenterY <= cardCenterY;
    });

    placeholderPosition =
      placeholderPosition !== null
        ? placeholderPosition
        : cardsRefs.current.length;

    setPlaceholderPosition(placeholderPosition);
  }, []);

  const onDraggableLeave = useCallback(() => {
    setPlaceholderHeight(null);
    setPlaceholderPosition(null);
  }, []);

  const [cardToIgnoreContext] = useDroppable({
    id,
    context: {
      id,
      index: placeholderPosition,
    },
    node: list,
    acceptTypes: DRAGGABLE_TYPE.CARD,
    onDraggableEnter,
    onDraggableHover,
    onDraggableLeave,
  });

  const cardToIgnoreId =
    cardToIgnoreContext !== null ? cardToIgnoreContext.id : null;

  const setItemRef = useCallback((card, idx) => {
    if (!card) return;

    cardsRefs.current[idx] = card;
  }, []);

  const placeholderStyle = useMemo(() => ({ height: placeholderHeight }), [
    placeholderHeight,
  ]);
  return (
    <li
      id={id}
      ref={list}
      className={classNames('card-list', 'droppable', className)}
    >
      <header>
        <h2 className='list-title'>{name}</h2>
      </header>
      {(Boolean(cards.length) || placeholderPosition !== null) && (
        <ul className='list-cards'>
          {[...cards.slice(0, placeholderPosition)].map((card, idx) => (
            <React.Fragment key={card.id}>
              {card.id !== cardToIgnoreId && (
                <Card
                  {...card}
                  idx={idx}
                  className='list-card'
                  cardRef={setItemRef}
                />
              )}
            </React.Fragment>
          ))}
          {placeholderPosition !== null && (
            <li className='placeholder list-card' style={placeholderStyle} />
          )}
          {[...cards.slice(placeholderPosition)].map((card, idx) => (
            <React.Fragment key={card.id}>
              {card.id !== cardToIgnoreId && (
                <Card
                  {...card}
                  idx={idx}
                  className='list-card'
                  cardRef={setItemRef}
                />
              )}
            </React.Fragment>
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
    </li>
  );
}

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapDispatchToProps = {
  addCard: addCardRequest,
};

export default connect(
  null,
  mapDispatchToProps,
)(CardList);
