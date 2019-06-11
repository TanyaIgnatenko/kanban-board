import React, { useRef } from 'react';

import DragDropManager from './drag-drop/DragDropManager';
import { BoardContainer } from './components/Board';

function App() {
  const mainScrollbarContainer = useRef(null);
  return (
    <DragDropManager mainScrollbarContainer={mainScrollbarContainer}>
      <BoardContainer id={0} scrollbarContainer={mainScrollbarContainer} />
    </DragDropManager>
  );
}

export default App;
