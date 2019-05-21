/**
 * Return index of first element of array, for which predicate returns false
 */
function lowerBound(array, predicate) {
  let leftIdx = 0,
    rightIdx = array.length - 1;

  while (leftIdx <= rightIdx) {
    const middleIdx = Math.floor((leftIdx + rightIdx) / 2);

    if (predicate(array[middleIdx])) {
      rightIdx = middleIdx - 1;
    } else {
      leftIdx = middleIdx + 1;
    }
  }

  return leftIdx < array.length ? leftIdx : null;
}

export { lowerBound };
