import { useState, useContext, useEffect } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDraggable(draggable) {
  const { registerDraggable } = useContext(DragDropContext);

  const [isDragged, setIsDragged] = useState(false);
  const [draggedPosition, setDraggedPosition] = useState(null);

  useEffect(() => {
    const unregisterDraggable = registerDraggable({
      ...draggable,
      onGrab: () => setIsDragged(true),
      onMove: clientPosition => setDraggedPosition(clientPosition),
      onRelease: context => {
        setIsDragged(false);
        setDraggedPosition(null);

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

  return [isDragged, draggedPosition];
}

export { useDraggable };
