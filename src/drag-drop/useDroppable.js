import { useContext } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDroppable({
  id,
  context,
  node,
  acceptedType,
  onDraggableEnter,
  onDraggableHover,
  onDraggableLeave,
}) {
  const { draggedObject, registerAsDroppable } = useContext(DragDropContext);

  registerAsDroppable({
    id,
    node,
    context,
    onDraggableEnter,
    onDraggableHover,
    onDraggableLeave,
  });

  return {
    draggableContext: draggedObject && draggedObject.context,
    droppableClassName: `droppable-${acceptedType}`,
  };
}

export { useDroppable };
