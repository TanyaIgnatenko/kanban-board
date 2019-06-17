import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useUniqueId } from '../../hooks/uniqueId';
import { useOnClickOutside } from '../../hooks/onClickOutside';

import './AddComponent.scss';

function AddComponent({
  isFormOpened,
  onFormOpenedChange,
  openCreationFormBtnText,
  placeholderFormText,
  submitFormBtnText,
  onAdd,
  className,
  formClassName,
  style,
}) {
  const [content, setContent] = useState('');
  const handleContentChange = useCallback(event => {
    const content = event.target.value;
    setContent(content);
  }, []);

  const handleClose = useCallback(() => {
    setContent('');
    onFormOpenedChange(false);
  }, []);

  const handleAdd = useCallback(() => {
    if (!content.trim()) return;

    onAdd(content);
    handleClose();
  }, [content, handleClose, onAdd]);

  const handleOpen = useCallback(() => {
    onFormOpenedChange(true);
  }, []);

  const addComponentId = useUniqueId('add-component');
  const handleWasClickOutside = useCallback(() => {
    onFormOpenedChange(false);
  }, []);
  useOnClickOutside(addComponentId, handleWasClickOutside);

  const formRef = useRef(null);
  useEffect(() => {
    if (isFormOpened) {
      formRef.current.scrollIntoView(false);
    }
  }, [isFormOpened]);

  return (
    <div
      id={addComponentId}
      className={classNames('add-component-wrapper', className)}
      style={style}
    >
      <button
        className={classNames('open-form-btn', {
          hidden: isFormOpened,
        })}
        onClick={handleOpen}
      >
        <h4>{openCreationFormBtnText}</h4>
      </button>
      <div
        ref={node => (formRef.current = node)}
        className={classNames('form', formClassName, {
          hidden: !isFormOpened,
        })}
      >
        <textarea
          autoFocus
          className='content'
          value={content}
          placeholder={placeholderFormText}
          onChange={handleContentChange}
        />
        <div className='form-controls'>
          <button className='add-btn' onClick={handleAdd}>
            {submitFormBtnText}
          </button>
          <button
            aria-label='close'
            className='close-btn'
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

AddComponent.propTypes = {
  isFormOpened: PropTypes.bool,
  openCreationFormBtnText: PropTypes.string.isRequired,
  placeholderFormText: PropTypes.string.isRequired,
  submitFormBtnText: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onFormOpenedChange: PropTypes.func.isRequired,
  formClassName: PropTypes.string,
  className: PropTypes.string,
};

AddComponent.defaultProps = {
  isFormOpened: null,
  className: '',
  formClassName: '',
};

export default AddComponent;
