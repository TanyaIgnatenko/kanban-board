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
    droppable.node,
    droppable.acceptedType,
    droppable.onDraggableEnter,
    droppable.onDraggableHover,
    droppable.onDraggableLeave,
  ]);

  return {
    draggableContext: draggedObject && draggedObject.context,
    droppableClassName: `droppable-${droppable.acceptedType}`,
  };
}

export { useDroppable };
