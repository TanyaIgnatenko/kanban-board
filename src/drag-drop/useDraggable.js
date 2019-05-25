import { useContext, useEffect } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDraggable({
  context,
  type,
  node,
  dragHandle,
  renderElement,
  onRelease,
}) {
  const { grabDraggable } = useContext(DragDropContext);

  useEffect(() => {
    const onMouseDown = event => {
      const { clientX, clientY } = event;
      grabDraggable(
        {
          x: clientX,
          y: clientY,
        },
        context,
        type,
        node,
        renderElement,
        onRelease,
      );

      event.stopPropagation();
    };

    const handle = dragHandle.current;

    handle.addEventListener('mousedown', onMouseDown);

    return () => {
      handle.removeEventListener('mousedown', onMouseDown);
    };
  }, [
    grabDraggable,
    context,
    type,
    node,
    renderElement,
    onRelease,
    dragHandle,
  ]);
}

export { useDraggable };
