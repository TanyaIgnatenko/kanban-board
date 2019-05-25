import { useContext } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDroppable({
  id,
  context,
  node,
  acceptTypes,
  onDraggableEnter,
  onDraggableHover,
  onDraggableLeave,
}) {
  const { draggedObject, registerAsDroppable } = useContext(DragDropContext);

  registerAsDroppable({
    id,
    node,
    acceptTypes,
    onDraggableEnter,
    onDraggableHover,
    onDraggableLeave,
  });

  return [draggedObject ? draggedObject.context : null];
}

export { useDroppable };
