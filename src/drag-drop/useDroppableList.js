import { useEffect, useRef, useCallback, useState } from 'react';

import { useDroppable } from './useDroppable';
import { binaryLastIndexOf } from '../helpers/binaryLastIndexOf';
import { hasScrollbar, SCROLLBAR_DIRECTION } from '../helpers/scrollbar';

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
  const [isHoveredByDraggable, setIsHoveredByDraggable] = useState(false);

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

  const setItemRefAt = (item, idx) => {
    if (!item) return;

    itemsRefs.current[idx] = item;
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

      let placeholderIdx = binaryLastIndexOf(itemsRefs.current, item => {
        const itemRect = item.getBoundingClientRect();
        switch (listType) {
          case LIST_TYPE.HORIZONTAL: {
            let extra = 0;
            if (itemRect.width > draggable.geometry.width) {
              extra = itemRect.width - draggable.geometry.width;
            }
            return itemRect.left + extra < draggableCenter.x;
          }
          case LIST_TYPE.VERTICAL: {
            let extra = 0;
            if (itemRect.height > draggable.geometry.height) {
              extra = itemRect.height - draggable.geometry.height;
            }
            return itemRect.top + extra < draggableCenter.y;
          }
          default: {
            console.error('Uknown list type:', listType);
          }
        }
      });

      if (listHasScrollbar.current) {
        scrollListIfNeeded(draggableCenter);
      }

      placeholderIdx = placeholderIdx !== null ? placeholderIdx : 0;

      context.current.index = placeholderIdx;
      setPlaceholderIndex(placeholderIdx);
    },
    [placeholderIndex, placeholderGeometry, listType, listHasScrollbar],
  );

  const onDraggableLeave = useCallback(() => {
    setIsHoveredByDraggable(false);
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
    isHoveredByDraggable,
  };
}

export { useDroppableList, ITEM_TYPE, LIST_TYPE };
