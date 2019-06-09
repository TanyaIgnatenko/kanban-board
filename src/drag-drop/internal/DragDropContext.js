import React from 'react';

const DragDropContext = React.createContext({
  draggableContext: null,
  registerDraggable: () => {},
  registerDroppable: () => {},
});

export default DragDropContext;
