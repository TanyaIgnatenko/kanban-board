import { useCallback, useEffect } from 'react';

export function useOnClickOutside(elementId, onClickOutside) {
  const checkClick = useCallback(
    event => {
      const wasClickOutside = !event.target.closest(`#${elementId}`);

      if (wasClickOutside) {
        onClickOutside();
      }
    },
    [elementId, onClickOutside],
  );

  useEffect(() => {
    document.addEventListener('pointerdown', checkClick);

    return function cleanup() {
      document.removeEventListener('pointerdown', checkClick);
    };
  }, [checkClick]);
}
