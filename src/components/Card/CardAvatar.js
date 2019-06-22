import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { moveTo } from '../../helpers/moveTo';
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

  const applyGrabAnimation = useCallback(() => {
    const rotationStyle = grabAt(grabPoint, dimensions);
    setRotationStyle(rotationStyle);
  }, []);

  const removeGrabAnimation = useCallback(() => {
    setRotationStyle({});
  }, []);

  useEffect(() => {
    setTimeout(applyGrabAnimation, 5);

    return removeGrabAnimation;
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
