import { useContext, useEffect } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDraggable(draggable) {
  const {
    registerDraggable,
    draggedObjectId,
    draggedObjectPosition,
  } = useContext(DragDropContext);

  useEffect(() => {
    const unregisterDraggable = registerDraggable({
      ...draggable,
      onRelease: context => {
        draggable.onRelease(context);
      },
    });

    return unregisterDraggable;
  }, [
    draggable.context,
    draggable.type,
    draggable.node,
    draggable.dragHandle,
    draggable.onGrab,
    draggable.onMove,
    draggable.onRelease,
  ]);

  return {
    isDragged: draggable.id === draggedObjectId,
    draggedPosition: draggedObjectPosition,
  };
}

export { useDraggable };
