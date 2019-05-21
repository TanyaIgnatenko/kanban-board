import { useEffect, useContext } from 'react';

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

  const handleDraggableEnter = () => {
    if (draggedObject === null) {
      return;
    }

    if (acceptTypes.includes(draggedObject.type)) {
      onDraggableEnterDroppable(context, onDraggableLeave);
      onDraggableEnter(draggedObject);

      node.current.addEventListener('mousemove', () =>
        onDraggableHover(draggedObject),
      );
    }
  };

  useEffect(() => {
    if (draggedObject === null) {
      return;
    }

    node.current.addEventListener('mouseenter', handleDraggableEnter);
  }, [draggedObject, handleDraggableEnter, node, onDraggableEnter]);

  return [draggedObject ? draggedObject.context : null];
}

export { useDroppable };
