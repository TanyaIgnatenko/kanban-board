import React from 'react';
import PropTypes from 'prop-types';

import './Container.scss';

function Container({children}) {
  return (
    <div className='container'>
      {children}
    </div>
  );
}

Container.propTypes = {};
Container.defaultProps = {};

export default Container;
