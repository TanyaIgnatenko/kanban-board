import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { useDraggable } from '../../drag-drop/useDraggable';
import { moveCard } from '../../ducks/board/actions';
import { moveTo } from '../../helpers/moveTo';
import { DRAGGABLE_TYPE } from '../../constants';

import './Card.scss';

function Card({ id, content, setCardRef, moveCardToList, className }) {
  const cardRef = useRef(null);

  const { isDragged, draggedPosition } = useDraggable({
    id,
    context: {
      id,
    },
    type: DRAGGABLE_TYPE.CARD,
    node: cardRef,
    dragHandle: cardRef,
    onRelease: ({ draggableContext, droppableContext }) => {
      moveCardToList(
        draggableContext.id,
        droppableContext.id,
        droppableContext.placeholderIndex,
      );
    },
  });

  return (
    <li
      id={id}
      ref={node => {
        cardRef.current = node;
        if (!isDragged) {
          setCardRef(node);
        }
      }}
      className={classNames('card', isDragged && 'dragged', className)}
      style={isDragged ? moveTo(draggedPosition) : {}}
    >
      <h4 className='card-content'>{content}</h4>
    </li>
  );
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  content: PropTypes.any.isRequired,
  setCardRef: PropTypes.func,
  moveCardToList: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
  setCardRef: () => {},
};

const mapDispatchToProps = {
  moveCardToList: moveCard,
};

export default connect(
  null,
  mapDispatchToProps,
)(Card);
