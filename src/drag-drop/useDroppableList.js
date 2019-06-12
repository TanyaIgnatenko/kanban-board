import { useEffect, useRef, useCallback, useState } from 'react';

import { useDroppable } from './useDroppable';
import { binaryLastIndexOf } from '../helpers/binaryLastIndexOf';
import { hasScrollbar, SCROLLBAR_DIRECTION } from '../helpers/scrollbar';
import { MOVEMENT } from '../helpers/movement';
import { binaryIndexOf } from '../helpers/binaryIndexOf';

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

  const shouldShowPlaceholder = placeholder.index !== null;
  if (shouldShowPlaceholder) {
    listItems = enrichWithPlaceholder(listItems, placeholder);
  }

  return listItems;
}

function enrichWithPlaceholder(listItems, placeholder) {
  listItems.splice(placeholder.index, 0, {
    type: ITEM_TYPE.PLACEHOLDER,
    index: placeholder.index,
    geometry: placeholder.geometry,
  });
  return listItems;
}

function useDroppableList({
  id,
  acceptedTypes,
  listType,
  items,
  scrollStep,
  scrollOffset,
}) {
  const [placeholderIndex, setPlaceholderIndex] = useState(null);
  const [placeholderGeometry, setPlaceholderGeometry] = useState(null);

  const context = useRef({ id, index: null });
  const itemsRefs = useRef([]);
  const listBodyRef = useRef(null);

  const scrollToStartPosition = useRef(null);
  const scrollToEndPosition = useRef(null);

  const scrollbarDirection =
    listType === LIST_TYPE.HORIZONTAL
      ? SCROLLBAR_DIRECTION.HORIZONTAL
      : SCROLLBAR_DIRECTION.VERTICAL;

  const listHasScrollbar = useRef(false);

  useEffect(() => {
    listHasScrollbar.current =
      listBodyRef.current &&
      hasScrollbar(listBodyRef.current, scrollbarDirection);

    if (!listHasScrollbar.current) return;

    const isHorizontal = listType === LIST_TYPE.HORIZONTAL;
    const listBodyRect =
      listBodyRef.current && listBodyRef.current.getBoundingClientRect();

    scrollToStartPosition.current = isHorizontal
      ? listBodyRect && listBodyRect.left + scrollOffset
      : listBodyRect && listBodyRect.top + scrollOffset;
    scrollToEndPosition.current = isHorizontal
      ? listBodyRect && listBodyRect.right - scrollOffset
      : listBodyRect && listBodyRect.bottom - scrollOffset;
  }, [listHasScrollbar]);

  const setItemRefAt = useCallback((item, idx) => {
    if (!item) return;

    itemsRefs.current[idx] = item;
  }, []);

  const onDraggableEnter = useCallback(draggable => {
    setPlaceholderGeometry({
      width: draggable.geometry.width,
      height: draggable.geometry.height,
    });
  }, []);

  const onDraggableHover = useCallback(
    draggable => {
      const { movement } = draggable;

      const draggableCenter = {
        x: draggable.position.x + draggable.geometry.width / 2,
        y: draggable.position.y + draggable.geometry.height / 2,
      };

      const movementForward =
        listType === LIST_TYPE.HORIZONTAL
          ? movement.includes(MOVEMENT.RIGHT)
          : movement.includes(MOVEMENT.BOTTOM);

      const findPlaceholderIndex = movementForward
        ? binaryLastIndexOf
        : binaryIndexOf;

      let placeholderIndex = findPlaceholderIndex(itemsRefs.current, item => {
        const itemRect = item.getBoundingClientRect();

        const itemCenter = {
          x: itemRect.left + itemRect.width / 2,
          y: itemRect.top + itemRect.height / 2,
        };

        switch (listType) {
          case LIST_TYPE.HORIZONTAL: {
            return movementForward
              ? draggableCenter.x >= itemCenter.x
              : draggableCenter.x <= itemCenter.x;
          }
          case LIST_TYPE.VERTICAL: {
            return movementForward
              ? draggableCenter.y >= itemCenter.y
              : draggableCenter.y <= itemCenter.y;
          }
          default: {
            console.error('Unknown list type:', listType);
          }
        }
      });

      if (listHasScrollbar.current) {
        scrollListIfNeeded(draggableCenter);
      }

      placeholderIndex =
        placeholderIndex !== null
          ? placeholderIndex
          : movementForward
          ? 0
          : items.length - 1;

      context.current.index = placeholderIndex;
      setPlaceholderIndex(placeholderIndex);
    },
    [listType, listHasScrollbar],
  );

  const onDraggableLeave = useCallback(() => {
    setPlaceholderGeometry(null);
    setPlaceholderIndex(null);
    context.current.index = null;
  }, []);

  const scrollListIfNeeded = useCallback(
    draggableCenter => {
      switch (listType) {
        case LIST_TYPE.HORIZONTAL: {
          if (draggableCenter.x <= scrollToStartPosition.current) {
            listBodyRef.current.scrollLeft -= scrollStep;
          } else if (draggableCenter.x >= scrollToEndPosition.current) {
            listBodyRef.current.scrollLeft += scrollStep;
          }
          break;
        }
        case LIST_TYPE.VERTICAL: {
          if (draggableCenter.y <= scrollToStartPosition.current) {
            listBodyRef.current.scrollTop -= scrollStep;
          } else if (draggableCenter.y >= scrollToEndPosition.current) {
            listBodyRef.current.scrollTop += scrollStep;
          }
          break;
        }
      }
    },
    [
      listType,
      listBodyRef,
      scrollStep,
      scrollToStartPosition,
      scrollToEndPosition,
    ],
  );

  const { draggableContext, droppableClassName } = useDroppable({
    id,
    context: context.current,
    acceptedTypes,
    onDraggableEnter,
    onDraggableHover,
    onDraggableLeave,
  });

  const placeholder = {
    index: placeholderIndex,
    geometry: placeholderGeometry,
  };
  const itemToIgnoreId = draggableContext && draggableContext.id;
  const listItems = formListItems(items, itemToIgnoreId, placeholder);

  return {
    listItems,
    setItemRefAt,
    listBodyRef,
    droppableClassName,
  };
}

export { useDroppableList, ITEM_TYPE, LIST_TYPE };
