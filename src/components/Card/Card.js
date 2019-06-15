import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { moveTo } from '../../helpers/moveTo';
import { moveCard } from '../../ducks/board/actions';
import { useDraggable } from '../../drag-drop/useDraggable';
import { DRAGGABLE_TYPE } from '../../constants';

import './Card.scss';

function Card({ id, content, setCardRef, moveCardToList, className }) {
  const renderCard = (isDragged, clientPosition, ref) => (
    <div
      id={id}
      ref={ref}
      className={classNames('card', isDragged && 'dragged', className)}
      style={isDragged ? moveTo(clientPosition) : {}}
      tabIndex={0}
    >
      <h4 className='card-content'>{content}</h4>
    </div>
  );

  const cardRef = useRef(null);
  useDraggable({
    context: {
      id,
    },
    type: DRAGGABLE_TYPE.CARD,
    ref: cardRef,
    dragHandleRef: cardRef,
    renderAvatar: ({ clientPosition, draggedObjectRef }) =>
      renderCard(true, clientPosition, draggedObjectRef),
    onRelease: ({ draggableContext, droppableContext }) => {
      moveCardToList(
        draggableContext.id,
        droppableContext.id,
        droppableContext.placeholderIndex,
      );
    },
  });

  const setRefs = node => {
    setCardRef(node);
    cardRef.current = node;
  };

  return renderCard(false, null, setRefs);
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  content: PropTypes.any.isRequired,
  setCardRef: PropTypes.func.isRequired,
  moveCardToList: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

const mapDispatchToProps = {
  moveCardToList: moveCard,
};

export default connect(
  null,
  mapDispatchToProps,
)(Card);
