import { useState } from 'react';

function useUncontrollableProps(uncontrollableProps) {
  return uncontrollableProps.reduce(
    (props, { propName, changeHandlerName, defaultValue }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(defaultValue);
      props[propName] = value;
      props[changeHandlerName] = setValue;
      return props;
    },
    {},
  );
}

export { useUncontrollableProps };
