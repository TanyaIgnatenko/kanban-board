import { useEffect, useContext } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDroppable(droppable) {
  const { registerDroppable, draggedObjectId } = useContext(DragDropContext);

  useEffect(() => {
    const unregisterDroppable = registerDroppable(droppable);

    return unregisterDroppable;
  }, [
    droppable.id,
    droppable.context,
    droppable.acceptedType,
    droppable.onDraggableEnter,
    droppable.onDraggableHover,
    droppable.onDraggableLeave,
  ]);

  return {
    draggedObjectId,
    droppableClassName: `droppable-${droppable.acceptedType}`,
  };
}

export { useDroppable };
