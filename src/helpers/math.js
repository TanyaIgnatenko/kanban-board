function distance(point1, point2) {
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}

/**
 * return angle which is opposite to c
 */
function findTriangleAngle(a, b, c) {
  return Math.acos((a * a + b * b - c * c) / (2 * a * b));
}

export { distance, findTriangleAngle };
