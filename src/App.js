import React from 'react';

import Container from "./components/Container/Container";
import ItemList from "./components/ItemList/ItemList";
import Item from "./components/Item/Item";

function App() {
  return (
    <>
      <Container>
        <ItemList>
          <Item/>
          <Item/>
        </ItemList>
        <ItemList>
          <Item/>
          <Item/>
          <Item/>
        </ItemList>
      </Container>
    </>
  );
}

export default App;
