import { useEffect, useContext } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDroppable({
  id,
  context,
  acceptedTypes,
  onDraggableEnter,
  onDraggableHover,
  onDraggableLeave,
}) {
  const { draggedObject, registerDroppable } = useContext(DragDropContext);

  useEffect(() => {
    const unregisterDroppable = registerDroppable({
      id,
      context,
      acceptedTypes,
      onDraggableEnter,
      onDraggableHover,
      onDraggableLeave,
    });

    return unregisterDroppable;
  }, [
    id,
    context,
    acceptedTypes,
    onDraggableEnter,
    onDraggableHover,
    onDraggableLeave,
  ]);

  return {
    draggableContext: draggedObject && draggedObject.context,
    droppableClassName: 'droppable',
  };
}

export { useDroppable };
