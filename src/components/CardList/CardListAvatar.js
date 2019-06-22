import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Card } from '../Card';
import { moveTo } from '../../helpers/moveTo';
import { grabAt } from '../../helpers/grabAt';

function CardListAvatar({
  id,
  name,
  cardListAvatarRef,
  dragHandleRef,
  scrollableRef,
  listItems,
  setItemRefAt,
  addCardComponent,
  isCardFormOpened,
  grabPoint,
  dimensions,
  clientPosition,
  className,
}) {
  const [rotationStyle, setRotationStyle] = useState({});
  useEffect(() => {
    const rotationStyle = grabAt(grabPoint, dimensions);
    setTimeout(() => {
      setRotationStyle(rotationStyle);
    }, 2);
  }, []);

  return (
    <div
      id={id}
      ref={cardListAvatarRef}
      className={classNames('card-list', 'dragged', className)}
      style={Object.assign(moveTo(clientPosition), rotationStyle)}
    >
      <header ref={dragHandleRef}>
        <h2 className='list-title'>{name}</h2>
      </header>
      {(Boolean(listItems.length) || isCardFormOpened) && (
        <ul ref={scrollableRef} className='list-cards'>
          {listItems.map((item, idx) => (
            <li key={item.data.id}>
              <Card
                {...item.data}
                setCardRef={node => setItemRefAt(node, idx)}
                className='list-card'
              />
            </li>
          ))}
          {isCardFormOpened && addCardComponent}
        </ul>
      )}
      <footer>{!isCardFormOpened && addCardComponent}</footer>
    </div>
  );
}

CardListAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cardListAvatarRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  dragHandleRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  scrollableRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        content: PropTypes.string.isRequired,
      }).isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setItemRefAt: PropTypes.func.isRequired,
  addCardComponent: PropTypes.element.isRequired,
  isCardFormOpened: PropTypes.bool.isRequired,
  clientPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  grabPoint: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

CardListAvatar.defaultProps = {
  className: '',
};

export default CardListAvatar;
