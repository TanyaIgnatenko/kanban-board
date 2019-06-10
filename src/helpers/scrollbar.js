const SCROLLBAR_DIRECTION = {
  HORIZONTAL: 0,
  VERTICAL: 1,
};

function hasScrollbar(element, scrollbarDirection) {
  return scrollbarDirection === SCROLLBAR_DIRECTION.HORIZONTAL
    ? element.scrollWidth > element.clientWidth
    : element.scrollHeight > element.clientHeight;
}

export { hasScrollbar, SCROLLBAR_DIRECTION };
