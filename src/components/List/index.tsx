import React from 'react';

import { MdAdd } from 'react-icons/md';
import Card from '../Card';

import { Container } from './styles';

interface ApiResponse {
  title: string;
  creatable: boolean;
  cards: ApiResponseCard[];
  done: boolean;
}

interface ApiResponseCard {
  id: number;
  content: string;
  labels: string[];
  user?: string;
}

interface ListProps {
  data: ApiResponse;
  index: number;
}

const List: React.FC<ListProps> = ({ data, index: listIndex, ...rest }) => {
  return (
    <Container isDone={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#FFF" />
          </button>
        )}
      </header>
      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} index={index} data={card} listIndex={listIndex} />
        ))}
      </ul>
    </Container>
  );
};

export default List;
