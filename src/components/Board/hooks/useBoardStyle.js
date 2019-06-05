import { useMemo } from 'react';

function useBoardStyle(background) {
  const backgroundStyle =
    background.type === 'img'
      ? `url(${background.url}) no-repeat`
      : background.color;

  const boardStyle = useMemo(
    () => ({
      background: backgroundStyle,
      backgroundSize: 'cover',
    }),
    [backgroundStyle],
  );
  return boardStyle;
}

export { useBoardStyle };
