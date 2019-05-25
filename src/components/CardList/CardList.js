import React, { useRef, useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useDroppable } from '../../drag-drop/useDroppable';
import { lowerBound } from '../../helpers/lowerBound';
import { DRAGGABLE_TYPE } from '../../constants';

import './CardList.scss';
import Card from '../Card/Card';

function CardList({ id, name, cards, className }) {
  const list = useRef(null);
  const cardsRefs = useRef([]);

  const [placeholderPosition, setPlaceholderPosition] = useState(null);
  const [placeholderHeight, setPlaceholderHeight] = useState(null);

  const onDraggableEnter = useCallback(draggable => {
    setPlaceholderHeight(draggable.geometry.height);
  }, []);

  const onDraggableHover = useCallback(draggable => {
    const draggableCenterY =
      draggable.geometry.y + draggable.geometry.height / 2;

    let placeholderPosition = lowerBound(cardsRefs.current, card => {
      const cardCenterY =
        card.getBoundingClientRect().top + card.offsetHeight / 2;
      return cardCenterY <= draggableCenterY;
    });
    placeholderPosition = placeholderPosition || cardsRefs.current.length;

    setPlaceholderPosition(placeholderPosition);
  }, []);

  const onDraggableLeave = useCallback(() => {
    setPlaceholderHeight(null);
    setPlaceholderPosition(null);
  }, []);

  const [cardToIgnoreContext] = useDroppable({
    id,
    context: {
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
      {(cards.length || placeholderPosition) && (
        <ul className='list-cards'>
          {cards.map((card, idx) => (
            <React.Fragment key={card.id}>
              {placeholderPosition === idx && (
                <li className='placeholder' style={placeholderStyle} />
              )}
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
        <button className='add-card-btn'>
          <h4>Добавить еще одну карточку</h4>
        </button>
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

export default CardList;
