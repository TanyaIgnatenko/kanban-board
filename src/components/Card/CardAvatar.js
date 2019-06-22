import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { moveTo } from '../../helpers/moveTo';
import PropTypes from 'prop-types';
import { grabAt } from '../../helpers/grabAt';

function CardAvatar({
  id,
  content,
  cardAvatarRef,
  className,
  grabPoint,
  dimensions,
  clientPosition,
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
      ref={cardAvatarRef}
      className={classNames('card', 'dragged', className)}
      style={Object.assign(moveTo(clientPosition), rotationStyle)}
    >
      <h4 className='card-content'>{content}</h4>
    </div>
  );
}

CardAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  cardAvatarRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  clientPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  content: PropTypes.any.isRequired,
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

CardAvatar.defaultProps = {
  className: '',
};

export default CardAvatar;
