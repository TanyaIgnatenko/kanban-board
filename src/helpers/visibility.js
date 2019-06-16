function hideElement(element) {
  if (element) {
    element.style.visibility = 'hidden';
  } else {
    console.error('No element to hide');
  }
}

function showElement(element) {
  if (element) {
    element.style.visibility = 'visible';
  } else {
    console.error('No element to hide');
  }
}

export { hideElement, showElement };
