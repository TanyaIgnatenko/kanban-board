function hasScrollbar(element) {
  const hasHorizontalScrollbar = element.scrollWidth > element.clientWidth;
  const hasVerticalScrollbar = element.scrollHeight > element.clientHeight;

  return hasHorizontalScrollbar || hasVerticalScrollbar;
}

export { hasScrollbar };
