import { useEffect, useContext, useCallback } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDroppable({
  context,
  node,
  acceptTypes,
  onDraggableEnter,
  onDraggableHover,
  onDraggableLeave,
}) {
  const { draggedObject, onDraggableEnterDroppable } = useContext(
    DragDropContext,
  );

  const onMouseOver = useCallback(() => {
    onDraggableHover(draggedObject);
  }, [draggedObject, onDraggableHover]);

  const onMouseEnter = useCallback(() => {
    if (acceptTypes.includes(draggedObject.type)) {
      onDraggableEnterDroppable(context, onDraggableLeave);
      onDraggableEnter(draggedObject);
    }
  }, [
    acceptTypes,
    draggedObject,
    onDraggableEnterDroppable,
    context,
    onDraggableLeave,
    onDraggableEnter,
  ]);

  useEffect(() => {
    if (draggedObject === null) return;

    node.current.addEventListener('mouseover', onMouseOver);
    node.current.addEventListener('mouseenter', onMouseEnter);

    return () => {
      node.current.removeEventListener('mouseenter', onMouseEnter);
      node.current.removeEventListener('mouseover', onMouseOver);
    };
  }, [draggedObject, onMouseOver, onMouseEnter, node]);

  return [draggedObject ? draggedObject.context : null];
}

export { useDroppable };
