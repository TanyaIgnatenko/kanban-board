import { useContext, useEffect } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDraggable(draggable) {
  const { registerDraggable } = useContext(DragDropContext);

  useEffect(() => {
    const unregisterDraggable = registerDraggable(draggable);

    return unregisterDraggable;
  }, [
    draggable.context,
    draggable.type,
    draggable.node,
    draggable.dragHandle,
    draggable.renderElement,
    draggable.onRelease,
  ]);
}

export { useDraggable };
