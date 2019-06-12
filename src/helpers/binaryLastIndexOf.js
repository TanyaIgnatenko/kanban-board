function binaryLastIndexOf(array, predicate) {
  let leftIdx = 0,
    rightIdx = array.length - 1;

  while (leftIdx <= rightIdx) {
    const middleIdx = Math.floor((leftIdx + rightIdx) / 2);

    if (predicate(array[middleIdx])) {
      leftIdx = middleIdx + 1;
    } else {
      rightIdx = middleIdx - 1;
    }
  }

  return rightIdx !== -1 ? rightIdx : null;
}

export { binaryLastIndexOf };
