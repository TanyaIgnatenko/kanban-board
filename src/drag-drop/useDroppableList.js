import { useEffect, useRef, useCallback, useState } from 'react';

import { useDroppable } from './useDroppable';
import { lowerBound } from '../helpers/lowerBound';
import { hasScrollbar } from '../helpers/scrollbar';

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

function useDroppableList({
  id,
  acceptedType,
  listType,
  items,
  scrollStep,
  scrollOffset,
}) {
  const [placeholderIndex, setPlaceholderIndex] = useState(null);
  const [placeholderGeometry, setPlaceholderGeometry] = useState(null);

  const context = useRef({ id, index: null });
  const itemRefs = useRef([]);
  const listBodyRef = useRef(null);

  const listHasScrollbar =
    listBodyRef.current && hasScrollbar(listBodyRef.current);
  const scrollToStartPosition = useRef(null);
  const scrollToEndPosition = useRef(null);

  useEffect(() => {
    if (!listHasScrollbar) return;
    console.log('id in  in useDroppableList: ', id);

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

  console.log('listHasScrollbar in  useDroppableList: ', listHasScrollbar);
  const setItemRefAt = useCallback((item, idx) => {
    if (!item) return;

    itemRefs.current[idx] = item;
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

      let placeholderIndex = lowerBound(itemRefs.current, item => {
        const itemRect = item.getBoundingClientRect();

        const itemCenter = {
          x: itemRect.left + itemRect.width / 2,
          y: itemRect.top + itemRect.height / 2,
        };
        return listType === LIST_TYPE.HORIZONTAL
          ? draggableCenter.x <= itemCenter.x
          : draggableCenter.y <= itemCenter.y;
      });

      if (listHasScrollbar) {
        scrollListIfNeeded(draggableCenter);
      }

      placeholderIndex =
        placeholderIndex !== null ? placeholderIndex : itemRefs.current.length;

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
      scrollToStartPosition.current,
      scrollToEndPosition.current,
    ],
  );

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
    setItemRefAt,
    listBodyRef,
    droppableClassName,
  };
}

export { useDroppableList, ITEM_TYPE, LIST_TYPE };
