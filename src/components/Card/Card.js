import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { useDraggable } from '../../drag-drop/useDraggable';
import { DRAGGABLE_TYPE } from '../../constants';

import { moveCard } from '../../ducks/board/actions';
import moveTo from '../../helpers/moveTo';

import './Card.scss';

function Card({ id, content, cardRef, idx, moveCardToList, className }) {
  const item = useRef(null);
  useDraggable({
    context: {
      id,
    },
    type: DRAGGABLE_TYPE.CARD,
    node: item,
    renderElement: ({ clientPosition }) => (
      <div
        className={classNames('card dragged', className)}
        style={moveTo(clientPosition)}
      >
        {content}
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

  return (
    <li
      ref={el => {
        cardRef(el, idx);
        item.current = el;
      }}
      className={classNames('card', className)}
    >
      <h4 className='card-content'>{content}</h4>
    </li>
  );
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  content: PropTypes.any.isRequired,
};

const mapDispatchToProps = {
  moveCardToList: moveCard,
};

export default connect(
  null,
  mapDispatchToProps,
)(Card);
