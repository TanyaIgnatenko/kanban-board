import {useEffect, useContext, useCallback} from 'react';

import DragDropContext from './internal/DragDropContext';

function useDroppable({
                        context,
                        node,
                        acceptTypes,
                        onDraggableEnter,
                        onDraggableHover,
                        onDraggableLeave,
                      }) {
  const {draggedObject, onDraggableEnterDroppable} = useContext(DragDropContext);

  const onMouseOver = useCallback(() => {
    onDraggableHover(draggedObject);
  }, [draggedObject, onDraggableHover]);

  const onMouseEnter = useCallback(() => {
    if (acceptTypes.includes(draggedObject.type)) {
      onDraggableEnterDroppable(context, onDraggableLeave);
      onDraggableEnter(draggedObject);
    }
  }, [
    draggedObject,
    acceptTypes,
    onDraggableEnterDroppable,
    onDraggableEnter,
    onDraggableLeave
  ]);

  useEffect(() => {
    if (draggedObject === null) return;

    node.current.addEventListener('mouseover', onMouseOver);
    node.current.addEventListener('mouseenter', onMouseEnter);

    return () => {
      node.current.removeEventListener('mouseenter', onMouseEnter);
      node.current.removeEventListener('mouseover', onMouseOver);
    };
  }, [draggedObject, onMouseOver, onMouseEnter]);

  return [draggedObject ? draggedObject.context : null];
}

export {useDroppable};
