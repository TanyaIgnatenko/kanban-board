import { useEffect, useRef, useContext } from 'react';
import DragDropContext from './internal/DragDropContext';

function useScrollable({
  id,
  scrollPointOffset = 0,
  scrollStep = 10,
  scrolledByTypes = [],
}) {
  const scrollableRef = useRef(null);

  const { registerScrollable } = useContext(DragDropContext);

  useEffect(() => {
    const unregisterScrollable = registerScrollable({
      id,
      ref: scrollableRef,
      scrolledByTypes,
      scrollPointOffset,
      scrollStep,
    });

    return unregisterScrollable;
  }, [id, scrollStep, scrollPointOffset, scrolledByTypes]);

  return scrollableRef;
}

export { useScrollable };
