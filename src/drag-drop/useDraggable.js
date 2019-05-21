import { useContext, useEffect } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDraggable({ context, type, node, renderElement, onRelease }) {
  const { grabDraggable } = useContext(DragDropContext);

  useEffect(() => {
    node.current.addEventListener('mousedown', ({ clientX, clientY }) => {
      const grabPosition = {
        x: clientX,
        y: clientY,
      };
      const draggable = {
        context,
        type,
        node,
        renderElement,
        onRelease,
      };
      grabDraggable(grabPosition, draggable);
    });
  }, [context, grabDraggable, node, onRelease, renderElement, type]);
}

export { useDraggable };
