import { useRef, useCallback, useState } from 'react';

import { useDroppable } from './useDroppable';
import { binaryLastIndexOf } from '../helpers/binaryLastIndexOf';

const ITEM_TYPE = {
  PLACEHOLDER: 'PLACEHOLDER',
  REGULAR_ITEM: 'REGULAR_ITEM',
};

const LIST_TYPE = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
};

function formListItems(items, itemToIgnoreId, placeholder) {
  let listItems = items
    ? items.map(item => ({
        type: ITEM_TYPE.REGULAR_ITEM,
        data: item,
      }))
    : [];

  const shouldIgnoreItem = itemToIgnoreId !== null;
  if (shouldIgnoreItem) {
    listItems = listItems.filter(item => item.data.id !== itemToIgnoreId);
  }

  const shouldShowPlaceholder = placeholder.placeholderIndex !== null;
  if (shouldShowPlaceholder) {
    listItems = enrichWithPlaceholder(listItems, placeholder);
  }

  return listItems;
}

function enrichWithPlaceholder(listItems, placeholder) {
  listItems.splice(placeholder.placeholderIndex, 0, {
    type: ITEM_TYPE.PLACEHOLDER,
    placeholderIndex: placeholder.placeholderIndex,
    geometry: placeholder.geometry,
  });
  return listItems;
}

function useDroppableList({ id, acceptedTypes, listType, items }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(null);
  const [placeholderGeometry, setPlaceholderGeometry] = useState(null);
  const [isHoveredByDraggable, setIsHoveredByDraggable] = useState(false);

  const contextRef = useRef({ id, placeholderIndex: null });
  const itemsRef = useRef([]);

  const setItemRefAt = (item, idx) => {
    if (!item) return;

    itemsRef.current[idx] = item;
  };

  const onDraggableEnter = useCallback(draggable => {
    setIsHoveredByDraggable(true);
    setPlaceholderGeometry({
      width: draggable.geometry.width,
      height: draggable.geometry.height,
    });
  }, []);

  const onDraggableHover = useCallback(
    draggable => {
      const draggableCenter = {
        x: draggable.position.x + draggable.geometry.width / 2,
        y: draggable.position.y + draggable.geometry.height / 2,
      };

      let placeholderIdx = binaryLastIndexOf(itemsRef.current, item => {
        const itemRect = item.getBoundingClientRect();

        switch (listType) {
          case LIST_TYPE.HORIZONTAL: {
            let extra = 0;
            if (itemRect.width > draggable.geometry.width) {
              // to avoid placeholder and bigger than it card swap back and forth
              extra = itemRect.width - draggable.geometry.width;
            }
            return itemRect.left + extra < draggableCenter.x;
          }
          case LIST_TYPE.VERTICAL: {
            let extra = 0;
            if (itemRect.height > draggable.geometry.height) {
              // to avoid placeholder and bigger than it card swap back and forth
              extra = itemRect.height - draggable.geometry.height;
            }
            return itemRect.top + extra < draggableCenter.y;
          }
          default: {
            console.error('Uknown list type:', listType);
          }
        }
      });

      placeholderIdx = placeholderIdx !== null ? placeholderIdx : 0;

      contextRef.current.placeholderIndex = placeholderIdx;
      setPlaceholderIndex(placeholderIdx);
    },
    [placeholderIndex, listType],
  );

  const onDraggableLeave = useCallback(() => {
    setIsHoveredByDraggable(false);
    setPlaceholderGeometry(null);
    setPlaceholderIndex(null);
    contextRef.current.placeholderIndex = null;
  }, []);

  const { draggableContext, droppableClassName } = useDroppable({
    id,
    context: contextRef.current,
    acceptedTypes,
    onDraggableEnter,
    onDraggableHover,
    onDraggableLeave,
  });

  const placeholder = {
    placeholderIndex,
    geometry: placeholderGeometry,
  };
  const itemToIgnoreId = draggableContext && draggableContext.id;
  const listItems = formListItems(items, itemToIgnoreId, placeholder);

  return {
    listItems,
    setItemRefAt,
    droppableClassName,
    isHoveredByDraggable,
  };
}

export { useDroppableList, ITEM_TYPE, LIST_TYPE };
