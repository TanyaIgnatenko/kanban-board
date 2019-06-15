import React from 'react';

import DragDropManager from './drag-drop/DragDropManager';
import { BoardContainer } from './components/Board';

function App() {
  return (
    <DragDropManager>
      <BoardContainer id={0} />
    </DragDropManager>
  );
}

export default App;
