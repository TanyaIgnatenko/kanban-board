import { useContext, useEffect } from 'react';

import DragDropContext from './internal/DragDropContext';

function useDraggable({
  ref,
  type,
  context,
  dragHandleRef,
  renderAvatar,
  onGrab = () => {},
  onMove = () => {},
  onRelease = () => {},
}) {
  const { registerDraggable } = useContext(DragDropContext);

  useEffect(() => {
    const unregisterDraggable = registerDraggable({
      ref,
      type,
      context,
      dragHandleRef,
      renderAvatar,
      onGrab,
      onMove,
      onRelease,
    });

    return unregisterDraggable;
  }, [
    ref,
    type,
    context,
    dragHandleRef,
    renderAvatar,
    onGrab,
    onMove,
    onRelease,
  ]);
}

export { useDraggable };
