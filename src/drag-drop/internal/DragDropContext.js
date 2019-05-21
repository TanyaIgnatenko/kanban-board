import React from 'react';

const DragDropContext = React.createContext({
  draggedObject: null,
  grabDraggable: () => {},
  onDraggableEnterDroppable: () => {},
});

export default DragDropContext;
