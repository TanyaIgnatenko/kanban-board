import React from 'react';

const DragDropContext = React.createContext({
  draggedObject: null,
  registerDraggable: () => {},
  registerDroppable: () => {},
});

export default DragDropContext;
