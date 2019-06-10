import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useUniqueId } from '../../hooks/uniqueId';
import { useOnClickOutside } from '../../hooks/onClickOutside';

import './AddComponent.scss';

function AddComponent({
  openCreationFormBtnText,
  placeholderFormText,
  submitFormBtnText,
  onAdd,
  className,
  formClassName,
}) {
  const [creationMode, setCreationMode] = useState(false);

  const [content, setContent] = useState('');
  const handleContentChange = useCallback(event => {
    const content = event.target.value;
    setContent(content);
  }, []);

  const handleClose = useCallback(() => {
    setContent('');
    setCreationMode(false);
  }, []);

  const handleAdd = useCallback(() => {
    if (!content) return;

    onAdd(content);
    handleClose();
  }, [content, handleClose, onAdd]);

  const textarea = useRef(null);
  const handleOpen = useCallback(() => {
    setCreationMode(true);
  }, []);

  const addComponentId = useUniqueId('add-component');
  const handleWasClickOutside = useCallback(() => {
    setCreationMode(false);
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
          creationMode && 'hidden',
        )}
        onClick={handleOpen}
      >
        <h4>{openCreationFormBtnText}</h4>
      </button>
      <div
        className={classNames(
          'component-composer',
          formClassName,
          !creationMode && 'hidden',
        )}
      >
        <textarea
          autoFocus
          className='component-content'
          value={content}
          placeholder={placeholderFormText}
          onChange={handleContentChange}
        />
        <div className='component-composer-controls'>
          <button className='add-component-btn' onClick={handleAdd}>
            {submitFormBtnText}
          </button>
          <button className='close-btn' onClick={handleClose} />
        </div>
      </div>
    </div>
  );
}

AddComponent.propTypes = {
  openCreationFormBtnText: PropTypes.string.isRequired,
  placeholderFormText: PropTypes.string.isRequired,
  submitFormBtnText: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  formClassName: PropTypes.string,
  className: PropTypes.string,
};

AddComponent.defaultProps = {
  formClassName: '',
  className: '',
};

export default AddComponent;
