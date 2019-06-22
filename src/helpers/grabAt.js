import { distance, findTriangleAngle } from './math';

function grabAt(grabPoint, dimensions) {
  const center = { x: dimensions.width / 2, y: dimensions.height / 2 };

  const distanceToCenter = distance(grabPoint, center);
  const desiredCenterPosition = {
    x: grabPoint.x,
    y: grabPoint.y + distanceToCenter,
  };
  const diff = distance(center, desiredCenterPosition);

  const sign = Math.sign(center.x - grabPoint.x);

  const angle =
    sign * findTriangleAngle(distanceToCenter, distanceToCenter, diff);

  return {
    transformOrigin: `${(grabPoint.x / dimensions.width) *
      100}% ${(grabPoint.y / dimensions.height) * 100}%`,
    transform: `rotate(${angle}rad)`,
  };
}

export { grabAt };
