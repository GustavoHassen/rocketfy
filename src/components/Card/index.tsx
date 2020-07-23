/* eslint-disable no-param-reassign */
import React, { useRef, useContext } from 'react';

import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';

import BoardContext from '../Board/context';

import { Container, Label } from './styles';

interface ApiResponseCard {
  id: number;
  content: string;
  labels: string[];
  user?: string;
}
interface CardProps {
  data: ApiResponseCard;
  index: number;
  listIndex: number;
}

interface ItemProps extends DragObjectWithType {
  index: number;
  listIndex: number;
}

const Card: React.FC<CardProps> = ({ data, index, listIndex, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: ItemProps, monitor) {
      const targetListIndex = listIndex;
      const draggedListIndex = item.listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current?.getBoundingClientRect(); // return size of the element
      const draggedOffset = monitor.getClientOffset();
      if (targetSize && draggedOffset) {
        const targetCenter = (targetSize.bottom - targetSize.top) / 2;
        const draggedTop = draggedOffset.y - targetSize.top;
        if (draggedIndex < targetIndex && draggedTop < targetCenter) {
          return;
        }
        if (draggedIndex > targetIndex && draggedTop > targetCenter) {
          return;
        }
        move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

        item.index = targetIndex;
        item.listIndex = targetListIndex;
      }
    },
  });

  dragRef(dropRef(ref));
  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => (
          <Label color={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="" />}
    </Container>
  );
};

export default Card;
