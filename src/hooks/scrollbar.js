import { useEffect, useRef } from 'react';

import {
  hasHorizontalScrollbar,
  hasVerticalScrollbar,
  SCROLLBAR_DIRECTION,
} from '../helpers/scrollbar';

function useScrollbar(scrollbarContainerRef, scrollbarDirection, scrollOffset) {
  const hasScrollbarRef = useRef(false);
  const scrollToStartLimitRef = useRef(null);
  const scrollToEndLimitRef = useRef(null);

  useEffect(() => {
    if (scrollbarContainerRef.current) {
      hasScrollbarRef.current =
        scrollbarDirection === SCROLLBAR_DIRECTION.HORIZONTAL
          ? hasHorizontalScrollbar(scrollbarContainerRef.current)
          : hasVerticalScrollbar(scrollbarContainerRef.current);
    }
    // const hasScrollbar =
    //   scrollbarContainerRef.current &&
    //   scrollbarDirection === SCROLLBAR_DIRECTION.HORIZONTAL
    //     ? hasHorizontalScrollbar(scrollbarContainerRef.current)
    //     : hasVerticalScrollbar(scrollbarContainerRef.current);

    if (!hasScrollbarRef.current) return;

    const scrollbarContainerRect = scrollbarContainerRef.current.getBoundingClientRect();

    switch (scrollbarDirection) {
      case SCROLLBAR_DIRECTION.HORIZONTAL: {
        scrollToStartLimitRef.current =
          scrollbarContainerRect.left + scrollOffset;
        scrollToEndLimitRef.current =
          scrollbarContainerRect.right - scrollOffset;
        break;
      }
      case SCROLLBAR_DIRECTION.VERTICAL: {
        scrollToStartLimitRef.current =
          scrollbarContainerRect.top + scrollOffset;
        scrollToEndLimitRef.current =
          scrollbarContainerRect.bottom - scrollOffset;
        break;
      }
      default: {
        console.error('Unknown scrollbarDirection type: ', scrollbarDirection);
      }
    }
  });

  return [hasScrollbarRef, scrollToStartLimitRef, scrollToEndLimitRef];
}

export { useScrollbar };
