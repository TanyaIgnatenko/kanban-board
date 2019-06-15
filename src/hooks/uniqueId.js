import { useState, useEffect } from 'react';
import _ from 'lodash';

export function useUniqueId(seed) {
  const [uniqueId, setUniqueId] = useState(null);
  useEffect(() => {
    setUniqueId(_.uniqueId(seed));
  }, [seed]);
  return uniqueId;
}
