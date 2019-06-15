import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { useDraggable } from '../../drag-drop/useDraggable';
import { DRAGGABLE_TYPE } from '../../constants';

import { moveCard } from '../../ducks/board/actions';
import { moveTo } from '../../helpers/moveTo';

import './Card.scss';

function Card({ id, content, setCardRef, moveCardToList, className }) {
  const cardRef = useRef(null);
  useDraggable({
    context: {
      id,
    },
    type: DRAGGABLE_TYPE.CARD,
    node: cardRef,
    dragHandle: cardRef,
    renderElement: ({ clientPosition, draggedObjectRef }) => (
      <div
        ref={draggedObjectRef}
        className={classNames('card', 'dragged', className)}
        style={moveTo(clientPosition)}
      >
        <h4 className='card-content'>{content}</h4>
      </div>
    ),
    onRelease: ({ draggableContext, droppableContext }) => {
      moveCardToList(
        draggableContext.id,
        droppableContext.id,
        droppableContext.index,
      );
    },
  });

  const setRefs = node => {
    setCardRef(node);
    cardRef.current = node;
  };

  return (
    <li
      id={id}
      ref={setRefs}
      className={classNames('card', className)}
      tabIndex={0}
    >
      <h4 className='card-content'>{content}</h4>
    </li>
  );
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
