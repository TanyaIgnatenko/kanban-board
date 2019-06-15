function hasVerticalScrollbar(element) {
  return element.scrollHeight > element.clientHeight;
}

function hasHorizontalScrollbar(element) {
  return element.scrollWidth > element.clientWidth;
}

function findNearestVerticalScrollbar(position) {
  let elementFromPosition = document.elementFromPoint(position.x, position.y);
  while (elementFromPosition) {
    if (hasVerticalScrollbar(elementFromPosition)) {
      return elementFromPosition;
    }
    elementFromPosition = elementFromPosition.parentNode;
  }
  return null;
}

function findNearestHorizontalScrollbar(position) {
  let elementFromPosition = document.elementFromPoint(position.x, position.y);
  while (elementFromPosition) {
    if (hasHorizontalScrollbar(elementFromPosition)) {
      return elementFromPosition;
    }
    elementFromPosition = elementFromPosition.parentNode;
  }
  return null;
}

export {
  hasVerticalScrollbar,
  hasHorizontalScrollbar,
  findNearestVerticalScrollbar,
  findNearestHorizontalScrollbar,
};
