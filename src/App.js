import React from 'react';
import BoardContainer from './components/Board/Board';
import DragDropManager from './drag-drop/DragDropManager';

function App() {
  return (
    <DragDropManager>
      <BoardContainer id={0} />
    </DragDropManager>
  );
}

export default App;
