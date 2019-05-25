import { useRef, useCallback, useState } from 'react';

import { useDroppable } from './useDroppable';
import { lowerBound } from '../helpers/lowerBound';

const ITEM_TYPE = {
  PLACEHOLDER: 'PLACEHOLDER',
  REGULAR_ITEM: 'REGULAR_ITEM',
};

function useDroppableList({ id, acceptedType, items, isPositionLess }) {
  const listNode = useRef(null);
  const itemNodes = useRef([]);
  const context = useRef({ id, index: null });

  const [placeholderIndex, setPlaceholderIndex] = useState(null);
  const [placeholderGeometry, setPlaceholderGeometry] = useState(null);

  const onDraggableEnter = useCallback(draggable => {
    setPlaceholderGeometry({
      width: draggable.geometry.width,
      height: draggable.geometry.height,
    });
  }, []);

  const onDraggableHover = useCallback(
    draggable => {
      const draggableCenterPos = {
        x: draggable.position.x + draggable.geometry.width / 2,
        y: draggable.position.y + draggable.geometry.height / 2,
      };

      let placeholderIndex = lowerBound(itemNodes.current, card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterPos = {
          x: cardRect.left + cardRect.width / 2,
          y: cardRect.top + cardRect.height / 2,
        };
        return isPositionLess(draggableCenterPos, cardCenterPos);
      });

      placeholderIndex =
        placeholderIndex !== null ? placeholderIndex : itemNodes.current.length;

      context.current.index = placeholderIndex;
      setPlaceholderIndex(placeholderIndex);
    },
    [isPositionLess],
  );

  const onDraggableLeave = useCallback(() => {
    setPlaceholderGeometry(null);
    setPlaceholderIndex(null);
    context.current.index = null;
  }, []);

  const { draggableContext, droppableClassName } = useDroppable({
    id,
    context: context.current,
    node: listNode,
    acceptedType,
    onDraggableEnter,
    onDraggableHover,
    onDraggableLeave,
  });

  const setItemAt = useCallback((card, idx) => {
    if (!card) return;

    itemNodes.current[idx] = card;
  }, []);

  const listItems = items.map(item => ({
    type: ITEM_TYPE.REGULAR_ITEM,
    data: item,
  }));
  if (placeholderIndex !== null) {
    listItems.splice(placeholderIndex, 0, {
      type: ITEM_TYPE.PLACEHOLDER,
      index: placeholderIndex,
      geometry: placeholderGeometry,
    });
  }
  if (draggableContext !== null) {
    const itemToIgnoreIdx = listItems.findIndex(
      item =>
        item.type === ITEM_TYPE.REGULAR_ITEM &&
        item.data.id === draggableContext.id,
    );
    if (itemToIgnoreIdx !== -1) {
      listItems.splice(itemToIgnoreIdx, 1);
    }
  }

  return {
    listItems,
    listNode,
    setItemAt,
    droppableClassName,
  };
}

export { ITEM_TYPE, useDroppableList };
