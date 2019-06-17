import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useUniqueId } from '../../hooks/uniqueId';
import { useOnClickOutside } from '../../hooks/onClickOutside';

import './AddComponent.scss';
import _ from 'lodash';

function AddComponent({
  openCreationFormBtnText,
  placeholderFormText,
  submitFormBtnText,
  onAdd,
  isFormOpened,
  onFormOpen,
  onFormClose,
  className,
  formClassName,
  style,
}) {
  const isUncontrolled = useRef(isFormOpened === null);
  const [isCreationMode, setCreationMode] = useState(false);

  const [content, setContent] = useState('');
  const handleContentChange = useCallback(event => {
    const content = event.target.value;
    setContent(content);
  }, []);

  const handleClose = useCallback(() => {
    setContent('');
    if (isUncontrolled) {
      setCreationMode(false);
    }
    onFormClose();
  }, []);

  const handleAdd = useCallback(() => {
    if (!content.trim()) return;

    onAdd(content);
    handleClose();
  }, [content, handleClose, onAdd]);

  const handleOpen = useCallback(() => {
    if (isUncontrolled) {
      setCreationMode(true);
    }
    onFormOpen();
  }, []);

  const addComponentId = useUniqueId('add-component');
  const handleWasClickOutside = useCallback(() => {
    if (isUncontrolled) {
      setCreationMode(false);
    }
    onFormClose();
  }, []);
  useOnClickOutside(addComponentId, handleWasClickOutside);

  const formRef = useRef(null);
  useEffect(() => {
    if (isCreationMode) {
      formRef.current.scrollIntoView(false);
    }
  }, [isCreationMode]);

  return (
    <div
      id={addComponentId}
      className={classNames('add-component-wrapper', className)}
      style={style}
    >
      <button
        className={classNames('open-form-btn', {
          hidden:
            (isUncontrolled.current && isCreationMode) ||
            (!isUncontrolled.current && isFormOpened),
        })}
        onClick={handleOpen}
      >
        <h4>{openCreationFormBtnText}</h4>
      </button>
      <div
        ref={node => (formRef.current = node)}
        className={classNames('form', formClassName, {
          hidden:
            (isUncontrolled.current && !isCreationMode) ||
            (!isUncontrolled.current && !isFormOpened),
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
  onFormOpen: PropTypes.func,
  onFormClose: PropTypes.func,
  formClassName: PropTypes.string,
  className: PropTypes.string,
};

AddComponent.defaultProps = {
  isFormOpened: null,
  className: '',
  formClassName: '',
  onFormOpen: () => {},
  onFormClose: () => {},
};

export default AddComponent;
