function moveTo({ x, y }) {
  return {
    position: 'fixed',
    left: `${x}px`,
    top: `${y}px`,
  };
}

export default moveTo;
