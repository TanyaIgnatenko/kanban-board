import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './AddComponent.scss';
import { useUniqueId } from '../../hooks/uniqueId';
import { useOnClickOutside } from '../../hooks/onClickOutside';

function AddComponent({ componentName, onAdd, className }) {
  const [composeMode, setComposeMode] = useState(false);

  const [content, setContent] = useState('');
  const handleContentChange = useCallback(event => {
    const content = event.target.value;
    setContent(content);
  }, []);

  const handleClose = useCallback(() => {
    setContent('');
    setComposeMode(false);
  }, []);

  const handleAdd = useCallback(() => {
    onAdd(content);
    handleClose();
  }, [content, handleClose, onAdd]);

  const textarea = useRef(null);
  const handleOpen = useCallback(event => {
    setComposeMode(true);
    textarea.current.focus();
  }, []);

  const addComponentId = useUniqueId('add-component');
  const handleWasClickOutside = useCallback(() => {
    setComposeMode(false);
  }, []);
  useOnClickOutside(addComponentId, handleWasClickOutside);

  return (
    <div
      id={addComponentId}
      className={classNames('add-component-wrapper', className)}
    >
      <button
        className={classNames(
          'open-component-composer-btn',
          composeMode && 'hidden',
        )}
        onClick={handleOpen}
      >
        <h4>Добавить еще одну {componentName}</h4>
      </button>
      <div
        className={classNames('component-composer', !composeMode && 'hidden')}
      >
        <textarea
          autoFocus
          ref={textarea}
          className='component-content'
          value={content}
          placeholder={`Введите название ${componentName}`}
          onChange={handleContentChange}
        />
        <div className='component-composer-controls'>
          <button className='add-component-btn' onClick={handleAdd}>
            Добавить {componentName}
          </button>
          <button className='close-btn' onClick={handleClose} />
        </div>
      </div>
    </div>
  );
}

AddComponent.propTypes = {
  componentName: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  className: PropTypes.string,
};

AddComponent.defaultProps = {
  className: '',
};

export default AddComponent;
