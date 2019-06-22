import { useCallback } from 'react';

function useScrollByShift(scrollableRef) {
  const scroll = useCallback(event => {
    const { movementX } = event;

    scrollableRef.current.scrollLeft -= movementX;
  }, []);

  const finishScroll = useCallback(() => {
    document.removeEventListener('pointermove', scroll);
    document.removeEventListener('pointerup', finishScroll);
  }, []);

  const prepareToScroll = useCallback(() => {
    document.addEventListener('pointermove', scroll);
    document.addEventListener('pointerup', finishScroll);
  }, []);

  const onScrollablePointerDown = prepareToScroll;

  return onScrollablePointerDown;
}

export { useScrollByShift };
