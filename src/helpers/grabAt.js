// It doesn't require grapPoint and dimensitions params cause it always returns the same style for a slope
// This params were for realisticGrabAt
function grabAt() {
  return {
    transformOrigin: '0 0',
    transform: 'rotate(0.087rad)',
  };
}

export default grabAt;
