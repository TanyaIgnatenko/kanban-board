import { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';

export function useUniqueId(seed) {
  const [id, setUniqueId] = useState(null);
  useEffect(() => {
    setUniqueId(uniqueId(seed));
  }, [seed]);
  return id;
}
