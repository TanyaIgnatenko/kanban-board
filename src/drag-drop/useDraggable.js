import { useContext, useEffect } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDraggable({ context, type, node, renderElement, onRelease }) {
  const { grabDraggable } = useContext(DragDropContext);

  useEffect(() => {
    const onMouseDown = ({ clientX, clientY }) => {
      const grabPosition = {
        x: clientX,
        y: clientY,
      };
      grabDraggable(
        grabPosition,
        context,
        type,
        node,
        renderElement,
        onRelease,
      );
    };

    node.current.addEventListener('mousedown', onMouseDown);

    return () => {
      node.current.removeEventListener('mousedown', onMouseDown);
    };
  }, [grabDraggable, context, type, node, renderElement, onRelease]);
}

export { useDraggable };
