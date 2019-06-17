function hideElement(element) {
  if (element) {
    element.style.visibility = 'hidden';
  }
}

function showElement(element) {
  if (element) {
    element.style.visibility = 'visible';
  }
}

export { hideElement, showElement };
