import React from 'react';

const DragDropContext = React.createContext({
  draggedObject: null,
  grabDraggable: () => {},
  registerAsDroppable: () => {},
});

export default DragDropContext;
