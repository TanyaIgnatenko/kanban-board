import { useRef, useCallback, useState } from 'react';

import { useDroppable } from './useDroppable';
import { lowerBound } from '../helpers/lowerBound';

const ITEM_TYPE = {
  PLACEHOLDER: 'PLACEHOLDER',
  REGULAR_ITEM: 'REGULAR_ITEM',
};

const LIST_TYPE = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
};

function enrichWithPlaceholder(items, placeholderIndex, placeholderGeometry) {
  const listItems = items.map(item => ({
    type: ITEM_TYPE.REGULAR_ITEM,
    data: item,
  }));

  const shouldShowPlaceholder = placeholderIndex !== null;
  if (shouldShowPlaceholder) {
    listItems.splice(placeholderIndex, 0, {
      type: ITEM_TYPE.PLACEHOLDER,
      index: placeholderIndex,
      geometry: placeholderGeometry,
    });
  }

  return listItems;
}

function useDroppableList({ id, acceptedType, listType, items }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(null);
  const [placeholderGeometry, setPlaceholderGeometry] = useState(null);

  const context = useRef({ id, index: null });
  const itemNodes = useRef([]);

  const setItemAt = useCallback((item, idx) => {
    if (!item) return;

    itemNodes.current[idx] = item;
  }, []);

  const onDraggableEnter = useCallback(draggable => {
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

      let placeholderIndex = lowerBound(itemNodes.current, item => {
        const itemRect = item.getBoundingClientRect();

        const itemCenter = {
          x: itemRect.left + itemRect.width / 2,
          y: itemRect.top + itemRect.height / 2,
        };
        return listType === LIST_TYPE.HORIZONTAL
          ? draggableCenter.x <= itemCenter.x
          : draggableCenter.y <= itemCenter.y;
      });

      placeholderIndex =
        placeholderIndex !== null ? placeholderIndex : itemNodes.current.length;

      context.current.index = placeholderIndex;
      setPlaceholderIndex(placeholderIndex);
    },
    [listType],
  );

  const onDraggableLeave = useCallback(() => {
    setPlaceholderGeometry(null);
    setPlaceholderIndex(null);
    context.current.index = null;
  }, []);

  const { draggableContext, droppableClassName } = useDroppable({
    id,
    context: context.current,
    acceptedType,
    onDraggableEnter,
    onDraggableHover,
    onDraggableLeave,
  });

  let listItems = enrichWithPlaceholder(
    items,
    placeholderIndex,
    placeholderGeometry,
  );

  const itemToIgnoreId = draggableContext && draggableContext.id;
  if (itemToIgnoreId) {
    listItems = listItems.filter(
      item =>
        item.type === ITEM_TYPE.PLACEHOLDER || item.data.id !== itemToIgnoreId,
    );
  }
  return {
    listItems,
    setItemAt,
    droppableClassName,
  };
}

export { useDroppableList, ITEM_TYPE, LIST_TYPE };
