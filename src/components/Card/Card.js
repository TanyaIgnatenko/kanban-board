import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import CardAvatar from './CardAvatar';
import { useDraggable } from '../../drag-drop/useDraggable';
import { moveCard } from '../../ducks/board/actions';
import { DRAGGABLE_TYPE } from '../../constants';

import './Card.scss';

function Card({ id, content, setCardRef, moveCardToList, className }) {
  const cardRef = useRef(null);

  useDraggable({
    context: {
      id,
    },
    type: DRAGGABLE_TYPE.CARD,
    ref: cardRef,
    dragHandleRef: cardRef,
    renderAvatar: ({ clientPosition, grabPoint, dimensions, ref }) => (
      <CardAvatar
        id={id}
        cardAvatarRef={ref}
        content={content}
        className={className}
        grabPoint={grabPoint}
        dimensions={dimensions}
        clientPosition={clientPosition}
      />
    ),
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

  return (
    <div
      id={id}
      ref={setRefs}
      className={classNames('card', className)}
      tabIndex={0}
    >
      <h4 className='card-content'>{content}</h4>
    </div>
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
