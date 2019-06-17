function inside(point, element) {
  const elementRect = element.getBoundingClientRect();
  return (
    point.x >= elementRect.left &&
    point.x <= elementRect.right &&
    point.y >= elementRect.top &&
    point.y <= elementRect.bottom
  );
}

export { inside };
