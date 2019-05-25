import { useRef, useEffect } from 'react';
import _ from 'lodash';

export function useUniqueId(seed) {
  const uniqueId = useRef(null);
  useEffect(() => {
    uniqueId.current = _.uniqueId(seed);
  }, [seed]);
  return uniqueId.current;
}
