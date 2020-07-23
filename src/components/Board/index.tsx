import React, { useState } from 'react';
import produce from 'immer';
import BoardContext from './context';
import { loadLists } from '../../services/api';

import { Container } from './styles';

import List from '../List';

const data = loadLists();

const Board: React.FC = () => {
  const [lists, setLists] = useState(data);
  function move(
    draggedListIndex: number,
    targetListIndex: number,
    from: number,
    to: number,
  ) {
    setLists(
      produce(lists, draft => {
        const dragged = draft[draggedListIndex].cards[from];

        draft[draggedListIndex].cards.splice(from, 1);
        draft[targetListIndex].cards.splice(to, 0, dragged);
      }),
    );
  }
  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
};

export default Board;
