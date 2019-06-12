const MOVEMENT = {
  BOTTOM: 'BOTTOM',
  TOP: 'TOP',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
};

function isNotVertical(movement) {
  return (
    !movement.includes(MOVEMENT.TOP) && !movement.includes(MOVEMENT.BOTTOM)
  );
}

function isNotHorizontal(movement) {
  return (
    !movement.includes(MOVEMENT.LEFT) && !movement.includes(MOVEMENT.RIGHT)
  );
}

export { isNotVertical, isNotHorizontal, MOVEMENT };
