import { useEffect, useContext } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDroppable(droppable) {
  const { draggedObject, registerDroppable } = useContext(DragDropContext);

  useEffect(() => {
    const unregisterDroppable = registerDroppable(droppable);

    return unregisterDroppable;
  }, [
    droppable.id,
    droppable.context,
    droppable.acceptedTypes,
    droppable.onDraggableEnter,
    droppable.onDraggableHover,
    droppable.onDraggableLeave,
  ]);

  return {
    draggableContext: draggedObject && draggedObject.context,
    droppableClassName: 'droppable',
  };
}

export { useDroppable };
